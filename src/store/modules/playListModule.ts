import { Module } from "vuex";
import RootState from "@/store/types";
import { Music } from "@/types/music";
import { ActionReasult } from "@/types/ActionReasult";

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
    clearPlayList(state) {
      state.playList = [];
    },
    deleteMusic(state, payload) {
      console.log("deleteMusic:", payload.music.name, payload.music.artist);
      state.playList.some((music, index) => {
        if (
          music.name === payload.music.name &&
          music.artist === payload.music.artist
        ) {
          state.playList.splice(index, 1);
          console.log("deleteMusic success");
          return true;
        } else {
          console.log("deleteMusic failed");
          return false;
        }
      });
    },
  },
  actions: {
    setPlayList({ commit }, payload) {
      commit("setPlayList", payload);
    },
    addMusic({ commit, state }, payload): ActionReasult {
      if (!payload.music) return { success: false, message: "Music is null." };
      const musicExist = state.playList.some((music) => {
        return (
          music.name === payload.music.name &&
          music.artist === payload.music.artist
        );
      });
      if (musicExist) {
        return {
          success: false,
          message: "This music is already in the play list.",
        };
      } else {
        console.log(state.playList);
        commit("addMusic", payload);
        return {
          success: true,
          message: "Add music to play list successfully.",
        };
      }
    },
    setCurrentIndex({ commit }, payload) {
      commit("setCurrentIndex", payload);
    },
    setPlayMode({ commit }, payload) {
      commit("setPlayMode", payload);
    },
    clearPlayList({ commit }) {
      commit("clearPlayList");
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
