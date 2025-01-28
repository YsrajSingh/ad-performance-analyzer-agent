import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/upload': 'http://localhost:9000',
      '/analyze': 'http://localhost:9000',
    }
  }
})
