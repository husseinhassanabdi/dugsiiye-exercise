import React, { useContext } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const App = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const navLinkClass = ({ isActive }) =>
    `rounded-md px-4 py-2 font-medium transition ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
    }`;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <NavLink
            to="/"
            className="text-2xl font-bold text-gray-800 hover:text-blue-600"
          >
            React Blog
          </NavLink>

          <nav className="flex items-center gap-3">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            {isAuthenticated ? (
              <>
                <NavLink to="/create" className={navLinkClass}>
                  Create Post
                </NavLink>

                <button
                  onClick={logout}
                  className="rounded-md bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
            )}
          </nav>
        </div>
      </header>

      <Outlet />
    </div>
  );
};

export default App;