import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import user from "./modules/UserModule";
import playList from "./modules/PlayListModule";
import currentMusic from "./modules/CurrentMusicModule";
import menu from "./modules/MemuModule";
import setting from "./modules/SettingModule";

export default createStore({
  modules: {
    user,
    playList,
    currentMusic,
    menu,
    setting,
  },
  plugins: [
    // vuex持久化
    createPersistedState({
      key: "acoustica",
      storage: window.localStorage,
    }),
  ],
});
