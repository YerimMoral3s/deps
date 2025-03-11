import React from "react";
import styled from "styled-components";
import { Department } from "../api/departments";
import { GoDotFill } from "react-icons/go";

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

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "disponible":
      return "green";
    case "ocupado":
      return "red";
    case "mantenimiento":
      return "orange";
    default:
      return "gray";
  }
};

const getBathCopy = (baths: number) => (baths > 1 ? "Baños" : "Baño");
const getBedsCopy = (baths: number) =>
  baths > 1 ? "Habitaciones" : "Habitación";

export const DepartmentByBuildingItem: React.FC<Props> = ({
  background,
  department,
}) => {
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
          {department.department_type.bedrooms}
          {getBedsCopy(department.department_type.bedrooms)}
        </p>
      </div>
      <div className="item baths">
        <p>
          {department.department_type.bathrooms}
          {getBathCopy(department.department_type.bathrooms)}
        </p>
      </div>
      {/* <div className="item more">
        <p>${formatPrice(department.department_type.base_rent_price ?? "")}</p>
      </div> */}
      <div className="item more">
        <a href="#">Ver más</a>
      </div>
    </StyledAdminBuildingDepartment>
  );
};

// function formatPrice(price: string) {
//   let formattedPrice = Number(price).toLocaleString("en-US", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });
//   return `${formattedPrice}`;
// }
