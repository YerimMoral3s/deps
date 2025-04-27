import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { ApiError, ApiResponse } from "../api/axios";
import { assignDepartment, Department } from "../api/departments";
// import { QUERY_KEY_BUILDINGS } from "./useGetBuildings";
// import { depsQueryKeys } from "./useInfiniteDepartments";
import axios from "axios";

type mutationRes = UseMutationResult<
  ApiResponse<Partial<Department>>,
  ApiError,
  assignDepartment
>;

type mutationOptions = UseMutationOptions<
  ApiResponse<Partial<Department>>,
  ApiError,
  assignDepartment
>;
// NON USED
export const useAssignDepartment = (options?: mutationOptions): mutationRes => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assignDepartment,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);

      // queryClient.invalidateQueries({
      //   queryKey: QUERY_KEY_BUILDINGS,
      // });

      // queryClient.invalidateQueries({
      //   queryKey: depsQueryKeys.getDepartmentsByBuilding(data.data.id),
      // });
    },
    onError: (error, variables, context) => {
      console.error("❌ Login error:", error);

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
