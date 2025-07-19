const fs = require('fs');
const path = require('path');

const directoryToScan = path.join(__dirname, '../src');

// File extensions to target
const validExts = ['.tsx', '.jsx'];
const videoExts = ['.mp4', '.mov', '.mkv'];

function updateVideoPathsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  videoExts.forEach(ext => {
    const regex = new RegExp(`(["'\`])([^"'\\\`]+)\\${ext}\\1`, 'g');
    content = content.replace(regex, (match, quote, filename) => {
      updated = true;
      return `${quote}${filename}.webm${quote}`;
    });
  });

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`🔁 Updated: ${filePath}`);
  }
}

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (validExts.includes(path.extname(fullPath))) {
      updateVideoPathsInFile(fullPath);
    }
  });
}

walk(directoryToScan);
console.log('✅ All video paths updated to .webm!');
