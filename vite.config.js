import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHubリポジトリ名を指定（例：'slides'）
const repositoryName = 'slides'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' 
    ? `/${repositoryName}/` 
    : '/',
  build: {
    outDir: 'dist'
  }
})