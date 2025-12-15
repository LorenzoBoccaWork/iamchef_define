import { RecipeCard } from "../components/card-components/RecipeCard";
import { ScrollBtnSection } from "../components/scroll-btn/ScrollBtnSection";
import { useAppStore } from "../store";
import type { RecipeInterface } from "../types/recipes";
import "./DiscoverRecipes.css";
import { useNavigate } from "react-router";

function DiscoverRecipes() {
  const { recipes, currentIndex, setCurrentIndex } = useAppStore();
  const navigate = useNavigate();

  const onRecipeDetailsClick = (recipe: RecipeInterface) => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <main className="discover-recipes-main">
      <div className="discover-recipes-content">
        <RecipeCard
          recipe={recipes[currentIndex]}
          onClickDetails={onRecipeDetailsClick}
        />
      </div>

      <div className="discover-recipes-footer">
        {/* Pulsanti di navigazione */}
        <div className="flex gap-4 justify-center mb-4">
          <button
            onClick={() => navigate('/search')}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Nuova Ricerca
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Home
          </button>
        </div>
        <ScrollBtnSection
          currentIndex={currentIndex}
          maxIndex={recipes.length - 1}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
    </main>
  );
}

export default DiscoverRecipes;