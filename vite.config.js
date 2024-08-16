import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dns from 'node:dns'
// import mkcert from 'vite-plugin-mkcert'


dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: { exclude: ["fsevents"] },
  // proxy: { '/graphql': `https://insightful-rejoicing-production.up.railway.app`,}
})







