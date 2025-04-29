import {
  UseMutationOptions,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";

import { ApiError, ApiResponse } from "../api/axios";
import axios from "axios";

import {
  createTenantWithLease,
  CreateTenantWithLease,
  TenantWithLeaseResponse,
} from "../api/Tenants";
import { useInvalidateBuildingById } from "./useBuildingById";
import { useInvalidateInfiniteDepartmentsByBuilding } from "./useInfiniteDepartmentsByBuilding";
import { useInvalidateDepartmentById } from "./useDepartment";
import { useInvalidateInfiniteTenants } from "./useInfiniteTenants";

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
  const { invalidateBuildingById } = useInvalidateBuildingById();
  const { invalidateInfiniteDepartmentsByBuilding } =
    useInvalidateInfiniteDepartmentsByBuilding();
  const { invalidateDepartmentById } = useInvalidateDepartmentById();

  const { invalidateInfiniteTenants } = useInvalidateInfiniteTenants();

  return useMutation<
    ApiResponse<TenantWithLeaseResponse>,
    ApiError,
    CreateTenantWithLease
  >({
    mutationFn: createTenantWithLease,

    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);

      // invalidate info by only single building
      invalidateBuildingById(data.data.building_id);
      // invalidate all departments available from that building
      invalidateInfiniteDepartmentsByBuilding(
        data.data.building_id,
        "disponible"
      );
      // invalidate all departments
      invalidateInfiniteDepartmentsByBuilding(data.data.building_id);
      console.log(
        "aca useCreateTenantWithLease department_id",
        data.data.department_id
      );
      // invalidate department by id
      invalidateDepartmentById(data.data.department_id);

      // invalidate all tenants
      invalidateInfiniteTenants();
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
