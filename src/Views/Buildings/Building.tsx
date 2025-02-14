import { useNavs } from "../../hooks";
import styled from "styled-components";
import { FaChevronLeft } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { Container } from "../../components";

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
  const goBack = () => handleGoBack({ fallback: "buildings" });
  const navigateAddNewTenant = () =>
    navigateTo({ route: "building_add_tenant", props: { buildingId: 1 } });
  return (
    <StyledBuilding className="fade-in">
      <Container>
        <div className="head">
          <button className="secondary-button" onClick={goBack}>
            <FaChevronLeft />
            Regrear
          </button>
          <button onClick={navigateAddNewTenant}>
            Agregar nuevo inquilino
          </button>
        </div>
      </Container>
      <Outlet />
    </StyledBuilding>
  );
}
