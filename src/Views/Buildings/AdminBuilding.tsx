import { useEffect } from "react";
import { useBuilding, useNavs, useRouteParams } from "../../hooks";
import { FaChevronLeft } from "react-icons/fa";
import { Container } from "../../components";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import DepartmentsByBuilding from "../../components/DepartmentsByBuilding";

const StyledAdminBuilding = styled.div`
  .head {
    display: flex;
    justify-content: space-between;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        margin-right: 0.5rem;
      }
    }
  }
  h2 {
    margin-top: 0.75rem;
  }
`;

export default function AdminBuilding() {
  const { handleGoBack, navigateTo } = useNavs();
  const urlParams = useRouteParams<{ buildingId?: string }>();

  useEffect(() => {
    if (!urlParams.buildingId) {
      handleGoBack({ fallback: "buildings" });
    }
  }, []);

  if (!urlParams.buildingId) {
    return null;
  }

  const goBack = () =>
    urlParams.buildingId
      ? handleGoBack({
          fallback: "building",
          props: { buildingId: urlParams.buildingId },
        })
      : null;

  const navigateCreateNewDepartment = () => {
    if (urlParams.buildingId) {
      navigateTo({
        route: "building_create_department",
        props: { buildingId: urlParams.buildingId },
      });
    }
  };

  return (
    <StyledAdminBuilding className="fade-in">
      <Container>
        <div className="head">
          <button className="secondary-button" onClick={goBack}>
            <FaChevronLeft />
            Regresar
          </button>
          <button onClick={navigateCreateNewDepartment}>
            Agregar nuevo departamento
          </button>
        </div>
        <h2>Lista de departamentos</h2>
        <DepartmentsByBuilding buildingId={urlParams.buildingId} />
      </Container>
      <Outlet />
    </StyledAdminBuilding>
  );
}
