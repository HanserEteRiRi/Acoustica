<template>
  <div class="search-tab">
    <!-- <ul class="search-tab-list">
      <li
        :class="['search-tab-item']"
        v-for="item in props.allTabList"
        :key="item"
        @click="changeTab(item)"
      >
        <span class="search-tab-item-txt">{{ item }}</span>
      </li>
    </ul> -->
    <a-radio-group v-model:value="value">
      <!-- <a-radio-button value="a">Hangzhou</a-radio-button>
      <a-radio-button value="b">Shanghai</a-radio-button> -->
      <a-radio-button
        v-for="item in props.allTabList"
        :value="item"
        :key="item"
        @click="changeTab(item)"
        class="search-tab-item"
        >{{ item }}</a-radio-button
      >
    </a-radio-group>
    <!-- <a-radio-group v-model:value="value1" button-style="solid">
      <a-radio-button value="a">音乐</a-radio-button>
      <a-radio-button value="b">视频</a-radio-button>
    </a-radio-group> -->
    <!-- <ul class="search-tab-filter">
      <li
        :class="[
          'search-tab-filter-item',
          { 'filter-active': isEqualityFilter(item) },
        ]"
        v-for="item in allFilterList"
        :key="item.name"
        @click="filterChange(item)"
      >
        <span>{{ $t(`course.${item.name}`) }}</span>
      </li>
    </ul> -->
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, defineEmits, defineProps, computed, watchEffect } from "vue";
const props = defineProps({
  allTabList: {
    type: Array as () => Array<string>,
    default: () => [],
  },
});
const emits = defineEmits(["changeTab"]);
const router = useRouter();
const value = ref(router.currentRoute.value.query.tab || props.allTabList[0]);

const changeTab = (tab) => {
  // const query = { ...router.currentRoute.value.query, tab };
  // router.push({ query });
  emits("changeTab", tab);
};
</script>
<style lang="less" scoped>
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
  border: none;
  padding-inline-start: 0;
}
.search-tab {
  margin-top: 20px;
  margin-left: 20px;
  width: 90%;
  .search-tab-list {
    display: flex;
    margin-bottom: 22px;
    // border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }
  .search-tab-item {
    margin-left: 10px;
    border-radius: 50px;
  }

  .search-tab-filter {
    display: flex;
    margin-bottom: 33px;
    padding-bottom: 11px;
    .search-tab-filter-item {
      padding: 11px 20px;
      background-color: #f9fafb;
      font-size: 16px;
      font-weight: 500;
      color: #414e69;
      border-radius: 19px;
      margin-right: 16px;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
      &:hover {
        background-color: #f0f3f9;
      }
    }
    .filter-active {
      background-color: #eaf1fe;
      color: #3493f7;
    }
  }
}

@media screen and (max-width: 768px) {
  .search-tab {
    .search-tab-list {
      margin-bottom: 8px;
    }
    .search-tab-item {
      font-size: 12px;
      width: calc(100% / 3);
      margin-right: 0;
      text-align: center;
    }
    .search-tab-filter {
      padding-bottom: 0;
      margin-bottom: 10px;
      overflow-x: scroll;
      &::-webkit-scrollbar {
        height: 0;
      }
      .search-tab-filter-item {
        padding: 8px 14px;
        font-size: 12px;
        margin-right: 10px;
        border-radius: 15px;
      }
    }
  }
}
</style>
