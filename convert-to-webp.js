/**
 * convert-to-webp.js
 * ------------------------------------------------
 * Converts all .png/.jpg/.jpeg images in /public/images to .webp,
 * then updates .tsx files in /src to reference the new .webp versions.
 *
 * ✅ Skips already converted or existing .webp images
 * ✅ Keeps original PNG/JPG files intact
 * ✅ Dynamically adjusts compression quality by size
 * ✅ Skips .tsx files that already have correct .webp references
 * 📊 Prints summary stats at the end
 */

import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const imagesDir = path.join(process.cwd(), 'public', 'images')
const srcDir = path.join(process.cwd(), 'src')

// 📊 Stats tracker
const summary = {
  converted: 0,
  skipped: 0,
  updatedTsx: 0,
}

// 🧩 Step 1: Convert all PNG/JPG → WEBP
async function convertFolder(folderPath) {
  const entries = await fs.promises.readdir(folderPath, { withFileTypes: true })

  for (const entry of entries) {
    const entryPath = path.join(folderPath, entry.name)

    if (entry.isDirectory()) {
      await convertFolder(entryPath)
      continue
    }

    const ext = path.extname(entry.name).toLowerCase()
    const base = path.basename(entry.name, ext)

    // Skip if not image
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue

    const webpPath = path.join(folderPath, `${base}.webp`)
    if (fs.existsSync(webpPath)) {
      // Skip if .webp already exists and is newer than the source image
      const srcTime = (await fs.promises.stat(entryPath)).mtimeMs
      const webpTime = (await fs.promises.stat(webpPath)).mtimeMs
      if (webpTime >= srcTime) {
        console.log(`✅ Up to date: ${base}.webp`)
        summary.skipped++
        continue
      }
    }

    try {
      const stats = await fs.promises.stat(entryPath)
      const sizeMB = stats.size / (1024 * 1024)
      let quality = 80
      if (sizeMB > 2) quality = 60
      else if (sizeMB > 1) quality = 70

      await sharp(entryPath).webp({ quality }).toFile(webpPath)
      console.log(`🟢 Converted: ${entry.name} → ${base}.webp (Quality: ${quality}%)`)
      summary.converted++
    } catch (err) {
      console.error(`❌ Error converting ${entry.name}:`, err.message)
    }
  }
}

// 🧠 Step 2: Update .tsx files only if needed
async function updateTsxFiles(folderPath) {
  const entries = await fs.promises.readdir(folderPath, { withFileTypes: true })

  for (const entry of entries) {
    const entryPath = path.join(folderPath, entry.name)

    if (entry.isDirectory()) {
      await updateTsxFiles(entryPath)
      continue
    }

    if (!entry.name.endsWith('.tsx')) continue

    let content = await fs.promises.readFile(entryPath, 'utf-8')

    // Skip files that already use only .webp references
    if (!/\/images\/[^"']+\.(png|jpg|jpeg)/.test(content)) {
      continue
    }

    const matches = content.matchAll(/["'](\/images\/[^"']+\.(png|jpg|jpeg))["']/g)
    let changed = false

    for (const match of matches) {
      const oldPath = match[1]
      const newPath = oldPath.replace(/\.(png|jpg|jpeg)$/, '.webp')
      const absoluteWebpPath = path.join(process.cwd(), 'public', newPath)

      // Only rewrite if matching .webp actually exists
      if (fs.existsSync(absoluteWebpPath)) {
        content = content.replaceAll(oldPath, newPath)
        console.log(`✏️ Updated: ${entry.name} → ${newPath}`)
        changed = true
      }
    }

    if (changed) {
      await fs.promises.writeFile(entryPath, content, 'utf-8')
      summary.updatedTsx++
    }
  }
}

// 🏁 Main
async function main() {
  console.log('🚀 Starting selective image optimization and updates...\n')
  await convertFolder(imagesDir)
  await updateTsxFiles(srcDir)

  console.log('\n📊 Summary:')
  console.log('----------------------------------')
  console.log(`🟢 Converted images : ${summary.converted}`)
  console.log(`✅ Skipped (up to date) : ${summary.skipped}`)
  console.log(`✏️ Updated .tsx files : ${summary.updatedTsx}`)
  console.log('----------------------------------')
  console.log('\n🎉 Done! Optimized new images and updated references.\n')
}

main().catch(err => console.error('💥 Process failed:', err))
