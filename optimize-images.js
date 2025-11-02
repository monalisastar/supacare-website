import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import globby from "globby"; // ✅ fixed import style

async function optimizeImages() {
  const files = await globby(["public/images/**/*.{png,jpg,jpeg,webp}"]);

  console.log(`🪄 Found ${files.length} images. Optimizing now...`);

  await imagemin(files, {
    destination: "public/images",
    plugins: [
      imageminMozjpeg({ quality: 75 }),
      imageminPngquant({ quality: [0.7, 0.85] }),
      imageminWebp({ quality: 75 }),
    ],
  });

  console.log("✅ Image optimization complete!");
}

optimizeImages().catch((err) => console.error("❌ Error optimizing images:", err));
