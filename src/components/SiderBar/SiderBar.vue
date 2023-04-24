<template>
  <a-layout>
    <div class="logo"></div>
    <a-menu theme="light" v-model:selected-keys="selectedKeys">
      <a-menu-item key="/" @click="handleMenuClick('/')">
        <pie-chart-outlined />
        <span>主页</span>
      </a-menu-item>
      <a-menu-item key="/charts" @click="handleMenuClick('/charts')">
        <DesktopOutlined />
        <span>排行榜</span>
      </a-menu-item>
      <a-menu-item key="/community" @click="handleMenuClick('/community')">
        <TeamOutlined />
        <span>社区</span>
      </a-menu-item>
      <a-menu-item key="/upload" @click="handleMenuClick('/upload')">
        <UserOutlined />
        <span>上传</span>
      </a-menu-item>
      <a-menu-item key="/setting" @click="handleMenuClick('/setting')">
        <FileOutlined />
        <span>设置</span>
      </a-menu-item>
    </a-menu>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute, RouteLocationNormalizedLoaded } from "vue-router";
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons-vue";

const store = useStore();
const router = useRouter();
// const theme = computed(() => store.state.theme.currentTheme);
const selectedKeys = computed(() => store.state.menu.selectedKeys);

// 点击Menu实现路由跳转
function handleMenuClick(path: RouteLocationNormalizedLoaded["path"]) {
  // set selectedKeys to local storage
  store.commit("menu/setSelectedKeys", [path]);
  router.push(path);
}
</script>

<style lang="less" scoped>
.logo {
  color: #fff;
  font-size: 18px;
  float: left;
  margin-right: 32px;
  line-height: 64px;
}

::v-deep .ant-menu-item-selected {
  background-color: #6777ef !important;
  margin: 0 2px;
  border-radius: 5px;

  span {
    color: #fff;
  }

  svg {
    fill: #fff;
  }
}
</style>
