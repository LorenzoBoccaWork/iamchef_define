import { ArrowRight } from "lucide-react"
import type { IngredientInterface } from "../../types/recipes"


type DiscoverRecipeBtnProps = {
    ingredients: IngredientInterface[],
    onSearchClick: () => void;
    isDiscover: boolean
}

const DiscoverRecipeBtn = ({ ingredients, onSearchClick, isDiscover}: DiscoverRecipeBtnProps) => {
    if (!ingredients || ingredients.length == 0) {
        return null
    }


  return (
    <button 
      className={`flex justify-center gap-2 flex-nowrap text-green-600 py-2 rounded-lg font-bold ${isDiscover ? "bg-green-100 cursor-default" : "bg-white hover:bg-green-100 cursor-pointer"} transition-all duration-300`}
      onClick={onSearchClick}
    >
        {isDiscover ? "Discovering ..." : "Discover Recipe"} <ArrowRight />
    </button>
  )
}

export default DiscoverRecipeBtn