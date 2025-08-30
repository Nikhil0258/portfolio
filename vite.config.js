// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vercel serves at the site root, so base can be '/'.
// If you ever deploy to GitHub Pages, change base to '/<repo-name>/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: { host: true, port: 5173 },
  build: { outDir: 'dist' }
})
