import styled from "styled-components";
import { BuildingsList, Container } from "../../components";
import { useNavs } from "../../hooks";
import { Outlet } from "react-router-dom";

const StyledBuildings = styled.div`
  .head {
    text-align: right;
    margin-bottom: 1rem;
  }
`;

const Buildings = () => {
  const nav = useNavs();

  const openCrateBuilding = () =>
    nav.navigateTo({
      route: "buildings_crate",
    });

  return (
    <StyledBuildings className="fade-in">
      <Container>
        <div className="head">
          <button onClick={openCrateBuilding}>Agregar nueva casa</button>
        </div>
        <BuildingsList />
        <Outlet />
      </Container>
    </StyledBuildings>
  );
};

export default Buildings;
