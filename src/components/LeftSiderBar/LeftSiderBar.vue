<template>
  <div class="left-sider-bar">
    <div class="button">
      <a-button
        type="primary"
        shape="circle"
        size="large"
        class=""
        @click="toggleShowDiv"
      >
        <template #icon><star-outlined /></template>
      </a-button>
    </div>

    <div class="animated-div" :class="{ show: showDiv, collapse: !showDiv }">
      fafeafe
    </div>
  </div>
</template>

<script setup lang="ts">
import { StarOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";

const showDiv = ref<boolean>(false);
const toggleShowDiv = () => {
  showDiv.value = !showDiv.value;
};
</script>

<style scoped lang="less">
.left-sider-bar {
  height: 100%;
  width: 400px;
  position: absolute;
  top: 3%;
  right: 4%;
  // background: #000;
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
  .button {
    display: flex;
    justify-content: flex-end;
  }
  .animated-div {
    right: 0;
    margin-top: 5px;
    // top: 100%;
    width: 400px;
    height: 0;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    overflow: hidden;

    &.show {
      animation: expand 0.3s forwards;
    }
    &.collapse {
      animation: collapse 0.3s forwards;
    }
  }

  @keyframes expand {
    0% {
      height: 0;
    }
    100% {
      height: 600px;
    }
  }

  @keyframes collapse {
    0% {
      height: 600px;
    }
    100% {
      height: 0;
    }
  }
}
</style>
