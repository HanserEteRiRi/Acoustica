import apiClient from "./apiClient";
import { Music } from "../types/Music";
import { hashID } from "../utils/hashID";

const host = "http://43.138.199.62:3000";
const coverApi = "/upload/getImg?song=";
const urlApi = "/upload/getUploadMusic?song=";

export const getUploadMusicList = async (): Promise<any> => {
  try {
    /*  /upload/getlist 返回结果
     *  {pk, name, userid}
     */
    const response = await apiClient.get("/upload/getlist");
    console.log(response);
    const MusicList: Array<Music> = response.data.map((item: any) => {
      return {
        id: hashID(item.name, ""),
        title: item.name,
        artist: "",
        artists: [],
        cover: host + coverApi + item.name,
        url: host + urlApi + item.name,
        lyric: "",
      };
    });
    return MusicList;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
