import { IconBadge } from "./IconBadge";

type RecipeHealtScoreProps = {
    healthScore: number | undefined
}

export const RecipeHealtScore = ({healthScore}: RecipeHealtScoreProps) => {
    return healthScore &&
    <IconBadge 
        icon={'💚'}
        text={`Health Score ${healthScore}`}
        color="bg-blue-100 text-blue-950"
    />
}