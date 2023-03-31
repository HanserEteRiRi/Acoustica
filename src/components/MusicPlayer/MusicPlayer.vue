<template>
  <div class="music-player">
    <audio
      ref="audioRef"
      src="https://www.bensound.com/bensound-music/bensound-ukulele.mp3"
      @timeupdate="updateProgress"
      @loadedmetadata="setSliderMax"
    ></audio>
    <a-row class="inner-music-player">
      <a-col :span="1.8" style="height: 100%">
        <img
          class="album-cover"
          :src="albumCover"
          alt="Album cover"
          @error="onImageError"
        />
      </a-col>
      <a-col :span="4" style="height: 100%">
        <div class="song-info">
          <div class="song-title">secret base~君がくれたもの~</div>
          <div class="song-artist">Silent Siren</div>
        </div>
      </a-col>
      <a-col :span="15" style="height: 100%">
        <div class="player-controls">
          <div class="player-controls-up">
            <step-backward-outlined class="control-icon" />
            <caret-right-outlined
              class="control-icon"
              @click="togglePlay"
              v-show="!isPlaying"
            />
            <pause-outlined
              class="control-icon"
              @click="togglePlay"
              v-show="isPlaying"
            />
            <step-forward-outlined class="control-icon" />
          </div>
          <div class="player-controls-down">
            <a-slider
              v-model="currentProgress"
              @change="seek"
              class="slider"
            ></a-slider>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import defaultAlbumCover from "@/assets/logo.png";

import {
  StepBackwardOutlined,
  CaretRightOutlined,
  StepForwardOutlined,
  PauseOutlined,
} from "@ant-design/icons-vue";

const audioRef = ref(null);
const isPlaying = ref(false);
const currentProgress = ref(0);
const sliderMax = ref(0);

const albumCover = ref("f");

function onImageError() {
  console.log("error");
  albumCover.value = defaultAlbumCover;
}

function togglePlay() {
  if (isPlaying.value) {
    audioRef.value.pause();
  } else {
    audioRef.value.play();
  }
  isPlaying.value = !isPlaying.value;
}

function updateProgress() {
  currentProgress.value = audioRef.value.currentTime;
}

function setSliderMax() {
  sliderMax.value = audioRef.value.duration;
}

function seek(value) {
  audioRef.value.currentTime = value;
}

// 在组件挂载时，为audio元素添加事件监听器
onMounted(() => {
  audioRef.value.addEventListener("ended", () => {
    isPlaying.value = false;
  });
});

// 在组件卸载时，移除事件监听器
onUnmounted(() => {
  audioRef.value.removeEventListener("ended", () => {
    isPlaying.value = false;
  });
});
</script>

<style lang="less" scoped>
.music-player {
  height: 58px;
  position: absolute;
  bottom: 3%;
  left: 2%;
  right: 2%;
  background-color: #ffffff;
  padding: 8px 16px;
  box-shadow: 0 0px 8px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  z-index: 1000;
}

.inner-music-player {
  height: 100%;
}

.album-cover {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  transition: transform 0.2s;
}

.album-cover:hover {
  transform: scale(1.2); /* 放大图标 */
}

.song-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding-left: 10px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-title {
  font-size: 14px;
  font-weight: bolder;
}
.song-artist {
  font-size: 8px;
}

.player-controls {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding-left: 10px;
}

.control-icon {
  font-size: 24px;
  margin: 0 5px;
  cursor: pointer;
  transition: transform 0.2s; /* 添加平滑过渡效果 */
}

.control-icon:hover {
  transform: scale(1.2); /* 放大图标 */
}

.player-controls-up {
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.player-controls-down {
  // display: flex;
  // justify-content: center;
  // align-items: center;
  width: 100%;
}

.slider {
  margin-top: 3px;
  margin-bottom: 0;
}

.progress-bar-container {
  /* 根据需要，您可以在此处添加歌曲进度条的样式 */
}
</style>
