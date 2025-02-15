import axiosInstance, { ApiResponse } from "../axios";

// ✅ Fetch all buildings
export const getDepartmentsTypes = async (): Promise<ApiResponse<any>> => {
  const response = await axiosInstance.get<ApiResponse<any>>(
    "/departmentsTypes"
  );

  return response.data;
};
