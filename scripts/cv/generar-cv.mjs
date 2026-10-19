/**
 * Genera los PDF del CV (A4, una página, texto real) desde cv/cv.{es,en}.html.
 *
 * Requisitos: Playwright (devDependency del proyecto, 1.57) + un chromium instalado.
 *   Por defecto usa el chromium que gestiona Playwright (~/.cache/ms-playwright).
 *   Para forzar otro binario: CHROMIUM_PATH=/ruta/al/chrome
 *   (en la VM: ~/.cache/ms-playwright/chromium-1234/chrome-linux/chrome).
 *
 * Uso (desde la raíz del repo): node scripts/cv/generar-cv.mjs
 * Salida: public/cv/jorge-reina-cv-es.pdf y public/cv/jorge-reina-cv-en.pdf
 * Sale con código 1 si algún PDF ocupa más de una página.
 */
import { chromium } from 'playwright';
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const salida = resolve(raiz, 'public/cv');
const idiomas = ['es', 'en'];

mkdirSync(salida, { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
});
let fallo = false;

try {
  for (const lang of idiomas) {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(resolve(raiz, `cv/cv.${lang}.html`)).href);
    await page.evaluate(() => document.fonts.ready);

    const destino = resolve(salida, `jorge-reina-cv-${lang}.pdf`);
    await page.pdf({
      path: destino,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      tagged: true,
    });
    await page.close();

    // Cuenta páginas leyendo los objetos /Type /Page del PDF (sin dependencias).
    const paginas = (readFileSync(destino, 'latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
    console.log(`${destino} — ${paginas} página(s)`);
    if (paginas !== 1) {
      console.error(`ERROR: cv.${lang} ocupa ${paginas} páginas (máx. 1)`);
      fallo = true;
    }
  }
} finally {
  await browser.close();
}

process.exit(fallo ? 1 : 0);
