<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../../assets/logo.png" /> -->
    <div class="header">
      <div>
        <SearchInput />
      </div>
      <div class="header-card"></div>
    </div>

    <div class="charts" ref="scrollContainer">
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
      <div class="ranking-list">
        <MusicCard
          v-for="(result, index) in rankinglist[1]"
          :key="index"
          :music="result"
          class="music-card"
        ></MusicCard>
      </div>
      <div class="ranking-list">
        <MusicCard
          v-for="(result, index) in rankinglist[2]"
          :key="index"
          :music="result"
          class="music-card"
        ></MusicCard>
      </div>
      <div class="ranking-list">
        <MusicCard
          v-for="(result, index) in rankinglist[3]"
          :key="index"
          :music="result"
          class="music-card"
        ></MusicCard>
      </div>
      <div class="ranking-list">
        <MusicCard
          v-for="(result, index) in rankinglist[4]"
          :key="index"
          :music="result"
          class="music-card"
        ></MusicCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import SearchInput from "@/components/SearchInput/SearchInput.vue";
import MusicCard from "@/components/MusicCard/MusicCard.vue";
import { Services } from "@/services";
import defaultAlbumCover from "@/assets/cover.jpg";
import chinaChartsCover from "@/assets/charts/china.png";
import englishChartsCover from "@/assets/charts/english.png";
import japanChartsCover from "@/assets/charts/japan.png";
import globalChartsCover from "@/assets/charts/global.png";
import { Music } from "@/types/Music";

const store = useStore();
const router = useRouter();
const route = useRoute();
const services: Services = inject<Services>("services");

const rankinglist = ref<Music[][]>([]);
const scrollContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  services.getRankinglist("1").then((res) => {
    rankinglist.value[1] = res;
    console.log(res);
  });
  services.getRankinglist("2").then((res) => {
    rankinglist.value[2] = res;
    console.log(res);
  });
  services.getRankinglist("3").then((res) => {
    rankinglist.value[3] = res;
    console.log(res);
  });
  services.getRankinglist("4").then((res) => {
    rankinglist.value[4] = res;
    console.log(res);
  });
});

onMounted(() => {
  const container = scrollContainer.value;

  if (!container) {
    return;
  }

  let isMouseDown = false;
  let startX = 0;
  let scrollLeft = 0;

  const onMouseDown = (e: MouseEvent) => {
    isMouseDown = true;
    container.style.cursor = "grabbing";
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  };

  const onMouseLeave = () => {
    isMouseDown = false;
    container.style.cursor = "grab";
  };

  const onMouseUp = () => {
    isMouseDown = false;
    container.style.cursor = "grab";
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const scroll = (x - startX) * 2;
    container.scrollLeft = scrollLeft - scroll;
  };

  container.addEventListener("mousedown", onMouseDown);
  container.addEventListener("mouseleave", onMouseLeave);
  container.addEventListener("mouseup", onMouseUp);
  container.addEventListener("mousemove", onMouseMove);

  return () => {
    container.removeEventListener("mousedown", onMouseDown);
    container.removeEventListener("mouseleave", onMouseLeave);
    container.removeEventListener("mouseup", onMouseUp);
    container.removeEventListener("mousemove", onMouseMove);
  };
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

.header {
  display: flex;
  margin-bottom: 60px;
  .header-card {
    width: 400px;
    height: 250px;
    background: linear-gradient(45deg, #9db5ce, rgb(182, 182, 223));
    border-radius: 10px;
    border: #2c3e50;
  }
}

.charts {
  margin-top: 20px;
  margin: 20px 20px;
  text-align: left;
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

.ranking-list {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  width: 1000px;
  height: 400px;
  .music-card {
    padding: 20px;
    margin-right: 10px;
    text-align: center;
    white-space: normal;
    flex: none;
  }
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
