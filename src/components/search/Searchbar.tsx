import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import type { IngredientInterface } from "../../types/recipes";
import SuggestList from "../header/suggest-item/SuggestList";
import { useDebounce } from "../../hooks/useDebounce";
import { getIngredientURL, useApi } from "../../hooks/useApi";
import "./Searchbar.css";

// Definisco i tipi delle props che mi arrivano da fuori
type SearchBarProps = {
  handleSuggestClick: (ing: IngredientInterface) => void;
  apiKey?: string;
}

// Il mio componente SearchBar: gestisce tutto ciò che riguarda la ricerca dell’ingrediente
const SearchBar = ({ handleSuggestClick, apiKey }: SearchBarProps) => {
  
  // Stato per capire se l’input è attivo o meno (mi serve per gestire gli effetti grafici)
  const [isFocused, setIsFocused] = useState(false);

  // Stato che contiene il testo scritto dall’utente nella searchbar
  const [searchingIng, setSearchingIng] = useState<string>("");
  const [stateUrl, setStateURL] = useState<string>("");

  const debouncedSearchingIng = useDebounce(searchingIng, 300); // Per ora non uso il debouncing, ma lo lascio pronto per il futuro

  // Uso useMemo per filtrare la lista degli ingredienti solo quando il valore digitato cambia
  // In questo modo evito filtraggi inutili su ogni render
  const { 
    data: filteredIngredients, 
    loading, 
    error 
  } = useApi<IngredientInterface[]>(stateUrl, apiKey);

  // Questo effect si esegue solo quando debouncedQuery cambia
  // NON quando query cambia ad ogni lettera!
  useEffect(() => {
    // Se c'è del testo da cercare
    if (debouncedSearchingIng) {
      // Fai la chiamata API solo ora (dopo 300ms di pausa nella digitazione)
      // TOD: Inserie il filtro degli ingredienti.
      //setFilteredIngredients(ingredients.filter((ingredient) => ingredient.name.startsWith(debouncedSearchingIng)));
      setStateURL(getIngredientURL(debouncedSearchingIng, apiKey));
    } 
  }, [debouncedSearchingIng]) // Dipende da debouncedSearchingIng, non da searchingIng!

  // Quando l’utente clicca su un suggerimento:
  // 1. passo il valore cliccato al parent tram, type Iite callback
  // 2. svuoto la barra di ricerca per dare feedback visivo immediato
  const handleClick = (ing: IngredientInterface) => {
    handleSuggestClick(ing);
    setSearchingIng("");
  };

  // JSX del componente: barra di ricerca + suggerimenti condizionali
  return (
    <>
      <div className="search-bar-container">
        {/* Effetto di focus: un contorno evidenziato con transizione */}
        <div
          className={`search-bar-focus-effect ${isFocused ? 'focused' : ''}`}
        />

        {/* Contenitore principale della searchbar */}
        <div
          className={`search-bar-main ${isFocused ? 'focused' : ''}`}
        >
          {/* Icona lente: cambia colore quando la barra è attiva */}
          <span
            className={`search-bar-icon ${isFocused ? 'focused' : ''}`}
          >
            <Search size={20} />
          </span>

          {/* Input vero e proprio: invio informazioni e gestisco focus */}
          <input
            type="text"
            name="search-bar"
            id="search-bar"
            placeholder="First ingredients ..."
            className="search-bar-input"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={searchingIng}
            onChange={(e) => setSearchingIng(e.target.value)}
          />
        </div>
      </div>

      {/* Messaggio di errore se la chiamata API fallisce */}
      {error && <p className="search-bar-error">Errore nel caricamento degli ingredienti.</p>}

      {/* Messaggio di caricamento mentre aspetto la risposta */}
      {loading && <p className="search-bar-loading">Caricamento...</p>}

      {/* Se l’utente sta digitando, mostro i suggerimenti filtrati */}
      {filteredIngredients && (
        <SuggestList
          ingredients={filteredIngredients}
          handleClick={handleClick}
        />
      )}
    </>
  );
};

export default SearchBar;