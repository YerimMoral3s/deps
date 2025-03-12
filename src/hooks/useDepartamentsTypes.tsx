import { useQuery } from "@tanstack/react-query";
import { getDepartmentsTypes } from "../api/departaments_types";

export const QUERY_KEY_DEPARTMENTS_QUERY = ["departments_types"];

export const useDepartmentsTypes = () => {
  return {
    ...useQuery({
      queryKey: QUERY_KEY_DEPARTMENTS_QUERY, // ✅ Unique key for caching
      queryFn: getDepartmentsTypes,
    }),
  };
};
