import { Link } from 'react-router-dom';
import styles from '@styles/components/organisms/Footer.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Columna 1: Info y Logo */}
        <div className={styles.column}>
          <Link to="/" className={styles.logoLink}>
            <picture>
              <source srcSet="/logo-morado-jr.webp" type="image/webp" />
              <img src="/logo-morado-jr-optimized.png" alt="Jorge Reina" className={styles.logo} width="80" height="80" />
            </picture>
          </Link>
          <p className={styles.description}>
            Desarrollador Full-Stack apasionado por crear experiencias web modernas, accesibles y de alto rendimiento.
          </p>
        </div>

        {/* Columna 2: Enlaces Rápidos */}
        <div className={styles.column}>
          <h3 className={styles.title}>Navegación</h3>
          <ul className={styles.linkList}>
            <li><Link to="/" className={styles.link}>Inicio</Link></li>
            <li><Link to="/about" className={styles.link}>Sobre Mí</Link></li>
            <li><Link to="/projects" className={styles.link}>Proyectos</Link></li>
            <li><Link to="/contact" className={styles.link}>Contacto</Link></li>
          </ul>
        </div>

        {/* Columna 3: Social y Contacto */}
        <div className={styles.column}>
          <h3 className={styles.title}>Conecta</h3>
          <ul className={styles.linkList}>
            <li>
              <a href="https://github.com/JorgeReina-fl" target="_blank" rel="noopener noreferrer" className={styles.link}>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/jorgereinafl/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/jorgereina.fl/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                Instagram
              </a>
            </li>
            <li>
              <a href="https://www.freecodecamp.org/jorge_luis_reina_guaman" target="_blank" rel="noopener noreferrer" className={styles.link}>
                freeCodeCamp
              </a>
            </li>
            <li>
              <a href="https://wa.me/34633380269" target="_blank" rel="noopener noreferrer" className={styles.link}>
                WhatsApp
              </a>
            </li>
            <li>
              <a href="mailto:jorgereina.fl@gmail.com" className={styles.link}>
                E-mail
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #333', marginTop: '40px', paddingTop: '20px', textAlign: 'center', color: '#888', fontSize: '0.9rem', maxWidth: '800px', margin: '40px auto 0' }}>
        <p style={{ marginBottom: '15px' }}>
          <strong>Decisión de Arquitectura:</strong> Este portfolio está construido con <strong>Vite</strong> para priorizar un Tiempo de Interacción (TTI) mínimo para una SPA estática. Para aplicaciones de nivel empresarial que requieren SEO dinámico y escalabilidad horizontal, mi estándar es <strong>Next.js (App Router)</strong> con <strong>React Server Components</strong>.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center' }}>
          <div style={{ background: '#f0f0f0', color: '#00cc66', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span>⚡ Rendimiento: 100</span>
          </div>
          <div style={{ background: '#f0f0f0', color: '#00cc66', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span>♿ Accesibilidad: 100</span>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        <p>© {currentYear} Jorge Reina. Desarrollado con React 19 y Vite.</p>
      </div>
    </footer>
  );
}

export default Footer;