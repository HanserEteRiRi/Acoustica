import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import user from "./modules/UserModule";
import theme from "./modules/ThemeModule";
import playList from "./modules/PlayListModule";
import currentMusic from "./modules/CurrentMusicModule";

export default createStore({
  modules: {
    user,
    theme,
    playList,
  },
  plugins: [
    createPersistedState({
      key: "acoustica",
      storage: window.localStorage,
    }),
  ],
});
