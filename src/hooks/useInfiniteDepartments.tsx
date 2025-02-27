import { useInfiniteQuery } from "@tanstack/react-query";
import { getDepartmentsByBuilding } from "../api/departments";

const depsQueryKeys = {
  departments: [{ scope: "departments" }] as const,
  getDepartmentsByBuilding: (buildingId: string, page: number) =>
    [{ ...depsQueryKeys.departments[0], buildingId, page }] as const,
};

export const useInfiniteDepartments = ({
  buildingId,
}: {
  buildingId: string;
}) => {
  const query = useInfiniteQuery({
    queryKey: depsQueryKeys.getDepartmentsByBuilding(buildingId, 1),
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

  const departments =
    query.data?.pages.flatMap((page) => page.data.departments) ?? [];

  return { ...query, departments };
};
