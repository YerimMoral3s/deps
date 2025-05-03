import styled from "styled-components";
import {
  capitalizeWords,
  Container,
  Dots,
  formatPrice,
  getStatusColor,
} from "../../components";
import { FaChevronLeft } from "react-icons/fa";
import { useDepartment, useNavs, useRouteParams } from "../../hooks";
import { useEffect } from "react";
import { GoDotFill } from "react-icons/go";

const StyledDepartment = styled.div`
  .department {
    margin-top: 0.75rem;
    .department-item {
      margin-top: 1rem;
      p {
        color: ${({ theme }) => theme.colors.textSecondary};
        opacity: 0.6;
      }
      h3 {
        margin-left: 0.75rem;
      }
    }

    .desc {
      p {
        color: ${({ theme }) => theme.colors.text};
        opacity: 1;
      }
    }
  }
`;

export default function Department() {
  const { handleGoBack, navigateTo } = useNavs();
  const { buildingId, departmentId } = useRouteParams<{
    buildingId?: string;
    departmentId?: string;
  }>();

  const departmentQuery = useDepartment(
    departmentId ? parseInt(departmentId) : undefined
  );

  // Verifica si existen los parámetros necesarios y redirige si falta alguno.
  useEffect(() => {
    if (!buildingId || !departmentId) {
      handleGoBack({ fallback: "buildings" });
    }
  }, [buildingId, departmentId, handleGoBack]);

  // Si hay error en la consulta, redirige a la lista de edificios.
  useEffect(() => {
    if (departmentQuery?.error) {
      navigateTo({ route: "buildings" });
    }
  }, [departmentQuery?.error, navigateTo]);

  const goBack = () => {
    if (buildingId) {
      handleGoBack({
        fallback: "building",
        props: { buildingId },
      });
    }
  };

  if (departmentQuery?.isLoading || !departmentQuery?.data) {
    return <Dots />;
  }

  const { data: department } = departmentQuery.data;

  return (
    <StyledDepartment className="fade-in">
      <Container>
        <div className="head">
          <button className="secondary-button" onClick={goBack}>
            <FaChevronLeft />
            Regresar
          </button>
        </div>
        <div className="department">
          <div className="department-item name">
            <p>Edificio</p>

            <h3>{department.building?.name}</h3>
          </div>
          <div className="department-item status">
            <p>Estado</p>

            <h3>
              {capitalizeWords(department.status)}
              <GoDotFill color={getStatusColor(department.status)} />
            </h3>
          </div>
          {department.base_rent_price !== null && (
            <div className="department-item base_rent_price">
              <p>Renta base mensual</p>
              <h3>$ {formatPrice(department.base_rent_price)}</h3>
            </div>
          )}
          <div className="department-item bedrooms">
            <p>Habitaciones</p>
            <h3>{department.bedrooms}</h3>
          </div>
          <div className="department-item bathrooms">
            <p>Baños</p>
            <h3>{department.bathrooms}</h3>
          </div>
          {department.description !== null ? (
            <div className="department-item desc">
              <p style={{ opacity: "0.6" }}>Descripción</p>
              <p>{department.description}</p>
            </div>
          ) : null}
        </div>
      </Container>
    </StyledDepartment>
  );
}
