# Arquitectura del proyecto `portfolio`

Este documento describe la estructura recomendada y las convenciones del proyecto para que cualquier colaborador entienda rápidamente dónde colocar código y cómo organizar nuevas características.

Objetivos:
- Separar responsabilidades por capas: pages, layouts, componentes (atoms/molecules/organisms), styles y assets.
- Evitar duplicidad (una única implementación para elementos del layout como Header/Footer).
- Facilitar la búsqueda y mantenibilidad.

Estructura propuesta (actual / adaptada)

```
src/
  assets/                # imágenes, svg, favicon, etc.
  data/                  # datos estáticos (por ejemplo projects.js)
  pages/                 # rutas principales (HomePage, AboutPage, ProjectsPage, ContactPage)
  layouts/               # componentes de alto nivel que envuelven páginas (Header, Footer, Layout)
  components/
    atoms/               # componentes básicos (Button, Icon, Input)
    molecules/           # combinaciones de atoms (Card, FeaturedProjectCard)
    organisms/           # secciones compuestas (Hero, ProjectGrid, FeaturedProjects)
  router/                # configuración de rutas (React Router)
  styles/                # css global y modules compartidos (App.module.css, main.css)
  App.jsx
  main.jsx
```

Convenciones

- `layouts/*` contiene los componentes que definen la estructura de la página (Header, Footer, Layout). Evita duplicar Header/Footer dentro de `components/`.
- `components/atoms` son componentes puros, sin lógica compleja.
- `components/molecules` combinan atoms y quizá aceptan props para variar comportamiento.
- `components/organisms` son secciones de la UI que pueden incluir otras molecules/atoms.
- Usa CSS Modules (`*.module.css`) junto con clases nombradas con kebab-case para estilos locales.
- Para estilos globales y tokens (variables CSS), usa `src/styles/main.css` y `src/styles/index.css`.

Cambios aplicados en esta rama

- Los archivos vacíos duplicados `src/components/organisms/Header.jsx` y `src/components/organisms/Footer.jsx` ahora re-exportan las implementaciones reales en `src/layouts/*` para evitar confusión y mantener compatibilidad con imports existentes.
- Se añadió esta documentación `ARCHITECTURE.md` explicando la estructura y convenciones.

Cómo continuar

- Si quieres consolidar más, podemos mover `layouts/Header.module.css` y `layouts/Footer.module.css` a `src/styles/` y ajustar imports.
- Podemos añadir un `src/layouts/RootLayout.jsx` (si no existe) que envuelva `Header` y `Footer` y provea un `Container` consistente para las páginas.
- Si prefieres que `components/organisms` contenga implementaciones en lugar de `layouts/`, puedo mover los archivos y actualizar todos los imports automáticamente.

Si quieres que aplique alguno de los movimientos de archivos (por ejemplo mover estilos a `src/styles/` o unificar Header/Footer en `components/organisms`), dime cuál y lo hago automáticamente actualizando los imports.
