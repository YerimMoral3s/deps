import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Layout from "./Layout";

const Home = lazy(() => import("../Views/Home"));
const Buildings = lazy(() => import("../Views/Buildings"));

const privateRoutes = () => [
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/buildings", element: <Buildings /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
];

export default privateRoutes;
