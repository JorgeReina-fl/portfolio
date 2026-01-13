import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fontsDir = path.join(__dirname, 'public', 'fonts');

// Crear directorio de fuentes si no existe
if (!fs.existsSync(fontsDir)) {
    fs.mkdirSync(fontsDir, { recursive: true });
}

// URLs de las fuentes Inter desde Google Fonts
const fontUrls = [
    {
        url: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiA.woff2',
        filename: 'inter-300.woff2',
        weight: 300
    },
    {
        url: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZJhiA.woff2',
        filename: 'inter-400.woff2',
        weight: 400
    },
    {
        url: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZBhiA.woff2',
        filename: 'inter-500.woff2',
        weight: 500
    },
    {
        url: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAYBhiA.woff2',
        filename: 'inter-600.woff2',
        weight: 600
    },
    {
        url: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZthiA.woff2',
        filename: 'inter-700.woff2',
        weight: 700
    },
    {
        url: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZVhiA.woff2',
        filename: 'inter-800.woff2',
        weight: 800
    }
];

function downloadFont(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                const file = fs.createWriteStream(filepath);
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
            } else {
                reject(new Error(`Failed to download: ${response.statusCode}`));
            }
        }).on('error', reject);
    });
}

async function downloadFonts() {
    console.log('📥 Descargando fuentes Inter...\n');

    for (const font of fontUrls) {
        const filepath = path.join(fontsDir, font.filename);

        try {
            await downloadFont(font.url, filepath);
            const size = fs.statSync(filepath).size;
            console.log(`✅ ${font.filename} (${(size / 1024).toFixed(2)} KB) - weight: ${font.weight}`);
        } catch (error) {
            console.error(`❌ Error descargando ${font.filename}:`, error.message);
        }
    }

    console.log('\n✨ Fuentes descargadas exitosamente!');
}

downloadFonts().catch(console.error);
