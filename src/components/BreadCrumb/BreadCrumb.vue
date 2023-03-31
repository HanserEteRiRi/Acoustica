<template>
  <a-breadcrumb :routes="routes">
    <template #itemRender="{ route, routes, paths }">
      <span v-if="routes.indexOf(route) === routes.length - 1">{{
        route.breadcrumbName
      }}</span>
      <router-link v-else :to="paths.join('/')">{{
        route.breadcrumbName
      }}</router-link>
    </template>
  </a-breadcrumb>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
interface Route {
  path: string;
  breadcrumbName: string;
  children?: Array<{
    path: string;
    breadcrumbName: string;
  }>;
}
const routes = ref<Route[]>([]);
const route = useRoute();

// 监听 $route 对象的变化，动态更新路由配置
watch(route, () => {
  const path = route.path;
  routes.value = getPathRoutes(path);
});

// 根据当前路径获取对应的路由配置
function getPathRoutes(path: string): Route[] {
  const paths = path.split("/");
  const routes = paths.map((p, i) => {
    const route: Route = {
      path: p,
      breadcrumbName: p,
    };
    if (i === paths.length - 1) {
      // 最后一级路由显示面包屑名称
      switch (p) {
        case "general":
          route.breadcrumbName = "通用排行榜";
          break;
        case "layout":
          route.breadcrumbName = "布局排行榜";
          break;
        case "navigation":
          route.breadcrumbName = "导航排行榜";
          break;
      }
    }
    return route;
  });
  return routes;
}

// 初始化路由配置
routes.value = getPathRoutes(route.path);
</script>
