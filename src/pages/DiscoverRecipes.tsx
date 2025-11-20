import { RecipeCard } from "../components/card-components/RecipeCard";
import { ScrollBtnSection } from "../components/scroll-btn/ScrollBtnSection";
import { useAppStore } from "../store";
import type { RecipeInterface } from "../types/recipes";
import "./DiscoverRecipes.css";

type DiscoverRecipesProps = {
  recipes: RecipeInterface[];
  onRecipeDetailsClick: (recipe: RecipeInterface) => void;
};

function DiscoverRecipes({
  recipes,
  onRecipeDetailsClick,
}: DiscoverRecipesProps) {
  const { currentIndex, setCurrentIndex } = useAppStore();

  return (
    <main className="discover-recipes-main">
      <div className="discover-recipes-content">
        <RecipeCard
          recipe={recipes[currentIndex]}
          onClickDetails={onRecipeDetailsClick}
        />
      </div>

      <div className="discover-recipes-footer">
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