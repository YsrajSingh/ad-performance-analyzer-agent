import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    allowedHosts: ['ads.yashrajs.com'],
    proxy: {
      '/upload': process.env.VITE_BACKEND_URL,
      '/analyze': process.env.VITE_BACKEND_URL,
    },
  },
});
