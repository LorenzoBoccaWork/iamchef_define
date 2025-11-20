import {  } from "react";
import type { RecipeInterface } from "../../types/recipes";
import { getDifficulty } from "../../utils/getDifficulty";
import RecipeDishTypes from "./RecipeDishTypes";
import { RecipeIngredients } from "./RecipeIngredients";
import RecipeServings from "./RecipeServings";
import RecipeTime from "./RecipeTime";
import { fallbackRecipeMock } from "../../mock/mocks";
import "./RecipeCard.css";

type RecipeCardProps = {
  recipe: RecipeInterface;
  onClickDetails: (recipe: RecipeInterface) => void;
};

export const RecipeCard = ({ recipe, onClickDetails }: RecipeCardProps) => {
  const data = recipe || fallbackRecipeMock;

  return (
    <div className="recipe-card">

      {/* Immagine rimossa come richiesto */}

      <h2>
        {data.title || "Ricetta sconosciuta"}
      </h2>

      <div className="recipe-card-info">
        <RecipeTime readyInMinutes={data.readyInMinutes} />
        <span>·</span>
        <RecipeServings servings={data.servings} />
        <span>·</span>
        <RecipeDishTypes dishTypes={data.dishTypes} />
        <span>·</span>
        <span className="recipe-card-difficulty">
          <span role="img" aria-label="difficoltà">⭐</span>
          {getDifficulty(data.readyInMinutes)}
        </span>
      </div>

      <RecipeIngredients extendedIngredients={data.extendedIngredients} />

      <button onClick={() => onClickDetails(data)}>
        Dettagli ricetta
      </button>
    </div>
  );
};