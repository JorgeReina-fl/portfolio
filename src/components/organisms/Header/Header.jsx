import { Link, NavLink } from 'react-router-dom';
import styles from '@styles/components/organisms/Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <NavLink to="/" className={styles.logoLink}>
          <img src="/logo-morado-jr.png" alt="JR" className={styles.logoImage} />
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