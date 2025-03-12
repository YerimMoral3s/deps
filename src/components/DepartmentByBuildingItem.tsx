import React from "react";
import styled from "styled-components";
import { Department } from "../api/departments";
import { GoDotFill } from "react-icons/go";
import { useNavs } from "../hooks";
import { getStatusColor } from "./helpers";

type Props = { background: string; department: Department };

const StyledAdminBuildingDepartment = styled.div<{ $background: string }>`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: ${(props) => props.$background};
  border-bottom: 1px solid #ccc;
  gap: 1rem;

  .beds,
  .baths,
  .more {
    flex: 1;
  }

  .item {
    text-align: left;

    .status {
      .status-icon {
        font-size: 1.2rem;
      }
    }

    @media (max-width: 576px) {
      p,
      svg,
      a {
        font-size: 0.8rem;
      }
    }
  }
`;

const getBathCopy = (baths: number) => (baths > 1 ? "Baños" : "Baño");
const getBedsCopy = (baths: number) =>
  baths > 1 ? "Habitaciones" : "Habitación";

export const DepartmentByBuildingItem: React.FC<Props> = ({
  background,
  department,
}) => {
  const nav = useNavs();

  const navigateToDepartment = () => {
    nav.navigateTo({
      route: "department",
      props: {
        buildingId: department.building_id,
        departmentId: department.id,
      },
    });
  };

  return (
    <StyledAdminBuildingDepartment $background={background}>
      <div className="item status">
        <GoDotFill
          className="status-icon"
          color={getStatusColor(department.status)}
        />
      </div>
      <div className="item beds">
        <p>
          {department.bedrooms} {getBedsCopy(department.bedrooms)}
        </p>
      </div>
      <div className="item baths">
        <p>
          {department.bathrooms} {getBathCopy(department.bathrooms)}
        </p>
      </div>
      {/* <div className="item more">
        <p>${formatPrice(department.department_type.base_rent_price ?? "")}</p>
      </div> */}
      <div className="item more">
        <button onClick={navigateToDepartment}>ver mas</button>
      </div>
    </StyledAdminBuildingDepartment>
  );
};
