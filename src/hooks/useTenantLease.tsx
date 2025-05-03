import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTenantLeaseById, Lease } from "../api/Leases";
import { ApiError, ApiResponse } from "../api/axios";

export const QUERY_LEASE_TENANT = ["lease_tenant"];

export const leaseQueryKeys = {
  lease: [QUERY_LEASE_TENANT] as const,
  getLease: (tenant: number) => {
    return [QUERY_LEASE_TENANT, tenant] as const;
  },
};

// Helper to invalidate all buildings-related queries
export const useInvalidateAllBuildings = () => {
  const queryClient = useQueryClient();

  const invalidateLease = (tenant: number) => {
    queryClient.invalidateQueries({
      queryKey: leaseQueryKeys.getLease(tenant),
    });
  };

  return { invalidateLease };
};

export const useTenantLease = (tenant_id?: number) => {
  if (!tenant_id) return;

  return useQuery<ApiResponse<Lease>, ApiError>({
    queryKey: leaseQueryKeys.getLease(tenant_id),
    queryFn: () => getTenantLeaseById(tenant_id),
    enabled: !!tenant_id,
    retry: false,
    staleTime: 1000 * 60 * 60, // 1hr,
  });
};
