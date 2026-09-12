import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = () => {
    login();
    navigate(from, { replace: true });
  };

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-xl bg-white p-8 shadow-md">
          <h1 className="mb-3 text-2xl font-bold text-gray-800">
            Login
          </h1>

          <p className="mb-6 text-gray-600">
            You must log in to access the Create Post page.
          </p>

          <button
            type="button"
            onClick={handleLogin}
            className="rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Log In
          </button>
        </section>
      </div>
    </main>
  );
};

export default Login;