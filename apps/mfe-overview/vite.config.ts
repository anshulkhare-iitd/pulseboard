import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'mfeOverview',
      filename: 'remoteEntry.js',
      exposes: {
        './Module': './src/Module.tsx',
      },
      shared: ['react', 'react-dom', '@pulseboard/shared-core', '@pulseboard/shared-ui'],
      dts: false,
    }),
  ],
  server: { port: 4101 },
})
