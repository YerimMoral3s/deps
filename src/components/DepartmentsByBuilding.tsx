import React, { useEffect } from "react";
import { useInfiniteDepartments } from "../hooks";
import styled from "styled-components";
import theme_l from "../assets/theme";

const StyledAdminBuilding = styled.div`
  margin-top: 1rem;
`;

const StyledAdminBuildingDepartments = styled.div``;

const StyledAdminBuildingDepartment = styled.div<{
  $background: string;
}>`
  display: flex;
  padding: 1rem 0.5rem;
  background: ${(props) => props.$background};
`;

const DepartmentList: React.FC<Readonly<{ buildingId: string }>> = ({
  buildingId,
}) => {
  const { departments, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteDepartments({ buildingId });

  // Detect the end of the scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 300 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <StyledAdminBuilding>
      <StyledAdminBuildingDepartments>
        {departments.map((department, idx) => (
          <StyledAdminBuildingDepartment
            key={department.id}
            $background={
              idx % 2 === 0
                ? theme_l.colors.secondaryBackground
                : theme_l.colors.background
            }
          >
            <p>{department.id}</p>
            <p>{department.status}</p>
          </StyledAdminBuildingDepartment>
        ))}
      </StyledAdminBuildingDepartments>
      {isFetchingNextPage && <p>Loading more...</p>}
    </StyledAdminBuilding>
  );
};

export default DepartmentList;
