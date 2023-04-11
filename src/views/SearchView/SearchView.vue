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

    <div class="searchList">
      <SearchResultItem
        v-for="(result, index) in searchResults"
        :key="index"
        :index="index + 1"
        :music="result"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, inject } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import SearchResultItem from "@/components/SearchResultItem/SearchResultItem.vue";
import defaultAlbumCover from "@/assets/cover.jpg";
import { Music } from "@/types/music";
import { Services } from "@/services";

const store = useStore();
const router = useRouter();
const route = useRoute();
const services: Services = inject<Services>("services");
const searchValue = ref<string>(route.query.keywords as string);
const isLoading = ref<boolean>(false);
const searchResults = ref<any[]>([]);

// 处理搜索
async function handleSearch(value: string | undefined) {
  if (!value) return;
  isLoading.value = true;
  console.log(value);
  router.push({
    path: "/search",
    query: {
      keywords: value,
    },
  });
  // 用 value 向服务器发送请求
  await services
    .searchMusic(value)
    .then((res: Array<Music>) => {
      console.log(res);
      searchResults.value = res;
      isLoading.value = false;
    })
    .catch((error) => {
      console.log(error);
    });
}

// 处理搜索框字符串变动
function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  if (!target) return;
  console.log("输入值为：", target.value);
}

onMounted(() => {
  handleSearch(searchValue.value);
});
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
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
}
</style>
