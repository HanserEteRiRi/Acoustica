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
    <div></div>
    <SearchResultItem
      :index="index"
      :cover-url="defaultAlbumCover"
      title="aaa"
      artist="fef"
    />
    <div class="searchList"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import SearchResultItem from "@/components/SearchResultItem/SearchResultItem.vue";
import defaultAlbumCover from "@/assets/cover.jpg";

const searchValue = ref<string>("");
const isLoading = ref<boolean>(false);

const index = 1;

// 处理搜索
function handleSearch(value: string | undefined, event: Event) {
  isLoading.value = true;
  console.log(value);
  setTimeout(() => {
    console.log(value);
    isLoading.value = false;
  }, 1000);
}

// 处理搜索框字符串变动
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

.searchList {
  width: 400px;
  margin: 0 auto;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
}
</style>
