import { Module } from "vuex";
import RootState from "@/store/types";

//
export interface UserState {
  isLoggedIn: boolean;
  id: string;
  username: string;
  email: string;
  favorites: string[];
  token: string;
}

const user: Module<UserState, RootState> = {
  state: {
    isLoggedIn: false,
    id: "000",
    username: "faefa",
    email: "",
    favorites: [],
    token: "",
  },

  mutations: {
    login(state, payload) {
      state.isLoggedIn = true;
      state.id = payload.id;
      state.username = payload.username;
      state.email = payload.email;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.id = "";
      state.username = "未登录";
      state.email = "";
      state.favorites = [];
    },
    setToken(state, payload) {
      state.token = payload.token;
    },
  },

  actions: {
    login({ commit }, payload) {
      // 实现登录逻辑
      // ...
      commit("login", payload);
    },

    logout({ commit }) {
      // 实现退出逻辑
      // ...
      commit("logout");
    },
  },

  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn;
    },

    username(state) {
      return state.username;
    },

    email(state) {
      return state.email;
    },

    favorites(state) {
      return state.favorites;
    },
  },
};

export default user;
