import styled from "styled-components";
import { useInfiniteTenants, useNavs } from "../../hooks";
import { Container, Dots, getTenantStatusColor } from "../../components";
import { Outlet } from "react-router-dom";

import { useEffect, useRef } from "react";
import EmptyState from "../../components/EmptyState";
import { GoDotFill } from "react-icons/go";

const StyledTenants = styled.div`
  .head {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .tenant-card {
    padding: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.secondaryBackground};
    border-radius: 0.5rem;
    .name {
      font-size: 1.2rem;
      margin-bottom: 0;
    }
  }
`;

export default function Tenants() {
  const nav = useNavs();
  const { tenants, fetchNextPage, hasNextPage, isLoading } = useInfiniteTenants(
    {}
  );
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, fetchNextPage]);

  const navigateToAddTenant = () => {
    nav.navigateTo({ route: "tenants_add_tenant" });
  };

  const navigateToTenant = (tenantId: number) => {
    nav.navigateTo({ route: "tenant", props: { tenantId } });
  };

  if (!tenants || tenants.length === 0) {
    return <EmptyState copy="No se encontraron inquilinos" />;
  }

  return (
    <StyledTenants className="fade-in">
      <Container>
        <div className="head">
          <button onClick={navigateToAddTenant}>Agregar inquilino</button>
        </div>
        <div className="list">
          {tenants.map((tenant) => (
            <div key={tenant.id} className="tenant-card">
              <h3 className="name">
                <GoDotFill
                  className="status-icon"
                  color={getTenantStatusColor(tenant.status)}
                />
                {tenant.first_name} {tenant.last_name}
              </h3>
              <p>
                Tel: <a href={`tel:${tenant.phone}`}>{tenant.phone}</a>
              </p>

              <p>Edificio: {tenant.building.name}</p>
              <button
                onClick={() => navigateToTenant(tenant.id)}
                style={{ marginTop: ".5rem" }}
              >
                Ver más
              </button>
            </div>
          ))}
        </div>
        {hasNextPage && <div ref={observerRef} style={{ height: 1 }} />}
        {isLoading && <Dots />}
      </Container>
      <Outlet />
    </StyledTenants>
  );
}
