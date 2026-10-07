import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import Home from "./Home";
import Recipes from "./Recipes";
import RecipeDetail from "./RecipeDetail";
import Categories from "./Categories";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      <Header />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/recipes"
          element={<Recipes />}
        />

        <Route
          path="/recipes/:id"
          element={<RecipeDetail />}
        />

        <Route
          path="/categories"
          element={<Categories />}
        />

      </Routes>

    </div>
  );
};

export default App;