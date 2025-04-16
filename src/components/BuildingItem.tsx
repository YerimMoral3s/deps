import styled from "styled-components";
import { Building } from "../api/Buildings";
import { useDebouncedCallback } from "use-debounce";
import { useNavs } from "../hooks";

const StyledBuilding = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.secondaryBackground};
  border-radius: 10px;
  p {
    margin-bottom: 1rem;
  }
`;

export const BuildingItem = (props: {
  building: Building;
  onClick?: (building: Building) => void;
}) => {
  const { navigateTo } = useNavs();

  const selectBuilding = useDebouncedCallback(() => {
    if (props.onClick) {
      props.onClick(props.building);
      return;
    }
    navigateTo({
      route: "building",
      props: { buildingId: props.building.id },
    });
  }, 100);

  return (
    <StyledBuilding>
      <h3>{props.building.name}</h3>
      <p>Total departamentos: {props.building.total_units}</p>
      <button onClick={selectBuilding}>Seleccionar</button>
    </StyledBuilding>
  );
};
