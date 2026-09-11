import { Link, useParams } from "react-router-dom";
import { recipes } from "./data/recipes";

const RecipeDetail = () => {

  const { id } = useParams();

  const recipe = recipes.find(
    (item) => item.id === id
  );

  if (!recipe) {
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold">
          Recipe not found
        </h1>

        <Link
          to="/recipes"
          className="text-red-600"
        >
          Back to recipes
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen px-6 py-8">

      <div className="max-w-5xl mx-auto">

        <Link
          to="/recipes"
          className="text-red-600 font-medium"
        >
          ← Back to recipes
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8 mt-5">

          <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded text-sm mb-3">
            {recipe.category}
          </span>

          <h1 className="text-3xl font-bold">
            {recipe.title}
          </h1>

          <p className="text-gray-600 mt-2 mb-8">
            {recipe.description}
          </p>

          {/* LEFT + RIGHT */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* INGREDIENTS */}

            <section>

              <h2 className="text-2xl font-bold border-b-2 border-red-600 pb-2 mb-5">
                Ingredients
              </h2>

              <ul className="space-y-3">

                {recipe.ingredients.map(
                  (ingredient, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-gray-700"
                    >
                      <span className="text-red-600 font-bold">
                        •
                      </span>

                      {ingredient}
                    </li>
                  )
                )}

              </ul>

            </section>


            {/* INSTRUCTIONS */}

            <section>

              <h2 className="text-2xl font-bold border-b-2 border-red-600 pb-2 mb-5">
                Instructions
              </h2>

              <ol className="space-y-4">

                {recipe.instructions.map(
                  (instruction, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-gray-700"
                    >

                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-red-600 text-white text-sm font-bold flex items-center justify-center">
                        {index + 1}
                      </span>

                      <span>
                        {instruction}
                      </span>

                    </li>
                  )
                )}

              </ol>

            </section>

          </div>

        </div>

      </div>

    </main>
  );
};

export default RecipeDetail;