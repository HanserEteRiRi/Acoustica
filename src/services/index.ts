import { searchMusic } from "./searchMusic";
import { searchVideo } from "./searchVidio";
import { getRankinglist } from "./getRankinglist";
import { getUploadMusicList } from "./getUploadMusicList";
import { signIn } from "./signIn";

export interface Services {
  searchMusic: typeof searchMusic;
  searchVideo: typeof searchVideo;
  getRankinglist: typeof getRankinglist;
  getUploadMusicList: typeof getUploadMusicList;
  signIn: typeof signIn;
}

const services: Services = {
  searchMusic,
  searchVideo,
  getRankinglist,
  getUploadMusicList,
  signIn,
};

export default services;
