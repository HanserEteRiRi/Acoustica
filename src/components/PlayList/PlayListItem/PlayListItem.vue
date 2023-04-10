<template>
  <div class="music-item" @dblclick="handleDoubleClick">
    <a-row>
      <a-col :span="1"> </a-col>
      <a-col :span="1" class="index">
        <span class="item-index">{{ indexDisplay }}</span></a-col
      >
      <a-col :span="10" class="music-item-left">
        <!-- <a-avatar :src="props.coverUrl" size="large"></a-avatar> -->
        <span :class="titleClass">{{ props.title }}</span>
      </a-col>
      <a-col :span="8" class="music-item-right">
        <span class="item-artist">{{ props.artist }}</span>
      </a-col>
      <a-col :span="4" class="icon-container"
        ><heart-outlined @click="handleStar" class="icon" />
        <close-outlined @click="deleteMusic" class="icon" />
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { useStore } from "vuex";
import { CloseOutlined, HeartOutlined } from "@ant-design/icons-vue";
import { Music } from "@/types/music";

const store = useStore();

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  music: {
    type: Object as () => Music,
    required: true,
  },
});

const indexDisplay = computed(() => {
  return props.index + 1;
});

// computed不可删除，否则当List变化时，music不会变化
const music = computed(() => {
  return {
    index: props.index,
    name: props.music.title,
    artist: props.music.artist,
    cover: props.music.cover,
  };
});

// 播放歌曲高亮
const titleClass = computed(() => {
  console.log("currentIndex:", store.state.playList.currentIndex);
  console.log("music index:", music.value.index);
  return {
    "item-title": true,
    "item-title-playing":
      store.state.playList.currentIndex === music.value.index,
  };
});

// 删除音乐
const deleteMusic = () => {
  store.dispatch("deleteMusic", {
    music: music.value,
  });
};

// 双击播放
const handleDoubleClick = () => {
  store.dispatch("setCurrentMusic", {
    currentMusic: {
      name: props.title,
      artist: props.artist,
      cover: props.coverUrl,
      url: props.url,
    },
  });
  store.dispatch("setCurrentIndex", {
    currentIndex: props.index,
  });
};
// const handleStar = () => {};
</script>

<style scoped>
.index {
  display: flex;
  align-items: center;
}
.music-item {
  /* display: flex; */
  /* justify-content: space-between; */
  /* align-items: center; */
  width: 100%;
  padding: 8px 0;
  border-bottom: 1px solid transparent;
  /* border-top: 1px solid transparent; */
  /* border-radius: 10px; */
  /* transition: all 0.3s; */
  border-color: rgba(0, 0, 0, 0.1);
  /* align-items: center; */
  transition: transform 0.3s ease;
  cursor: pointer;
}

.music-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.1);
  /* transform: scale(1.05); */
}

.item-index {
  /* margin-right: 8px; */
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  color: #acacac;
}

.item-title {
  margin-left: 8px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.8);
  font-size: 15px;
}

.item-title-playing {
  color: #1890ff;
}

.item-artist {
  /* text-align: right; */
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.6);
}

a-row {
  width: 100%;
}

.music-item-left {
  display: flex;
  align-items: center;
}

.music-item-right {
  display: flex;
  align-items: center;

  /* justify-content: flex-end; */
}

.icon-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.icon {
  font-size: 15px;
  cursor: pointer;
  margin-right: 20px;
  transition: transform 0.2s;
}

.icon:hover {
  transform: scale(1.2);
}
</style>
