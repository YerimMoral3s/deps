import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBuildings } from "../api/Buildings";

export const QUERY_KEY_BUILDINGS = ["buildings"];

export const useBuildings = () => {
  const queryClient = useQueryClient(); // ✅ Get queryClient instance

  return {
    ...useQuery({
      queryKey: QUERY_KEY_BUILDINGS, // ✅ Unique key for caching
      queryFn: getAllBuildings,
      staleTime: 1000 * 60 * 5, // ✅ Cache for 5 minutes
    }),
    invalidateBuildings: () =>
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY_BUILDINGS,
      }),
  };
};
