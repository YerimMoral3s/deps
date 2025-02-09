import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Layout from "./Layout";

const Home = lazy(() => import("../Views/Home"));

// ✅ Buildings
const BuildingsLayout = lazy(
  () => import("../Views/Buildings/BuildingsLayout")
);
const CrateBuilding = lazy(() => import("../Views/Buildings/CrateBuilding"));
const Building = lazy(() => import("../Views/Buildings/Building"));
const Buildings = lazy(() => import("../Views/Buildings/Buildings"));

export const AppRoutes = {
  HOME: "/",
  BUILDINGS: "/buildings",
  BUILDINGS_CRATE: "/buildings/crate",
  BUILDING: "/buildings/:id",
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
        element: <BuildingsLayout />,
        children: [
          {
            path: AppRoutes.BUILDINGS,
            element: <Buildings />,
            children: [
              { path: AppRoutes.BUILDINGS_CRATE, element: <CrateBuilding /> }, // ✅ Nested route for individual building details
            ],
          },
          { path: AppRoutes.BUILDING, element: <Building /> },
        ],
      },

      { path: AppRoutes.NOT_FOUND, element: <Navigate to="/" replace /> },
    ],
  },
];

export default privateRoutes;
