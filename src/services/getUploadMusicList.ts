import apiClient from "./apiClient";
import { Music } from "../types/music";
import { hashID } from "../utils/hashID";

export const getUploadMusicList = async (value: string): Promise<any> => {
  try {
    //
    const response = await apiClient.get("/upload/getlist");
    console.log(response);
    // const MusicList: Array<Music> = response.data.map((item: any) => {
    //   return {
    //     id: hashID(item.name, item.artist),
    //     title: item.name,
    //     artist: item.artist,
    //     artists: item.artists,
    //     cover: item.pic,
    //     url: item.url,
    //     lyric: item.lyric,
    //   };
    // });
    // return MusicList;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
