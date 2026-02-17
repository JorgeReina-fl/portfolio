# Tests Automatizados - Portfolio

Este directorio contiene tests automatizados para verificar la calidad del portfolio en términos de accesibilidad, rendimiento, SEO y mejores prácticas.

## 🧪 Tests Disponibles

### Tests de Accesibilidad (`accessibility.spec.js`)

Verifica el cumplimiento de estándares WCAG 2.1 AA usando Playwright y axe-core.

**Qué se prueba:**
- ✅ Cumplimiento WCAG 2.1 AA
- ✅ Estructura de headings (un solo h1 por página)
- ✅ Atributo lang en HTML
- ✅ Meta descriptions presentes y con longitud adecuada
- ✅ Navegación por teclado funcional
- ✅ Contraste de colores adecuado

**Ejecutar:**
```bash
npm run test:a11y
```

### Tests de Rendimiento y SEO (`lighthouse.js`)

Ejecuta auditorías de Lighthouse para medir rendimiento, accesibilidad, SEO y mejores prácticas.

**Umbrales configurados:**
- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 90
- SEO: ≥ 95

**Métricas clave:**
- First Contentful Paint: < 1.8s
- Largest Contentful Paint: < 2.5s
- Total Blocking Time: < 200ms
- Cumulative Layout Shift: < 0.1
- Speed Index: < 3.0s

**Ejecutar:**
```bash
npm run test:lighthouse
```

Los reportes se guardan en `/lighthouse-reports` en formato HTML y JSON.

## 🚀 Ejecutar Todos los Tests

```bash
npm test
```

o

```bash
npm run test:all
```

Esto ejecutará:
1. Build de producción
2. Tests de accesibilidad
3. Auditoría Lighthouse

## 📋 Requisitos Previos

### Primera vez - Instalar navegadores de Playwright

```bash
npm run test:install
```

Esto instalará Chromium necesario para ejecutar los tests.

## 📊 Interpretación de Resultados

### Tests de Accesibilidad

- **✅ Passed**: No se encontraron violaciones de accesibilidad
- **❌ Failed**: Se encontraron violaciones que deben corregirse

Las violaciones se mostrarán con:
- Descripción del problema
- Elementos afectados
- Cómo solucionarlo

### Lighthouse

Los resultados muestran:
- **Puntuaciones por categoría** (0-100)
- **Métricas de rendimiento** con valores específicos
- **✅/❌** indicando si cumple con los umbrales

## 🔧 Solución de Problemas

### Error: "Cannot find module '@playwright/test'"

Instala las dependencias:
```bash
npm install
```

### Error: "Executable doesn't exist"

Instala los navegadores de Playwright:
```bash
npm run test:install
```

### Error: "ECONNREFUSED" o "net::ERR_CONNECTION_REFUSED"

Asegúrate de que el servidor de preview esté corriendo. Los tests lo inician automáticamente, pero si hay problemas:

```bash
npm run build
npm run preview
```

En otra terminal:
```bash
npm run test:a11y
```

## 📈 CI/CD Integration

Para integrar en GitHub Actions u otro CI/CD, usa:

```yaml
- name: Install dependencies
  run: npm ci

- name: Install Playwright browsers
  run: npm run test:install

- name: Run tests
  run: npm test
```

## 🎯 Mejores Prácticas

1. **Ejecuta los tests antes de cada commit importante**
2. **Revisa los reportes de Lighthouse** para identificar oportunidades de mejora
3. **No ignores las violaciones de accesibilidad** - afectan a usuarios reales
4. **Mantén los umbrales altos** - la calidad es importante

## 📚 Recursos

- [Playwright Documentation](https://playwright.dev/)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
