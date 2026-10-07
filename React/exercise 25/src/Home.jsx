import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="min-h-screen px-6 pt-6">

      <div className="max-w-4xl mx-auto text-center">

        <h1 className="text-3xl font-bold mb-3">
          Welcome to Recipe Book
        </h1>

        <p className="text-gray-600 mb-6">
          Discover delicious recipes and start cooking today!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">

          <Link
            to="/recipes"
            className="bg-red-600 text-white w-full sm:w-56 p-5 rounded-md shadow-md hover:bg-red-700"
          >
            <h2 className="font-bold text-lg">
              Browse Recipes
            </h2>

            <p className="text-sm mt-1">
              Explore our collection of delicious recipes
            </p>
          </Link>

          <Link
            to="/categories"
            className="bg-red-600 text-white w-full sm:w-56 p-5 rounded-md shadow-md hover:bg-red-700"
          >
            <h2 className="font-bold text-lg">
              Recipe Categories
            </h2>

            <p className="text-sm mt-1">
              Find recipes by category
            </p>
          </Link>

        </div>

      </div>

    </main>
  );
};

export default Home;