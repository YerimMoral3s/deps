import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { createTenant, Tenant } from "../api/Tenants";
import { ApiError, ApiResponse } from "../api/axios";
import axios from "axios";

type mutationRes = UseMutationResult<
  ApiResponse<Tenant>,
  ApiError,
  Partial<Tenant>
>;

type mutationOptions = UseMutationOptions<
  ApiResponse<Tenant>,
  ApiError,
  Partial<Tenant>
>;
// NON USED
export const useCreateTenant = (options?: mutationOptions): mutationRes => {
  return useMutation<ApiResponse<Tenant>, ApiError, Partial<Tenant>>({
    mutationFn: createTenant,

    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);

      // Invalidate tenant list queries if necessary in the future
      console.log("✅ Tenant created successfully:", data);
    },

    onError: (error, variables, context) => {
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
