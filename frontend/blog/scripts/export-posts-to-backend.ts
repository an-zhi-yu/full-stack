/**
 * 将前端 TS 文章数据导出为 JSON，供 Spring Boot 启动时加载。
 *
 * 用法（在 frontend/blog 目录）：
 *   npx tsx scripts/export-posts-to-backend.ts
 *
 * 输出：full-stack/backend/blog-api/src/main/resources/data/posts-full.json
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import javaPosts from '../src/data/posts/java/index.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outFile = resolve(
  __dirname,
  '../../../backend/blog-api/src/main/resources/data/posts-full.json',
)

mkdirSync(dirname(outFile), { recursive: true })
writeFileSync(outFile, JSON.stringify(javaPosts), 'utf-8')
console.log(`已写入 ${outFile}，共 ${javaPosts.length} 篇`)
