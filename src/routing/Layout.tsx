import { Outlet } from "react-router-dom";

import { Suspense } from "react";
import LoaderView from "../components/LoaderView";

const ProtectedLayout = () => {
  return (
    <Suspense fallback={<LoaderView />}>
      <Outlet />
    </Suspense>
  );
};

export default ProtectedLayout;
