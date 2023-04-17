<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../../assets/logo.png" /> -->
    <div class="header">
      <SearchInput />
    </div>

    <div class="charts">
      <a-typography>
        <a-typography-title>排行榜</a-typography-title>
        <a-typography-paragraph>
          <!-- 你可以在这里上传你的歌曲，也可以在这里查看已经上传的歌曲和其他人上传的歌曲。 -->
        </a-typography-paragraph>
      </a-typography>
      <div class="charts-container">
        <!-- <div class="charts-card">
          <img :src="chinaChartsCover" alt="中国榜" />
        </div>
        <div class="charts-card">
          <img :src="englishChartsCover" alt="英语榜" />
        </div>
        <div class="charts-card">
          <img :src="japanChartsCover" alt="日语榜" />
        </div>
        <div class="charts-card">
          <img :src="globalChartsCover" alt="全球榜" />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import SearchInput from "@/components/SearchInput/SearchInput.vue";
import defaultAlbumCover from "@/assets/cover.jpg";
import chinaChartsCover from "@/assets/charts/china.png";
import englishChartsCover from "@/assets/charts/english.png";
import japanChartsCover from "@/assets/charts/japan.png";
import globalChartsCover from "@/assets/charts/global.png";

const store = useStore();
const router = useRouter();
const route = useRoute();

const searchValue = ref<string>("");
const isLoading = ref<boolean>(false);

// 处理搜索
function handleSearch(value: string | undefined, event: Event) {
  store.commit("menu/setSelectedKeys", [""]);
  router.push({
    path: "/search",
    query: {
      keywords: value,
    },
  });
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

.header {
  margin-bottom: 60px;
}

.charts {
  margin-top: 60px;
  margin: 60px 60px;
  text-align: left;
}

.charts-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
  overflow: hidden;
}

.charts-card {
  position: relative;
  background-color: #f1f1f1;
  padding: 20px;
  text-align: center;
  font-size: 24px;
  height: 200px;
}

.card::before {
  content: "";
  display: block;
  padding-bottom: 100%; /* 保持1:1宽高比 */
}

.card-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.charts-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media screen and (max-width: 800px) {
  .charts-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 400px) {
  .charts-container {
    grid-template-columns: 1fr;
  }
}
</style>
