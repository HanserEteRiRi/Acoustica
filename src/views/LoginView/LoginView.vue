<template>
  <div>
    <a-modal
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      title="登录"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form>
        <a-form-item
          label="用户名"
          name="username"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <a-input v-model="state.username" />
        </a-form-item>
        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <a-input-password v-model="state.password" />
        </a-form-item>
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, defineProps, defineEmits, watchEffect } from "vue";
import { Form } from "ant-design-vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";

const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  (event: "login", ...args: any[]): void;
  (event: "cancel", ...args: any[]): void;
}>();

const visible = ref<boolean>(props.visible);
const confirmLoading = ref<boolean>(false);
const modalText = ref<string>("Content of the modal");

const { useForm } = Form;

interface State {
  username: string;
  password: string;
  avatarValue: string;
  avatarBgColor: string;
}

const state = reactive<State>({
  username: "",
  password: "",
  avatarValue: "A",
  avatarBgColor: "#87d068",
});

const handleCancel = () => {
  emit("cancel");
  visible.value = false;
};

const handleOk = () => {
  modalText.value = "The modal will be closed after two seconds";
  confirmLoading.value = true;
  setTimeout(() => {
    message.success("登录成功", 2);
    emit("login");
    visible.value = false;
    confirmLoading.value = false;
  }, 2000);
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
</style>
