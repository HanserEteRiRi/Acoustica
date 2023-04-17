<!-- SearchInput.vue -->
<template>
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
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { defineEmits, defineProps } from "vue";
import { Services } from "@/services";
import { inject } from "vue";
import { bool } from "vue-types";

const router = useRouter();
const route = useRoute();
const services: Services = inject<Services>("services");
const searchValue = ref<string>(route.query.keywords as string);
const isLoading = ref<boolean>(false);

const emit = defineEmits(["onSearch"]);
const props = defineProps({
  //父组件tab切换时，子组件的isLoading会变化
  isLoading: {
    type: Boolean,
    required: false,
  },
});

watch(
  () => props.isLoading,
  (newVal) => {
    isLoading.value = newVal;
  }
);

async function handleSearch(value: string | undefined) {
  if (!value) return;
  isLoading.value = true;
  router.push({
    path: "/search",
    query: {
      keywords: value,
    },
  });
  // Emit an event to parent component to perform the actual search
  // based on the searchValue and the selected tab.
  const result = await new Promise<string>((resolve) => {
    emit("onSearch", searchValue.value, resolve);
  });
  isLoading.value = false;
}

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  if (!target) return;
  console.log("输入值为：", target.value);
}
</script>
