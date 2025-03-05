import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    // Add Buffer polyfill
    global: {},
    'process.env': {}
  },
  resolve: {
    alias: {
      // Use buffer polyfill
      buffer: 'buffer'
    }
  }
});