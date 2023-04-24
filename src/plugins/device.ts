import { App } from "vue";

const decice = {
  install(app: App) {
    // 检测设备类型
    function detectDeviceType() {
      const userAgent = navigator.userAgent;
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          userAgent
        );
      return isMobile ? "mobile" : "desktop";
    }

    // 将检测结果添加到 Vue 实例上
    app.config.globalProperties.$device = detectDeviceType();
  },
};

export default decice;
