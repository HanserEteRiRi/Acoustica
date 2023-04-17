import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import user from "./modules/UserModule";
import theme from "./modules/ThemeModule";
import playList from "./modules/PlayListModule";
import currentMusic from "./modules/CurrentMusicModule";
import menu from "./modules/MemuModule";

export default createStore({
  modules: {
    user,
    theme,
    playList,
    currentMusic,
    menu,
  },
  plugins: [
    // vuex持久化
    createPersistedState({
      key: "acoustica",
      storage: window.localStorage,
    }),
  ],
});
