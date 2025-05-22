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
import { useEffect, useMemo, useState } from "react";
import LoaderView from "../../components/LoaderView";
import { GoDotFill } from "react-icons/go";
import { useTenantLease } from "../../hooks/useTenantLease";
import { useGetTenantPayments } from "../../hooks/useGetTenantPayments";
import PaymentItem from "../../components/PaymentItem";
import { UpdateTenantModal } from "./UpdateTenantModal";

const StyledTenant = styled.div`
  h2 {
    margin-top: 0.75rem;
    color: ${({ theme }) => theme.colors.accentHover};
  }
  h1 {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 0;
  }

  .actions {
    display: flex;
    justify-content: start;
  }

  .tenant {
    margin-top: 3rem;
    gap: 2rem;
    display: flex;
    flex-direction: column;

    .tenant-items {
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
      .tenant-item {
        display: flex;
        flex-direction: column;

        p {
          color: ${({ theme }) => theme.colors.textSecondary};
          opacity: 0.6;
        }
        h3 {
          margin-left: 0.75rem;
        }
      }
    }
  }

  .lease {
    margin-top: 3rem;
    border-top: 1px solid ${({ theme }) => theme.colors.secondaryBackground};
    border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryBackground};
    .items {
      display: flex;
      flex-wrap: wrap;
      .lease-item {
        display: flex;
        flex-direction: column;
        gap: 0rem;
        margin-right: 2rem;

        p {
          color: ${({ theme }) => theme.colors.textSecondary};
          opacity: 0.6;
        }
        h3 {
          margin-left: 0.75rem;
        }
      }
    }
  }

  .department {
    margin-top: 3rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryBackground};

    .items {
      display: flex;
      flex-wrap: wrap;
      .department-item {
        display: flex;
        flex-direction: column;
        margin-right: 2rem;
        p {
          color: ${({ theme }) => theme.colors.textSecondary};
          opacity: 0.6;
        }
        h3 {
          margin-left: 0.75rem;
        }
      }
    }
  }

  .payments {
    margin-top: 3rem;
    h2 {
      margin-top: 3rem;
    }
  }
`;

export default function Tenant() {
  const { handleGoBack, navigateTo } = useNavs();
  const urlParams = useRouteParams<{ tenantId?: string }>();
  const goBack = () => handleGoBack({ fallback: "tenants" });
  const [updateTenant, setUpdate] = useState(false);

  const tenantQuery = useTenantById(
    urlParams.tenantId ? parseInt(urlParams.tenantId) : undefined
  );
  const leaseQuery = useTenantLease(
    urlParams.tenantId ? parseInt(urlParams.tenantId) : undefined
  );
  const departmentQuery = useDepartmentByTenantId(
    urlParams.tenantId ? parseInt(urlParams.tenantId) : undefined
  );
  const paymentsQuery = useGetTenantPayments(
    urlParams.tenantId ? parseInt(urlParams.tenantId) : undefined
  );

  const lease = leaseQuery?.data?.data;
  const department = departmentQuery?.data?.data;
  const payments = paymentsQuery?.data?.data;

  const { vencidos, pendientes, pagados, cancelados } = useMemo(() => {
    if (!payments)
      return { vencidos: [], pendientes: [], pagados: [], cancelados: [] };

    return {
      vencidos: payments.filter((p) => p.status === "vencido"),
      pendientes: payments.filter((p) => p.status === "pendiente"),
      pagados: payments.filter((p) => p.status === "pagado"),
      cancelados: payments.filter((p) => p.status === "cancelado"),
    };
  }, [payments]);

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
    <>
      <StyledTenant className="fade-in">
        <Container>
          <div className="head">
            <button className="secondary-button" onClick={goBack}>
              <FaChevronLeft />
              Regresar
            </button>
          </div>

          <div className="tenant">
            <div className="tenant-items">
              <div className="tenant-item name">
                <p>Nombre</p>

                <h1>
                  {capitalizeWords(
                    `${tenantQuery?.data?.data.first_name} ${tenantQuery?.data?.data.last_name}`
                  )}
                </h1>
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

            <div className="actions">
              <button onClick={() => setUpdate(true)}>
                ✏️ Editar inquilino
              </button>
            </div>
          </div>

          {leaseQuery?.isLoading ? (
            <Dots />
          ) : lease ? (
            <div className="lease">
              <h2>Contrato</h2>

              <div className="items">
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
            </div>
          ) : null}

          {departmentQuery?.isLoading ? (
            <Dots />
          ) : department ? (
            <div className="department">
              <h2>Departamento</h2>
              <div className="items">
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
            </div>
          ) : null}

          {paymentsQuery?.isLoading ? (
            <Dots />
          ) : payments && payments.length > 0 && tenantQuery?.data?.data.id ? (
            <div className="payments">
              {vencidos.length > 0 && (
                <>
                  <h2>Pagos vencidos</h2>
                  {vencidos.map((p, i) => (
                    <PaymentItem
                      payment={p}
                      key={`vencido-${p.id}-${i}`}
                      tenant_id={tenantQuery?.data?.data.id}
                    />
                  ))}
                </>
              )}

              {pendientes.length > 0 && (
                <>
                  <h2>Próximos pagos</h2>
                  {pendientes.map((p, i) => (
                    <PaymentItem
                      payment={p}
                      key={`pendiente-${p.id}-${i}`}
                      tenant_id={tenantQuery?.data?.data.id}
                    />
                  ))}
                </>
              )}

              {pagados.length > 0 && (
                <>
                  <h2>Pagos realizados</h2>
                  {pagados.map((p, i) => (
                    <PaymentItem
                      payment={p}
                      key={`pagado-${p.id}-${i}`}
                      tenant_id={tenantQuery?.data?.data.id}
                    />
                  ))}
                </>
              )}
              {cancelados.length > 0 && (
                <>
                  <h2>Pagos realizados</h2>
                  {cancelados.map((p, i) => (
                    <PaymentItem
                      payment={p}
                      key={`cancelado-${p.id}-${i}`}
                      tenant_id={tenantQuery?.data?.data.id}
                    />
                  ))}
                </>
              )}
            </div>
          ) : null}
        </Container>
      </StyledTenant>
      <UpdateTenantModal
        tenant={tenantQuery?.data?.data}
        isOpen={updateTenant}
        onClose={() => setUpdate(false)}
      />
    </>
  );
}
