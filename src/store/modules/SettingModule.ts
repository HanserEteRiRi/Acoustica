import { Module } from "vuex";
import RootState from "@/store/types";

//
export interface SettingState {
  theme: string; // 主题
  autoPlay: boolean; // 自动播放
  playMode: number; // 播放模式
  AutoReload: boolean; // 自动重载
}

const setting: Module<SettingState, RootState> = {
  state: {
    theme: "light",
    autoPlay: true,
    playMode: 0,
    AutoReload: true,
  },

  mutations: {
    setTheme(state, payload) {
      state.theme = payload.theme;
    },
    setAutoPlay(state, payload) {
      state.autoPlay = payload.autoPlay;
    },
    setPlayMode(state, payload) {
      state.playMode = payload.playMode;
    },
    setAutoReload(state, payload) {
      state.AutoReload = payload.AutoReload;
    },
  },

  actions: {},

  getters: {},
};

export default setting;
