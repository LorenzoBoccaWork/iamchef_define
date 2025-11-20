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
    setIsDiscover(true);
    //reset dell'indice a 0 quando si fa una nuova ricerca
    setCurrentIndex(0);

    if (apiKey) {
      try {
        const ingredientsNames = selectedIng.map((ing) => ing.name);
        const url = getRecipesURL(ingredientsNames, apiKey);
        const response = await fetch(url);
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Errore nel fetch delle ricette:", error);
        setRecipes(recipesMock); 
      }
    } else {
      setRecipes(recipesMock);
    }
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