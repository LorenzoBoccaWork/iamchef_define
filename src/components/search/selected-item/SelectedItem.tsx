import { X } from "lucide-react";
import type { IngredientInterface } from "../../../types/recipes";


type SelectedIngredientProps = {
    id: string,
    ingredient: IngredientInterface,
    handleRemove: (ing: IngredientInterface) => void
}

// componente che prende il nome di un ingrediente e lo stampa a schermo 
const SelectedIngredient = ({ id, ingredient, handleRemove}: SelectedIngredientProps) => {
    return (
        <span
          id={id}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-nowrap rounded-full bg-green-100 text-green-700 text-sm font-medium shadow-sm hover:bg-green-200 transition-colors`}
        >
          {ingredient.name}

            <button
              onClick={() => handleRemove(ingredient)}
              className="hover:bg-green-300 rounded-full p-0.5 transition-colors cursor-pointer"
              aria-label={`Rimuovi ${ingredient.name}`}
            >
              <span className="stroke-[2.5]">
                <X size={14} />
              </span>
            </button>
        </span>
    );
};

export default SelectedIngredient;