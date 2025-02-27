import { defineConfig } from 'tsup'

export default defineConfig({
  cjsInterop: true,
  dts: true,
  format: ['cjs', 'esm'],
  minify: true,
  outDir: 'build',
})
