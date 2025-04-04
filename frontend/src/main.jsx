import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { EmployerPage } from './pages/Employer-Page.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/all-employer", element: <EmployerPage /> },
]);

createRoot(document.getElementById('root')).render(

  <RouterProvider router={router}>
    <App />
  </RouterProvider>

)
