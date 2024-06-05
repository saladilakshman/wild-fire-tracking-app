import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:"/news-app/",
  server:{
    proxy:{
      '/test':'http://localhost:3000'
    }
  },
  plugins: [react()],
})
