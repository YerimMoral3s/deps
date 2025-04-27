import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { Building, createBuilding } from "../api/Buildings";
import { ApiError, ApiResponse } from "../api/axios";
import axios from "axios";
import { useInvalidateAllBuildings } from "./useGetBuildings";

// This hook is to create a building
//    - invalidate the query to fetch all buildings

type mutationRes = UseMutationResult<ApiResponse<Building>, ApiError, string>;

type mutationOptions = UseMutationOptions<
  ApiResponse<Building>,
  ApiError,
  string
>;

// ✅ Custom Hook for fetching and managing buildings
export const useCrateBuilding = (options?: mutationOptions): mutationRes => {
  const { invalidateBuildings } = useInvalidateAllBuildings();
  // ✅ Mutation to create a new building
  return useMutation({
    mutationFn: createBuilding,
    onSuccess: (newBuilding, variables, context) => {
      invalidateBuildings();
      options?.onSuccess?.(newBuilding, variables, context);
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
