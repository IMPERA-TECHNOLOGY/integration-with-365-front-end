import { StrictMode, useContext, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import App from './App.jsx'
import Login from './components/log-in/index.jsx'
import Register from './components/register/index.jsx'
import ContextData, { dataContext } from './components/context/index.jsx'
import Loading from './components/loading/index.jsx'
const API_URL = import.meta.env.VITE_API_URL;


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
  const {
    isAuthenticated,
    setIsAuthenticated
  } = useContext(dataContext)

  useEffect (() => {

  const auth = async () => {

    try {
    const response = await fetch(`${API_URL}/auth`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      },
      credentials: "include"
    })

    if (response.ok) {
      setIsAuthenticated(true)
    }else {
      setIsAuthenticated(false)
    }
  }catch (error) {
    console.log(error)
    setIsAuthenticated(false);
  }}
  auth();
},[])

  if(isAuthenticated === null) {
    return <Loading></Loading>
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <App onLogout={() => {
            setIsAuthenticated(false);
            localStorage.removeItem("user");
            localStorage.removeItem("id")}}  />
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