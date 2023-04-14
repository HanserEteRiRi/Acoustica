import apiClient from "./apiClient";
import { hashID } from "../utils/hashID";
import { Video } from "@/types/Video";

export const searchVideo = async (value: string): Promise<any> => {
  try {
    if (!value) return;
    const response = await apiClient.post("/mvlist", { searchMv: value });
    const vidioList: Array<Video> = response.data.map((item: any) => {
      return {
        id: hashID(item.name, item.artist),
        title: item.name,
        artist: item.artist,
        cover: item.pic,
        url: item.url,
      };
    });
    console.log(vidioList);
    return vidioList;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
