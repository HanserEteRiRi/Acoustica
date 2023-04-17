// store/modules/menu.ts
import { Module } from "vuex";
import RootState from "@/store/types";

export interface SearchHistoryState {
  searchHistory: string[];
}

const searchHistory: Module<SearchHistoryState, RootState> = {
  state: {
    searchHistory: [],
  },
  mutations: {
    addSearchHistory(state, searchTerm) {
      if (!state.searchHistory.includes(searchTerm)) {
        state.searchHistory.push(searchTerm);
      }
    },
    removeSearchHistory(state, searchTerm) {
      const index = state.searchHistory.indexOf(searchTerm);
      if (index > -1) {
        state.searchHistory.splice(index, 1);
      }
    },
    clearSearchHistory(state) {
      state.searchHistory = [];
    },
  },
};

export default searchHistory;
