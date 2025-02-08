import { Navigate } from "react-router-dom";
import Login from "../Views/Login";

const PublicRoutes = () => {
  return [
    { path: "/login", element: <Login /> },
    { path: "*", element: <Navigate to="/login" replace /> },
  ];
};

export default PublicRoutes;
