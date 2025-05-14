import styled from "styled-components";
import { useBuildings } from "../hooks";
import { BuildingItem } from "./BuildingItem";
import EmptyState from "./EmptyState";
import { Dots } from "./Dots";

const StyledBuildingsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const BuildingsList = () => {
  const { data, isLoading } = useBuildings();

  if (isLoading) {
    return <Dots />;
  }

  if (!data?.data) {
    return <EmptyState copy="No se encontraron edificios" />;
  }
  if (data?.data.length === 0) {
    return <EmptyState copy="No se encontraron edificios" />;
  }

  return (
    <StyledBuildingsList>
      {data?.data?.map((building) => (
        <BuildingItem key={`building_key_${building.id}`} building={building} />
      ))}
    </StyledBuildingsList>
  );
};
