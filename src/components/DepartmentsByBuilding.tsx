import React, { useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteDepartments } from "../hooks";
import styled from "styled-components";
import theme_l from "../assets/theme";
import { DepartmentByBuildingItem } from "./DepartmentByBuildingItem";
import EmptyState from "./EmptyState";

const StyledAdminBuilding = styled.div`
  margin-top: 1rem;
  h2 {
    margin-top: 0.75rem;
  }
`;

const StyledAdvancedFilters = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
  flex-wrap: wrap;

  .item {
    width: 100%;
    max-width: 15rem;
    label {
      font-weight: bold;
    }

    select {
      padding: 0.5rem;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
  }
`;

export const DepartmentsByBuilding: React.FC<
  Readonly<{ buildingId: string }>
> = ({ buildingId }) => {
  const {
    departments = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteDepartments({ buildingId });

  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [selectedBedrooms, setSelectedBedrooms] = useState<number | null>(null);
  const [selectedBathrooms, setSelectedBathrooms] = useState<number | null>(
    null
  );

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "300px" }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const filteredDepartments = useMemo(
    () =>
      departments.filter((department) => {
        const matchesStatus =
          selectedFilter === "Todos" ||
          department.status === selectedFilter.toLowerCase();
        const matchesBedrooms =
          selectedBedrooms === null ||
          department.department_type.bedrooms === selectedBedrooms;
        const matchesBathrooms =
          selectedBathrooms === null ||
          department.department_type.bathrooms === selectedBathrooms;

        return matchesStatus && matchesBedrooms && matchesBathrooms;
      }),
    [selectedFilter, selectedBedrooms, selectedBathrooms, departments]
  );

  if (departments.length === 0) {
    return <EmptyState copy="No se encontraron departamentos" />;
  }

  return (
    <StyledAdminBuilding>
      <h2>Lista de departamentos</h2>
      <StyledAdvancedFilters>
        <div className="item">
          <label htmlFor="status-filter">Estado:</label>
          <select
            id="status-filter"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="Todos">Todos</option>
            <option value="Disponible">Disponible</option>
            <option value="Ocupado">Ocupado</option>
            <option value="Mantenimiento">Mantenimiento</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="selectedBedrooms">Habitaciones:</label>
          <select
            id="selectedBedrooms"
            value={selectedBedrooms ?? ""}
            onChange={(e) =>
              setSelectedBedrooms(
                e.target.value ? Number(e.target.value) : null
              )
            }
          >
            <option value="">Todos</option>
            {[1, 2, 3].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div className="item">
          <label htmlFor="selectedBathrooms">Baños:</label>
          <select
            id="selectedBathrooms"
            value={selectedBathrooms ?? ""}
            onChange={(e) =>
              setSelectedBathrooms(
                e.target.value ? Number(e.target.value) : null
              )
            }
          >
            <option value="">Todos</option>
            {[1, 2].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </StyledAdvancedFilters>

      {filteredDepartments.length > 0 ? (
        filteredDepartments.map((department, idx) => (
          <DepartmentByBuildingItem
            key={department.id}
            department={department}
            background={
              idx % 2 === 0
                ? theme_l.colors.secondaryBackground
                : theme_l.colors.background
            }
          />
        ))
      ) : (
        <p>No hay departamentos que coincidan con los filtros seleccionados.</p>
      )}

      {isFetchingNextPage && <p>Loading more...</p>}

      <div ref={loadMoreRef}></div>
    </StyledAdminBuilding>
  );
};
