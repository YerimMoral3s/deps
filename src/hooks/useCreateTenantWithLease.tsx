import {
  UseMutationOptions,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

import { ApiError, ApiResponse } from "../api/axios";
import axios from "axios";

import { QUERY_KEY_BUILDINGS } from "./useGetBuildings";
import { depsQueryKeys } from "./useInfiniteDepartments";
import {
  createTenantWithLease,
  CreateTenantWithLease,
  TenantWithLeaseResponse,
} from "../api/Tenants";

type mutationRes = UseMutationResult<
  ApiResponse<TenantWithLeaseResponse>,
  ApiError,
  CreateTenantWithLease
>;

type mutationOptions = UseMutationOptions<
  ApiResponse<TenantWithLeaseResponse>,
  ApiError,
  CreateTenantWithLease
>;

export const useCreateTenantWithLease = (
  options?: mutationOptions
): mutationRes => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<TenantWithLeaseResponse>,
    ApiError,
    CreateTenantWithLease
  >({
    mutationFn: createTenantWithLease,

    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);

      queryClient.invalidateQueries({
        queryKey: QUERY_KEY_BUILDINGS,
      });

      queryClient.invalidateQueries({
        queryKey: depsQueryKeys.getDepartmentsByBuilding(data.data.building_id),
      });

      console.log("✅ Department created successfully:", data);
    },

    onError: (error, variables, context) => {
      console.error("❌ Error creating department:", error);

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
