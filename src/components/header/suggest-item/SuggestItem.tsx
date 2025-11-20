import type { IngredientInterface } from "../../../types/recipes";

type SuggestItemProps ={
    ingredient: IngredientInterface,
    handleClick: (ing: IngredientInterface) => void
}

const SuggestItem = ({ ingredient, handleClick }: SuggestItemProps) => {
  return (
    <div
      onClick={() => handleClick(ingredient)} 
      className="suggest-item">
        <span>{ingredient.name}</span>
    </div>
  )
}

export default SuggestItem