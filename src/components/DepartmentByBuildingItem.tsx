import React from "react";
import styled from "styled-components";
import { Department } from "../api/departments";
import { GoDotFill } from "react-icons/go";
import { useNavs } from "../hooks";
import { formatPrice, getStatusColor } from "./helpers";

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
  .more,
  .price {
    flex: 1;
  }

  .item {
    text-align: left;

    @media (max-width: 768px) {
      p,
      svg,
      button {
        font-size: 0.8rem;
      }
    }

    @media (max-width: 576px) {
      p,
      svg,
      button {
        font-size: 0.7rem;
      }
      button {
        padding: 5px 10px;
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
      <div className="item price">
        <p>${formatPrice(department.base_rent_price ?? "00000")}</p>
      </div>
      <div className="item more">
        <button onClick={navigateToDepartment}>ver mas</button>
      </div>
    </StyledAdminBuildingDepartment>
  );
};
