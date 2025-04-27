import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { ApiError, ApiResponse } from "../api/axios";
import axios from "axios";
import { createLease, Lease } from "../api/Leases";

type mutationRes = UseMutationResult<
  ApiResponse<Lease>,
  ApiError,
  Partial<Lease>
>;

type mutationOptions = UseMutationOptions<
  ApiResponse<Lease>,
  ApiError,
  Partial<Lease>
>;

// non used
export const useCreateLease = (options?: mutationOptions): mutationRes => {
  return useMutation<ApiResponse<Lease>, ApiError, Partial<Lease>>({
    mutationFn: createLease,

    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);

      // Invalidate Lease list queries if necessary in the future
      console.log("✅ Lease created successfully:", data);
    },

    onError: (error, variables, context) => {
      console.error("❌ Error creating Lease:", error);

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
