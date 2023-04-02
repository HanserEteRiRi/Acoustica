<template>
  <div class="main-layout">
    <a-layout theme="light">
      <HeaderBar />
      <a-layout>
        <div class="layout-sider-wrapper">
          <a-layout-sider
            class="layout-sider"
            theme="light"
            style="min-height: 100vh"
            v-model:collapsed="collapsed"
            collapsible
          >
            <SiderBar />
          </a-layout-sider>
        </div>

        <a-layout class="content-layout">
          <a-layout-content class="main-content">
            <div class="bread-crumb">
              <!-- <BreadCrumb /> -->
            </div>
            <router-view></router-view>
          </a-layout-content>
          <!-- <div class="music-player-wrapper"> -->
          <MusicPlayer />
          <!-- </div> -->
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HeaderBar from "@/components/HeaderBar/HeaderBar.vue";
import SiderBar from "@/components/SiderBar/SiderBar.vue";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb.vue";
import MusicPlayer from "../MusicPlayer/MusicPlayer.vue";

const collapsed = ref<boolean>(false);
</script>

<style scoped lang="less">
.content-layout {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 设置容器的高度为视口的高度 */
  bottom: 0;
  height: 95vh;
  position: relative;
  height: calc(100vh - 64px);
}

.layout-sider-wrapper {
  border-right: 0.5px solid rgba(0, 0, 0, 0.1);
}
.main-content {
  // flex-grow: 1;
  background: #fff;
  overflow-y: auto;
  flex-grow: 1;
}

.main-layout {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}
.layout {
  height: 100%;
  overflow: auto;
}
.layout-sider {
  // border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.bread-crumb {
}
</style>
