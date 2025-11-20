import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { RecipeInterface, IngredientInterface } from '../types/recipes';
import type { Pages } from '../types/pages';

/**
 * Spiegazione di Zustand e dello Store
 * 
 * Zustand è una libreria per la gestione dello stato globale in React.
 * Ci permette di creare uno "store", ovvero un contenitore per i dati 
 * che devono essere condivisi tra diversi componenti, senza doverli passare
 * manualmente tramite le props (evitando il "prop drilling").
 * 
 * Questo file definisce il nostro store globale.
 */

// Definisco l'interfaccia per descrivere la forma del nostro stato globale.
// Contiene tutte le variabili di stato e le funzioni per modificarle.
interface AppState {
  apiKey: string;
  setApiKey: (key: string) => void;
  
  page: Pages;
  setPage: (page: Pages) => void;
  
  recipes: RecipeInterface[];
  setRecipes: (recipes: RecipeInterface[]) => void;
  
  selectedIng: IngredientInterface[];
  addSelectedIng: (ing: IngredientInterface) => void;
  removeSelectedIng: (ing: IngredientInterface) => void;
  
  currentIndex: number;
  setCurrentIndex: (index: number) => void;

  isDiscover: boolean;
  setIsDiscover: (isDiscover: boolean) => void;
}

// `create` è la funzione principale di Zustand per creare lo store.
// Lo store è un custom hook (in questo caso `useAppStore`) che potremo
// usare nei nostri componenti per accedere allo stato.
export const useAppStore = create<AppState>()(
  /**
   * `persist` è un "middleware" di Zustand. Un middleware aggiunge funzionalità extra allo store.
   * In questo caso, `persist` salva automaticamente una parte dello stato in uno storage a nostra scelta
   * (di default è `localStorage`) e lo ricarica quando l'app viene riaperta.
   * È perfetto per l'API key!
   */
  persist(
    // La prima funzione passata a `persist` definisce lo stato iniziale e le azioni.
    // `set` è una funzione per aggiornare lo stato.
    (set) => ({
      // STATO INIZIALE
      apiKey: '',
      page: { page: 'api-key' },
      recipes: [],
      selectedIng: [],
      currentIndex: 0,
      isDiscover: false,

      // AZIONI (le funzioni che modificano lo stato)
      setApiKey: (key) => set({ apiKey: key }),
      
      setPage: (page) => set({ page: page }),
      
      setRecipes: (recipes) => set({ recipes }),

      addSelectedIng: (ing) => set((state) => ({ 
        selectedIng: state.selectedIng.find(item => item.id === ing.id) 
          ? state.selectedIng 
          : [...state.selectedIng, ing]
      })),

      removeSelectedIng: (ing) => set((state) => ({
        selectedIng: state.selectedIng.filter(item => item.id !== ing.id)
      })),

      setCurrentIndex: (index) => set({ currentIndex: index }),

      setIsDiscover: (isDiscover) => set({ isDiscover }),
    }),
    {
      // OPZIONI DI PERSISTENZA
      name: 'iamchef-storage', // Il nome della chiave usata in localStorage
      storage: createJSONStorage(() => localStorage), // Specifichiamo di usare localStorage
      
      // Con `partialize` decidiamo QUALE parte dello stato salvare.
      // In questo caso, vogliamo salvare solo l'apiKey.
      partialize: (state) => ({ apiKey: state.apiKey }),
    }
  )
);
