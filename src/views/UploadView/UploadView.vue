<template>
  <div class="upload-page">
    <a-typography>
      <a-typography-title>上传歌曲</a-typography-title>
      <a-typography-paragraph>
        <!-- 你可以在这里上传你的歌曲，也可以在这里查看已经上传的歌曲和其他人上传的歌曲。 -->
      </a-typography-paragraph>
    </a-typography>
    <div class="card-container">
      <div class="card upload-card">
        <h2>Upload Your Song</h2>
        <div class="upload-dragger">
          <a-upload-dragger
            v-model:fileList="fileList"
            name="file"
            :multiple="true"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            @change="handleChange"
            @drop="handleDrop"
          >
            <p class="ant-upload-drag-icon">
              <inbox-outlined></inbox-outlined>
            </p>
            <p class="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p class="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
          </a-upload-dragger>
        </div>
      </div>
      <div class="card your-songs-card">
        <h2>Your Uploaded Songs</h2>
        <!-- 已经上传的歌曲列表组件 -->
        <a-empty v-if="!hasMusicUser" description="暂无歌曲"></a-empty>
        <div v-else></div>
      </div>
      <div class="card others-songs-card">
        <h2>Others' Uploaded Songs</h2>
        <!-- 他人上传的歌曲列表组件 -->
        <a-empty
          v-if="!hasMusicAll"
          description="暂无歌曲"
          style="margin-top: 10%"
        ></a-empty>
        <div v-else></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";
import { InboxOutlined } from "@ant-design/icons-vue";
import type { UploadChangeParam } from "ant-design-vue";
import { message } from "ant-design-vue";

const fileList = ref([]);
const hasMusicUser = ref(false);
const hasMusicAll = ref(false);

const handleChange = (info: UploadChangeParam) => {
  const status = info.file.status;
  if (status !== "uploading") {
    console.log(info.file, info.fileList);
  }
  if (status === "done") {
    message.success(`${info.file.name} file uploaded successfully.`);
  } else if (status === "error") {
    message.error(`${info.file.name} file upload failed.`);
  }
};

const handleDrop = (e: DragEvent) => {
  console.log("Dropped files", e.dataTransfer?.files);
};
</script>

<style>
.upload-page {
  margin: 24px 48px;
  /* display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem; */
}

.card-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

.card {
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  min-width: 300px;
}

.upload-card,
.your-songs-card {
  width: 100%;
}

.others-songs-card {
  width: 100%;
  height: 1000px;
}

/* 当屏幕宽度大于等于768px时 */
@media screen and (min-width: 768px) {
  .card-container {
    grid-template-columns: 6fr 4fr;
    grid-template-rows: auto auto;
  }

  .upload-card {
    grid-row: 1;
    grid-column: 1;
  }

  .your-songs-card {
    grid-row: 1;
    grid-column: 2;
  }

  .others-songs-card {
    grid-row: 2;
    grid-column: 1 / -1;
  }
}
</style>
