import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import axios from "axios";
import LoginComponent from "./Components/UserManagement/LoginComponent/LoginComponent.jsx";
import RegisterComponent from "./Components/UserManagement/RegisterComponent/RegisterComponent.jsx";
import HomeLayout from "./Components/TaskContents/HomeLayout/HomeLayout.jsx";
import {
  ProtectAuthRoutes,
  ProtectHomeRoutes,
  ProtectMainRoute,
} from "./AppRoutes/PrivateRoutes.jsx";
import WelcomePage from "./Components/WelcomePage/WelcomePage.jsx";

const origins = "http://localhost:3000/api"; //"https://trackly-backend.onrender.com/"
axios.defaults.baseURL = origins;
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ProtectMainRoute element={<WelcomePage />} />,
      },
      {
        path: "/login",
        element: <ProtectAuthRoutes element={<LoginComponent />} />,
      },
      {
        path: "/register",
        element: <ProtectAuthRoutes element={<RegisterComponent />} />,
      },
      {
        path: "/home",
        element: <ProtectHomeRoutes element={<HomeLayout />} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
