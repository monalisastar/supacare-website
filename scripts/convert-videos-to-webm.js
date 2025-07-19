const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const videosDir = path.join(__dirname, '../public/videos');
const videoExts = ['.mp4', '.mov', '.mkv'];

async function processVideos() {
  const files = fs.readdirSync(videosDir);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();

    if (!videoExts.includes(ext)) continue;

    const inputPath = path.join(videosDir, file);
    const baseName = path.basename(file, ext);
    const outputPath = path.join(videosDir, `${baseName}.webm`);

    if (fs.existsSync(outputPath)) {
      console.log(`⚠️ Skipped (already exists): ${baseName}.webm`);
      continue;
    }

    try {
      await new Promise((resolve, reject) => {
        exec(
          `ffmpeg -i "${inputPath}" -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus "${outputPath}"`,
          (error, stdout, stderr) => {
            if (error) {
              console.error(`❌ Error converting ${file}: ${error.message}`);
              return reject(error);
            }
            console.log(`✅ Converted: ${baseName}.webm`);
            resolve();
          }
        );
      });
    } catch (err) {
      console.error(`❌ Failed to convert ${file}`);
    }
  }

  console.log('🎉 All done!');
}

processVideos();
