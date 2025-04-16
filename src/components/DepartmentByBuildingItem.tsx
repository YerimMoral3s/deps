import React from "react";
import styled from "styled-components";
import { Department } from "../api/departments";
import { GoDotFill } from "react-icons/go";
import { useNavs } from "../hooks";
import { formatPrice, getStatusColor } from "./helpers";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  background: string;
  department: Department;
  onClick?: (dep: Department) => void;
  buttonCopy?: string;
};

const StyledAdminBuildingDepartment = styled.div<{ $background: string }>`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: ${(props) => props.$background};
  border-bottom: 1px solid #ccc;
  gap: 1rem;

  .baths,
  .more,
  .beds,
  .price {
    flex: 25%;
  }

  .beds {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 8rem;
  }

  @media (max-width: 576px) {
    padding: 1rem 0.5rem;

    gap: 0.5rem;
    .item {
      text-align: left;

      p,
      svg,
      button {
        font-size: 0.6rem;
      }
      button {
        padding: 5px 10px;
        font-size: 0.6rem;
      }
    }
  }
`;

const getBathCopy = (baths: number) => (baths > 1 ? "Baños" : "Baño");
const getBedsCopy = (baths: number) =>
  baths > 1 ? "Habitaciones" : "Habitación";

export const DepartmentByBuildingItem: React.FC<Props> = (props) => {
  const nav = useNavs();

  const navigateToDepartment = () => {
    nav.navigateTo({
      route: "department",
      props: {
        buildingId: props.department.building_id,
        departmentId: props.department.id,
      },
    });
  };

  const handleClick = useDebouncedCallback(() => {
    if (props.onClick) {
      props.onClick(props.department);
      return;
    }

    navigateToDepartment();
  }, 100);

  return (
    <StyledAdminBuildingDepartment $background={props.background}>
      <div className="item status">
        <GoDotFill
          className="status-icon"
          color={getStatusColor(props.department.status)}
        />
      </div>
      <div className="item beds">
        <p>
          {props.department.bedrooms} {getBedsCopy(props.department.bedrooms)}
        </p>
      </div>
      <div className="item baths">
        <p>
          {props.department.bathrooms} {getBathCopy(props.department.bathrooms)}
        </p>
      </div>
      <div className="item price">
        <p>${formatPrice(props.department.base_rent_price ?? "00000")}</p>
      </div>
      <div className="item more">
        <button onClick={handleClick}>{props.buttonCopy ?? "ver mas"}</button>
      </div>
    </StyledAdminBuildingDepartment>
  );
};
