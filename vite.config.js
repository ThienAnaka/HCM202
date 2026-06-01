import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://macaroni-hunting-mutation.ngrok-free.dev',
        changeOrigin: true,
        secure: false,
        headers: {
          Authorization: 'Basic bXRuX2FpOjEzMDIwNQ==',
        },
      },
    },
  },
})
