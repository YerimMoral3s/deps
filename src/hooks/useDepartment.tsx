import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError, ApiResponse } from "../api/axios";
import { getDepartmentById, Department } from "../api/departments";

export const DEPARTMENT_KEY = "department_by_id";

export const departmentQueryKeys = {
  department: [DEPARTMENT_KEY] as const,
  getDepartmentById: (departmentId: number) => {
    return [DEPARTMENT_KEY, departmentId] as const;
  },
};

export const useDepartment = (department_id?: number) => {
  if (!department_id) return;

  return useQuery<ApiResponse<Department>, ApiError>({
    queryKey: departmentQueryKeys.getDepartmentById(department_id),
    queryFn: () => getDepartmentById(department_id),
    enabled: !!department_id,
    retry: false,
    staleTime: 1000 * 60 * 60, // 1hr,
  });
};

export const useInvalidateDepartmentById = () => {
  const queryClient = useQueryClient();

  const invalidateDepartmentById = (departmentId: number) => {
    queryClient.invalidateQueries({
      queryKey: departmentQueryKeys.getDepartmentById(departmentId),
    });
  };

  return { invalidateDepartmentById };
};
