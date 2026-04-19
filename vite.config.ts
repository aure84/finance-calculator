import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'

function fixMediaRangeSyntax(): Plugin {
  return {
    name: 'fix-media-range-syntax',
    generateBundle(_, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (chunk.type === 'asset' && typeof chunk.source === 'string' && chunk.fileName.endsWith('.css')) {
          chunk.source = chunk.source
            .replace(/\(width<=(\d+)px\)/g, '(max-width:$1px)')
            .replace(/\(width>=(\d+)px\)/g, '(min-width:$1px)')
        }
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), fixMediaRangeSyntax()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
})
