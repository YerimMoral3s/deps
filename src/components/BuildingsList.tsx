import styled from "styled-components";
import { useBuildings } from "../hooks";
import { BuildingItem } from "./BuildingItem";

const StyledBuildingsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const BuildingsList = () => {
  const { data, isLoading } = useBuildings();

  if (isLoading) {
    return <h1>loadings...</h1>;
  }

  if (!data?.data) return null;

  return (
    <StyledBuildingsList>
      {data.data.map((building) => (
        <BuildingItem building={building} />
      ))}
    </StyledBuildingsList>
  );
};
