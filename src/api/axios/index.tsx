import axios from "axios";
import { encryptWithJWT } from "../../utils";
import { useTokenStore } from "../../stores";

export const API_BASE_URL = "http://127.0.0.1:5000";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.request.use(
  async (config) => {
    const cred = await encryptWithJWT();
    config.headers["x-api-key"] = cred;

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.request.use(
  async (config) => {
    const at = useTokenStore.getState().accessToken;

    config.headers["Authorization"] = `Bearer ${at}`;

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = useTokenStore.getState().refreshToken;
    const setAccessToken = useTokenStore.getState().setAccessToken;
    const setRefreshToken = useTokenStore.getState().setRefreshToken;
    const clearTokens = useTokenStore.getState().clearTokens;

    // 🔹 Handle expired access token (error_code 2003)
    if (error.response?.data.error_code === 2003 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        if (!refreshToken) throw new Error("No refresh token available");

        // 🔐 Encrypt API Key
        const cred = await encryptWithJWT();

        // 🔄 Request new access & refresh tokens
        const response = await axios.post<RefreshTokenResponse>(
          `${API_BASE_URL}/auth/refresh`,
          { refresh_token: refreshToken },
          {
            headers: {
              "x-api-key": cred,
            },
          }
        );

        const newAT = response.data.data.access_token;
        const newRT = response.data.data.refresh_token;

        // ✅ Update Zustand store
        setAccessToken(newAT);
        setRefreshToken(newRT);

        // ✅ Update Axios headers globally
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAT}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAT}`;

        // 🔄 Retry the failed request with the new token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("🔴 Refresh Token Expired or Invalid:", refreshError);

        // ❌ Clear tokens & Redirect to login
        clearTokens();
        // redirect to login
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  errors?: string[];
};

export type ApiError = {
  success: false;
  message: string;
  errors?: string[];
};

// ✅ Define the API response type
export type RefreshTokenResponse = {
  data: {
    access_token: string;
    refresh_token: string;
  };
  message: string;
  success: boolean;
};
