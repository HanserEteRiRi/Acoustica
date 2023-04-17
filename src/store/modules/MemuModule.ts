// store/modules/menu.ts
import { Module } from "vuex";
import RootState from "@/store/types";

export interface MenuState {
  selectedKeys: string[];
}

const menu: Module<MenuState, RootState> = {
  namespaced: true,
  state: {
    selectedKeys: [localStorage.getItem("selectedKeys") || "/"],
  },
  mutations: {
    setSelectedKeys(state, selectedKeys: string[]) {
      state.selectedKeys = selectedKeys;
      localStorage.setItem("selectedKeys", selectedKeys.join());
    },
  },
};

export default menu;
