import axiosInstance, { ApiResponse, PaginatedResponse } from "../axios";
import { Building } from "../Buildings";

export type CreateDepartmentData = {
  building_id: number;
  status: "disponible" | "ocupado" | "mantenimiento";
  bedrooms: number;
  bathrooms: number;
  base_rent_price?: string | null;
  description?: string | null;
};

export type Department = {
  id: number;
  building_id: number;
  status: "disponible" | "ocupado" | "mantenimiento";
  bedrooms: number;
  bathrooms: number;
  base_rent_price: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
  building?: Building;
};

export const createDepartment = async (
  data: CreateDepartmentData
): Promise<ApiResponse<Department>> => {
  const response = await axiosInstance.post<ApiResponse<Department>>(
    "departments",
    data
  );
  return response.data;
};

export type getDepartmentsByBuilding = {
  buildingId: string;
  status: string;
  page: number;
};

// ✅ Fetch departments by building ID with pagination
export const getDepartmentsByBuilding = async ({
  buildingId,
  page = 1,
  status,
}: {
  page: number;
  buildingId?: number;
  status?: "disponible" | "ocupado" | "mantenimiento";
}) => {
  const response = await axiosInstance.get<
    PaginatedResponse<{ departments: Department[] }>
  >(`departments/${buildingId}`, {
    params: { page, per_page: 15, ...(status && { status }) },
  });

  return response.data;
};

export const getDepartmentById = async (
  department_id: number
): Promise<ApiResponse<Department>> => {
  const response = await axiosInstance.get<ApiResponse<Department>>(
    `departments/id/${department_id}`
  );
  return response.data;
};

export type assignDepartment = {
  department_id: number;
  tenant_id: number;
};

export const assignDepartment = async (
  data: assignDepartment
): Promise<ApiResponse<Partial<Department>>> => {
  const response = await axiosInstance.get<ApiResponse<Partial<Department>>>(
    `departments/assign/${data.department_id}/${data.tenant_id}`
  );
  return response.data;
};

export const getDepartmentByTenantId = async (
  id: number
): Promise<ApiResponse<Partial<Department>>> => {
  const response = await axiosInstance.get<ApiResponse<Partial<Department>>>(
    `departments/tenant/${id}`
  );
  return response.data;
};
