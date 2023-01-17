import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "libs",
      filename: "remoteEntry.js",
      exposes: {
        "./LibHelloWorld": "./src/components/LibHelloWorld.vue",
      },
      // remotes: {
      //   foo: "remote_foo",
      // },
      shared: ["vue"],
    }),
  ],
  build: {
    // target: "esnext",
    // minify: false,
    // cssCodeSplit: false,
    rollupOptions: {
      // sharedPlugin need input required
      // input:{},
      output: {
        minifyInternalExports: false,
      },
    },
    cssCodeSplit: true,
  },
});
