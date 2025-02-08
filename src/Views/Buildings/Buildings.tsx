import styled from "styled-components";
import { BuildingsList, Container } from "../../components";
import { Outlet } from "react-router-dom";
import { useNavs } from "../../hooks";

const StyledBuildings = styled.div`
  .head {
    text-align: right;
    margin-bottom: 1rem;
  }
`;

export default function Buildings() {
  const nav = useNavs();

  const openCrateBuilding = () =>
    nav.navigateTo({
      route: "BUILDINGS_CRATE",
    });

  return (
    <StyledBuildings className="fade-in">
      <Container>
        <div className="head">
          <button onClick={openCrateBuilding}>Agregar nueva casa</button>
        </div>
        <BuildingsList />
      </Container>
      <Outlet />
    </StyledBuildings>
  );
}
