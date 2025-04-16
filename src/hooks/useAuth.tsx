import {
  UseMutationOptions,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { AuthResponse, LoginData, loginUser } from "../api/auth";
import { useTokenStore } from "../stores/useTokenStore";
import { useUserStore } from "../stores/useUserStore";
import axios from "axios";
import { ApiError } from "../api/axios";

type mutationOptions = UseMutationOptions<AuthResponse, ApiError, LoginData>;

type mutationRes = UseMutationResult<AuthResponse, ApiError, LoginData>;

export const useLoginMutation = (options?: mutationOptions): mutationRes => {
  const setUser = useUserStore((state) => state.setUser);
  const setAccessToken = useTokenStore((state) => state.setAccessToken);
  const setRefreshToken = useTokenStore((state) => state.setRefreshToken);

  return useMutation<AuthResponse, ApiError, LoginData>({
    mutationFn: loginUser,

    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
      const { access_token, refresh_token, user } = data.data;
      setAccessToken(structuredClone(access_token));
      setRefreshToken(structuredClone(refresh_token));
      setUser(structuredClone(user));
    },

    onError: (error, variables, context) => {
      console.error("❌ Login error:", error);

      let errorMessage: ApiError = {
        success: false,
        message: "An unexpected error occurred.",
      };

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data;
      }

      options?.onError?.(errorMessage, variables, context);
    },
  });
};
