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
