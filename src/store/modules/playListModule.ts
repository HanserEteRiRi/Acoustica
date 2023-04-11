import { Module } from "vuex";
import RootState from "@/store/types";
import { Music } from "@/types/music";
import { ActionReasult } from "@/types/ActionReasult";

interface PlayItem {
  music: Music;
  isPlaying: boolean;
}

export interface PlayListState {
  playList: Array<PlayItem>;
  count: number;
  currentIndex: number;
  playMode: number;
}

// play list module
const playList: Module<PlayListState, RootState> = {
  state: {
    playList: [],
    count: 0,
    currentIndex: 0,
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
      console.log("setCurrentIndex:", state.currentIndex);
    },
    setPlayMode(state, payload) {
      state.playMode = payload.playMode;
    },
    clearPlayList(state) {
      state.playList = [];
    },
    deleteMusic(state, payload) {
      console.log("deleteMusic:", payload.music.name, payload.music.artist);
      state.playList.some((item, index) => {
        if (
          item.music.title === payload.music.title &&
          item.music.artist === payload.music.artist
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
    moveMusic(state, payload) {
      const { oldIndex, newIndex } = payload;
      const music = state.playList.splice(oldIndex, 1)[0];
      state.playList.splice(newIndex, 0, music);
    },
  },
  actions: {
    setPlayList({ commit }, payload) {
      commit("setPlayList", payload);
    },
    addMusic({ commit, state }, payload): ActionReasult {
      if (!payload.music) return { success: false, message: "Music is null." };
      commit("clearPlayList");
      console.log("addMusic:", payload.music.title, payload.music.artist);
      console.log(state.playList);
      const musicExist = state.playList.some((item) => {
        return (
          item.music.title === payload.music.title &&
          item.music.artist === payload.music.artist
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
    moveMusic({ commit }, payload) {
      commit("moveMusic", payload);
    },
    nextMusic({ commit, state }) {
      if (state.playMode === 0) {
        state.currentIndex++;
        if (state.currentIndex >= state.playList.length) {
          state.currentIndex = 0;
        }
      } else if (state.playMode === 1) {
        state.currentIndex = Math.floor(Math.random() * state.playList.length);
      } // else if (state.playMode === 2) {循环播放}，不需要改变currentIndex
      commit("setCurrentIndex", { currentIndex: state.currentIndex });
      this.dispatch("currentMusic/setCurrentMusic", {
        currentMusic: state.playList[state.currentIndex],
      });
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
  },
};

export default playList;
