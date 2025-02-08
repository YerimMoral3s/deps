import { useLoadingBar } from "react-top-loading-bar";

export const useTabLoader = () => {
  return useLoadingBar({
    height: 2,
  });
};
