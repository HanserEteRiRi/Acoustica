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
        <!-- 上传歌曲组件 -->
      </div>
      <div class="card your-songs-card">
        <h2>Your Uploaded Songs</h2>
        <!-- 已经上传的歌曲列表组件 -->
      </div>
      <div class="card others-songs-card">
        <h2>Others' Uploaded Songs</h2>
        <!-- 他人上传的歌曲列表组件 -->
      </div>
    </div>
  </div>
</template>

<style>
.upload-page {
  margin: 24px 48px;
  /* display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem; */
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.card {
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  min-width: 300px;
  max-width: 400px;
}

.upload-card {
  /* 可以在此添加专门针对上传卡片的样式 */
}

.your-songs-card {
  /* 可以在此添加专门针对您已经上传的歌曲卡片的样式 */
}

.others-songs-card {
  /* 可以在此添加专门针对他人上传的歌曲卡片的样式 */
}
</style>
