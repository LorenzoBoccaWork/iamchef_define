import { useState, useEffect } from "react";
import { ingredientsMock } from "../mock/mocks";

// https://api.spoonacular.com BASE_URL
// /food/ingredients/search ENDPOINT
// ?apiKey=${YOUR_API_KEY}
// ?query=${debouncedSearchingIng}&number=${10} PARAMS


export interface UseApiReturn<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T = any>(url: string, apiKey?: string): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    let cancelled = false
    
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        if (!apiKey) {
          // Usa mock se no apiKey
          if (!cancelled) {
            setData(ingredientsMock as T)
          }
        } else {
          const response = await fetch(url)
          const result = await response.json()
          
          if (!cancelled) {
            setData(result.results) 
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError((err as Error).message)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }
    
    if (url.length > 0 || !apiKey) fetchData();
    
    return () => {
      cancelled = true
    }
  }, [url, apiKey])
  
  return { data, loading, error }
}

/**
 * Funzione di helper per costruire l'URL delle API per la ricerca degli ingredienti
 * @param query  Stringa di ricerca
 * @param apiKey API key opzionale
 * @returns URL completo per la chiamata API
 */
export const getIngredientURL = (query: string, apiKey?: string) => {
    
    const ENDPOINT = "/food/ingredients/search";
    const RESULT_NUM = 10;
    const key = apiKey || import.meta.env.VITE_API_KEY;
    
    return `${import.meta.env.VITE_BASE_URL}${ENDPOINT}?apiKey=${key}&query=${query}&number=${RESULT_NUM}`;
}

/**
 * Funzione di helper per costruire l'URL delle API per la ricerca delle ricette basate su ingredienti
 * @param ingredients Lista di ingredienti
 * @param apiKey API key opzionale
 * @returns URL completo per la chiamata API
 */
export const getRecipesURL = (ingredients: string[], apiKey?: string) => {
    const ENDPOINT = "/recipes/findByIngredients";
    const RESULT_NUM = 10;
    const key = apiKey || import.meta.env.VITE_API_KEY;
    const ingredientsStr = ingredients.map(ing => ing.replace(' ', '+')).join(',');
    
    return `${import.meta.env.VITE_BASE_URL}${ENDPOINT}?apiKey=${key}&ingredients=${ingredientsStr}&number=${RESULT_NUM}`;
}