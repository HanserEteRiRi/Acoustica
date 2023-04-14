<template>
  <div class="video-list">
    <div
      class="video-grid"
      v-for="(video, index) in searchResults"
      :key="index"
    >
      <div class="video-card" @click="navigateToVideo(video.url)">
        <div
          class="video-thumbnail"
          :style="`background-image: url(${video.cover})`"
        ></div>
        <div class="video-info">
          <div class="video-title">{{ video.title }}</div>
          <div class="video-artist">{{ video.artist }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { Video } from "@/types/Video"; // Make sure to update this import path to match your project structure

const props = defineProps<{
  searchResults: Video[];
}>();

const navigateToVideo = (url) => {
  if (url) {
    window.open(url, "_blank");
  }
};
</script>

<style scoped lang="less">
.video-list {
  margin: 0 32px; // Add margin to left and right
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(280px, 1fr)
  ); // Increase the min width
  gap: 16px;

  .video-grid {
    .video-card {
      display: flex;
      flex-direction: column;
      border: 1px solid #ebebeb;
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;
      transition: box-shadow 0.3s, transform 0.3s;

      &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        transform: scale(1.05);
      }

      .video-thumbnail {
        width: 100%;
        height: 200px;
        background-size: cover;
        background-position: center;
      }

      .video-info {
        padding: 8px;

        .video-title {
          font-weight: bold;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: left;
        }

        .video-artist {
          color: #aaa;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: left;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .video-list {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
