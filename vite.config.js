import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-icons',
      'react-icons/fi',
      'react-icons/fa',
      'react-hot-toast',
      'axios',
      'framer-motion'
    ],
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
})