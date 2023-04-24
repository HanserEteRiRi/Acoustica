<template>
  <div class="music-card">
    <div
      class="music-thumbnail"
      :style="`background-image: url(${music.cover})`"
    ></div>
    <div class="music-info">
      <div class="music-title">{{ music.title }}</div>
      <div class="music-artist">{{ music.artist }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { Music } from "@/types/Music"; // Make sure to update this import path to match your project structure

const props = defineProps<{
  music: Music;
}>();
</script>

<style scoped lang="less">
.music-card {
  display: flex;
  flex-direction: column;
  // border: 1px solid #ebebeb;
  height: 290px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.3s, transform 0.3s;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    transform: scale(1.05);
  }

  .music-thumbnail {
    width: 200px;
    height: 200px;
    border-radius: 4px;
    background-size: cover;
    background-position: center;
  }

  .music-info {
    padding: 8px;

    .music-title {
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
    }

    .music-artist {
      color: #aaa;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
    }
  }
}

@media screen and (max-width: 768px) {
}
</style>
