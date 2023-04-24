import apiClient from "./apiClient";
import { Music } from "../types/Music";
import { hashID } from "../utils/hashID";

export const signIn = async (
  name: string,
  pwd: string,
  type: string // register or login
): Promise<any> => {
  try {
    const response = await apiClient.post("/search", {
      name: name,
      pwd: pwd,
      type: type,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
