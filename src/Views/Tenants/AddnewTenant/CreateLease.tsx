import React, { useState } from "react";
import styled from "styled-components";
import { useAddNewTenantStore } from "./Store";
import { Lease } from "../../../api/Leases";
import toast from "react-hot-toast";

const StyledCreateLease = styled.div`
  .head-lease {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  form {
    .lease-item {
      margin-bottom: 1rem;
    }
    .required {
      color: red;
    }
    .actions-lease {
      display: flex;
      flex-direction: row;
      justify-content: end;
      gap: 1rem;
    }
  }
`;

export type LeaseKeys = keyof Lease;

export default function CreateLease() {
  const tenantStore = useAddNewTenantStore();
  const [lease, setLease] = useState<Partial<Lease>>(tenantStore.lease || {});

  const onChange = (
    field: LeaseKeys,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) =>
    setLease((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    tenantStore.setLease(lease);
    tenantStore.setStep("confirmation"); // Adjusted to navigate to the confirmation screen
  };

  return (
    <StyledCreateLease className="fade-in">
      <div className="head-lease">
        <p>Completa la siguiente información para la creación del contrato</p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="lease-item type">
          <label htmlFor="type">
            Tipo de contrato<span className="required">*</span>{" "}
            <span>(por seis meses o un año)</span>
          </label>
          <select
            id="type"
            required
            value={lease.type ?? ""}
            onChange={(e) => onChange("type", e)}
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            <option value="prueba">Prueba (6 meses)</option>
            <option value="regular">Regular (1 año)</option>
          </select>
        </div>

        <div className="lease-item payment_day">
          <label htmlFor="payment_day">
            Día de pago mensual<span className="required">*</span>
            <span> (ej: 1 para día 1 de cada mes)</span>
          </label>
          <input
            id="payment_day"
            type="number"
            min="1"
            max="31"
            required
            value={lease.payment_day ?? ""}
            onChange={(e) => onChange("payment_day", e)}
          />
        </div>

        <div className="lease-item monthly_rent">
          <label htmlFor="monthly_rent">
            Renta mensual<span className="required">*</span>
          </label>
          <input
            id="monthly_rent"
            type="number"
            step="0.01"
            required
            value={lease.monthly_rent ?? ""}
            onChange={(e) => onChange("monthly_rent", e)}
          />
        </div>

        <div className="lease-item upfront_payment">
          <label htmlFor="upfront_payment">
            Anticipo<span className="required">*</span>
          </label>
          <input
            id="upfront_payment"
            type="number"
            step="0.01"
            required
            value={lease.upfront_payment ?? ""}
            onChange={(e) => onChange("upfront_payment", e)}
          />
        </div>

        <div className="lease-item start_date">
          <label htmlFor="start_date">
            ¿Fecha de inicio del contrato?{" "}
            <span>
              (opcional: si no eliges una fecha, se usará la fecha de hoy)
            </span>
          </label>
          <input
            id="start_date"
            type="date"
            value={lease.start_date ?? ""}
            onChange={(e) => onChange("start_date", e)}
          />
        </div>
        {/* <div className="lease-item end_date">
          <label htmlFor="end_date">
            ¿Fecha de termino del contrato?{" "}
            <span>
              (opcional: si no eliges una fecha, se calculará automáticamente.
              Úsalo solo para inquilinos que ya tienen un contrato existente)
            </span>
          </label>
          <input
            id="end_date"
            type="date"
            value={lease.end_date ?? ""}
            onChange={(e) => onChange("end_date", e)}
          />
        </div> */}

        <p style={{ marginBottom: "1rem" }}>
          los campos con "*" son obligatorios
        </p>
        <div className="actions-lease">
          <button type="submit">Guardar</button>
          <button
            className="secondary-button"
            onClick={() => tenantStore.setStep("createTenant")}
          >
            Regresar
          </button>
        </div>
      </form>
    </StyledCreateLease>
  );
}
