import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'shellApp',
      remotes: {
        mfeOverview: 'http://localhost:4101/remoteEntry.js',
        mfeUsers: 'http://localhost:4102/remoteEntry.js',
        mfeReports: 'http://localhost:4103/remoteEntry.js',
        mfeSettings: 'http://localhost:4104/remoteEntry.js',
      },
      shared: ['react', 'react-dom', '@pulseboard/shared-core', '@pulseboard/shared-ui'],
      dts: false,
    }),
  ],
  server: { port: 4100 },
})
