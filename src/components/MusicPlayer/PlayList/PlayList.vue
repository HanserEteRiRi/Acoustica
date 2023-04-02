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
        <a-button style="margin-right: 8px" @click="onClose">取消</a-button>
        <a-button type="primary" @click="onClose">确定</a-button>
      </template>
      <a-empty v-if="!hasMusic" description="暂无歌曲"></a-empty>
      <div v-else></div>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps } from "vue";
import type { DrawerProps } from "ant-design-vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["show-play-list"]);

const placement = ref<DrawerProps["placement"]>("right");
const visible = ref<boolean>(props.visible);
const hasMusic = ref<boolean>(false);

const onClose = () => {
  visible.value = false;
  emit("show-play-list", false);
};
</script>
