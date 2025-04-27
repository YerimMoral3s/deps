import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBuildings } from "../api/Buildings";

export const QUERY_KEY_BUILDINGS = ["all_buildings"];

// Helper to invalidate all buildings-related queries
export const useInvalidateAllBuildings = () => {
  const queryClient = useQueryClient();

  const invalidateBuildings = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEY_BUILDINGS });
  };

  return { invalidateBuildings };
};

export const useBuildings = () => {
  return {
    ...useQuery({
      queryKey: QUERY_KEY_BUILDINGS, // ✅ Unique key for caching
      queryFn: getAllBuildings,
      staleTime: 1000 * 60 * 5, // ✅ Cache for 5 minutes
    }),
  };
};
