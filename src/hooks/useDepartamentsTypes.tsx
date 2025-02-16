import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDepartmentsTypes } from "../api/departaments_types";

export const QUERY_KEY_DEPARTMENTS_QUERY = ["departments_types"];

export const useDepartmentsTypes = () => {
  const queryClient = useQueryClient(); // ✅ Get queryClient instance

  return {
    ...useQuery({
      queryKey: QUERY_KEY_DEPARTMENTS_QUERY, // ✅ Unique key for caching
      queryFn: getDepartmentsTypes,
      staleTime: 1000 * 60 * 5, // ✅ Cache for 5 minutes
    }),
    invalidateBuildings: () =>
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY_DEPARTMENTS_QUERY,
      }),
  };
};

export const invalidateDepartamentsTypesQueries = () => {
  const queryClient = useQueryClient();

  return queryClient.invalidateQueries({
    queryKey: QUERY_KEY_DEPARTMENTS_QUERY,
  });
};
