import type { IngredientInterface } from "../types/recipes";
import DiscoverRecipeBtn from "../components/header/DiscoverRecipeBtn";
import SearchBar from "../components/search/Searchbar"; 
import SelectedList from "../components/search/selected-item/SelectedList";
import "./SearchPage.css";
import logo from "../assets/AmC.svg";  
import { useAppStore } from "../store";
import { useNavigate } from "react-router";
import { getRecipesURL } from "../hooks/useApi";
import { recipesMock } from "../mock/mocks";


const SearchPage = () => {
  const { selectedIng, addSelectedIng, removeSelectedIng, setIsDiscover, isDiscover, apiKey, setRecipes, setCurrentIndex } = useAppStore();
  const navigate = useNavigate();

  const onSuggestClick = (ing: IngredientInterface) => {
    addSelectedIng(ing);
  };

  const onBadgeRemove = (ing: IngredientInterface) => {
    removeSelectedIng(ing);
  };

  const onSearchClick = async () => {
    setIsDiscover(true);
    // Reset dell'indice a 0 quando si fa una nuova ricerca
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
    navigate('/discover');
  };

    return (
        <div className="search-page-wrapper">
            <div className="search-page">
                <header className="search-header">
                    <img src={logo} alt="logo app" className="logo-image" />
                    <p>
                        Dimmi gli ingredienti e ti dirò delle ricetta{" "}
                    </p>
                </header>
                <SearchBar handleSuggestClick={onSuggestClick} apiKey={apiKey} />

                <SelectedList 
                    ingredients={selectedIng} 
                    handleRemove={onBadgeRemove}/>

                <DiscoverRecipeBtn ingredients={selectedIng} onSearchClick={onSearchClick} isDiscover={isDiscover} />     
            </div>
        </div>
    );
}

export default SearchPage;