import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Hostinger serves /dist as plain static files; keep asset names hashed for long caching.
    assetsDir: 'assets',
    emptyOutDir: true,
  },
})
