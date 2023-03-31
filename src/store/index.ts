import { createStore } from "vuex";

import user from "./modules/UserModule";
import theme from "./modules/ThemeModule";

export default createStore({
  modules: {
    user,
    theme,
  },
});
