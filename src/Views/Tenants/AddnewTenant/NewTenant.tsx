import React, { useState } from "react";
import styled from "styled-components";
import { useAddNewTenantStore } from "./Store";
import { Tenant } from "../../../api/Tenants";

const StyledNewTenant = styled.div`
  .head-tenant {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  form {
    .tenant-item {
      margin-bottom: 1rem;
    }
    .required {
      color: red;
    }
    .actions-tenant {
      display: flex;
      flex-direction: row;
      justify-content: end;
      gap: 1rem;
    }
  }
`;

export type TenantKeys = keyof Tenant;

export default function NewTenant() {
  const tenantStore = useAddNewTenantStore();
  const [tenant, setTenant] = useState<Partial<Tenant>>(
    tenantStore.tenant || {}
  );

  const onChange = (
    field: TenantKeys,
    event: React.ChangeEvent<HTMLInputElement>
  ) =>
    setTenant((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    tenantStore.setTenant(tenant);
    tenantStore.setStep("createLease");
  };

  return (
    <StyledNewTenant className="fade-in">
      <div className="head-tenant">
        <p>Completa la siguiente información del inquilino</p>
      </div>
      <form action="submit" onSubmit={onSubmit}>
        <div className="tenant-item name">
          <label htmlFor="name">
            Nombre<span className="required">*</span>
            <span>(nombre completo del inquilino)</span>
          </label>

          <input
            value={tenant.first_name}
            id="name"
            type="text"
            required
            onChange={(e) => onChange("first_name", e)}
          />
        </div>
        <div className="tenant-item lastName">
          <label htmlFor="lastName">
            Apellido<span className="required">*</span>
            <span>(apellido completo del inquilino)</span>
          </label>

          <input
            value={tenant.last_name}
            id="lastName"
            type="text"
            required
            onChange={(e) => onChange("last_name", e)}
          />
        </div>
        <div className="tenant-item phone">
          <label htmlFor="phone">
            Teléfono<span className="required">*</span>
            <span>(teléfono de contacto del inquilino)</span>
          </label>

          <input
            value={tenant.phone}
            id="phone"
            type="tel"
            required
            onChange={(e) => onChange("phone", e)}
          />
        </div>
        <div className="tenant-item email">
          <label htmlFor="email">
            Correo electrónico
            <span>
              (opcional, correo electrónico de contacto del inquilino)
            </span>
          </label>

          <input
            value={tenant.email ?? ""}
            id="email"
            type="email"
            onChange={(e) => onChange("email", e)}
          />
        </div>
        <p style={{ marginBottom: "1rem" }}>
          los campos con "*" son obligatorios
        </p>
        <div className="actions-tenant">
          <button type="submit">Guardar</button>
          <button
            className="secondary-button"
            onClick={() => tenantStore.setStep("selectDepartment")}
          >
            Regresar
          </button>
        </div>
      </form>
    </StyledNewTenant>
  );
}
