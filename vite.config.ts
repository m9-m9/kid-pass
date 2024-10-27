import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const isCodeSandbox = "SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env;
// https://vitejs.dev/config/
export default defineConfig({
  root: "src/",
  publicDir: "../static/",
  base: "./",
  server: {
    host: true,
    open: !isCodeSandbox, // Open if it's not a CodeSandbox
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.join(__dirname, "/src/index.html"), // 첫 번째 HTML 파일 경로
        report1: path.join(__dirname, "/src/report1/index.html"), // 두 번째 HTML 파일 경로
        report2: path.join(__dirname, "/src/report2/index.html"), // 세 번째 HTML 파일 경로
        // 각 경로는 프로젝트 구조에 맞게 조정하세요
      },
    },
  },
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
});
