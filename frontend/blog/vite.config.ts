/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8888,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  css: {
    preprocessorOptions: {
      less: {
        // 自动向每个 .less 文件注入全局变量 & Mixin，无需手动 @import
        // 注意：必须用绝对路径，LESS 预处理器不识别 Vite 的 @ 别名
        additionalData: `@import "${path.resolve(__dirname, 'src/styles/variables.less').replace(/\\/g, '/')}";`,
        javascriptEnabled: true,
      },
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/', '**/*.d.ts', '**/*.config.*'],
    },
  },
})
