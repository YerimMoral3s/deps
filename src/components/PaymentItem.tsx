import styled from "styled-components";
import { Payment, PaymentStatus } from "../api/Leases";
import { useUpdatePaymentStatus } from "../hooks";
import { useDebouncedCallback } from "use-debounce";
import toast from "react-hot-toast";
import { ApiError } from "../api/axios";
// import { Modal } from "./Modal";

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
  // const [open, setIsOpen] = useState(false);

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
    timeZone: "UTC",
  }).format(new Date(payment.due_date));

  const markAsPaid = useDebouncedCallback(() => {
    updatePaymentStatusMutation.mutateAsync({
      payment_id: payment.id,
      status: "pagado",
    });
  }, 100);

  return (
    <StyledPayment $status={payment.status}>
      {/* <Modal isOpen={open} onClose={() => setIsOpen(!open)} className="fade-in">
        <h2>Editar</h2>
      </Modal> */}

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

        {/* <button onClick={() => setIsOpen(true)}>✏️ Editar</button> */}
      </div>
    </StyledPayment>
  );
}
