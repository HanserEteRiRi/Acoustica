<template>
  <div style="width: 18px; height: 18px; margin: 10px">
    <a-popover placement="top">
      <template #content>
        <div style="height: 80px; width: 10px, padding: 0;">
          <a-slider
            v-model:value="volume"
            @change="handleVolumeChange"
            vertical
            :style="{ height: '100px', padding: '0', margin: '0' }"
            :tip-formatter="null"
          ></a-slider>
        </div>
      </template>
      <sound-outlined class="control-icon-left" />
    </a-popover>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { SoundOutlined } from "@ant-design/icons-vue";

const volume = ref(50);

const handleVolumeChange = (value: number) => {
  volume.value = value;
  emitVolumeChange(value);
};

const emit = defineEmits(["volume-change"]);

const emitVolumeChange = (value: number) => {
  emit("volume-change", value);
};
</script>

<style scoped lang="less">
.control-icon-left {
  text-align: center;
  font-size: 18px;
  margin: 0 5px;
  cursor: pointer;
  transition: transform 0.2s;
  /* 添加平滑过渡效果 */
}
.control-icon-left:hover {
  transform: scale(1.2);
  /* 放大图标 */
}
</style>
