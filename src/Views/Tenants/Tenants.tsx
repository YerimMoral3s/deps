import styled from "styled-components";
import { useNavs } from "../../hooks";
import { Container } from "../../components";
import { Outlet } from "react-router-dom";

const StyledTenants = styled.div`
  .head {
    display: flex;
    justify-content: flex-end;
  }
`;

export default function Tenants() {
  const nav = useNavs();

  const navigateToAddTenant = () => {
    nav.navigateTo({ route: "tenants_add_tenant" });
  };

  return (
    <StyledTenants>
      <Container>
        <div className="head">
          <button onClick={navigateToAddTenant}>Agregar inquilino</button>
        </div>
      </Container>
      <Outlet />
    </StyledTenants>
  );
}
