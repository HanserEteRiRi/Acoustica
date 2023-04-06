import { Module } from "vuex";
import RootState from "@/store/types";
import { Music } from "@/types/music";

export interface PlayListState {
  playList: Array<Music>;
  count: number;
  currentIndex: number;
  playMode: number;
}

// play list module
const playList: Module<PlayListState, RootState> = {
  state: {
    playList: [],
    count: 0,
    currentIndex: -1,
    playMode: 0,
  },
  mutations: {
    setPlayList(state, payload) {
      state.playList = payload.playList;
    },
    addMusic(state, payload) {
      state.playList.push(payload.music);
    },
    setCurrentIndex(state, payload) {
      state.currentIndex = payload.currentIndex;
    },
    setPlayMode(state, payload) {
      state.playMode = payload.playMode;
    },
    emptyPlayList(state) {
      state.playList = [];
    },
    deleteMusic(state, payload) {
      state.playList.splice(payload.index, 1);
    },
  },
  actions: {
    setPlayList({ commit }, payload) {
      commit("setPlayList", payload);
    },
    addMusic({ commit, state }, payload) {
      if (!payload.music) return;
      // if already has this music
      if (payload.music in state.playList) {
      } else {
        console.log(state.playList);
        commit("addMusic", payload);
      }
    },
    setCurrentIndex({ commit }, payload) {
      commit("setCurrentIndex", payload);
    },
    setPlayMode({ commit }, payload) {
      commit("setPlayMode", payload);
    },
    emptyPlayList({ commit }) {
      commit("emptyPlayList");
    },
    deleteMusic({ commit }, payload) {
      commit("deleteMusic", payload);
    },
  },
  getters: {
    playList(state) {
      return state.playList;
    },
    currentIndex(state) {
      return state.currentIndex;
    },
    playMode(state) {
      return state.playMode;
    },
    nextMusic(state) {
      if (state.playMode === 0) {
        state.currentIndex++;
        return state.playList[state.currentIndex + 1];
      } else if (state.playMode === 1) {
        state.currentIndex = Math.floor(Math.random() * state.playList.length);
        return state.playList[state.currentIndex];
      } else if (state.playMode === 2) {
        return state.playList[state.currentIndex];
      }
    },
  },
};

export default playList;
