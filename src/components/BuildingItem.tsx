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

export const BuildingItem = ({ building }: { building: Building }) => {
  const { navigateTo } = useNavs();

  const openBuilding = useDebouncedCallback(
    () =>
      navigateTo({
        route: "BUILDING",
        params: {
          id: building.id,
          replace: true,
        },
      }),
    100
  );

  return (
    <StyledBuilding>
      <h2>{building.name}</h2>
      <p>Total departamentos: {building.total_units}</p>
      <button onClick={openBuilding}>Ver mas</button>
    </StyledBuilding>
  );
};
