import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Layout from "./Layout";

const Home = lazy(() => import("../Views/Home"));
const Buildings = lazy(() => import("../Views/Buildings/Buildings"));
const CrateBuilding = lazy(() => import("../Views/Buildings/CrateBuilding"));

const privateRoutes = () => [
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/buildings",
        element: <Buildings />,
        children: [
          { path: "crate", element: <CrateBuilding /> }, // ✅ Nested route for individual building details
        ],
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
];

export default privateRoutes;
