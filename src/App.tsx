import { useAppStore } from "./store";
import type { RecipeInterface } from "./types/recipes";
import Layout from "./components/layout/Layout";
import Header from "./components/header/Header";
import Footer from "./components/header/Footer.tsx";
import SearchPage from "./pages/SearchPage";
import { RecipeDetails } from "./pages/RecipeDetails";
import DiscoverRecipes from "./pages/DiscoverRecipes";
import ApiKeyPage from "./pages/ApiKeyPage";
import { getRecipesURL } from "./hooks/useApi";
import { recipesMock } from "./mock/mocks.ts";

function App() {
  // Utilizzo il custom hook di Zustand per accedere allo stato e alle azioni.
  // Invece di tanti useState, ora abbiamo un unico punto di accesso.
  const {
    apiKey,
    page,
    recipes,
    selectedIng,
    isDiscover,
    setPage,
    setRecipes,
    addSelectedIng,
    removeSelectedIng,
    setCurrentIndex,
    setIsDiscover,
  } = useAppStore();

  //funzione: click su "cerca"
  const handleSearchClick = async () => {
    if (apiKey) {
      // Se c'è una chiave API, fai la chiamata reale
      const url = getRecipesURL(selectedIng.map((ing) => ing.name));
      try {
        console.log('Chiamata API con URL:', `${url}&apiKey=${apiKey}`); // Log per debug
        const response = await fetch(`${url}&apiKey=${apiKey}`);
        const data = await response.json();
        console.log('Risposta API:', data); // Log per vedere la risposta completa
        
        if (!response.ok) {
          // Gestisci errori HTTP (es. 401, 402)
          console.error('Errore API:', response.status, data.message);
          alert(`Errore API: ${response.status} - ${data.message || 'Chiave API non valida o limite superato.'}`);
          setRecipes([]); // Imposta array vuoto per evitare pagina bianca
          setPage({ page: "discover-recipes" }); // Naviga comunque
          return;
        }
        
        // Controlla se ci sono risultati validi
        if (data && Array.isArray(data.results) && data.results.length > 0) {
          setRecipes(data.results);
        } else {
          console.warn('Nessun risultato dalla API:', data);
          alert('Nessuna ricetta trovata per questi ingredienti. Prova ingredienti diversi.');
          setRecipes([]); // Imposta array vuoto
        }
      } catch (error) {
        console.error('Errore di rete nella chiamata API:', error);
        alert('Errore di connessione. Controlla la tua connessione internet.');
        setRecipes([]); // Imposta array vuoto
      }
    } else {
      // Usa i mock
      setRecipes(recipesMock);
    }
    // Naviga alla pagina delle ricette
    setPage({ page: "discover-recipes" });
  };

  //apri dettaglio ricetta
  const handleRecipeDetailClick = (recipe: RecipeInterface) => {
    setPage({ page: "recipe-details", recipeData: recipe });
  };

  // torna a discover
  const handleClickBack = () => {
    setPage({ page: "discover-recipes" });
  };

  //gestione delle pagine
  let mainContent = null;
  switch (page.page) {
    case "api-key":
      mainContent = <ApiKeyPage />;
      break;
    case "discover-recipes":
      mainContent = (
        <DiscoverRecipes
          recipes={recipes}
          onRecipeDetailsClick={handleRecipeDetailClick}
        />
      );
      break;

    case "recipe-details":
      mainContent = (
        <RecipeDetails
          goToBack={handleClickBack}
          id={0}
          recipeData={page.recipeData!}
        />
      );
      break;
    
    case "search":
      mainContent = (
        <SearchPage
          onSuggestClick={addSelectedIng}
          selectedIng={selectedIng}
          onBadgeRemove={removeSelectedIng}
          onSearchClick={handleSearchClick}
          isDiscover={isDiscover}
          apiKey={apiKey}
        />
      );
      break;

    default:
      mainContent = (
        <SearchPage
          onSuggestClick={addSelectedIng}
          selectedIng={selectedIng}
          onBadgeRemove={removeSelectedIng}
          onSearchClick={handleSearchClick}
          isDiscover={isDiscover}
          apiKey={apiKey}
        />
      );
  }

  return (
    <>
      <Layout header={<Header />} main={mainContent} footer={<Footer />} />
    </>
  );
}

export default App;