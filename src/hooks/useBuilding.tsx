import { useQuery } from "@tanstack/react-query";
import { getBuildingById } from "../api/Buildings";

const depsQueryKeys = {
  departments: [{ scope: "departments" }] as const,
  getDepartmentsByBuilding: (buildingId: string) =>
    [{ ...depsQueryKeys.departments[0], buildingId }] as const,

  // ✅ New query key for fetching a building by ID
  building: (buildingId: string) =>
    [{ scope: "building", buildingId }] as const,
};

export const useBuilding = (buildingId?: string) => {
  if (!buildingId) {
    return;
  }
  return useQuery({
    queryKey: depsQueryKeys.building(buildingId),
    queryFn: () => getBuildingById(buildingId),
    enabled: !!buildingId, // Only run query if buildingId is provided
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2, // Retry twice on failure
  });
};
