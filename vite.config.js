import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// Vercel 部署在域名根目录，base 用 '/'；GitHub Pages 在子路径下，需加前缀
const base = process.env.VERCEL ? '/' : '/dataVisualizationByVue3Components/'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base,
})
