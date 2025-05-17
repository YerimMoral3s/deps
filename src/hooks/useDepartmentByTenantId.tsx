import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError, ApiResponse } from "../api/axios";
import { Department, getDepartmentByTenantId } from "../api/departments";

export const QUERY_KEY_DEPARTMENT_TENANT_ID = [
  "QUERY_KEY_DEPARTMENT_TENANT_ID",
];

const tenantQueryKeys = {
  tenantDepartment: [QUERY_KEY_DEPARTMENT_TENANT_ID] as const,
  getTenantDepartment: (tenantId: number) => {
    return [QUERY_KEY_DEPARTMENT_TENANT_ID, tenantId] as const;
  },
};

// Helper to invalidate all buildings-related queries
export const useInvalidateDepartmentByTenantId = () => {
  const queryClient = useQueryClient();

  const invalidateBuildings = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEY_DEPARTMENT_TENANT_ID });
  };

  return { invalidateBuildings };
};

export const useDepartmentByTenantId = (tenant_id?: number) => {
  if (!tenant_id) return null;
  return useQuery<ApiResponse<Partial<Department>>, ApiError>({
    queryKey: tenantQueryKeys.getTenantDepartment(tenant_id), // ✅ Unique key for caching
    queryFn: () => getDepartmentByTenantId(tenant_id),
    enabled: !!tenant_id,
    retry: false,
    staleTime: 1000 * 60 * 60, // 1hr,
  });
};
