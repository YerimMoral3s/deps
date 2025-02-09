import { useNavigate } from "react-router-dom";
import {
  AppRoutes,
  AppRouteKeys,
  NavigationParams,
} from "../routing/privateRoutes";
// ✅ Type for `navigateTo`
type NavigateProps<T extends AppRouteKeys> = T extends "BUILDING"
  ? { route: T; params: NavigationParams<T> } // ✅ Requires `id`
  : { route: T; params?: NavigationParams<T> }; // ✅ Prevents `id` for other routes

// ✅ Type for `handleGoBack`
type FallbackProps<T extends AppRouteKeys> = T extends "BUILDING"
  ? { fallback: T; params: NavigationParams<T> } // ✅ Requires `id`
  : { fallback: T; params?: NavigationParams<T> }; // ✅ Prevents `id` for other routes

export function useNavs() {
  const nav = useNavigate();

  /**
   * Navigate to a specific route with type safety.
   * - If navigating to `"BUILDING"`, `id` is required.
   * - If navigating to any other route, `id` is **not allowed**.
   */
  const navigateTo = <T extends AppRouteKeys>(data: NavigateProps<T>) => {
    // ✅ Ensure `path` is always a string
    const path = generatePath(data.route, data.params);
    console.log(`Navigating to: ${path}`);
    nav(path, { replace: !!data.params?.replace });
  };

  /**
   * Go back in history, or navigate to a fallback route if no history exists.
   */
  const handleGoBack = <T extends AppRouteKeys>(data: FallbackProps<T>) => {
    // ✅ Ensure `path` is always a string
    const path = generatePath(data.fallback, data.params);

    if (window.history.length > 0) {
      console.log(`history going back`);
      nav(-1);
    } else {
      console.log(`No history. Redirecting to: ${path}`);
      nav(path, { replace: !!data.params?.replace });
    }
  };
  /**
   * Generate the correct path based on the given route.
   */
  const generatePath = <T extends AppRouteKeys>(
    key: T,
    params?: NavigationParams<T>
  ): string => {
    if (key === "BUILDING") {
      return `${AppRoutes.BUILDINGS}/${params?.id}`;
    }

    return AppRoutes[key];
  };

  return { navigateTo, handleGoBack };
}
