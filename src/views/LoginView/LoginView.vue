<template>
  <div>
    <a-modal
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      title="登录"
      :footer="null"
      @cancel="handleCancel"
    >
      <a-form
        v-if="!isLoggedIn"
        :model="userState"
        name="basic"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
        autocomplete="off"
      >
        <a-form-item
          label="Username"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="userState.username" />
        </a-form-item>
        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="userState.password" />
        </a-form-item>
        <a-form-item name="remember" :wrapper-col="{ offset: 4, span: 16 }">
          <a-checkbox v-model:checked="userState.remember"
            >Remember me</a-checkbox
          >
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button
            html-type="submit"
            class="login-button"
            @click="handleLogout"
            >注销</a-button
          >
          <a-button
            html-type="submit"
            class="login-button"
            @click="handleLogin('register')"
            >注册</a-button
          >
          <a-button
            html-type="submit"
            class="login-button"
            @click="handleLogin('login')"
            >登录</a-button
          >
        </a-form-item>
      </a-form>
      <div v-else class="user-info">
        <div>
          <span class="user-name">{{ username }}</span>
          <a-button type="link" class="login-button" @click="handleLogout"
            >注销</a-button
          >
        </div>
        <span class="user-id">id: {{ userId }}</span>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import {
  reactive,
  ref,
  defineProps,
  defineEmits,
  watchEffect,
  computed,
} from "vue";
import { Form } from "ant-design-vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import services from "@/services";
import user from "@/store/modules/UserModule";

const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  (event: "login", ...args: any[]): void;
  (event: "cancel", ...args: any[]): void;
}>();
const store = useStore();
const visible = ref<boolean>(props.visible);
const confirmLoading = ref<boolean>(false);
const modalText = ref<string>("Content of the modal");

const username = computed(() => store.state.user.username);
const userId = computed(() => store.state.user.id);
const isLoggedIn = computed(() => store.state.user.isLoggedIn);

interface UserState {
  username: string;
  password: string;
  avatarValue: string;
  avatarBgColor: string;
  remember: boolean;
}

const userState = reactive<UserState>({
  username: "",
  password: "",
  avatarValue: "A",
  avatarBgColor: "#87d068",
  remember: true,
});

const handleCancel = () => {
  emit("cancel");
  visible.value = false;
};

/*
 * @description: 登录
 * @param {type} 登录类型, register or login
 * @return {*}
 */
const handleLogin = async (type: string) => {
  modalText.value = "The modal will be closed after two seconds";
  confirmLoading.value = true;
  console.log(userState.username, userState.password, type);
  await services
    .signIn(userState.username, userState.password, type)
    .then((res) => {
      console.log(res);
      if (res.data.code === 200) {
        message.success("登录成功", 2);
        store.dispatch("login", {
          username: userState.username,
          id: res.data.id,
        });
        emit("login");
        visible.value = false;
      } else {
        message.error(res.data.msg, 2);
      }
      confirmLoading.value = false;
    });
};
const handleLogout = () => {
  store.commit("logout");
  message.success("注销成功", 2);
};

watchEffect(() => {
  visible.value = props.visible;
});
</script>

<style scoped lang="less">
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  font-size: 1.5rem;
  color: #fff;
  font-weight: bold;
}

.login-button {
  margin-right: 24px;
}

.user-info {
  display: flex;
  flex-direction: column;
  .user-name {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .user-id {
    font-size: 1rem;
  }
}
</style>
