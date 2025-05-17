import styled from "styled-components";
import { Payment, PaymentStatus } from "../api/Leases";
import { useUpdatePaymentStatus } from "../hooks";
import { useDebouncedCallback } from "use-debounce";
import toast from "react-hot-toast";
import { ApiError } from "../api/axios";

const getTenantStatusColor = (status: PaymentStatus) => {
  switch (status) {
    case "pagado":
      return "green";
    case "pendiente":
      return "gray";
    case "vencido":
      return "red";
    default:
      return "gray";
  }
};

const StyledPayment = styled.div<{ $status: PaymentStatus }>`
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid ${(props) => getTenantStatusColor(props.$status)};
  border-radius: 10px;
  p {
    margin-bottom: 1rem;
  }

  .payments_actions {
    display: flex;
    justify-content: end;
    gap: 1rem;
  }
`;

export default function PaymentItem({
  payment,
  tenant_id,
}: {
  payment: Payment;
  tenant_id: number;
}) {
  const onSuccess = () => {
    toast.success("Pago registrado correctamente");
  };

  const onLoginError = (error: ApiError) => toast.error(error.message);

  const updatePaymentStatusMutation = useUpdatePaymentStatus(tenant_id, {
    onSuccess: onSuccess, // ✅ Redirect after success
    onError: onLoginError,
  });

  const formattedDueDate = new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(new Date(payment.due_date));

  const markAsPaid = useDebouncedCallback(() => {
    updatePaymentStatusMutation.mutateAsync({
      payment_id: payment.id,
      status: "pagado",
    });
  }, 100);

  return (
    <StyledPayment $status={payment.status}>
      <h3>{payment.type === "deposit" ? "Depósito" : "Pago de renta"}</h3>
      <p>{formattedDueDate}</p>
      <p>
        <strong>Monto: </strong>
        {parseFloat(payment.amount).toLocaleString("es-MX", {
          style: "currency",
          currency: "MXN",
        })}
      </p>
      <p>
        <strong>Método de pago:</strong>{" "}
        {payment.payment_method ?? "No especificado"}
      </p>
      <p>
        <strong>Estado:</strong> {payment.status}
      </p>
      <div className="payments_actions">
        {(payment.status === "pendiente" || payment.status === "vencido") && (
          <button onClick={markAsPaid}>✅ Marcar como pagado</button>
        )}

        <button onClick={() => alert("Abrir modal")}>✏️ Editar</button>
      </div>
    </StyledPayment>
  );
}
