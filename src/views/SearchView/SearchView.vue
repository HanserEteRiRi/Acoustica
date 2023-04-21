<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../../assets/logo.png" /> -->
    <!-- <a-input-search
      v-model:value="searchValue"
      placeholder="input search loading with enterButton"
      :loading="isLoading"
      @search="handleSearch"
      @input="handleInput"
      enter-button
      size="large"
      class="search-input"
    /> -->
    <SearchInput @onSearch="handleSearch" :is-loading="isLoading" />
    <SearchTab :all-tab-list="tabList" @change-tab="changeTab" />

    <div class="searchList" v-if="isMusicTab">
      <SearchResultItem
        v-for="(result, index) in searchResults"
        :key="index"
        :index="index + 1"
        :music="result"
      />
    </div>
    <VideoList v-else :search-results="searchResults" />

    <TheBottom />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, inject, computed, watch } from "vue";
import { useStore } from "vuex";
// import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";
import SearchResultItem from "@/components/SearchResultItem/SearchResultItem.vue";
import SearchTab from "@/components/SearchTab/SearchTab.vue";
import VideoList from "@/components/VideoList/VideoList.vue";
import TheBottom from "@/components/TheBottom/TheBottom.vue";
import SearchInput from "@/components/SearchInput/SearchInput.vue";
// import defaultAlbumCover from "@/assets/cover.jpg";
import { Music } from "@/types/music";
import { Services } from "@/services";

const store = useStore();
const router = useRouter();
const route = useRoute();
const services: Services = inject<Services>("services");
const searchValue = ref<string>(route.query.keywords as string);
const isLoading = ref<boolean>(false);
const searchResults = ref<any[]>([]);
const tabList = ["音乐", "视频"];

const isMusicTab = computed(() => {
  return (
    router.currentRoute.value.query.tab === "音乐" ||
    !router.currentRoute.value.query.tab
  );
});

const changeTab = (tab: string) => {
  searchResults.value = []; // 切换tab时清空搜索结果
  const query = { ...router.currentRoute.value.query, tab };
  router.push({ query });
};

// 处理搜索
// 如果在调用异步方法时没有提供 callback 参数，那么在异步方法内部，Promise 没有机会调用 resolve 函数
async function handleSearch(
  value: string | undefined,
  callback: (result: string) => void
) {
  if (!value) return;
  isLoading.value = true;
  console.log(value);

  const searchRequest = services.searchMusic(value);

  const timeout = new Promise<string>((_, reject) => {
    setTimeout(() => {
      reject(new Error("服务器长时间未响应"));
    }, 10000); // 10秒响应超时
  });

  try {
    const result = await Promise.race([searchRequest, timeout]);
    console.log(result);
    searchResults.value = result;
    isLoading.value = false;
    callback("success");
  } catch (error) {
    if (error.message === "Network Error") message.error("网络错误");
    else message.error(error.message);
    isLoading.value = false;
  }
}

async function handleSearchVideo(value: string | undefined) {
  if (!value) return;
  isLoading.value = true;
  // console.log(value);

  // 用 value 向服务器发送请求
  await services
    .searchVideo(value)
    .then((res: Array<Music>) => {
      console.log(res);
      searchResults.value = res;
      isLoading.value = false;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function searchWithTab() {
  if (isMusicTab.value) {
    await handleSearch(searchValue.value, (result) => {
      console.log(result);
    });
  } else {
    await handleSearchVideo(searchValue.value);
  }
}

watch(
  () => router.currentRoute.value.query,
  (newQuery, oldQuery) => {
    if (newQuery.tab !== oldQuery?.tab) {
      searchWithTab();
    }
  },
  { immediate: true }
);

// 处理搜索框字符串变动
function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  if (!target) return;
  console.log("输入值为：", target.value);
}

onMounted(() => {
  handleSearch(searchValue.value, (result) => {
    console.log(result);
  });
});
</script>

<style lang="less" scoped>
.home {
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: 20px;
}

.search-input {
  width: 400px;
  margin: 0 auto;
  text-align: left;
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
