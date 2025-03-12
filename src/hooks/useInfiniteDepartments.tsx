import { useInfiniteQuery } from "@tanstack/react-query";
import { getDepartmentsByBuilding } from "../api/departments";

export const depsQueryKeys = {
  departments: [{ scope: "departments" }] as const,
  department: [{ scope: "department" }] as const,
  getDepartmentsByBuilding: (buildingId: string) =>
    [{ ...depsQueryKeys.departments[0], buildingId }] as const,
  getDepartmentById: (depId: string) =>
    [{ ...depsQueryKeys.department[0], depId }] as const,
};

export const useInfiniteDepartments = ({
  buildingId,
}: {
  buildingId: string;
}) => {
  const query = useInfiniteQuery({
    queryKey: depsQueryKeys.getDepartmentsByBuilding(buildingId),
    queryFn: ({ pageParam = 1 }) =>
      getDepartmentsByBuilding({
        buildingId,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.data.pagination.page;
      const totalPages = lastPage.data.pagination.total_pages;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  // ✅ Correct extraction of `departments`
  const departments =
    query.data?.pages.flatMap((page) => page.data.departments) ?? [];

  return { ...query, departments };
};
