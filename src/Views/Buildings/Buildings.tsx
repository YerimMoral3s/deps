import styled from "styled-components";
import { Container } from "../../components";
import { Outlet, useNavigate } from "react-router-dom";

const StyledBuildings = styled.div`
  .head {
    text-align: right;
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
      </Container>
      <Outlet />
    </StyledBuildings>
  );
}
