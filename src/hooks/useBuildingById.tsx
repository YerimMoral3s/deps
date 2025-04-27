import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBuildingById } from "../api/Buildings";

const BUILDING_SCOPE = "building_by_id";

const buildingQueryKeys = {
  building: [BUILDING_SCOPE] as const,
  getBuilding: (buildingId: number) => [BUILDING_SCOPE, buildingId] as const,
};

// This hook only fetches a single building by id
export const useBuildingById = (buildingId?: number) => {
  if (!buildingId) return null;
  return useQuery({
    queryKey: buildingQueryKeys.getBuilding(buildingId),
    queryFn: () => getBuildingById(buildingId!),
    enabled: !!buildingId, // Only run query if buildingId is provided
    staleTime: 1000 * 60 * 60, // 1hr
    retry: 2, // Retry twice on failure
  });
};

// Helper to invalidate all building-by-id-related queries
export const useInvalidateBuildingById = () => {
  const queryClient = useQueryClient();

  const invalidateBuildingById = (buildingId: number) => {
    queryClient.invalidateQueries({
      queryKey: buildingQueryKeys.getBuilding(buildingId),
    });
  };

  return { invalidateBuildingById };
};
