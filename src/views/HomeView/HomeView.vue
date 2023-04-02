<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../../assets/logo.png" /> -->
    <a-input-search
      v-model:value="searchValue"
      placeholder="input search loading with enterButton"
      :loading="isLoading"
      @search="handleSearch"
      @input="handleInput"
      enter-button
      size="large"
      class="search-input"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const searchValue = ref<string>("");
const isLoading = ref<boolean>(false);

function handleSearch(value: string | undefined, event: Event) {
  isLoading.value = true;
  console.log(value);
  setTimeout(() => {
    console.log(value);
    isLoading.value = false;
  }, 1000);
}

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  if (!target) return;
  console.log("输入值为：", target.value);
}
</script>

<style lang="less" scoped>
.home {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.search-input {
  width: 400px;
  margin: 0 auto;
}
</style>
