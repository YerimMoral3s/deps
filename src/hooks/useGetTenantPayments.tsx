import { useQuery, useQueryClient } from "@tanstack/react-query";

import { ApiError, ApiResponse } from "../api/axios";
import { getPaymentsTenantById, Payment } from "../api/Leases";

export const QUERY_KEY_PAYMENTS_TENANT_ID = ["QUERY_KEY_PAYMENTS_TENANT_ID"];

const tenantQueryKeys = {
  payments: [QUERY_KEY_PAYMENTS_TENANT_ID] as const,
  getPayments: (tenantId: number) => {
    return [QUERY_KEY_PAYMENTS_TENANT_ID, tenantId] as const;
  },
};

// Helper to invalidate all buildings-related queries
export const useInvalidateTenantPayments = () => {
  const queryClient = useQueryClient();

  const invalidateBuildings = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEY_PAYMENTS_TENANT_ID });
  };

  return { invalidateBuildings };
};

export const useGetTenantPayments = (tenant_id?: number) => {
  if (!tenant_id) return null;
  return useQuery<ApiResponse<Payment[]>, ApiError>({
    queryKey: tenantQueryKeys.getPayments(tenant_id), // ✅ Unique key for caching
    queryFn: () => getPaymentsTenantById(tenant_id),
    enabled: !!tenant_id,
    retry: false,
    staleTime: 1000 * 60 * 60, // 1hr,
  });
};
