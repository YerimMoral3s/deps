import axiosInstance, { ApiResponse } from "../axios";

const path = "buildings";

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
export const createBuilding = async (name: string) => {
  const response = await axiosInstance.post<CreateBuildingResponse>(
    `${path}/create-building`,
    {
      name,
    }
  );
  return response.data;
};

// ✅ Fetch all buildings
export const getAllBuildings = async (): Promise<ApiResponse<Building[]>> => {
  const response = await axiosInstance.get<ApiResponse<Building[]>>(`${path}/`);

  return response.data;
};

// ✅ Define API response type for `getBuildingById`
export type GetBuildingResponse = ApiResponse<Building>;

// ✅ API function to get a building by ID
export const getBuildingById = async (buildingId?: number) => {
  const response = await axiosInstance.get<GetBuildingResponse>(
    `${path}/${buildingId}`
  );
  return response.data;
};
