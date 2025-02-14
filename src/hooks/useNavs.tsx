import { useNavigate } from "react-router-dom";
import { AppRoutesList, AppRoutesParams } from "../routing/privateRoutes";

// Define your routes with optional or required parameters
export type AppListTypes = keyof AppRoutesParams;

// Generic type to handle routes with or without parameters
export type RouteProps<T extends AppListTypes> =
  AppRoutesParams[T] extends undefined
    ? { route: T; props?: AppRoutesParams[T]; replace?: boolean }
    : { route: T; props: AppRoutesParams[T]; replace?: boolean };

// Generic type to handle routes with or without parameters
export type FallbackProps<T extends AppListTypes> =
  AppRoutesParams[T] extends undefined
    ? { fallback: T; props?: AppRoutesParams[T]; replace?: boolean }
    : { fallback: T; props: AppRoutesParams[T]; replace?: boolean };

export function useNavs() {
  const nav = useNavigate();

  /**
   * Navigate to a specific route with type safety.
   * - If navigating to `"BUILDING"`, `id` is required.
   * - If navigating to any other route, `id` is **not allowed**.
   */

  // Navigate to a route
  // const sendMessage = <T extends MessageTypes>(message: IPostMessage<T>) => {

  const navigateTo = <T extends AppListTypes>(data: RouteProps<T>) => {
    const path = generatePath(data);
    nav(path);
  };
  /**
   * Go back in history, or navigate to a fallback route if no history exists.
   */
  const handleGoBack = <T extends AppListTypes>(data: FallbackProps<T>) => {
    const { fallback, props } = data;
    // ✅ Ensure `path` is always a string
    const path = generatePath({
      route: fallback as AppListTypes,
      props: props,
    });

    if (window.history.length > 4) {
      console.log(`history going back`);
      nav(-1);
    } else {
      console.log(`No history. Redirecting to: ${path}`);
      nav(path, { replace: !!data.replace });
    }
  };
  /**
   * Generate the correct path based on the given route.
   */
  const generatePath = <T extends AppListTypes>({
    route,
    props,
  }: RouteProps<T>): string => {
    let path: string = AppRoutesList[route];
    // Replace any placeholders (e.g., :buildingId) with actual values
    if (props) {
      for (const [key, value] of Object.entries(props)) {
        path = path.replace(`:${key}`, encodeURIComponent(String(value)));
      }
    }
    return path;
  };
  return { navigateTo, handleGoBack };
}
