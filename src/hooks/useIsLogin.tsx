import { useTokenStore } from "../stores";

export const useIsLogin = () => {
  const at = useTokenStore((state) => state.accessToken);
  return { isLogin: !!at };
};
