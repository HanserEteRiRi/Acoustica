import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// lazy load
const MainLayout = () => import("@/components/MainLayout/MainLayout.vue");
const HomeView = () => import("../views/HomeView/HomeView.vue");
const Charts = () => import("@/views/ChartsView/ChartsView.vue");
const Community = () => import("@/views/CommunityView/CommunityView.vue");
const Upload = () => import("@/views/UploadView/UploadView.vue");
const RankDetail = () => import("@/views/RankDetailView/RankDetailView.vue");
const SearchView = () => import("@/views/SearchView/SearchView.vue");
const SettingView = () => import("@/views/SettingView/SettingView.vue");
const MusicDetailView = () =>
  import("@/views/MusicDetailView/MusicDetailView.vue");

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
        path: "setting",
        name: "setting",
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
