import styled from "styled-components";
import { BuildingsList } from "../../components";
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
      route: "BUILDINGS_CRATE",
    });

  return (
    <StyledBuildings className="fade-in">
      <div className="head">
        <button onClick={openCrateBuilding}>Agregar nueva casa</button>
      </div>
      <BuildingsList />
      <Outlet />
    </StyledBuildings>
  );
};

export default Buildings;
