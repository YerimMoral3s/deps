import { Outlet } from "react-router-dom";

import { Suspense } from "react";
import LoaderView from "../components/LoaderView";
import { Navbar } from "../components";
import styled from "styled-components";

const StyledLayout = styled.div`
  @media (max-width: 768px) {
    padding-bottom: 60px; /* ✅ Adds space for the fixed bottom Navbar */
  }
`;

const ProtectedLayout = () => {
  return (
    <Suspense fallback={<LoaderView />}>
      <StyledLayout>
        <Navbar />

        <Outlet />
      </StyledLayout>
    </Suspense>
  );
};

export default ProtectedLayout;
