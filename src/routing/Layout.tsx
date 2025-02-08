import { Outlet } from "react-router-dom";

import { Suspense } from "react";
import LoaderView from "../components/LoaderView";
import { Navbar } from "../components/NavBar";

const ProtectedLayout = () => {
  return (
    <Suspense fallback={<LoaderView />}>
      <Navbar />
      <Outlet />
    </Suspense>
  );
};

export default ProtectedLayout;
