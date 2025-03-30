import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'


// https://vite.dev/config/
export default defineConfig({
  base: '/ai-driven-seo-landing/',
  plugins: [react(), tailwindcss(), svgr({ include: '**/*.svg?react' })],
  // aliases
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/src/assets',
      '@sections': '/src/sections',
      '@components': '/src/components',
    },
  },
})
