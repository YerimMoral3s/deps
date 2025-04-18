import { useInfiniteQuery } from "@tanstack/react-query";
import { GetAllTenants, getAllTenants } from "../api/Tenants";

export const QUERY_KEY_TENANTS = ["tenants"];

export const depsQueryKeysTenants = {
  tenants: [{ scope: QUERY_KEY_TENANTS }] as const,
  getTenants: (filters: GetAllTenants) =>
    [{ ...depsQueryKeysTenants.tenants[0], ...filters }] as const,
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
  });

  // ✅ Flat list of tenants from all pages
  const tenants = query.data?.pages.flatMap((page) => page.data.tenants) ?? [];

  return { ...query, tenants };
};
