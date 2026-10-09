import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createHash } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

function pwaAssets() {
  return {
    name: 'fringe-pwa-assets',
    apply: 'build',
    async writeBundle(options, bundle) {
      const assets = Object.values(bundle)
        .filter((item) =>
          item.type === 'chunk' ||
          (item.type === 'asset' && /\.(css|png|jpe?g|webp|svg)$/i.test(item.fileName)),
        )
        .map((item) => `/${item.fileName}`)
        .sort()
      const html = Object.values(bundle).find(
        (item) => item.type === 'asset' && item.fileName === 'index.html',
      )
      const version = createHash('sha256')
        .update([...assets, html?.source?.toString() ?? ''].join('\n'))
        .digest('hex')
        .slice(0, 10)
      const workerPath = resolve(options.dir ?? 'dist', 'sw.js')
      let worker = await readFile(workerPath, 'utf8')
      worker = worker.replace(
        /const CACHE_NAME = "fringe-transport-[^"]+";/,
        `const CACHE_NAME = "fringe-transport-${version}";`,
      )
      worker = worker.replace(
        'const BUILT_ASSETS = [];',
        `const BUILT_ASSETS = ${JSON.stringify(assets)};`,
      )
      await writeFile(workerPath, worker)
    },
  }
}

export default defineConfig({
  plugins: [
    pwaAssets(),
    react(),
    tailwindcss(),
  ],
})