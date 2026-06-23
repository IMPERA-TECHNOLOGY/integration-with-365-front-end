import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'
import App from './app.jsx'
import Login from './components/log-in/index.jsx'
import Register from './components/register/index.jsx'
import ContextData from './components/context/index.jsx'

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function PublicRoute({ isAuthenticated, children }) {
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function MainApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <App onLogout={() => setIsAuthenticated(false)} />
        </ProtectedRoute>
      )
    },
    {
      path: "/login",
      element: (
        <PublicRoute isAuthenticated={isAuthenticated}>
          <Login onLogin={() => setIsAuthenticated(true)} />
        </PublicRoute>
      )
    },
    {
      path: "/register",
      element: (
        <PublicRoute isAuthenticated={isAuthenticated}>
          <Register />
        </PublicRoute>
      )
    },
    {
      path: "*",
      element: <Navigate to={isAuthenticated ? "/" : "/login"} replace />
    }
  ]);

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextData>
      <MainApp />
    </ContextData>
  </StrictMode>
);
