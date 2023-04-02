<template>
  <div class="community-page">
    <a-typography>
      <a-typography-title>社区</a-typography-title>
      <a-typography-paragraph>
        <!-- 你可以在这里上传你的歌曲，也可以在这里查看已经上传的歌曲和其他人上传的歌曲。 -->
      </a-typography-paragraph>
    </a-typography>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue";
</script>

<style scoped lang="less">
.community-page {
  margin: 24px 48px;
}
</style>
