import { useInfiniteQuery } from "@tanstack/react-query";
import { getDepartmentsByBuilding } from "../api/departments";
import { useQueryClient } from "@tanstack/react-query";

type status = "disponible" | "ocupado" | "mantenimiento";

export const INFINITE_DEPARTMENTS_SCOPE = "departments_by_building";

export const departmentsByBuildingQueryKeys = {
  infiniteDepartments: [INFINITE_DEPARTMENTS_SCOPE] as const,

  getInfiniteDepartments: (buildingId?: number, status?: status) => {
    return [INFINITE_DEPARTMENTS_SCOPE, buildingId, status] as const;
  },
};
// Helper to invalidate all departments-related queries
export const useInvalidateInfiniteDepartmentsByBuilding = () => {
  const queryClient = useQueryClient();

  const invalidateInfiniteDepartmentsByBuilding = (
    id: number,
    status?: status
  ) => {
    queryClient.invalidateQueries({
      queryKey: departmentsByBuildingQueryKeys.getInfiniteDepartments(
        id,
        status
      ),
    });
  };

  return { invalidateInfiniteDepartmentsByBuilding };
};

export const useInfiniteDepartmentsByBuilding = ({
  buildingId,
  status,
}: {
  buildingId?: number;
  status?: status;
}) => {
  const query = useInfiniteQuery({
    queryKey: departmentsByBuildingQueryKeys.getInfiniteDepartments(
      buildingId,
      status
    ),
    queryFn: ({ pageParam = 1 }) =>
      getDepartmentsByBuilding({
        buildingId,
        page: pageParam,
        status,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.data.pagination.page;
      const totalPages = lastPage.data.pagination.total_pages;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    staleTime: 1000 * 60 * 60, // 1hr,
  });

  // ✅ Correct extraction of `departments`
  const departments =
    query.data?.pages.flatMap((page) => page.data.departments) ?? [];

  return { ...query, departments };
};
