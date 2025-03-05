import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path"; // resolve をインポート

// GitHubリポジトリ名を指定（例：'slides'）
const repositoryName = "slides";

export default defineConfig({
  plugins: [
    react(),
    // ビルド後にdraftsディレクトリを除外するカスタムプラグイン
    {
      name: "exclude-drafts",
      closeBundle: async () => {
        const fs = await import("fs/promises");
        try {
          await fs.rm(resolve(__dirname, "dist/drafts"), {
            recursive: true,
            force: true,
          });
          console.log("Removed drafts directory from build");
        } catch (err) {
          console.log("No drafts directory found in build");
        }
      },
    },
  ],
  base: `/${repositoryName}/`,
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
  publicDir: "./public",
});
