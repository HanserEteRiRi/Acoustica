<template>
  <a-layout-header class="layout-header">
    <div class="inner-layout-header">
      <div class="menu" @click="handleClickMenu">
        <unordered-list-outlined />
      </div>
      <div class="header-left">
        <div class="logo">Acoustica</div>
      </div>
      <div class="header-right">
        <a-avatar
          shape="square"
          size="large"
          :style="{
            backgroundColor: avatarBgColor,
            verticalAlign: 'middle',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }"
          class="avatar"
          @click="handleClickAvatar"
        >
          {{ avatarValue }}
        </a-avatar>
        <LoginView
          :visible="showLogin"
          @login="handleLogin"
          @cancel="handleCancel"
        />
      </div>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { defineEmits, ref } from "vue";
import { useStore } from "vuex";
import LoginView from "@/views/LoginView/LoginView.vue";
import { UnorderedListOutlined } from "@ant-design/icons-vue";

const store = useStore();

const avatarBgColor = "#f56a00";
const avatarValue = "xcx";
const emit = defineEmits(["toggleSider"]);
const showLogin = ref<boolean>(false);

const toggleSider = () => {
  emit("toggleSider");
};
const handleClickAvatar = () => {
  showLogin.value = true;
};
const handleLogin = () => {
  showLogin.value = false;
};
const handleCancel = () => {
  showLogin.value = false;
};

const handleClickMenu = () => {
  toggleSider();
};
</script>

<style scoped lang="less">
.logo {
  font-size: x-large;
  font-weight: bold;
  // color: #ffffff;
  color: #6777ef;
}
.layout-header {
  position: relative;
  z-index: 1;
  // background: #6777ef;
  background: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-right: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.menu {
  display: none;
}

.inner-layout-header {
  display: flex;
  justify-content: space-between; // 左右分布
  align-items: center; // 垂直居中
  .header-left {
    flex: 1; // 左边自适应宽度
    text-align: left;
  }
  .header-right {
    text-align: right;
  }

  :hover .avatar {
    transform: scale(1.2);
  }
}

@media (max-width: 768px) {
  .menu {
    display: block;
    font-size: 24px;
    color: #414142;
    cursor: pointer;
  }
  .layout-header {
    padding-left: 10px;
  }
  .inner-layout-header {
    .header-left {
      text-align: center;
    }
  }
}
</style>
