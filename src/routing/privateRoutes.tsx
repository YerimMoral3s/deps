import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Layout from "./Layout";

const Home = lazy(() => import("../Views/Home"));
const Buildings = lazy(() => import("../Views/Buildings/Buildings"));
const CrateBuilding = lazy(() => import("../Views/Buildings/CrateBuilding"));
const Building = lazy(() => import("../Views/Buildings/Building"));

export const AppRoutes = {
  HOME: "/",
  BUILDINGS: "/buildings",
  BUILDINGS_CRATE: "/buildings/crate",
  BUILDING: (id: string | number): string => `/building/${id}`, // ✅ Function to handle dynamic `id`
  NOT_FOUND: "*",
} as const;

export type AppRouteKeys = keyof typeof AppRoutes;

export type NavigationParams<T extends AppRouteKeys> = T extends "BUILDING"
  ? { id: string | number; replace?: boolean }
  : { id?: never; replace?: boolean };

const privateRoutes = () => [
  {
    element: <Layout />,
    children: [
      { path: AppRoutes.HOME, element: <Home /> },
      {
        path: AppRoutes.BUILDINGS,
        element: <Buildings />,
        children: [
          { path: AppRoutes.BUILDINGS_CRATE, element: <CrateBuilding /> }, // ✅ Nested route for individual building details
        ],
      },
      { path: "/building/:id", element: <Building /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
];

export default privateRoutes;
