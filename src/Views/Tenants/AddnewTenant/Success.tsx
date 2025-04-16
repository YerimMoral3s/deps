import { SuccessVector } from "../../../components";
import styled from "styled-components";
import { useNavs } from "../../../hooks";
import { useAddNewTenantStore } from "./Store";

const StyledSuccess = styled.div`
  svg {
    width: 15rem;
  }
  p,
  h2,
  svg,
  button {
    margin: 1rem 0;
  }
`;

export default function Success() {
  const navs = useNavs();
  const { tenant } = useAddNewTenantStore();

  if (!tenant) {
    return null;
  }

  return (
    <StyledSuccess style={{ textAlign: "center" }}>
      {/* <CheckCircleIcon boxSize="60px" color="green.400" /> */}

      <h2 style={{ fontSize: "1.8rem" }}>Inquilino registrado correctamente</h2>
      <SuccessVector />
      <p style={{ color: "#555", marginTop: "0.5rem" }}>
        El contrato y los pagos fueron creados con éxito.
      </p>
      <button
        onClick={() =>
          tenant.id
            ? navs.navigateTo({
                route: "tenant",
                props: { tenantId: tenant.id },
              })
            : null
        }
      >
        Ver inquilino
      </button>
    </StyledSuccess>
  );
}
