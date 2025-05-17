import { createBrowserRouter, RouterProvider } from "react-router-dom";
import privateRoutes from "./privateRoutes";
import PublicRoutes from "./PublicRoute";
import { useIsLogin } from "../hooks";

export const Router = () => {
  const login = useIsLogin();
  const routes = login.isLogin ? privateRoutes() : PublicRoutes();
  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter(routes);
  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};
