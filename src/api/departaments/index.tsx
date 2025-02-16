import axiosInstance, { ApiResponse } from "../axios";

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
    "/departments/",
    data
  );
  return response.data;
};
