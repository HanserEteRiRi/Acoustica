import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainLayout from "@/components/MainLayout/MainLayout.vue";
import HomeView from "../views/HomeView/HomeView.vue";
import Charts from "@/views/ChartsView/ChartsView.vue";
import Community from "@/views/CommunityView/CommunityView.vue";
import Upload from "@/views/UploadView/UploadView.vue";
import RankDetail from "@/views/RankDetailView/RankDetailView.vue";
import SearchView from "@/views/SearchView/SearchView.vue";
import SettingView from "@/views/SettingView/SettingView.vue";
import MusicDetailView from "@/views/MusicDetailView/MusicDetailView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "mainLayout",
    component: MainLayout,
    children: [
      {
        path: "/",
        name: "HomeView",
        component: HomeView,
      },
      {
        path: "charts",
        name: "Charts",
        component: Charts,
        children: [
          {
            path: ":lang",
            name: "RankDetail",
            component: RankDetail,
          },
        ],
      },
      {
        path: "community",
        name: "Community",
        component: Community,
      },
      {
        path: "upload",
        name: "upload",
        component: Upload,
      },
      {
        path: "search",
        name: "search",
        component: SearchView,
      },
      {
        path: "playback",
        name: "playback",
        component: SettingView,
      },
      {
        path: "detail",
        name: "detail",
        component: MusicDetailView,
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/AboutView/AboutView.vue"
      ),
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
