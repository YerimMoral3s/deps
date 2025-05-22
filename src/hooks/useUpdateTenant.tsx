import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { ApiError, ApiResponse } from "../api/axios";
import axios from "axios";

import { Tenant, updateTenant, updateTenantData } from "../api/Tenants";
import { tenantQueryKeys } from "./useLeaseTenant";

type UseUpdateTenantResult = UseMutationResult<
  ApiResponse<Tenant>,
  ApiError,
  updateTenantData
>;

type UseUpdateTenantOptions = UseMutationOptions<
  ApiResponse<Tenant>,
  ApiError,
  updateTenantData
>;

export const useUpdateTenant = (
  options?: UseUpdateTenantOptions
): UseUpdateTenantResult => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTenant,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);

      queryClient.setQueryData(
        tenantQueryKeys.getTenant(data.data.id),
        (prev) => {
          if (!prev || typeof prev !== "object") {
            return { success: true, data: data.data };
          }

          return {
            ...(prev as ApiResponse<Tenant>),
            data: data.data,
          };
        }
      );
    },
    onError: (error, variables, context) => {
      console.error("❌ Error updating tenant:", error);

      let errorMessage: ApiError = {
        success: false,
        message: "An unexpected error occurred.",
      };

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data;
      }

      options?.onError?.(errorMessage, variables, context);
    },
  });
};
