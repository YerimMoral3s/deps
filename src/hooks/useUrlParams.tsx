import { useParams } from "react-router-dom";

export function useRouteParams<T extends Record<string, string>>() {
  const params = useParams<T>();
  return params;
}
