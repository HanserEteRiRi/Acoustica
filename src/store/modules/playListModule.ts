import { Module } from "vuex";
import RootState from "@/store/types";

export interface PlayListState {
  playList: Array<any>;
  currentIndex: number;
  playMode: number;
}

// play list module
const playList: Module<PlayListState, RootState> = {
  state: {
    playList: [],
    currentIndex: -1,
    playMode: 0,
  },
  mutations: {
    setPlayList(state, payload) {
      state.playList = payload.playList;
    },
  },
  actions: {
    setPlayList({ commit }, payload) {
      commit("setPlayList", payload);
    },
  },
  getters: {
    playList(state) {
      return state.playList;
    },
  },
};
