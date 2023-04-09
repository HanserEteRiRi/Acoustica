import { Module } from "vuex";
import RootState from "@/store/types";
import { Music } from "@/types/music";

export interface CurrentMusicState {
  currentMusic: Music;
  hasMusic: boolean;
}

const currentMusic: Module<CurrentMusicState, RootState> = {
  state: {
    currentMusic: {
      id: "",
      name: "请选择音乐",
      artists: [],
      artist: "none",
      cover: "https://www.bensound.com/bensound-img/ukulele.jpg",
      url: "",
      lrc: "",
    },
    hasMusic: false,
  },
  mutations: {
    setHasMusic(state, payload) {
      state.hasMusic = payload.hasMusic;
    },
    setCurrentMusic(state, payload) {
      state.currentMusic = payload.currentMusic;
    },
  },
  actions: {
    setHasMusic({ commit }, payload) {
      commit("setHasMusic", payload);
    },
    setCurrentMusic({ commit }, payload) {
      commit("setCurrentMusic", payload);
    },
  },
  getters: {
    hasMusic(state) {
      return state.hasMusic;
    },
  },
};

export default currentMusic;
