<template>
  <div class="bottom">
    <div class="bottom-content">
      <div class="website-name">Acoustica</div>
      <div class="disclaimer">本项目仅供交流学习</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Add your component logic here (if needed)
</script>

<style scoped>
.bottom {
  display: flex;
  justify-content: center;
  background-color: #f9fafb;
  padding: 20px 0;
  height: 400px;
}

.bottom-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.website-name {
  font-size: 18px;
  font-weight: bold;
  color: #242f44;
}

.disclaimer {
  font-size: 14px;
  color: #414e69;
}
</style>
