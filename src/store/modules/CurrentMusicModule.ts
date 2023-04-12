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
      title: "请选择音乐",
      artists: [],
      artist: "none",
      cover: "https://www.bensound.com/bensound-img/ukulele.jpg",
      url: "https://www.bensound.com/bensound-music/bensound-ukulele.mp3",
      lyric: "",
    },
    hasMusic: false,
  },
  mutations: {
    setHasMusic(state, payload) {
      state.hasMusic = payload.hasMusic;
    },
    setCurrentMusic(state, payload) {
      state.currentMusic = payload.currentMusic;
      console.log("set CurrentMusic:", state.currentMusic);
    },
  },
  actions: {
    setHasMusic({ commit }, payload) {
      if (!payload.hasMusic) return;
      commit("setHasMusic", payload);
    },
    setCurrentMusic({ commit }, payload) {
      if (!payload.currentMusic) return;
      commit("setCurrentMusic", payload);
      this.dispatch("addMusic", { music: payload.currentMusic, mode: "play" });
    },
  },
  getters: {
    hasMusic(state) {
      return state.hasMusic;
    },
  },
};

export default currentMusic;
