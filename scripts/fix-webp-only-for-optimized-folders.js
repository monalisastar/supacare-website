const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '../');
const ALLOWED_EXT = ['.tsx', '.ts', '.jsx', '.js'];

// Folders where webp versions exist
const TARGET_FOLDERS = [
  '/images/services/',
  '/images/carbon-advisory/',
  '/images/recycling and composting/',
  '/images/smart-waste/',
  '/images/waste-collection/',
  '/images/environmental consultancy/',
];

// Matches src="/images/services/...webp" or background: url(...)
const regex = new RegExp(
  `(["'(])(${TARGET_FOLDERS.join('|').replace(/\//g, '\\/')})([^"')]+?)\\.(png|jpg|jpeg)(["')])`,
  'gi'
);

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      walk(fullPath, callback);
    } else if (ALLOWED_EXT.includes(path.extname(file))) {
      callback(fullPath);
    }
  });
}

function convertToWebP(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  const updated = content.replace(regex, (_, pre, folder, file, _ext, post) => {
    return `${pre}${folder}${file}.webp${post}`;
  });

  if (updated !== content) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`🔁 Updated: ${filePath}`);
  }
}

walk(ROOT_DIR, convertToWebP);
