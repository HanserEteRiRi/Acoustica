import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import StarPlugin from "./plugins/star";
import draggable from "vuedraggable";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "./assets/global.less";
import services from "./services";
import device from "./plugins/device";
import lazyLoad from "./directives/lazyLoad";

const app = createApp(App);

app.use(device);
app.use(store);
app.use(router);
app.use(Antd);
app.component("VueDraggable", draggable);
app.use(StarPlugin, { store });
app.provide("services", services);
app.directive("lazy-load", lazyLoad);

app.mount("#app");
