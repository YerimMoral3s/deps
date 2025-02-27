import axiosInstance, { ApiResponse, PaginatedResponse } from "../axios";

export type CreateDepartmentData = {
  building_id: number;
  department_type_id: number;
  status?: "disponible" | "ocupado" | "mantenimiento";
};

export type Department = {
  id: number;
  building_id: number;
  department_type_id: number;
  status: "disponible" | "ocupado" | "mantenimiento";
  created_at: string;
  updated_at: string;
};

export const createDepartment = async (
  data: CreateDepartmentData
): Promise<ApiResponse<Department>> => {
  const response = await axiosInstance.post<ApiResponse<Department>>(
    "/departments",
    data
  );
  return response.data;
};

export type getDepartmentsByBuilding = {
  buildingId: string;
  page: number;
};

// ✅ Fetch departments by building ID with pagination
export const getDepartmentsByBuilding = async ({
  buildingId,
  page = 1,
}: getDepartmentsByBuilding) => {
  const response = await axiosInstance.get<
    PaginatedResponse<{ departments: Department[] }>
  >(`/departments/${buildingId}`, {
    params: { page, per_page: 15 },
  });

  return response.data;
};
