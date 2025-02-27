import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "./Layout";

const Home = lazy(() => import("../Views/Home"));
// ✅ Buildings
const Buildings = lazy(() => import("../Views/Buildings/Buildings"));
const CrateBuilding = lazy(() => import("../Views/Buildings/CrateBuilding"));
// ✅ Building
const Building = lazy(() => import("../Views/Buildings/Building"));
const AddNewTenant = lazy(() => import("../Views/Buildings/AddNewTenant"));
const AdminBuilding = lazy(() => import("../Views/Buildings/AdminBuilding"));
const CreateDepartment = lazy(
  () => import("../Views/Buildings/CreateDepartment")
);

// ✅ Define AppRoutesList with correct paths
export const AppRoutesList = {
  home: "/",
  buildings: "/buildings",
  buildings_crate: "/buildings/crate",
  building: "/buildings/:buildingId",
  building_add_tenant: "/buildings/:buildingId/add-tenant",
  building_admin: "/buildings/:buildingId/admin",
  building_create_department: "/buildings/:buildingId/admin/create",
  not_founded: "*",
} as const;

export type AppRouteKeys = keyof typeof AppRoutesList;

export type AppRoutesParams = {
  home: undefined;
  buildings: undefined;
  buildings_crate: undefined;
  building: { buildingId: string | number };
  building_add_tenant: { buildingId: string | number };
  building_admin: { buildingId: string | number };
  building_create_department: { buildingId: string | number };
  not_founded: "*";
};

// ✅ Correct route configuration
const privateRoutes = () => [
  {
    element: <Layout />,
    children: [
      { path: AppRoutesList.home, element: <Home /> },
      {
        path: AppRoutesList.buildings,
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <Buildings />,
            children: [
              {
                path: AppRoutesList.buildings_crate,
                element: <CrateBuilding />,
              },
            ],
          },
          {
            path: AppRoutesList.building,
            element: <Outlet />,
            children: [
              {
                path: "",
                element: <Building />,
                children: [
                  {
                    path: AppRoutesList.building_add_tenant,
                    element: <AddNewTenant />,
                  },
                ],
              },
              {
                path: AppRoutesList.building_admin,
                element: <Outlet />,
                children: [
                  {
                    path: "",
                    element: <AdminBuilding />,
                    children: [
                      {
                        path: AppRoutesList.building_create_department,
                        element: <CreateDepartment />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      // ✅ Fallback route
      { path: AppRoutesList.not_founded, element: <Navigate to="/" replace /> },
    ],
  },
];

export default privateRoutes;
