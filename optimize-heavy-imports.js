/**
 * optimize-heavy-imports.js
 * ---------------------------------------------------
 * Scans all .tsx files in /src, finds static imports from
 * 'recharts' or 'framer-motion', and suggests replacements.
 * Does NOT auto-rewrite destructured imports; logs them instead.
 */

import fs from 'fs'
import path from 'path'

const srcDir = path.join(process.cwd(), 'src')
const affectedFiles = []

async function scan(folderPath) {
  const entries = await fs.promises.readdir(folderPath, { withFileTypes: true })
  for (const entry of entries) {
    const entryPath = path.join(folderPath, entry.name)
    if (entry.isDirectory()) {
      await scan(entryPath)
      continue
    }
    if (!entry.name.endsWith('.tsx')) continue

    const content = await fs.promises.readFile(entryPath, 'utf-8')
    if (content.includes("from 'recharts'") || content.includes('from "recharts"')) {
      affectedFiles.push({ file: entryPath, lib: 'recharts' })
    }
    if (content.includes("from 'framer-motion'") || content.includes('from "framer-motion"')) {
      affectedFiles.push({ file: entryPath, lib: 'framer-motion' })
    }
  }
}

await scan(srcDir)

console.log(`\n🔍 Found ${affectedFiles.length} affected files:\n`)
for (const { file, lib } of affectedFiles) {
  console.log(`- ${lib}: ${file}`)
}

if (!affectedFiles.length) {
  console.log('✅ No Recharts or Framer Motion static imports found.\n')
  process.exit(0)
}

console.log(`
📋 Next steps:
1. Review the files listed above.
2. For each, replace the imports manually with dynamic() examples:
   👉 Recharts:
     import dynamic from 'next/dynamic'
     const Recharts = dynamic(() => import('recharts'), { ssr: false })

   👉 Framer Motion:
     import dynamic from 'next/dynamic'
     const motion = dynamic(() => import('framer-motion').then(m => m.motion), { ssr: false })
`)
