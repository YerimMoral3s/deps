import styled from "styled-components";
import {
  capitalizeWords,
  Container,
  Dots,
  formatDate,
  formatPrice,
  getTenantStatusColor,
} from "../../components";
import { FaChevronLeft } from "react-icons/fa";
import {
  useDepartmentByTenantId,
  useNavs,
  useRouteParams,
  useTenantById,
} from "../../hooks";
import { useEffect } from "react";
import LoaderView from "../../components/LoaderView";
import { GoDotFill } from "react-icons/go";
import { useTenantLease } from "../../hooks/useTenantLease";

const StyledTenant = styled.div`
  .tenant,
  .lease,
  .department {
    margin-top: 0.75rem;
    .tenant-item,
    .lease-item,
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

export default function Tenant() {
  const { handleGoBack, navigateTo } = useNavs();
  const urlParams = useRouteParams<{ tenantId?: string }>();
  const goBack = () => handleGoBack({ fallback: "tenants" });
  const tenantQuery = useTenantById(
    urlParams.tenantId ? parseInt(urlParams.tenantId) : undefined
  );
  const leaseQuery = useTenantLease(
    urlParams.tenantId ? parseInt(urlParams.tenantId) : undefined
  );
  const departmentQuery = useDepartmentByTenantId(
    urlParams.tenantId ? parseInt(urlParams.tenantId) : undefined
  );

  const lease = leaseQuery?.data?.data;
  const department = departmentQuery?.data?.data;

  useEffect(() => {
    if (!urlParams?.tenantId) {
      navigateTo({ route: "tenants" });
    }
  }, [urlParams?.tenantId]);

  if (tenantQuery?.error) {
    navigateTo({ route: "tenants" });
  }

  if (tenantQuery?.isLoading) {
    return <LoaderView />;
  }

  function getRemainingMonthsFromToday(endDateStr: string): number {
    const today = new Date();
    const endDate = new Date(endDateStr);

    today.setDate(1);
    endDate.setDate(1);

    const years = endDate.getFullYear() - today.getFullYear();
    const months = endDate.getMonth() - today.getMonth();

    const totalMonths = years * 12 + months;

    return totalMonths >= 0 ? totalMonths : 0;
  }

  return (
    <StyledTenant className="fade-in">
      <Container>
        <div className="head">
          <button className="secondary-button" onClick={goBack}>
            <FaChevronLeft />
            Regresar
          </button>
        </div>

        <div className="tenant">
          <div className="tenant-item name">
            <p>Nombre</p>

            <h3>
              {capitalizeWords(
                `${tenantQuery?.data?.data.first_name} ${tenantQuery?.data?.data.last_name}`
              )}
            </h3>
          </div>
          <div className="tenant-item tel">
            <p>Teléfono</p>

            <h3>
              <a href={`tel:${tenantQuery?.data?.data.phone}`}>
                {tenantQuery?.data?.data.phone}
              </a>
              {/* <GoDotFill color={getStatusColor(tenant.status)} /> */}
            </h3>
          </div>

          {tenantQuery?.data?.data.email && lease ? (
            <div className="tenant-item email">
              <p>Correo electrónico</p>

              <h3>{tenantQuery?.data?.data.email}</h3>
            </div>
          ) : null}
        </div>

        {leaseQuery?.isLoading ? (
          <Dots />
        ) : lease ? (
          <div className="lease">
            <div className="lease-item status">
              <p>Estatus del contrato</p>
              <h3>
                {lease?.status}

                <GoDotFill
                  className="status-icon"
                  color={getTenantStatusColor(lease.status)}
                />
              </h3>
            </div>
            <div className="lease-item type">
              <p>Tipo de contrato</p>
              <h3>{lease?.type}</h3>
            </div>

            <div className="lease-item payment-day">
              <p>Día de cobro</p>
              <h3>{lease?.payment_day}</h3>
            </div>

            {lease?.monthly_rent && (
              <div className="lease-item monthly-rent">
                <p>Renta mensual</p>
                <h3>${formatPrice(lease.monthly_rent)}</h3>
              </div>
            )}

            {lease?.upfront_payment && (
              <div className="lease-item upfront-payment">
                <p>Anticipo</p>
                <h3>${formatPrice(lease.upfront_payment)}</h3>
              </div>
            )}

            {lease?.start_date && (
              <div className="lease-item start-date">
                <p>Fecha de inicio</p>
                <h3>{formatDate(lease.start_date)}</h3>
              </div>
            )}

            {lease?.end_date && (
              <div className="lease-item end-date">
                <p>Fecha de finalización</p>
                <h3>{formatDate(lease.end_date)}</h3>
              </div>
            )}

            {lease?.start_date && lease?.end_date && (
              <div className="lease-item remaining-months">
                <p>Meses restantes</p>
                <h3>{getRemainingMonthsFromToday(lease.end_date)}</h3>
              </div>
            )}
          </div>
        ) : null}
        {departmentQuery?.isLoading ? (
          <Dots />
        ) : department ? (
          <div className="department">
            <div className="department-item building">
              <p>Edificio</p>
              <h3>{department?.building?.name}</h3>
            </div>
            <div className="department-item bathrooms">
              <p>Numero de Baños</p>
              <h3>{department?.bathrooms}</h3>
            </div>
            <div className="department-item bedrooms">
              <p>Numero de cuartos</p>
              <h3>{department?.bedrooms}</h3>
            </div>
          </div>
        ) : null}
      </Container>
    </StyledTenant>
  );
}
