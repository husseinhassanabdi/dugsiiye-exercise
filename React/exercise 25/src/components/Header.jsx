import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">

        <NavLink
          to="/"
          className="text-2xl font-bold text-red-600"
        >
          Recipe Book
        </NavLink>

        <nav className="flex gap-7">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-red-600 font-medium"
                : "text-gray-600"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/recipes"
            className={({ isActive }) =>
              isActive
                ? "text-red-600 font-medium"
                : "text-gray-600"
            }
          >
            Recipes
          </NavLink>

          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive
                ? "text-red-600 font-medium"
                : "text-gray-600"
            }
          >
            Categories
          </NavLink>

        </nav>

      </div>
    </header>
  );
};

export default Header;