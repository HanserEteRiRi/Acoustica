import { Module } from "vuex";
import RootState from "@/store/types";
import { Music } from "@/types/music";

export interface CurrentMusicState {
  currentMusic: Music;
  hasMusic: boolean;
  currentProgress: number; // 当前播放进度（秒）
  sliderMax: number; // 滑块最大值（秒）
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
    currentProgress: 0,
    sliderMax: 0,
  },
  mutations: {
    setHasMusic(state, payload) {
      state.hasMusic = payload.hasMusic;
    },
    setCurrentMusic(state, payload) {
      state.currentMusic = payload.currentMusic;
      state.hasMusic = true;
      state.currentProgress = 0;
      state.sliderMax = 0.1; //初值设为0.1秒，防止当歌曲加载失败时，滑块位于进度条中间，且无法拖动
      // console.log("set CurrentMusic:", state.currentMusic);
    },
    setCurrentProgress(state, payload) {
      state.currentProgress = payload.currentProgress;
    },
    setSliderMax(state, payload) {
      state.sliderMax = payload.sliderMax;
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
    removeCurrentMusic({ commit }) {
      commit("setCurrentMusic", {
        currentMusic: {
          id: "",
          title: "请选择音乐",
          artists: [],
          artist: "none",
          cover: "https://www.bensound.com/bensound-img/ukulele.jpg",
          url: "https://www.bensound.com/bensound-music/bensound-ukulele.mp3",
          lyric: "",
        },
      });
    },
  },
  getters: {
    hasMusic(state) {
      return state.hasMusic;
    },
  },
};

export default currentMusic;
