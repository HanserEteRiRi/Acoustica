import { Module } from "vuex";
import RootState from "@/store/types";
import { Music } from "@/types/music";
import { ActionReasult } from "@/types/ActionReasult";

interface PlayItem extends Music {
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
      let indexToDelete = -1;
      state.playList.some((item, index) => {
        if (item.id === payload.music.id) {
          indexToDelete = index;
          console.log("deleteMusic success");
          return true;
        } else {
          console.log("deleteMusic failed");
          return false;
        }
      });
      if (indexToDelete !== -1) {
        state.playList.splice(indexToDelete, 1);
        console.log("deleteMusic success");
        if (indexToDelete !== state.currentIndex) {
          if (indexToDelete < state.currentIndex) {
            // 删除的歌曲在当前播放歌曲之前
            state.currentIndex--;
          }
        } else {
          // 删除的歌曲是当前播放歌曲,需要重新设置当前播放歌曲
          if (state.playList.length === 0) {
            state.currentIndex = -1;
          } else if (state.currentIndex === state.playList.length) {
            state.currentIndex = 0;
          }
        }
      } else {
        console.log("deleteMusic failed");
      }
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
      console.log(state.playList);
      const index = state.playList.findIndex((item) => {
        return item.id === payload.music.id;
      });
      const musicExist = index !== -1;
      if (musicExist) {
        if (payload.mode === "play") {
          this.dispatch("setCurrentIndex", {
            currentIndex: index,
          });
        }
        return {
          success: false,
          message: "This music is already in the play list.",
        };
      } else {
        console.log(state.playList);
        commit("addMusic", payload);
        if (payload.mode === "play") {
          this.dispatch("setCurrentIndex", {
            currentIndex: state.playList.length - 1,
          });
        }
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
      this.dispatch("playMusicByIndex");
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
      this.dispatch("setCurrentMusic", {
        currentMusic: state.playList[state.currentIndex],
      });
    },
    playMusicByIndex({ state }) {
      if (state.currentIndex === -1) {
        // 播放列表为空,清空当前播放歌曲
        this.dispatch("removeCurrentMusic");
      } else {
        this.dispatch("setCurrentMusic", {
          // 播放列表不为空，播放当前歌曲
          currentMusic: state.playList[state.currentIndex],
        });
      }
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
