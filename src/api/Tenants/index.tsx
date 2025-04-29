import axiosInstance, { ApiResponse, PaginatedResponse } from "../axios";
import { Building } from "../Buildings";
import { Department } from "../departments";
import { Lease } from "../Leases";

export type Tenant = {
  id: number;
  department_id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string | null;
  ine_url?: string | null;
  status: "activo" | "inactivo";
};

// export const getAllTenants = async () => {
//   try {
//     const response = await axiosInstance.get("/tenants");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching tenants:", error);
//     throw error;
//   }
// };

export const createTenant = async (tenantData: Partial<Tenant>) => {
  try {
    const response = await axiosInstance.post<ApiResponse<Tenant>>(
      "tenants",
      tenantData
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error creating tenant:", error);
    throw error;
  }
};

export type CreateTenantWithLease = Partial<Tenant> &
  Partial<Lease> &
  Partial<Department>;

export type TenantWithLeaseResponse = {
  tenant_id: number;
  lease_id: number;
  building_id: number;
  department_id: number;
};

export const createTenantWithLease = async (data: CreateTenantWithLease) => {
  try {
    const response = await axiosInstance.post<
      ApiResponse<TenantWithLeaseResponse>
    >("tenants/create-tenant-contract", data);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating tenant with lease:", error);
    throw error;
  }
};

export type PreTenant = Tenant & { building: Building };

type ResponsePagination = PaginatedResponse<{ tenants: PreTenant[] }>;

export type GetAllTenants = {
  search?: string;
};
type Params = GetAllTenants & {
  page: number;
};

// ✅ Fetch tenants with pagination
export const getAllTenants = async (
  params: Params
): Promise<ResponsePagination> => {
  const response = await axiosInstance.get<ResponsePagination>("tenants", {
    params: { per_page: 15, ...params },
  });

  return response.data;
};
