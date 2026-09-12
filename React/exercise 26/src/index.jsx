import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { PostsProvider } from './context/PostsContext';
import router from './routes';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <PostsProvider>
        <RouterProvider router={router} />
      </PostsProvider>
    </AuthProvider>
  </React.StrictMode>
);