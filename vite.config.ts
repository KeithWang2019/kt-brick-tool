import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist', // 输出目录
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'), // 入口文件
      name: 'KtBrickTool', // 全局变量名
      fileName: (format) => `kt-brick-tool.${format}.js` // 输出文件名
    },
    rollupOptions: {
      // 排除 Vue 本身（避免用户项目重复引入）
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue' // 全局环境中 Vue 的变量名
        }
      }
    }
  }
})
