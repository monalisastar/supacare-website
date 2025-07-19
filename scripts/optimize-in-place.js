const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/images');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      walkDir(fullPath, callback);
    } else {
      callback(fullPath);
    }
  });
}

walkDir(inputDir, (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return;

  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath, ext);
  const outputPath = path.join(dir, `${baseName}.webp`);

  sharp(filePath)
    .resize({ width: 1600 }) // Optional: max resize
    .toFormat('webp', { quality: 80 })
    .toFile(outputPath)
    .then(() => console.log(`✅ Optimized: ${outputPath}`))
    .catch(err => console.error(`❌ Error processing ${filePath}: ${err}`));
});
