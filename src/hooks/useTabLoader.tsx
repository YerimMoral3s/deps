import { useLoadingBar } from "react-top-loading-bar";

import theme_l from "../assets/theme";

export const useTabLoader = () => {
  const color = theme_l.colors.accent;
  return useLoadingBar({
    color,
    height: 2,
  });
};
