import { Module } from "vuex";
import RootState from "@/store/types";

//
export interface UserState {
  isLoggedIn: boolean;
  username: string;
  email: string;
  favorites: string[];
}

const user: Module<UserState, RootState> = {
  namespaced: true,

  state: {
    isLoggedIn: false,
    username: "",
    email: "",
    favorites: [],
  },

  mutations: {
    login(state, payload) {
      state.isLoggedIn = true;
      state.username = payload.username;
      state.email = payload.email;
    },

    logout(state) {
      state.isLoggedIn = false;
      state.username = "";
      state.email = "";
      state.favorites = [];
    },

    addFavorite(state, payload) {
      state.favorites.push(payload.songId);
    },

    removeFavorite(state, payload) {
      state.favorites = state.favorites.filter((id) => id !== payload.songId);
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

    addFavorite({ commit }, payload) {
      // 将歌曲添加到收藏列表
      // ...
      commit("addFavorite", payload);
    },

    removeFavorite({ commit }, payload) {
      // 将歌曲从收藏列表中删除
      // ...
      commit("removeFavorite", payload);
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
