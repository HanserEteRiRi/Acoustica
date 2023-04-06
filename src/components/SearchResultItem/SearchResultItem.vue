<template>
  <div class="music-item">
    <a-row>
      <a-col :span="1"> </a-col>
      <a-col :span="1" class="index">
        <span class="item-index">{{ props.index }}</span></a-col
      >
      <a-col :span="8" class="music-item-left">
        <a-avatar :src="props.coverUrl" size="large"></a-avatar>
        <span class="item-title">{{ props.title }}</span>
      </a-col>
      <a-col :span="6" class="music-item-right">
        <span class="item-artist">{{ props.artist }}</span>
      </a-col>
      <a-col :span="8" class="icon-container"
        ><heart-outlined @click="handleStar" class="icon" />
        <plus-outlined @click="addMusic" class="icon" />
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useStore } from "vuex";
import { PlusOutlined, HeartOutlined } from "@ant-design/icons-vue";
import { Music } from "@/types/music";

const store = useStore();

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  coverUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
});

const music: Music = {
  name: props.title,
  artist: props.artist,
  cover: props.coverUrl,
};

const handleClick = () => {
  // console.log("click");
  store.dispatch("currentMusic", {
    coverUrl: props.coverUrl,
    title: props.title,
    artist: props.artist,
  });
};

const addMusic = () => {
  store.dispatch("addMusic", { music: music });
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
  border: 1px solid transparent;
  border-radius: 10px;
  /* transition: all 0.3s; */
  border-color: rgba(0, 0, 0, 0.1);
  /* align-items: center; */
}

.music-item:hover {
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
  /* font-weight: bold; */
  font-size: 15px;
}

.item-artist {
  /* text-align: right; */
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
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
