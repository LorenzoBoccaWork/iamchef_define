import type { IngredientInterface } from "../types/recipes";
import DiscoverRecipeBtn from "../components/header/DiscoverRecipeBtn";
import SearchBar from "../components/search/Searchbar"; 
import SelectedList from "../components/search/selected-item/SelectedList";
import "./SearchPage.css";
import logo from "../assets/AmC.svg";  


type SeachPageProps = {
    onSuggestClick: (ing: IngredientInterface) => void;
    onBadgeRemove: (ing: IngredientInterface) => void;
    selectedIng: IngredientInterface[];
    onSearchClick: () => void;
    isDiscover: boolean;
    apiKey?: string;
}


const SearchPage = ({ onSuggestClick, selectedIng, onBadgeRemove, onSearchClick, isDiscover, apiKey }: SeachPageProps) => {

    return (
        <div className="search-page-wrapper">
            <div className="search-page">
                <img src={logo} alt="logo app" className="logo-image" />
                <p>
                    Dimmi gli ingredienti e ti dirò delle ricetta{" "}
                </p>
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