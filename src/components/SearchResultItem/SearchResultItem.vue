<template>
  <div class="music-item">
    <a-row>
      <a-col :span="18" class="music-item-left">
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
</script>

<style scoped>
.music-item {
  /* display: flex; */
  /* justify-content: space-between; */
  /* align-items: center; */
  width: 100%;
  padding: 8px 0;
  border: 1px solid transparent;
  transition: all 0.3s;
}

.music-item:hover {
  border-color: rgba(0, 0, 0, 0.1);
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
