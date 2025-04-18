import styled from "styled-components";
import { useInfiniteTenants, useNavs } from "../../hooks";
import { Container, Dots, getTenantStatusColor } from "../../components";
import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import EmptyState from "../../components/EmptyState";
import { GoDotFill } from "react-icons/go";
import { useDebounce } from "use-debounce";

const StyledTenants = styled.div`
  .tenants-head {
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    input {
      width: 20rem;
      margin-right: 1rem;
    }
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
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const { tenants, fetchNextPage, hasNextPage, isLoading, isFetching } =
    useInfiniteTenants({ search: debouncedSearch[0] });

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

  return (
    <StyledTenants className="fade-in">
      <Container>
        <div className="tenants-head">
          <input
            type="text"
            placeholder="Buscar por nombre o teléfono..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={navigateToAddTenant}>Agregar inquilino</button>
        </div>
        {!isLoading && tenants.length === 0 ? (
          <EmptyState copy="No se encontraron inquilinos" />
        ) : (
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
        )}
        {hasNextPage && <div ref={observerRef} style={{ height: 1 }} />}
        {isFetching && <Dots />}
      </Container>
      <Outlet />
    </StyledTenants>
  );
}
