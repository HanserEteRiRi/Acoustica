<template>
  <div class="detail-container">
    <div class="left-section">
      <img :src="currentMusic.cover" alt="Album cover" />
      <h2>{{ currentMusic.title }}</h2>
      <p>{{ currentMusic.artist }}</p>
    </div>
    <div ref="rightSection" class="right-section">
      <div
        v-for="(line, index) in currentLyric"
        :key="index"
        :class="{
          'lyric-line': true,
          'current-line': isCurrentLine(index),
        }"
        ref="lyricLines"
        @click="seekTo(line.time)"
      >
        <span>{{ line.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from "vue";
import { useStore } from "vuex";

import parseLrc from "@/utils/parseLrc";

const store = useStore();

const currentMusic = computed(() => store.state.currentMusic.currentMusic);
const currentLyric = computed(() => {
  if (!store.state.currentMusic.currentMusic.lyric) {
    return [];
  }
  return parseLrc(store.state.currentMusic.currentMusic.lyric);
});
const currentProgress = computed(
  () => store.state.currentMusic.currentProgress
);

const rightSection = ref(null);
const lyricLines = ref([]);

const isCurrentLine = (index: number) => {
  if (index === 0) {
    return currentProgress.value * 1000 < currentLyric.value[index].time;
  } else if (index === currentLyric.value.length - 1) {
    return currentProgress.value * 1000 >= currentLyric.value[index].time;
  } else {
    return (
      currentProgress.value * 1000 >= currentLyric.value[index].time &&
      currentProgress.value * 1000 < currentLyric.value[index + 1].time
    );
  }
};

watch(currentProgress, () => {
  const currentIndex = currentLyric.value.findIndex((line, index) =>
    isCurrentLine(index)
  );
  if (currentIndex !== -1 && lyricLines.value[currentIndex]) {
    lyricLines.value[currentIndex].scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  }
});

const seekTo = (time: number) => {
  store.commit("setCurrentProgress", { currentProgress: time / 1000 });
};
</script>

<style scoped lang="less">
.detail-container {
  margin-top: 20px;
  display: flex;
  height: 85%;
}

.left-section {
  flex: 0 0 36%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
}

.right-section {
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
}

.lyric-line {
  font-size: 1.5rem;
  color: #999;
  cursor: pointer;

  &:hover {
    color: #666;
  }
}

.current-line {
  font-weight: bold;
  color: #6777ef;
}

img {
  border-radius: 10%;
  max-width: 100%;
  height: auto;
}

h2 {
  margin-top: 5px;
  margin-bottom: 0;
  font-size: 1.5rem;
  font-weight: bold;
}

p {
  margin: 0;
  color: #666;
}

@media (max-width: 768px) {
  .left-section {
    display: none;
  }

  .right-section {
    flex: 1;
  }
}
</style>
