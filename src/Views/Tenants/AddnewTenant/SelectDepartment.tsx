import styled from "styled-components";
import { useAddNewTenantStore } from "./Store";
import { useInfiniteDepartments, useNavs } from "../../../hooks";
import { useEffect, useRef, useCallback } from "react";
import EmptyState from "../../../components/EmptyState";
import {
  DepartmentByBuildingItem,
  Dots,
  isOnBuildingsPath,
} from "../../../components";
import theme_l from "../../../assets/theme";
import { Department } from "../../../api/departments";

const StyledSelectDepartment = styled.div`
  .head-department {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .status {
    display: none;
  }
`;

export default function SelectDepartment() {
  const tenantStore = useAddNewTenantStore();
  const {
    departments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteDepartments({
    buildingId: tenantStore.building?.id,
    status: "disponible",
  });
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const nav = useNavs();
  const isOnBuildings = isOnBuildingsPath();

  const openBuilding = useCallback(() => {
    if (tenantStore.building?.id) {
      nav.navigateTo({
        route: "building_admin",
        props: { buildingId: tenantStore.building.id },
      });
    }
  }, [nav, tenantStore.building?.id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "100px" }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const onClick = (dep: Department) => {
    useAddNewTenantStore.getState().setDepartment(dep);
    useAddNewTenantStore.getState().setStep("createTenant");
  };

  return (
    <StyledSelectDepartment className="fade-in">
      <div className="head-department">
        <p>Selecciona un departamento</p>
        {!isOnBuildings && (
          <button
            className="secondary-button"
            onClick={() => tenantStore.setStep("selectBuilding")}
          >
            Regresar
          </button>
        )}
      </div>

      {isLoading && <Dots />}

      {!isLoading && departments.length > 0 && (
        <>
          {departments.map((department, idx) => (
            <DepartmentByBuildingItem
              onClick={onClick}
              buttonCopy="Seleccionar"
              key={department.id}
              department={department}
              background={
                idx % 2 === 0
                  ? theme_l.colors.secondaryBackground
                  : theme_l.colors.background
              }
            />
          ))}
        </>
      )}

      {!isLoading && departments.length === 0 && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <EmptyState copy="No hay departamentos disponibles." />
          {!isOnBuildings && (
            <button style={{ alignSelf: "center" }} onClick={openBuilding}>
              Administrar Edificio
            </button>
          )}
        </div>
      )}

      <div ref={loadMoreRef}></div>
      {isFetchingNextPage && <Dots />}
    </StyledSelectDepartment>
  );
}
