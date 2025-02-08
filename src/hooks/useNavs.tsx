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

  const navigateTo = <T extends AppRouteKeys>({
    route,
    params,
  }: NavigateProps<T>) => {
    const { id, replace = false } = params || {};

    // ✅ Ensure `path` is always a string
    const path: string =
      route === "BUILDING" && id !== undefined
        ? AppRoutes.BUILDING(id) // ✅ Calls the function to get a string
        : (AppRoutes[route] as string); // ✅ Forces TypeScript to recognize it's a string

    console.log(`Navigating to: ${path}`);
    nav(path, { replace });
  };

  /**
   * Go back in history, or navigate to a fallback route if no history exists.
   */

  const handleGoBack = <T extends AppRouteKeys>({
    fallback,
    params,
  }: FallbackProps<T>) => {
    const { id, replace = false } = params || {};

    // ✅ Ensure `path` is always a string
    const path: string =
      fallback === "BUILDING" && id !== undefined
        ? AppRoutes.BUILDING(id) // ✅ Calls the function to get a string
        : (AppRoutes[fallback] as string); // ✅ Forces TypeScript to recognize it's a string

    if (window.history.state && window.history.state.idx > 0) {
      console.log(`history going back`);
      nav(-1);
    } else {
      console.log(`No history. Redirecting to: ${path}`);
      nav(path, { replace });
    }
  };

  return { navigateTo, handleGoBack };
}
