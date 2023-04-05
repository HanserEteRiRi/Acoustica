// star.ts 自定义收藏歌曲插件
import { App } from "vue";
import { Store } from "vuex";
import RootState from "@/store/types";
import { Music } from "@/types/music";

interface StarPluginOptions {
  store: Store<RootState>;
}

const FavoritesPlugin = {
  // install 方法是一个特殊的函数，当使用 app.use() 加载插件时，Vue 会自动调用这个方法。
  install(app: App, options: StarPluginOptions) {
    const store = options.store;
    //app.config.globalProperties 允许你扩展 Vue 应用的全局属性。
    app.config.globalProperties.$favorites = {
      async add(music: Music) {
        try {
          const response = await fetch("你的服务器API地址", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(music),
          });

          if (!response.ok) {
            throw new Error("添加收藏失败");
          }

          const result = await response.json();

          store.commit("favorites/addFavorite", music);

          return result;
        } catch (error) {
          console.error("添加收藏失败:", error);
        }
      },

      async remove(music: Music) {
        try {
          const response = await fetch(`你的服务器API地址/${music}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error("删除收藏失败");
          }

          const result = await response.json();

          store.commit("favorites/removeFavorite", music);

          return result;
        } catch (error) {
          console.error("删除收藏失败:", error);
        }
      },
    };
  },
};

export default FavoritesPlugin;
