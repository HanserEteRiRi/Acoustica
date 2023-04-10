import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import StarPlugin from "./plugins/star";
import draggable from "vuedraggable";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "./assets/global.less";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(Antd);
app.component("VueDraggable", draggable);
app.use(StarPlugin, { store });

app.mount("#app");
