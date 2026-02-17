import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { statSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = join(__dirname, 'public');

const images = [
    { input: 'developer.png', width: 800, quality: 85 },
    { input: 'logo-morado-jr.png', width: 400, quality: 90 },
    { input: 'icono.png', width: 192, quality: 90 },
    // Imágenes de proyectos
    { input: 'proyectos-img/Freelance-Priority-Viz.png', width: 1200, quality: 80 },
    { input: 'proyectos-img/Portfolio-image.png', width: 1200, quality: 80 },
    { input: 'proyectos-img/ecommerce-mockup.png', width: 1200, quality: 80 },
    { input: 'proyectos-img/proyecto-alpha.png', width: 1200, quality: 80 },
];

async function optimizeImages() {
    console.log('🖼️  Optimizando imágenes...\n');

    for (const img of images) {
        const inputPath = join(publicDir, img.input);
        const outputName = img.input.replace('.png', '');
        const webpPath = join(publicDir, `${outputName}.webp`);
        const pngPath = join(publicDir, `${outputName}-optimized.png`);

        try {
            const originalSize = statSync(inputPath).size;

            // Generar WebP
            await sharp(inputPath)
                .resize(img.width, null, { withoutEnlargement: true })
                .webp({ quality: img.quality, effort: 6 })
                .toFile(webpPath);

            // Generar PNG optimizado como fallback
            await sharp(inputPath)
                .resize(img.width, null, { withoutEnlargement: true })
                .png({ quality: img.quality, compressionLevel: 9 })
                .toFile(pngPath);

            const webpSize = statSync(webpPath).size;
            const pngSize = statSync(pngPath).size;

            console.log(`✅ ${img.input}`);
            console.log(`   Original: ${(originalSize / 1024).toFixed(2)} KB`);
            console.log(`   WebP: ${(webpSize / 1024).toFixed(2)} KB (${((1 - webpSize / originalSize) * 100).toFixed(1)}% reducción)`);
            console.log(`   PNG optimizado: ${(pngSize / 1024).toFixed(2)} KB (${((1 - pngSize / originalSize) * 100).toFixed(1)}% reducción)\n`);
        } catch (error) {
            console.error(`❌ Error procesando ${img.input}:`, error.message);
        }
    }

    console.log('✨ Optimización completada!');
}

optimizeImages().catch(console.error);
