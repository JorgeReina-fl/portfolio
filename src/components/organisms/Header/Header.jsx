import { Link, NavLink } from 'react-router-dom';
import styles from '@styles/components/organisms/Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <NavLink to="/" className={styles.logoLink}>
          <picture>
            <source srcSet="/logo-morado-jr.webp" type="image/webp" />
            <img src="/logo-morado-jr-optimized.png" alt="JR" className={styles.logoImage} width="60" height="60" />
          </picture>
        </NavLink>
        <nav>
          <ul className={styles.navList}>
            <li><NavLink to="/" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>Inicio</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>Sobre Mí</NavLink></li>
            <li><NavLink to="/projects" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>Proyectos</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>Contacto</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;