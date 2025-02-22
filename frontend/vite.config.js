import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', '@chakra-ui/react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust limit (optional)
  },
});
