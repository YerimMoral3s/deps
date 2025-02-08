import styled from "styled-components";
import { BuildingsList, Container } from "../../components";
import { Outlet, useNavigate } from "react-router-dom";

const StyledBuildings = styled.div`
  .head {
    text-align: right;
    margin-bottom: 1rem;
  }
`;

export default function Buildings() {
  const nav = useNavigate();

  const openCrateBuilding = () => nav("/buildings/crate");

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
