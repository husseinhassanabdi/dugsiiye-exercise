import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <Link
      to={`/recipes/${recipe.id}`}
      className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition"
    >

      <h2 className="text-xl font-bold mb-3">
        {recipe.title}
      </h2>

      <p className="text-gray-600 mb-4">
        {recipe.description}
      </p>

      <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded text-sm">
        {recipe.category}
      </span>

    </Link>
  );
};

export default RecipeCard;