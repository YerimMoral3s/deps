import styled from "styled-components";
import { useAddNewTenantStore } from "./Store";
import { formatPrice, Modal } from "../../../components";
import { useCreateTenantWithLease, useTabLoader } from "../../../hooks";
import toast from "react-hot-toast";

import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";

const StyledConfirmation = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.accentHover};
  }
  section {
    margin-bottom: 2rem;
    h3 {
      margin-bottom: 0px;
      color: ${({ theme }) => theme.colors.textSecondary};
    }
    p {
      color: ${({ theme }) => theme.colors.text};
      opacity: 0.7;
    }
  }

  .confirmation-actions {
    display: flex;
    flex-direction: row;
    justify-content: end;
    gap: 1rem;
  }
`;

export default function Confirmation() {
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  const loader = useTabLoader();
  const { tenant, lease, building, setStep, department, setTenant } =
    useAddNewTenantStore();
  const createTenantWithLease = useCreateTenantWithLease({
    onError: (error) => toast.error(error.message),
    onSuccess: () => toast.success("El inquilino ha sido creado"),
  });

  const endDate = getContractEndDate({
    start_date: lease?.start_date,
    typeOfContract: lease?.type,
  });

  const confirm = useDebouncedCallback(async () => {
    loader.start();

    if (!tenant || !department || !lease) {
      toast.error(
        "Faltan datos necesarios para crear el inquilino y contrato."
      );
      loader.complete();
      return;
    }

    try {
      const res = await createTenantWithLease.mutateAsync({
        // # tenant info
        first_name: tenant.first_name,
        last_name: tenant.last_name,
        phone: tenant.phone,
        email: tenant.email,
        // # department info
        department_id: department.id,
        // lease info
        type: lease.type,
        start_date: lease.start_date ?? new Date().toISOString().split("T")[0],
        end_date: endDate.toISOString().split("T")[0],
        payment_day: lease.payment_day,
        monthly_rent: lease.monthly_rent,
        upfront_payment: lease.upfront_payment,
      });

      setTenant({ ...tenant, id: res.data.tenant_id });

      setStep("success");
    } catch (error) {
      toast.error("Hubo un problema al guardar los datos");
    } finally {
      loader.complete();
    }
  }, 500);

  return (
    <StyledConfirmation className="confirmation fade-in">
      <h3>Confirmación de datos</h3>
      <ReConfirmationModal
        isOpen={confirmModalIsOpen}
        onClose={() => setConfirmModalIsOpen(!confirmModalIsOpen)}
        onConfirm={confirm}
      />
      <section>
        <h3>Edificio</h3>
        <p>
          <strong>Nombre:</strong> {building?.name}
        </p>
      </section>
      <section>
        <h3>Departamento</h3>
        <p>
          <strong>Cuartos:</strong> {department?.bedrooms}
        </p>
        <p>
          <strong>Baños:</strong> {department?.bathrooms}
        </p>
      </section>

      <section>
        <h3>Datos del Inquilino</h3>
        <p>
          <strong>Nombre:</strong> {tenant?.first_name} {tenant?.last_name}
        </p>
        <p>
          <strong>Teléfono:</strong> {tenant?.phone}
        </p>

        <p>
          <strong>Email:</strong> {tenant?.email || "No proporcionado"}
        </p>
      </section>

      <section>
        <h3>Detalles del Contrato</h3>
        <p>
          <strong>Tipo de contrato:</strong>{" "}
          {lease?.type === "prueba" ? "prueba, 6 meses" : "regular, 1 año"}
        </p>
        <p>
          <strong>Fecha de inicio:</strong> {lease?.start_date ?? "Hoy"}
        </p>
        <p>
          <strong>Fecha de término:</strong>{" "}
          {endDate.toISOString().split("T")[0]}
        </p>

        <p>
          <strong>Total de rentas faltantes:</strong>{" "}
          {getRemainingPayments({
            start_date: lease?.start_date,
            end_date: lease?.end_date,
            typeOfContract: lease?.type,
          })}
        </p>
        <p>
          <strong>Día de pago:</strong> {lease?.payment_day}
        </p>
        <p>
          <strong>Renta mensual:</strong> $
          {lease?.monthly_rent
            ? formatPrice(lease?.monthly_rent)
            : "No proporcionado"}
        </p>
        <p>
          <strong>Anticipo:</strong> $
          {lease?.upfront_payment
            ? formatPrice(lease?.upfront_payment)
            : "No proporcionado"}
        </p>
      </section>

      <div className="confirmation-actions">
        <button type="submit" onClick={() => setConfirmModalIsOpen(true)}>
          Confirmar
        </button>
        <button
          type="button"
          onClick={() => setStep("createLease")}
          className="secondary-button"
        >
          Regresar
        </button>
      </div>
    </StyledConfirmation>
  );
}

export function getRemainingPayments({
  start_date,
  end_date,
  typeOfContract,
}: {
  start_date?: string | null;
  end_date?: string | null;
  typeOfContract?: "prueba" | "regular";
}): number {
  const today = new Date();
  const start = start_date ? new Date(start_date) : today;

  const calculatedEnd = new Date(
    start.getFullYear(),
    start.getMonth() + (typeOfContract === "prueba" ? 6 : 12),
    start.getDate()
  );
  const end = end_date ? new Date(end_date) : calculatedEnd;

  if (end <= today) return 0;

  const nextMonth =
    today.getDate() > 1
      ? new Date(today.getFullYear(), today.getMonth() + 1, 1)
      : new Date(today.getFullYear(), today.getMonth(), 1);

  const effectiveStart = nextMonth < start ? start : nextMonth;

  const startYear = effectiveStart.getFullYear();
  const startMonth = effectiveStart.getMonth();
  const endYear = end.getFullYear();
  const endMonth = end.getMonth();

  const remainingMonths =
    (endYear - startYear) * 12 + (endMonth - startMonth) + 1;

  return remainingMonths > 0 ? remainingMonths : 0;
}

export function getContractEndDate({
  start_date,
  typeOfContract,
}: {
  start_date?: string | null;
  typeOfContract?: "prueba" | "regular";
}): Date {
  const start = start_date ? new Date(start_date) : new Date();
  const durationMonths = typeOfContract === "prueba" ? 6 : 12;
  return new Date(
    start.getFullYear(),
    start.getMonth() + durationMonths,
    start.getDate()
  );
}

const StyledReConfirmationModal = styled.div`
  .body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    h2 {
      margin-bottom: 0;
    }
    .buttons {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }
  }
`;

const ReConfirmationModal = (props: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  return (
    <StyledReConfirmationModal>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <div className="body">
          <h2>¿Estás segura/o de continuar?</h2>
          <p>
            Al guardar la información se creará el inquilino, se generarán los
            pagos pendientes con sus fechas correspondientes y el inmueble
            quedará marcado como ocupado.
          </p>
          <p>
            Si necesitas revertir esta acción, puedes eliminar al inquilino
            desde la administración.
          </p>
          <p>
            También podrás modificar la información más adelante si es
            necesario.
          </p>
          <div className="buttons">
            <button onClick={props.onConfirm}>Guardar</button>
            <button className="secondary-button" onClick={props.onClose}>
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </StyledReConfirmationModal>
  );
};
