import apiClient from "./apiClient";
import { Music } from "../types/music";

export const searchMusic = async (value: string): Promise<any> => {
  try {
    const response = await apiClient.post("/search", { searchMusic: value });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
