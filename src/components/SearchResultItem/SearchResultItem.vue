<template>
  <div class="music-item">
    <a-row>
      <a-col :span="16" class="music-item-left">
        <span class="item-index">{{ props.index }}.</span>
        <a-avatar :src="props.coverUrl" size="small"></a-avatar>
        <span class="item-title">{{ props.title }}</span>
      </a-col>
      <a-col :span="8" class="music-item-right">
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.item-index {
  margin-right: 8px;
}

.item-title {
  margin-left: 8px;
}

.item-artist {
  text-align: right;
}
</style>
