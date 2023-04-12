<template>
  <div class="search-tab">
    <ul class="search-tab-list">
      <li
        :class="['search-tab-item']"
        v-for="item in props.allTabList"
        :key="item"
        @click="tabChange(item)"
      >
        <span class="search-tab-item-txt">{{ item }}</span>
      </li>
    </ul>
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
import { ref, defineEmits, defineProps, computed, watchEffect } from "vue";
const props = defineProps({
  allTabList: {
    type: Array as () => Array<string>,
    default: () => [],
  },
});
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
  .search-tab-list {
    display: flex;
    margin-bottom: 22px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }
  .search-tab-item {
    color: #242f44;
    font-size: 16px;
    font-weight: 500;
    line-height: 16px;
    padding-bottom: 10px;
    margin-right: 64px;
    cursor: pointer;
    .search-tab-item-txt {
      display: inline-block;
    }
    &:last-child {
      margin-right: 0;
    }
    &:hover {
      border-bottom: 2px solid #3493f7;
    }
  }
  .active {
    border-bottom: 2px solid #3493f7;
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
