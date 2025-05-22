import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTenantById, Tenant } from "../api/Tenants";
import { ApiError, ApiResponse } from "../api/axios";

export const QUERY_KEY_TENANT_ID = ["tenant_id"];

export const tenantQueryKeys = {
  tenant: [QUERY_KEY_TENANT_ID] as const,
  getTenant: (tenantId: number) => {
    return [QUERY_KEY_TENANT_ID, tenantId] as const;
  },
};

// Helper to invalidate all buildings-related queries
export const useInvalidateTenant = () => {
  const queryClient = useQueryClient();

  const invalidateBuildings = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEY_TENANT_ID });
  };

  return { invalidateBuildings };
};

export const useTenantById = (tenant_id?: number) => {
  if (!tenant_id) return null;
  return useQuery<ApiResponse<Tenant>, ApiError>({
    queryKey: tenantQueryKeys.getTenant(tenant_id), // ✅ Unique key for caching
    queryFn: () => getTenantById(tenant_id),
    enabled: !!tenant_id,
    retry: false,
    staleTime: 1000 * 60 * 60, // 1hr,
  });
};
