import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'

const rootPath = fileURLToPath(new URL('.', import.meta.url))
const srcPath = fileURLToPath(new URL('./src', import.meta.url))

export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    quasar({
      sassVariables: path.resolve(rootPath, 'src/assets/styles/quasar-variables.scss')
    })
  ],
  resolve: {
    alias: {
      '@': srcPath,
      'src': srcPath
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      },
      sass: {
        api: 'modern-compiler'
      }
    }
  },
  server: {
    port: 9000,
    open: true
  }
})
