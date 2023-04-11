import { searchMusic } from "./searchMusic";

export interface Services {
  searchMusic: typeof searchMusic;
}

const services: Services = {
  searchMusic,
};

export default services;
