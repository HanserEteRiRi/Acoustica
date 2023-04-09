<template>
  <div>
    <a-drawer
      :width="500"
      title="播放列表"
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
      <a-empty v-if="!hasMusic" description="暂无歌曲"></a-empty>
      <div v-else>
        <div class="music-list">
          <PlayListItem
            v-for="(music, index) in store.getters.playList"
            :index="index + 1"
            :key="index"
            :coverUrl="music.cover"
            :title="music.name"
            :artist="music.artist"
          />
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, computed } from "vue";
import { useStore } from "vuex";
import type { DrawerProps } from "ant-design-vue";
import PlayListItem from "./PlayListItem/PlayListItem.vue";

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

const onClose = () => {
  visible.value = false;
  emit("show-play-list", false);
};

const handleClear = () => {
  store.dispatch("clearPlayList");
};
</script>

<style scoped lang="less">
.music-list {
  height: 100%;
  overflow-y: auto;
}
</style>
