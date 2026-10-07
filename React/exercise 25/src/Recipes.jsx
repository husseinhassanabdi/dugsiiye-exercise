import { useSearchParams } from "react-router-dom";
import { recipes } from "./data/recipes";
import RecipeCard from "./components/RecipeCard";

const Recipes = () => {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");

  const filteredRecipes = category
    ? recipes.filter((recipe) => recipe.category === category)
    : recipes;

  const title = category
    ? `${category.charAt(0).toUpperCase() + category.slice(1)} Recipes`
    : "All Recipes";

  return (
    <main className="min-h-screen px-6 py-7">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          {title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
            />
          ))}

        </div>

      </div>

    </main>
  );
};

export default Recipes;