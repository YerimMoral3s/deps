import axiosInstance, { ApiResponse } from "../axios";

export type Lease = {
  id: number;
  tenant_id: number;
  department_id: number;
  type: "prueba" | "regular";
  start_date?: string | null; // puede ser NULL
  end_date: string; // fecha obligatoria
  payment_day: number; // día personalizado (1-31)
  monthly_rent: string; // por ser decimal(10,2) lo puedes manejar como string para evitar pérdida de precisión
  status: "activo" | "finalizado" | "renovado";
  upfront_payment: string;
  created_at: string;
  updated_at: string;
};

export type Payment = {
  id: number;
  lease_id: number;
  due_date: string; // ISO date string
  payment_date: string | null; // será string porque llega como fecha, null si no existe
  amount: string; // por ser DECIMAL(10,2), mejor como string para evitar pérdida de precisión
  status: "pendiente" | "pagado" | "vencido" | "cancelado";
  payment_method?: "efectivo" | "transferencia" | "tarjeta" | null;
  type?: "rent" | "deposit" | null;
  reference_number?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
};

export const createLease = async (leaseData: Partial<Lease>) => {
  try {
    const response = await axiosInstance.post<ApiResponse<Lease>>(
      "leases",
      leaseData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating tenant:", error);
    throw error;
  }
};

export const getTenantLeaseById = async (tenant: number) => {
  try {
    const response = await axiosInstance.get<ApiResponse<Lease>>(
      `leases/${tenant}`
    );

    return response.data;
  } catch (error) {
    console.error("Error creating tenant:", error);
    throw error;
  }
};

export const getPaymentsTenantById = async (tenant: number) => {
  try {
    const response = await axiosInstance.get<ApiResponse<Payment[]>>(
      `leases/payments/${tenant}`
    );

    return response.data;
  } catch (error) {
    console.error("Error creating tenant:", error);
    throw error;
  }
};
