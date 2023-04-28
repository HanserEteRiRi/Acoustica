<template>
  <div class="community-page">
    <div>
      <a-button class="create">添加</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, onMounted } from "vue";

onMounted(() => {
  console.log("mounted");
});
</script>

<style scoped lang="less">
.community-page {
  margin: 24px 48px;
}
</style>
