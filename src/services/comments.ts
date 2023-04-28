import apiClient from "./apiClient";
import { hashID } from "../utils/hashID";
import { Video } from "@/types/Video";

export const getComments = async (): Promise<any> => {
  try {
    const response = await apiClient.get("/comment");
    console.log(response);
    // const vidioList: Array<Video> = response.data.map((item: any) => {
    //   return {
    //     id: hashID(item.name, item.artist),
    //     title: item.name,
    //     artist: item.artist,
    //     cover: item.pic,
    //     url: item.url,
    //   };
    // });
    // console.log(vidioList);
    // return vidioList;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
