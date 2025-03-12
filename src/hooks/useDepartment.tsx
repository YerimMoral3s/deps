import { useQuery } from "@tanstack/react-query";
import { ApiError, ApiResponse } from "../api/axios";
import { getDepartmentById, Department } from "../api/departments";
import { depsQueryKeys } from "./useInfiniteDepartments";

export const useDepartment = (department_id?: string) => {
  if (!department_id) return;
  return useQuery<ApiResponse<Department>, ApiError>({
    queryKey: depsQueryKeys.getDepartmentById(department_id.toString()), // Utiliza un sistema de claves para caché
    queryFn: () => getDepartmentById(department_id),
    enabled: !!department_id,
    retry: false,
  });
};
