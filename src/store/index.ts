import { createStore } from "vuex";

import user from "./modules/UserModule";
import theme from "./modules/ThemeModule";
import currentMusic from "./modules/CurrentMusicModule";

export default createStore({
  modules: {
    user,
    theme,
  },
});
