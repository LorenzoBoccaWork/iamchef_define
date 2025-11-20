import "./RecipeImage.css";

type RecipeImageProps = {
  image: string;
  title: string;
};

const RecipeImage = ({ image, title }: RecipeImageProps) => (
  <div className="recipe-image-container">
    <img
      src={
        image?.length
          ? "https://images.unsplash.com/photo-1547385203-cfe7977b9fd0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171"
          : image
      }
      alt={title || "Titolo non disponibile"}
    />
    <div className="recipe-image-overlay" />
  </div>
);

export default RecipeImage;