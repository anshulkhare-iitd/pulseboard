import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'
import tailwindcss from '@tailwindcss/vite'

const remoteEntry = (envName: string, fallback: string) =>
  process.env[envName]?.trim() || fallback

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'shellApp',
      remotes: {
        mfeOverview: remoteEntry('VITE_MFE_OVERVIEW_REMOTE_ENTRY', 'http://localhost:4101/remoteEntry.js'),
        mfeUsers: remoteEntry('VITE_MFE_USERS_REMOTE_ENTRY', 'http://localhost:4102/remoteEntry.js'),
        mfeReports: remoteEntry('VITE_MFE_REPORTS_REMOTE_ENTRY', 'http://localhost:4103/remoteEntry.js'),
        mfeSettings: remoteEntry('VITE_MFE_SETTINGS_REMOTE_ENTRY', 'http://localhost:4104/remoteEntry.js'),
      },
      shared: ['react', 'react-dom', '@pulseboard/shared-core', '@pulseboard/shared-ui'],
      dts: false,
    }),
  ],
  server: { port: 4100 },
})
