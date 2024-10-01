import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/v1/api': {
        target: 'https://api.feegow.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v1\/api/, '/v1/api'),
      },
    },
  },
})
