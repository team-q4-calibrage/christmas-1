import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Pas de source maps en production : le code React lisible (JSX, commentaires) n'est pas publié,
    // seul le bundle minifié l'est.
    sourcemap: false,
  },
})
