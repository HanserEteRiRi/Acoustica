import { Module } from "vuex";
import RootState from "@/store/types";

export interface CurrentMusicState {
  hasMusic: boolean; // 是否有音乐
  currentMusic: string; // 当前播放的音乐
  singer: string; // 歌手
  cover: string; // 封面
  album: string; // 专辑
  lyric: string; // 歌词
  duration: number; // 播放时长
  currentTime: number; // 当前播放时间
  isPlaying: boolean; // 是否正在播放
  isLoop: boolean; // 是否循环播放
  isRandom: boolean; // 是否随机播放
  isMuted: boolean; // 是否静音
  volume: number; // 音量
}

const currentMusic: Module<CurrentMusicState, RootState> = {
  state: {
    hasMusic: false,
    currentMusic: "",
    singer: "",
    cover: "",
    album: "",
    lyric: "",
    duration: 0,
    currentTime: 0,
    isPlaying: false,
    isLoop: false,
    isRandom: false,
    isMuted: false,
    volume: 0.5,
  },
  mutations: {
    setHasMusic(state, payload) {
      state.hasMusic = payload.hasMusic;
    },
  },
  actions: {
    setHasMusic({ commit }, payload) {
      commit("setHasMusic", payload);
    },
  },
  getters: {
    hasMusic(state) {
      return state.hasMusic;
    },
  },
};

export default currentMusic;
