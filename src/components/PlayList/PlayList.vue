<template>
  <div>
    <a-drawer
      :width="drawerWidth"
      class="music-list-drawer"
      :title="'播放列表 (' + musicCount + ')'"
      :placement="placement"
      :visible="props.visible"
      @close="onClose"
    >
      <template #extra>
        <a-button style="margin-right: 8px" @click="handleClear"
          >清空列表</a-button
        >
        <!-- <a-button type="primary" @click="onClose">确定</a-button> -->
      </template>
      <template #footer>
        <div class="footer">
          <div>播放模式：</div>
        </div>
      </template>
      <a-empty v-if="!hasMusic" description="暂无歌曲"></a-empty>
      <div v-else>
        <div class="music-list">
          <!-- <draggable :list="localPlayList" @end="onDragEnd"> -->
          <PlayListItem
            v-for="(music, index) in store.getters.playList"
            :index="index"
            :key="index"
            :music="music"
          />
          <!-- </draggable> -->
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import type { DrawerProps } from "ant-design-vue";
import PlayListItem from "./PlayListItem/PlayListItem.vue";
import draggable from "vue-draggable-next";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["show-play-list"]);
const store = useStore();

const placement = ref<DrawerProps["placement"]>("right");
const visible = ref<boolean>(props.visible);
const hasMusic = computed(() => store.getters.playList.length > 0);
const musicCount = computed(() => store.getters.playList.length);
const localPlayList = ref(store.getters.playList);

const drawerWidth = computed(() => {
  if (window.innerWidth > 768) {
    return 500;
  } else {
    return window.innerWidth;
  }
});

watchEffect(() => {
  localPlayList.value = store.getters.playList;
});

const onClose = () => {
  visible.value = false;
  emit("show-play-list", false);
};

const handleClear = () => {
  store.dispatch("clearPlayList");
};

interface DragEvent {
  oldIndex: number;
  newIndex: number;
}
const onDragEnd = (event: DragEvent) => {
  const oldIndex = event.oldIndex;
  const newIndex = event.newIndex;
  store.dispatch("moveMusic", { oldIndex, newIndex });
};
</script>

<style scoped lang="less">
.music-list-drawer {
  width: 500px !important;
}
.music-list {
  height: 100%;
  overflow-y: auto;
}

.footer {
  display: flex;
  justify-content: space-between;
  color: #3a3a3a;
  font-size: 15px;
}

@media screen and (max-width: 768px) {
  .music-list-drawer {
    // width: 250px !important;
  }
}
</style>
