<template>
  <div class="charts-page">
    <a-typography>
      <a-typography-title>charts</a-typography-title>
      <a-typography-paragraph>
        <!-- 你可以在这里上传你的歌曲，也可以在这里查看已经上传的歌曲和其他人上传的歌曲。 -->
      </a-typography-paragraph>
    </a-typography>
    <div class="charts"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.charts-page {
  margin: 24px 48px;
}

.charts {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
