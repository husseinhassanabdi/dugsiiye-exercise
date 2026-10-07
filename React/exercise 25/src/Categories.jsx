import { useState } from "react";
import { Link } from "react-router-dom";
import { categories, recipes } from "./data/recipes";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("breakfast");

  const filteredRecipes = recipes.filter(
    (recipe) => recipe.category === selectedCategory
  );

  return (
    <main className="min-h-screen px-6 py-8">

      <div className="max-w-5xl mx-auto">

        {/* Categories */}
        <div className="bg-white rounded-lg shadow-md p-8">

          <h1 className="text-3xl font-bold mb-8">
            Categories
          </h1>

          <div className="space-y-2">

            {categories.map((category) => {

              const count = recipes.filter(
                (recipe) => recipe.category === category
              ).length;

              const isSelected = selectedCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left p-4 rounded-lg transition ${
                    isSelected
                      ? "bg-red-50"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >

                  <h2
                    className={`text-xl font-bold capitalize ${
                      isSelected ? "text-red-600" : "text-black"
                    }`}
                  >
                    {category}
                  </h2>

                  <p className="text-gray-600 mt-1">
                    {category === "breakfast" && "Start your day right"}
                    {category === "lunch" && "Midday favorites"}
                    {category === "dinner" && "Evening meals"}
                    {category === "desserts" && "Sweet treats"}
                  </p>

                </button>
              );
            })}

          </div>

        </div>


        {/* Recipes for selected category */}
        <div className="bg-white rounded-lg shadow-md p-8 mt-8">

          <h1 className="text-3xl font-bold mb-8 capitalize">
            {selectedCategory} Recipes
          </h1>

          <div className="space-y-5">

            {filteredRecipes.map((recipe) => (

              <Link
                key={recipe.id}
                to={`/recipes/${recipe.id}`}
                className="block border-2 border-gray-300 rounded-lg p-6 hover:shadow-md transition"
              >

                <h2 className="text-xl font-bold mb-3">
                  {recipe.title}
                </h2>

                <p className="text-gray-600">
                  {recipe.description}
                </p>

              </Link>

            ))}

          </div>

        </div>

      </div>

    </main>
  );
};

export default Categories;