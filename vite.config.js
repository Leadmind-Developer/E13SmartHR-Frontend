import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      moment: 'moment/moment.js'
    },
  },
  server: {
    port: 3000,
  },
  optimizeDeps: {
    include: ['vue-draggable-next']
  }
})
