import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/ia-entry.ts',
      formats: ['es']
    },
    rollupOptions: {
      external: /^lit/
    }
  }
})
