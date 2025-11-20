import type { IngredientInterface } from "../../../types/recipes";
import SuggestItem from "./SuggestItem"
import "./SuggestList.css";

type SuggestListProps = {
    ingredients: IngredientInterface[],
    handleClick: (ing: IngredientInterface) => void
}

// componente che renderizza la lista di elementi suggeriti, facendo prop drilling per l'evento di click
const SuggestList = ({ ingredients, handleClick }: SuggestListProps) => {
  return (
    <div className="suggest-list">
    {ingredients.map((ingredient) => (
        <SuggestItem key={ingredient.name} ingredient={ingredient} handleClick={handleClick} />
    ))}
    </div>

  )
}

export default SuggestList