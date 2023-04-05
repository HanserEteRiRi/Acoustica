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
      <a-menu-item key="/setting" @click="handleMenuClick('/playback')">
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
// const theme = computed(() => store.state.theme.currentTheme);
const selectedKeys = ref<string[]>(
  // read from local storage
  [localStorage.getItem("selectedKeys") || "/"]
);
const router = useRouter();

// 点击Menu实现路由跳转
function handleMenuClick(path: RouteLocationNormalizedLoaded["path"]) {
  // set selectedKeys to local storage
  localStorage.setItem("selectedKeys", path);
  router.push(path);
}
</script>

<style scoped>
.logo {
  color: #fff;
  font-size: 18px;
  float: left;
  margin-right: 32px;
  line-height: 64px;
}
</style>
