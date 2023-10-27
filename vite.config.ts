import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: './runtimeConfig',
        replacement: './runtimeConfig.browser',
      },
    ]
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/ext/[name]-[hash][extname]',
        chunkFileNames: 'assets/js/chunk-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        name: 'MyBundle'
      }
    }
  }
})
