import axiosInstance, { ApiResponse } from "../axios";

// ✅ Define the `Building` type
export type Building = {
  id: number;
  name: string;
  total_units: number;
  created_at: string; // ISO timestamp as a string
};

// ✅ Define API response type for `createBuilding`
export type CreateBuildingResponse = ApiResponse<Building>;

// ✅ API function to create a new building
export const createBuilding = async (
  name: string
): Promise<CreateBuildingResponse> => {
  const response = await axiosInstance.post<CreateBuildingResponse>(
    "buildings/create-building",
    {
      name,
    }
  );
  return response.data;
};

// ✅ Fetch all buildings
export const getAllBuildings = async (): Promise<ApiResponse<Building[]>> => {
  const response = await axiosInstance.get<ApiResponse<Building[]>>(
    "/buildings/"
  );

  return response.data;
};
