import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import user from "./modules/UserModule";
import theme from "./modules/ThemeModule";
import currentMusic from "./modules/CurrentMusicModule";

export default createStore({
  modules: {
    user,
    theme,
  },
  plugins: [
    createPersistedState({
      key: "acoustica",
      storage: window.localStorage,
    }),
  ],
});
