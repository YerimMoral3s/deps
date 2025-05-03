import { useParams } from "react-router-dom";

export function useRouteParams<T extends Record<string, string | undefined>>() {
  const params = useParams();

  const parsedParams = {} as {
    [K in keyof T]: T[K] extends string
      ? string
      : T[K] extends number
      ? number
      : T[K] extends boolean
      ? boolean
      : unknown;
  };

  for (const key in params) {
    const value = params[key];

    if (value === undefined) {
      (parsedParams as any)[key] = undefined;
      continue;
    }

    if (!isNaN(Number(value))) {
      (parsedParams as any)[key] = Number(value);
    } else if (value === "true" || value === "false") {
      (parsedParams as any)[key] = value === "true";
    } else {
      (parsedParams as any)[key] = value;
    }
  }

  return parsedParams as T;
}
