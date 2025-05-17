import styled from "styled-components";
import { Payment } from "../api/Leases";

const StyledPayment = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.secondaryBackground};
  border-radius: 10px;
  p {
    margin-bottom: 1rem;
  }
`;

export default function PaymentItem({ payment }: { payment: Payment }) {
  const formattedDueDate = new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(new Date(payment.due_date));

  return (
    <StyledPayment>
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
    </StyledPayment>
  );
}
