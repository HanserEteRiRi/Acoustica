<!--  自定义播放器组件 -->
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
          :src="currentMusic.cover"
          alt="Album cover"
          @error="onImageError"
        />
      </a-col>
      <a-col :span="4" style="height: 100%">
        <div class="song-info">
          <div class="song-title">{{ currentMusic.name }}</div>
          <div class="song-artist">{{ currentMusic.artist }}</div>
        </div>
      </a-col>
      <a-col :span="15" style="height: 100%">
        <div class="player-controls">
          <div class="player-controls-up">
            <!-- 上一首 -->
            <step-backward-outlined class="control-icon" />
            <!-- 播放/暂停 -->
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
            <!-- 下一首 -->
            <step-forward-outlined class="control-icon" />
          </div>
          <a-row type="flex" class="player-controls-down">
            <!-- 播放器进度条 -->
            <a-col
              flex="35px"
              style="
                display: flex
                align-items: center;
                justify-content: center;
              "
            >
              <span class="current-time unselectable-text">{{
                currentTime
              }}</span>
            </a-col>
            <a-col flex="auto">
              <a-slider
                v-model:value="currentProgress"
                @change="seek"
                class="slider"
                :max="sliderMax"
                :tip-formatter="null"
              ></a-slider>
            </a-col>
            <a-col
              flex="35px"
              style="
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <span class="duration unselectable-text">{{ duration }}</span>
            </a-col>
          </a-row>
        </div>
      </a-col>
      <a-col :span="3" style="height: 100%">
        <div class="player-left">
          <!-- <sound-outlined class="control-icon-left" @click="toggleVolume" /> -->
          <SetVolume @volume-change="handleVolumeChange" />
          <menu-fold-outlined
            class="control-icon-left"
            @click="togglePlayMenu"
            v-show="!showMenu"
          />
          <menu-unfold-outlined
            class="control-icon-left"
            @click="togglePlayMenu"
            v-show="showMenu"
          />
          <PlayList :visible="showMenu" @show-play-list="handleShowPlayList" />
          <cloud-download-outlined class="control-icon-left" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";

import defaultAlbumCover from "@/assets/logo.png";
import SetVolume from "./SetVolume/SetVolume.vue";
import PlayList from "@/components/PlayList/PlayList.vue";

import {
  StepBackwardOutlined,
  CaretRightOutlined,
  StepForwardOutlined,
  PauseOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { Music } from "@/types/music";

const store = useStore();

const audioRef = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);
const currentProgress = ref(0);
const sliderMax = ref(0);
const albumCover = ref(defaultAlbumCover);
const showMenu = ref(false);
const showVolume = ref(false);

const currentMusic = computed(() => store.state.currentMusic);

const onImageError = () => {
  albumCover.value = defaultAlbumCover;
};

// 计算当前播放时间
const currentTime = computed(() => {
  const time = Math.floor(currentProgress.value);
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
});

// 计算总时间
const duration = computed(() => {
  const time = Math.floor(sliderMax.value);
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
});

function togglePlay() {
  if (audioRef.value) {
    if (isPlaying.value) {
      audioRef.value.pause();
    } else {
      audioRef.value.play();
    }
    isPlaying.value = !isPlaying.value;
  }
}

const toggleVolume = () => {
  showVolume.value = !showVolume.value;
};

function handleVolumeChange(value: number) {
  if (audioRef.value) {
    audioRef.value.volume = value / 100;
  }
}

function handleShowPlayList(isShow: boolean) {
  showMenu.value = isShow;
}

function togglePlayMenu() {
  showMenu.value = !showMenu.value;
}

function updateProgress() {
  if (audioRef.value) {
    currentProgress.value = audioRef.value.currentTime;
    if (audioRef.value.currentTime === audioRef.value.duration) {
      isPlaying.value = false;
    }
  }
}

function setSliderMax() {
  if (audioRef.value) {
    sliderMax.value = audioRef.value.duration;
  }
}

function seek(value: number) {
  if (audioRef.value) {
    audioRef.value.currentTime = value;
  }
}

// 在组件挂载时，为audio元素添加事件监听器
onMounted(() => {
  if (!audioRef.value) return;
  audioRef.value.addEventListener("ended", () => {
    isPlaying.value = false;
  });
});

// 在组件卸载时，移除事件监听器
onUnmounted(() => {
  if (!audioRef.value) return;
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
  cursor: pointer;
}

.album-cover:hover {
  transform: scale(1.2);
  /* 放大图标 */
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
  transition: transform 0.2s;
  /* 添加平滑过渡效果 */
}

.control-icon:hover {
  transform: scale(1.2);
  /* 放大图标 */
}

.player-left {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  padding-left: 10px;
  align-items: center;
}

.control-icon-left {
  font-size: 18px;
  margin: 0 5px;
  cursor: pointer;
  transition: transform 0.2s;
  /* 添加平滑过渡效果 */
}

.control-icon-left:hover {
  transform: scale(1.2);
  /* 放大图标 */
}

.player-controls-up {
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.player-controls-down {
  // align-items: center;
  // display: flex;
  // flex-direction: row;
  width: 100%;
}

.current-time {
  font-size: 10px;
  color: #999;
  text-align: center;
  transform: transform 0.2s;
  cursor: pointer;
}

.current-time:hover {
  transform: scale(1.2);
}

.duration {
  font-size: 10px;
  color: #999;
  text-align: center;
  transform: transform 0.2s;
  cursor: pointer;
}

.duration:hover {
  transform: scale(1.2);
}

.slider {
  margin-top: 3px;
  margin-bottom: 0;
}
</style>
