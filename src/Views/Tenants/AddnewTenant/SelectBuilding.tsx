import { useBuildings } from "../../../hooks";
import { Dots } from "../../../components";
import EmptyState from "../../../components/EmptyState";
import { BuildingItem } from "../../../components/BuildingItem";
import styled from "styled-components";
import { Building } from "../../../api/Buildings";
import { useAddNewTenantStore } from "./Store";

const StyledSelectBuilding = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function SelectBuilding() {
  const { data, isLoading } = useBuildings();
  const store = useAddNewTenantStore();

  if (isLoading) {
    return <Dots />;
  }

  if (!data?.data || data.data.length === 0) {
    return <EmptyState copy="No se encontraron edificios" />;
  }

  const selectBuilding = (building: Building) => {
    store.setBuilding(building);
    store.setStep("selectDepartment");
  };

  return (
    <StyledSelectBuilding className="fade-in">
      <p>Selecciona un edificio.</p>
      {data.data.map((building) => (
        <BuildingItem
          key={`building_key_${building.id}`}
          building={building}
          onClick={selectBuilding}
        />
      ))}
    </StyledSelectBuilding>
  );
}
