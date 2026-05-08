import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import dayjs from "dayjs";
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import Components from "unplugin-vue-components/vite";

export default defineConfig(({ mode }) => {
  process.env.VITE_RESOURSE_VERSION = dayjs().valueOf().toString();
  loadEnv(mode, process.cwd());

  return {
    base: "./",
    plugins: [
      vue(),
      VitePWA({
        registerType: "autoUpdate",
        devOptions: {
          enabled: true,
        },
        includeAssets: ["favicon.png", "pwa/icon-192.png", "pwa/icon-512.png"],
        manifest: {
          name: "G561",
          short_name: "G561",
          start_url: "./",
          display: "standalone",
          background_color: "#000000",
          theme_color: "#000000",
          icons: [
            {
              src: "/pwa/icon-192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/pwa/icon-512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),
      //自动注册src/components下的公共组件
      Components({
        dirs: ["src/components"],
        deep: true,
        extensions: ["vue"],
        dts: "src/typings/components.d.ts",
      }),
    ],
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
