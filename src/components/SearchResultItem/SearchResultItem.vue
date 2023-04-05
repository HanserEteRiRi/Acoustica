<template>
  <div class="music-item" @click="handleClick">
    <a-row>
      <a-col :span="2">
        
      </a-col>
      <a-col :span="8" class="music-item-left">
        <span class="item-index">{{ props.index }}</span>
        <a-avatar :src="props.coverUrl" size="large"></a-avatar>
        <span class="item-title">{{ props.title }}</span>
      </a-col>
      <a-col :span="6" class="music-item-right">
        <span class="item-artist">{{ props.artist }}</span>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useStore } from "vuex";

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

const handleClick = () => {
  // console.log("click");
  store.dispatch("currentMusic", {
    coverUrl: props.coverUrl,
    title: props.title,
    artist: props.artist,
  });
};
</script>

<style scoped>
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
  cursor: pointer;
}

.music-item:hover {
}

.item-index {
  margin-right: 8px;
  display: inline-block;
}

.item-title {
  margin-left: 8px;
  display: inline-block;
}

.item-artist {
  text-align: right;
  display: inline-block;
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
  justify-content: flex-end;
}
</style>
