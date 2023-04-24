<template>
  <div class="outer-music-item" ref="imageRef">
    <div class="music-item" @dblclick="handleDoubleClick">
      <a-row>
        <a-col :span="1"> </a-col>
        <a-col :span="1" class="index">
          <span class="item-index">{{ props.index }}</span></a-col
        >
        <a-col :span="8" class="music-item-left">
          <a-avatar
            class="music-avatar"
            :src="isVisible ? props.music.cover : null"
            size="large"
          ></a-avatar>
          <span class="item-title">{{ props.music.title }}</span>
        </a-col>
        <a-col :span="6" class="music-item-right">
          <span class="item-artist">{{ props.music.artist }}</span>
        </a-col>
        <a-col :span="8" class="icon-container"
          ><heart-outlined @click="handleStar" class="icon" />
          <plus-outlined @click="addMusic" class="icon" />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, onUnmounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { PlusOutlined, HeartOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { Music } from "@/types/Music";
import { ActionReasult } from "@/types/ActionReasult";
import { computed } from "vue";

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

const music = computed(() => {
  return {
    ...props.music,
  };
});
const isVisible = ref(false);
const imageRef = ref(null);

// 图片懒加载
watch(
  () => imageRef.value,
  (newImageRef, oldImageRef) => {
    if (newImageRef && newImageRef !== oldImageRef) {
      const observerCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true;
            observer.unobserve(entry.target);
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, {
        rootMargin: "0px",
        threshold: 0.1,
      });

      observer.observe(newImageRef);
    }
  },
  { immediate: true }
);

const handleDoubleClick = () => {
  store.dispatch("setCurrentMusic", {
    currentMusic: {
      ...props.music,
    },
  });
};

const addMusic = async () => {
  const state: ActionReasult = await store.dispatch("addMusic", {
    music: music.value,
  });
  if (state.success === true) {
    message.success(state.message);
  } else {
    message.error(state.message);
  }
};

const handleStar = () => {
  return null;
};
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

  border-radius: 10px;

  /* border-bottom-width: 100px; */
  /* transition: all 0.3s; */

  /* align-items: center; */
  transition: transform 0.3s ease;
  cursor: pointer;
}

.music-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.1);
  transform: scale(1.03);
}

.outer-music-item {
  border-bottom: 1px solid transparent;
  border-color: rgba(0, 0, 0, 0.1);
  /* width: 100%;
  height: 100%; */
}

.item-index {
  /* margin-right: 8px; */
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  color: #acacac;
}

.music-avatar {
  object-fit: cover;
  height: 48px;
  width: 48px;
  border-radius: 15%;
}

.item-title {
  margin-left: 8px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.8);
  font-size: 15px;
  cursor: pointer;
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
