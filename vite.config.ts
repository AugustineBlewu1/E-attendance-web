import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   esbuild: {
    //  drop: ['console', 'debugger'], //comment this if you want to see logs
  },

})
