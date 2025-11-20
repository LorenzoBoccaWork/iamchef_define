import type { RecipeInterface } from "../types/recipes";
import { getDifficulty } from "../utils/getDifficulty";
import { IconBadge } from "../components/card-components/IconBadge";
import { RecipeCuisines } from "../components/card-components/RecipeCusines";
import { getSummary } from "../utils/getSummary";
import DisplayedIngredients from "../components/card-components/DisplayedIngredients";
import WinePairingComponent from "../components/card-components/WinePairing";
import { RecipeIngredients } from "../components/card-components/RecipeIngredients";
import { RecipeCost } from "../components/card-components/RecipeCost";
import { RecipeHealtScore } from "../components/card-components/RecipeHealtScore";
import { fallbackRecipeMock } from "../mock/mocks";
import "./RecipeDetails.css";


type RecipeDetailsProps = {
  id: number;
  recipeData: RecipeInterface;
  goToBack: (id: number) => void
};

export const RecipeDetails = ({ id, recipeData, goToBack }: RecipeDetailsProps) => {



  const recipe = recipeData || fallbackRecipeMock;

  const maxIngredientsToShow = 4;
  const displayedIngredients = recipe.extendedIngredients.slice(0, maxIngredientsToShow);

  // Informazioni su possibili tags
  const interestingTags = [
    recipe.vegetarian && 'Vegetariana',
    recipe.vegan && 'Vegana',
    recipe.glutenFree && 'Senza Glutine',
    recipe.dairyFree && 'Senza Lattosio',
    recipe.veryHealthy && 'Salutare',
  ].filter(Boolean);

  return (
    <div className="recipe-details-wrapper">
      <div className="recipe-details-container">
      <div className="recipe-details-scroll">
        <section className="recipe-details-section">
          {/* Immagine rimossa come richiesto */}

          {/* Titolo e Badge */}
          <div className="recipe-title-section">
            <h1 className="recipe-title">
              {recipe.title || "Ricetta sconosciuta"}
            </h1>
            <div className="recipe-badges">

              <IconBadge icon={"⚡"} text={getDifficulty(recipe.readyInMinutes)} color={"bg-green-500 text-white"} />

              <RecipeCost pricePerServing={recipe.pricePerServing}  />

              <RecipeIngredients extendedIngredients={recipe.extendedIngredients} />

              {interestingTags.map(tag => <IconBadge icon={"⭐"} text={tag as string} />)}
            </div>
          </div>

          {/* Info basilari */}
          <div className="recipe-info">
            {<IconBadge icon={"⏱️"} text={`${recipe.readyInMinutes || '-'} min`} />}
            {<IconBadge icon={"🍽️"} text={`${recipe.servings || '-'} porzioni`} />}
            <RecipeHealtScore healthScore={recipe.healthScore} />
            {/* Tipo di cucina */}
            <RecipeCuisines cuisines={recipe.cuisines} />
          </div>

          {/* Summary */}
          <p className="recipe-summary">
            {getSummary(recipe.summary)}
          </p>

          {/* Ingredienti principali */}
          <div className="recipe-ingredients">
            <DisplayedIngredients displayedIngredients={displayedIngredients} />
          </div>

          {/* Pairing vino */}
          {recipe.winePairing?.pairingText && <WinePairingComponent winePairing={recipe.winePairing} />}

        </section>
      </div>
      {/* Bottone indietro fisso in basso */}
      <div className="recipe-footer">
        <button
          type="button"
          onClick={() => goToBack(id)}
          className="recipe-back-btn"
        >
          ← Torna indietro
        </button>
      </div>
    </div>
    </div>
  );
};