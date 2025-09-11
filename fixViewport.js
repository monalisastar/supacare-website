// fixViewport.js
// Run with: node fixViewport.js

const fs = require('fs');
const path = require('path');

const APP_DIR = path.join(__dirname, 'src', 'app');
let filesFixed = 0;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx') || entry.name.endsWith('.mdx'))) {
      fixViewport(fullPath);
    }
  }
}

function fixViewport(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const viewportRegex = /viewport\s*:\s*([^\n,}]+)/m;

  const match = content.match(viewportRegex);
  if (match) {
    const viewportValue = match[1].trim();

    // Remove from metadata
    content = content.replace(viewportRegex, '');

    // Add separate export at the end
    const exportLine = `\nexport const viewport = ${viewportValue};\n`;
    content += exportLine;

    fs.writeFileSync(filePath, content, 'utf8');
    filesFixed++;
    console.log(`✅ Fixed viewport in: ${filePath}`);
  }
}

walk(APP_DIR);

console.log(`\n✅ Done! Fixed viewport in ${filesFixed} file(s).`);
