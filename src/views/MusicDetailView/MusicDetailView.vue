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
        :class="{ 'current-line': isCurrentLine(index) }"
        ref="lyricLines"
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
const currentLyric = computed(() =>
  parseLrc(store.state.currentMusic.currentMusic.lyric)
);
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
</script>

<style scoped>
.detail-container {
  display: flex;
  height: 100%;
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
  margin-top: 10px;
  height: 80vh; /* 设置固定高度 */
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto; /* 允许垂直滚动 */
}

.current-line {
  font-weight: bold;
  color: #f00;
}

img {
  max-width: 100%;
  height: auto;
}

h2 {
  margin: 20px 0 10px;
}

p {
  margin: 0;
}
</style>
