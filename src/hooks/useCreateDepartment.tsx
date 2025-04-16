import {
  UseMutationOptions,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

import { ApiError, ApiResponse } from "../api/axios";
import axios from "axios";
import {
  createDepartment,
  CreateDepartmentData,
  Department,
} from "../api/departments";
import { QUERY_KEY_BUILDINGS } from "./useGetBuildings";
import { depsQueryKeys } from "./useInfiniteDepartments";

type mutationRes = UseMutationResult<
  ApiResponse<Department>,
  ApiError,
  CreateDepartmentData
>;

type mutationOptions = UseMutationOptions<
  ApiResponse<Department>,
  ApiError,
  CreateDepartmentData
>;

export const useCreateDepartment = (options?: mutationOptions): mutationRes => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<Department>, ApiError, CreateDepartmentData>({
    mutationFn: createDepartment,

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
