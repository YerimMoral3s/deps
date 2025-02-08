import axiosInstance, { ApiResponse } from "../axios";

export type User = {
  id: number;
  email: string;
};

export type AuthResponse = ApiResponse<{
  access_token: string;
  refresh_token: string;
  user: User;
}>;

export type LoginData = {
  email: string;
  password: string;
};

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>("/auth/login", data);
  return response.data;
};
