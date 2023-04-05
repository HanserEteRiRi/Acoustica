<template>
  <div class="container">
    <header class="primary-content">
      <div class="introduction-text">
        <!-- 在这里放置左侧头部内容 -->
      </div>
      <div class="header-right">
        <!-- 在这里放置右侧头部内容 -->
        <img src="@/assets/setting.svg" alt="setting logo" />
      </div>
    </header>
    <main class="main">
      <!-- 在这里放置主要内容 -->
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  padding: 0 16px;
  padding-top: 48px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 60px;
}

.header-left {
  /* 在这里定义左侧头部的样式 */
}

.header-right {
  /* 在这里定义右侧头部的样式 */
}

.main {
  flex-grow: 1;
  padding: 16px;
}
</style>
