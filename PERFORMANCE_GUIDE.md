# Guía de Optimización de Rendimiento

## 🔴 Importante: Desarrollo vs Producción

Los errores que estás viendo son **normales en modo desarrollo**. Vite sirve archivos sin minificar para facilitar el debugging.

### Diferencias Clave

| Aspecto | Desarrollo (`npm run dev`) | Producción (`npm run build`) |
|---------|---------------------------|------------------------------|
| Minificación | ❌ No | ✅ Sí (Terser) |
| Code Splitting | ❌ Limitado | ✅ Completo |
| Tree Shaking | ❌ No | ✅ Sí |
| Tamaño JS | ~1.8 MB | ~200-300 KB |
| Console.logs | ✅ Incluidos | ❌ Eliminados |

---

## ✅ Cómo Ver el Rendimiento Real

### Paso 1: Construir para Producción

```bash
npm run build
```

Esto creará una versión optimizada en la carpeta `/dist` con:
- JavaScript minificado
- Code splitting aplicado
- Vendors separados (React, Router)
- Console.logs eliminados

### Paso 2: Previsualizar la Build de Producción

```bash
npm run preview
```

Esto iniciará un servidor local en `http://localhost:4173` con la versión optimizada.

### Paso 3: Ejecutar Lighthouse en Producción

```bash
npm run test:lighthouse
```

Esto analizará la versión de producción y mostrará las métricas reales.

---

## 📊 Resultados Esperados en Producción

### Tamaños de Archivo Optimizados

**Antes (desarrollo):**
- Total: ~1.8 MB
- react-dom: 982 KB
- react-router: 433 KB

**Después (producción):**
- Total: ~200-300 KB
- react-vendor.js: ~140 KB (gzipped: ~45 KB)
- router.js: ~50 KB (gzipped: ~15 KB)
- main.js: ~30 KB (gzipped: ~10 KB)

### Métricas de Rendimiento

- **Performance Score**: ≥ 90
- **First Contentful Paint**: < 1.8s
- **Largest Contentful Paint**: < 2.5s
- **Total Blocking Time**: < 200ms
- **Cumulative Layout Shift**: < 0.1

---

## 🚀 Optimizaciones Adicionales (Opcionales)

Si después de hacer el build de producción aún quieres mejorar más, aquí hay opciones adicionales:

### 1. Lazy Loading de Componentes Pesados

**Crear archivo:** `src/router/index.jsx`

```javascript
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';

// Lazy load de páginas
const HomePage = lazy(() => import('../pages/HomePage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ProjectsPage = lazy(() => import('../pages/ProjectsPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));

// Loading component simple
const PageLoader = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '60vh',
    color: 'var(--primary-light)'
  }}>
    <div>Cargando...</div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: 'projects',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProjectsPage />
          </Suspense>
        ),
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ContactPage />
          </Suspense>
        ),
      },
    ],
  },
]);
```

**Beneficio:** Cada página se carga solo cuando el usuario navega a ella.

### 2. Comprimir Assets con Gzip/Brotli

**Actualizar `vite.config.js`:**

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { compression } from 'vite-plugin-compression2'

export default defineConfig({
  plugins: [
    react(),
    compression({ algorithm: 'gzip' }),
    compression({ algorithm: 'brotliCompress' }),
  ],
  build: {
    // ... configuración existente
  },
})
```

**Instalar dependencia:**
```bash
npm install -D vite-plugin-compression2
```

### 3. Optimizar Imágenes

Si añades imágenes al portfolio:

```bash
npm install -D vite-plugin-imagemin
```

---

## 🧪 Comandos de Verificación

### Build y Análisis Completo

```bash
# 1. Limpiar build anterior
rm -rf dist

# 2. Construir para producción
npm run build

# 3. Analizar tamaño de bundles
npm run build -- --mode analyze

# 4. Previsualizar
npm run preview

# 5. En otra terminal, ejecutar Lighthouse
npm run test:lighthouse
```

### Ver Tamaño de Bundles

Después de `npm run build`, verás algo como:

```
dist/assets/react-vendor-abc123.js    140.25 kB │ gzip: 45.12 kB
dist/assets/router-def456.js           48.73 kB │ gzip: 14.89 kB
dist/assets/index-ghi789.js            28.45 kB │ gzip:  9.23 kB
```

---

## ⚠️ Notas Importantes

1. **No te preocupes por los warnings en desarrollo** - Son normales y esperados
2. **Lighthouse debe ejecutarse en producción** - Los resultados en desarrollo no son representativos
3. **El servidor de preview (`npm run preview`) simula producción** - Úsalo para testing real
4. **Las optimizaciones de Vite son automáticas** - Ya están configuradas en `vite.config.js`

---

## 📈 Checklist de Optimización

- [x] Configuración de Terser en `vite.config.js`
- [x] Code splitting configurado
- [x] Preconnect para Google Fonts
- [x] Eliminación de console.logs en producción
- [ ] Build de producción ejecutado (`npm run build`)
- [ ] Preview testeado (`npm run preview`)
- [ ] Lighthouse ejecutado en producción
- [ ] (Opcional) Lazy loading implementado
- [ ] (Opcional) Compresión gzip/brotli

---

## 🎯 Próximos Pasos

1. **Ejecuta el build de producción:**
   ```bash
   npm run build
   npm run preview
   ```

2. **Abre http://localhost:4173 en tu navegador**

3. **Ejecuta Lighthouse:**
   ```bash
   npm run test:lighthouse
   ```

4. **Revisa los reportes en `/lighthouse-reports`**

Verás que los números son **completamente diferentes** en producción vs desarrollo.
