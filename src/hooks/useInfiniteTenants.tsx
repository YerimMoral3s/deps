import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { GetAllTenants, getAllTenants } from "../api/Tenants";

export const QUERY_KEY_TENANTS = "tenants";

export const depsQueryKeysTenants = {
  tenants: [QUERY_KEY_TENANTS] as const,
  getTenants: (filters: GetAllTenants) =>
    [QUERY_KEY_TENANTS, filters.search] as const,
};

export const useInfiniteTenants = (params: GetAllTenants) => {
  const query = useInfiniteQuery({
    queryKey: depsQueryKeysTenants.getTenants(params),
    queryFn: ({ pageParam = 1 }) =>
      getAllTenants({
        page: pageParam,
        ...params,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.data.pagination.page;
      const totalPages = lastPage.data.pagination.total_pages;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    staleTime: 1000 * 60 * 60, // 1hr,
  });

  // ✅ Flat list of tenants from all pages
  const tenants = query.data?.pages.flatMap((page) => page.data.tenants) ?? [];

  return { ...query, tenants };
};

// Hook to invalidate infinite tenants
export const useInvalidateInfiniteTenants = () => {
  const queryClient = useQueryClient();

  const invalidateInfiniteTenants = (search?: string) => {
    queryClient.invalidateQueries({
      queryKey: depsQueryKeysTenants.getTenants({ search: search ?? "" }),
    });
  };

  return { invalidateInfiniteTenants };
};
