import { Module } from "vuex";
import RootState from "@/store/types";

export interface ThemeState {
  currentTheme: string;
}

const theme: Module<ThemeState, RootState> = {
  state: {
    currentTheme: "light",
  },
  mutations: {
    toggleTheme(state) {
      state.currentTheme = state.currentTheme === "light" ? "dark" : "light";
    },
  },
  actions: {
    toggleTheme({ commit }) {
      commit("toggleTheme");
    },
  },
  getters: {
    currentTheme(state) {
      return state.currentTheme;
    },
  },
};

export default theme;
