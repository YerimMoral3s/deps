import styled from "styled-components";
import { Building } from "../api/Buildings";
import { useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

const StyledBuilding = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.secondaryBackground};
  border-radius: 10px;
  p {
    margin-bottom: 1rem;
  }
`;

export const BuildingItem = ({ building }: { building: Building }) => {
  const nav = useNavigate();

  const openBuilding = useDebouncedCallback(() => nav("/buildings/crate"), 500);

  return (
    <StyledBuilding>
      <h2>{building.name}</h2>
      <p>Total departamentos: {building.total_units}</p>
      <button onClick={openBuilding}>Ver mas</button>
    </StyledBuilding>
  );
};
