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
import { useParams, useNavigate } from "react-router"; // Import per routing
import { useAppStore } from "../store"; // Store per recuperare ricetta
import { fetchRecipeDetails } from "../hooks/useApi"; // Import per dettagli API
import { useState, useEffect } from "react"; // Hook per stato e effetti
import "./RecipeDetails.css";

// Componente per dettagli ricetta, ora recupera dati da store basato su id URL
export const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>(); // Ottieni id dalla URL
  const navigate = useNavigate(); // Hook per navigazione
  const { recipes, apiKey } = useAppStore(); // Recupera ricette e apiKey dallo store

  const recipeId = id ? parseInt(id, 10) : 0; // Converti id a numero
  const [detailedRecipe, setDetailedRecipe] = useState<any>(null); // Stato per dettagli completi

  // Trova ricetta base dallo store
  const baseRecipe = recipes.find(r => r.id === recipeId) || fallbackRecipeMock;

  // Carica dettagli completi se mancanti e API key presente
  useEffect(() => {
    if (apiKey && baseRecipe && !baseRecipe.extendedIngredients?.length) {
      fetchRecipeDetails(recipeId, apiKey).then(details => {
        if (details) setDetailedRecipe(details);
      });
    }
  }, [recipeId, apiKey, baseRecipe]);

  // Usa dettagli completi se disponibili, altrimenti base
  const recipe = detailedRecipe || baseRecipe;

  const maxIngredientsToShow = 4;
  // Controllo sicuro per ingredienti (evita errore slice su undefined)
  const displayedIngredients = recipe.extendedIngredients?.slice(0, maxIngredientsToShow) || [];

  // Informazioni su possibili tags
  const interestingTags = [
    recipe.vegetarian && 'Vegetariana',
    recipe.vegan && 'Vegana',
    recipe.glutenFree && 'Senza Glutine',
    recipe.dairyFree && 'Senza Lattosio',
    recipe.veryHealthy && 'Salutare',
  ].filter(Boolean);

  // Funzione per tornare indietro
  const goToBack = () => {
    navigate(-1); // Torna alla pagina precedente
  };

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
          onClick={goToBack}
          className="recipe-back-btn"
        >
          ← Torna indietro
        </button>
      </div>
    </div>
    </div>
  );
};