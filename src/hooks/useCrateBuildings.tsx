import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { Building, createBuilding } from "../api/Buildings";
import { ApiError, ApiResponse } from "../api/axios";
import axios from "axios";
import { QUERY_KEY_BUILDINGS } from "./useGetBuildings";

// ✅ Custom Hook for fetching and managing buildings
export const useCrateBuildings = (
  options?: UseMutationOptions<ApiResponse<Building>, ApiError, string>
): UseMutationResult<ApiResponse<Building>, ApiError, string> => {
  const queryClient = useQueryClient();

  // ✅ Mutation to create a new building
  return useMutation({
    mutationFn: createBuilding,
    onSuccess: (newBuilding, variables, context) => {
      options?.onSuccess?.(newBuilding, variables, context);

      // ✅ Optimistically update cache
      queryClient.setQueryData(
        QUERY_KEY_BUILDINGS,
        (oldData?: { data: Building[] }) => ({
          ...oldData,
          data: oldData
            ? [...oldData.data, newBuilding.data]
            : [newBuilding.data],
        })
      );
    },
    onError: (error, variables, context) => {
      console.error("❌ Login error:", error);

      let errorMessage: ApiError = {
        success: false,
        message: "An unexpected error occurred.",
      };

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data || errorMessage;
      }

      options?.onError?.(errorMessage, variables, context);
    },
  });
};
