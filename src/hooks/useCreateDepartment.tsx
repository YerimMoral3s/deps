import {
  UseMutationOptions,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";

import { ApiError, ApiResponse } from "../api/axios";
import axios from "axios";
import {
  createDepartment,
  CreateDepartmentData,
  Department,
} from "../api/departments";
import { useInvalidateBuildingById } from "./useBuildingById";
import { useInvalidateInfiniteDepartmentsByBuilding } from "./useInfiniteDepartmentsByBuilding";

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
  const { invalidateBuildingById } = useInvalidateBuildingById();
  const { invalidateInfiniteDepartmentsByBuilding } =
    useInvalidateInfiniteDepartmentsByBuilding();

  return useMutation<ApiResponse<Department>, ApiError, CreateDepartmentData>({
    mutationFn: createDepartment,

    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
      // invalidate info by only single building
      invalidateBuildingById(data.data.building_id);
      // invalidate all departments from that building
      invalidateInfiniteDepartmentsByBuilding(data.data.building_id);

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
