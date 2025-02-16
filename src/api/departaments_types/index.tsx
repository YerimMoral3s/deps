import axiosInstance, { ApiResponse } from "../axios";

export type DepartmentType = {
  id: number;
  bedrooms: number;
  bathrooms: number;
  base_rent_price: number;
  description: string;
  created_at: string; // Consider using `Date` if you parse it
  updated_at: string; // Consider using `Date` if you parse it
};

// ✅ Fetch all buildings
export const getDepartmentsTypes = async (): Promise<
  ApiResponse<DepartmentType[]>
> => {
  const response = await axiosInstance.get<ApiResponse<DepartmentType[]>>(
    "/departmentsTypes"
  );

  return response.data;
};
