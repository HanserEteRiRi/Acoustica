import { searchMusic } from "./searchMusic";
import { searchVideo } from "./searchVidio";

export interface Services {
  searchMusic: typeof searchMusic;
  searchVideo: typeof searchVideo;
}

const services: Services = {
  searchMusic,
  searchVideo,
};

export default services;
