import type { RecipeInterface } from "../types/recipes";

export type Pages = 
    | { page: "api-key" }
    | { page: "search" }
    | { page: "discover-recipes" }
    | { page: "recipe-details"; recipeData?: RecipeInterface }

export type currentPage = {
    currentPage: Pages,
    id?: number
}