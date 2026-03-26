import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import dayjs from "dayjs";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  process.env.VITE_RESOURSE_VERSION = dayjs().valueOf().toString();
  loadEnv(mode, process.cwd());

  return {
    base: "./",
    plugins: [vue()],
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "./src/styles/index.less";',
        },
      },
    },
    server: {
      host: "0.0.0.0",
      port: 9527,
      proxy: {
        "/api": {
          target: "https://xxx.xxx.xxx/api",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
      },
    },
    esbuild: {
      pure: ["alert", "console.log", "console.warn"],
    },
    build: {
      chunkSizeWarningLimit: 2000,
      reportCompressedSize: false,
      cssTarget: "chrome61",
      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/game-[name]-[hash].js",
          entryFileNames: "assets/js/game-[name]-[hash].js",
          assetFileNames: "assets/[ext]/game-[name]-[hash].[ext]",
        },
      },
    },
  };
});
