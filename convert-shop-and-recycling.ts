import sharp from 'sharp';
import fg from 'fast-glob';
import path from 'path';
import fs from 'fs';

const foldersToCheck = [
  path.join(process.cwd(), 'public/images/shop'),
  path.join(process.cwd(), 'public/images/recycling and composting'),
];

async function convertToWebp() {
  let converted = 0;
  let skipped = 0;
  let totalFound = 0;

  for (const dir of foldersToCheck) {
    console.log(`\n📁 Scanning: ${dir}`);
    const files = await fg(`${dir}/**/*.{png,jpg,jpeg,JPG,JPEG,PNG}`, { dot: false });

    if (files.length === 0) {
      console.log(`❌ No image files found in: ${dir}`);
      continue;
    }

    for (const file of files) {
      const ext = path.extname(file);
      const base = file.slice(0, -ext.length);
      const webpFile = `${base}.webp`;

      if (fs.existsSync(webpFile)) {
        console.log(`⏭️  Already exists: ${path.basename(webpFile)}`);
        skipped++;
        continue;
      }

      try {
        await sharp(file)
          .webp({ quality: 80 })
          .toFile(webpFile);

        console.log(`✅ Converted: ${path.basename(file)} → ${path.basename(webpFile)}`);
        converted++;
      } catch (err) {
        if (err instanceof Error) {
          console.error(`❌ Error converting ${file}:`, err.message);
        } else {
          console.error(`❌ Unknown error converting ${file}:`, err);
        }
      }
    }

    totalFound += files.length;
  }

  console.log(`\n🎯 Summary: ${totalFound} found | ${converted} converted | ${skipped} skipped`);
}

convertToWebp();
