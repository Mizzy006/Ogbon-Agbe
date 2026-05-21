// import { defineConfig } from 'vite'
// import react, { reactCompilerPreset } from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//   ],
// })


import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';
import babel from '@rolldown/plugin-babel'

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'maskable-icon.png'],
      manifest: {
        name: 'Ọgbọ́nÀgbẹ̀ Platform',
        short_name: 'Ọgbọ́nÀgbẹ̀',
        description: 'AI-Driven Crop Protection and Farm Management for Osun State',
        theme_color: '#1a3a2a', // Matches your premium dark green branding
        background_color: '#fdf8f0', // Matches your osun-cream background
        display: 'standalone', // Crucial: Makes it open like a native app without browser bars!
        orientation: 'portrait',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable' // Allows Android to automatically round/square your icon smoothly
          }
        ]
      }
    })
  ]
});
