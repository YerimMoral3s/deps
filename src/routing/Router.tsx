import { createBrowserRouter, RouterProvider } from "react-router-dom";
import privateRoutes from "./privateRoutes";
import PublicRoutes from "./PublicRoute";
import { useIsLogin } from "../hooks";

export const Router = () => {
  const login = useIsLogin();

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...(login.isLogin ? privateRoutes() : PublicRoutes()),
  ]);
  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};
