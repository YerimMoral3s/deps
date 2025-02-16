import { useNavs, useRouteParams } from "../../hooks";
import styled from "styled-components";
import { FaChevronLeft } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { Container, KebabMenu } from "../../components";
import { useEffect, useState } from "react";

const StyledBuilding = styled.div`
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
`;

export default function Building() {
  const { navigateTo, handleGoBack } = useNavs();
  const urlParams = useRouteParams<{ buildingId?: string }>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!urlParams.buildingId) {
      handleGoBack({ fallback: "buildings" });
    }
  }, []);

  const goBack = () => handleGoBack({ fallback: "buildings" });

  const navigateAddNewTenant = () => {
    if (urlParams.buildingId) {
      navigateTo({
        route: "building_add_tenant",
        props: { buildingId: urlParams.buildingId },
      });
    }
  };

  const navigateAdminBuilding = () => {
    if (urlParams.buildingId) {
      navigateTo({
        route: "building_admin",
        props: { buildingId: urlParams.buildingId },
      });
    }
  };

  return (
    <StyledBuilding className="fade-in">
      <Container>
        <div className="head">
          <button className="secondary-button" onClick={goBack}>
            <FaChevronLeft />
            Regrear
          </button>
          <KebabMenu
            isOpen={isMenuOpen}
            toggleOpen={() => setIsMenuOpen(!isMenuOpen)}
            items={[
              {
                copy: "Agregar inquilino",
                onClick: navigateAddNewTenant,
              },
              {
                copy: "Administrar edificio",
                onClick: navigateAdminBuilding,
              },
            ]}
          />
        </div>
      </Container>
      <Outlet />
    </StyledBuilding>
  );
}
