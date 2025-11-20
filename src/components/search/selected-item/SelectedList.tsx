import type { IngredientInterface } from "../../../types/recipes";
import SelectedItem from "./SelectedItem"

type SelectedListProps = {
    ingredients: IngredientInterface[],
    handleRemove: (ing: IngredientInterface) => void
}

const SelectedList = ({ ingredients, handleRemove }: SelectedListProps) => {
  return (
    <div className={`max-h-40 flex flex-nowrap gap-2 overflow-y-auto rounded-lg`}>
    {ingredients.map((ingredient, index) => (
        <SelectedItem 
            key={index.toString()}
            id={index.toString()} 
            ingredient={ingredient} 
            handleRemove={handleRemove}/>
    ))}
    </div>

  )
}

export default SelectedList