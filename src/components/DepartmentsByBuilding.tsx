import React, { useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteDepartments } from "../hooks";
import styled from "styled-components";
import theme_l from "../assets/theme";
import { DepartmentByBuildingItem } from "./DepartmentByBuildingItem";

const StyledAdminBuilding = styled.div`
  margin-top: 1rem;
`;

const StyledFilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;

  button {
    padding: 0.5rem 1rem;
    border: none;
    background-color: ${({ theme }) => theme.colors.secondaryBackground};

    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;

    &:hover {
      background-color: ${({ theme }) => theme.colors.accentHover};
    }

    &.active {
      background-color: ${({ theme }) => theme.colors.accent};
      color: white;
    }
  }
`;

const StyledAdvancedFilters = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.2rem;
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

const DepartmentList: React.FC<Readonly<{ buildingId: string }>> = ({
  buildingId,
}) => {
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

  return (
    <StyledAdminBuilding>
      <StyledFilterBar>
        {["Todos", "Disponible", "Ocupado", "Mantenimiento"].map((status) => (
          <button
            key={status}
            className={selectedFilter === status ? "active" : ""}
            onClick={() => setSelectedFilter(status)}
          >
            {status}
          </button>
        ))}
      </StyledFilterBar>
      <StyledAdvancedFilters>
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

export default DepartmentList;
