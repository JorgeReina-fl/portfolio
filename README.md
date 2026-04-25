# 🚀 Jorge Reina | Portfolio

> **Desarrollador Full-Stack en Elche, Alicante**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=flat&logo=vite)](https://vitejs.dev)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-FF0055?style=flat&logo=framer)](https://www.framer.com/motion/)
[![Deployed on Oracle Cloud](https://img.shields.io/badge/Deployed-Oracle_Cloud-F80000?style=flat&logo=oracle)](https://jorgereina.com)

---

## 🌐 Demo

🔗 **[jorgereina.com](https://jorgereina.com)**

---

## ✨ Características

- ⚡ **React 19** con Vite para un desarrollo ultrarrápido
- 🎨 **Animaciones fluidas** con Framer Motion
- 📱 **Diseño 100% responsive** (mobile-first)
- 🌙 **Tema oscuro elegante** con glassmorphism
- 🔍 **SEO optimizado** para búsquedas locales (Elche, Alicante)
- 📊 **Datos estructurados** (JSON-LD) para Google
- ⚙️ **Formulario de contacto funcional** con Formspree
- 🔒 **SSL/TLS con Let's Encrypt** — certificados reales end-to-end
- 🐳 **Desplegado en Docker** — Nginx en Oracle Cloud Free Tier

---

## 🛠️ Stack Tecnológico

| Frontend | Animaciones | Estilos | Build | DevOps |
|----------|-------------|---------|-------|--------|
| React 19 | Framer Motion | CSS Modules | Vite | Docker |
| React Router | Motion | CSS Variables | ESLint | Nginx |
| | | | | Oracle Cloud |

---

## 📂 Estructura del Proyecto

```
src/
├── components/
│   ├── atoms/        # Botones, SEO, etc.
│   ├── molecules/    # Cards, SkillsList
│   └── organisms/    # Hero, Header, Footer
├── pages/            # HomePage, AboutPage, etc.
├── styles/           # CSS Modules organizados
├── data/             # Datos de proyectos
└── hooks/            # Custom hooks
```

---

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/JorgeReina-fl/portfolio.git
cd portfolio

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build
```

---

## 🚀 Despliegue en Producción

Desplegado en **Oracle Cloud Free Tier** con Docker + Nginx:

- **VM**: Ubuntu 22.04 ARM64 (4 CPUs, 24 GB RAM)
- **SSL/TLS**: Let's Encrypt con renovación automática
- **DNS**: Cloudflare con proxy activo
- **Dominio**: [jorgereina.com](https://jorgereina.com)

Para actualizar el despliegue:

```bash
cd ~/proyectos/portfolio && git pull && npm run build
```

---

## 🐳 Docker

**Desarrollo local**

```bash
docker compose up -d --build
# Acceder en http://localhost:5173
```

**Producción (Oracle Cloud)**

```bash
npm run build
# Nginx sirve dist/ automáticamente via volumen montado
```

---

## 📬 Contacto

- 🌐 **Web**: [jorgereina.com](https://jorgereina.com)
- 📧 **Email**: [info@jorgereina.com](mailto:info@jorgereina.com)
- 💼 **LinkedIn**: [/in/jorgereinafl](https://linkedin.com/in/jorgereinafl)
- 🐙 **GitHub**: [JorgeReina-fl](https://github.com/JorgeReina-fl)
- 💬 **WhatsApp**: [+34 633 380 269](https://wa.me/34633380269)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

**⭐ Si te gusta mi trabajo, ¡no dudes en dejar una estrella!**
