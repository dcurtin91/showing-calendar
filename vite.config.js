import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path'; // Add this line

export default defineConfig({
  plugins: [react()],
  base: "/showing-calendar/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        404: resolve(__dirname, 'public/404.html'),
      },
    },
  },
});