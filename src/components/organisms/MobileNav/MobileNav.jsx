import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import styles from '@styles/components/organisms/MobileNav.module.css';

function MobileNav() {
    const [kickState, setKickState] = useState({ isKicking: false, result: null, direction: null });

    const handleRugbyKick = () => {
        // Generar resultado aleatorio
        const random = Math.random();
        let result, direction;

        if (random < 0.2) {
            // 20% - Gol (entre los palos)
            result = 'goal';
            direction = 'center';
        } else if (random < 0.6) {
            // 40% - Fallo por la izquierda
            result = 'miss';
            direction = 'left';
        } else {
            // 40% - Fallo por la derecha
            result = 'miss';
            direction = 'right';
        }

        setKickState({ isKicking: true, result, direction });

        // Resetear después de la animación
        setTimeout(() => {
            setKickState({ isKicking: false, result: null, direction: null });
        }, 2000);
    };

    return (
        <>
            {/* Overlay translúcido con efecto de spotlight */}
            {kickState.isKicking && (
                <div className={styles.spotlightOverlay}>
                    <div className={styles.spotlightCone}></div>
                </div>
            )}

            {/* Postes de rugby en el centro de la pantalla */}
            <div className={`${styles.goalPostCenter} ${kickState.isKicking ? styles.showGoal : ''}`}>
                <svg viewBox="0 0 120 200" className={styles.postCenterSvg}>
                    <line x1="30" y1="180" x2="30" y2="40" stroke="var(--primary-light)" strokeWidth="4" />
                    <line x1="90" y1="180" x2="90" y2="40" stroke="var(--primary-light)" strokeWidth="4" />
                    <line x1="30" y1="155" x2="90" y2="155" stroke="var(--primary-light)" strokeWidth="4" />
                </svg>
            </div>

            {/* Mensaje de resultado */}
            {kickState.result && (
                <div className={`${styles.resultMessage} ${kickState.result === 'goal' ? styles.goalMessage : styles.missMessage}`}>
                    {kickState.result === 'goal' ? '+2' : 'Try again'}
                </div>
            )}

            <nav className={styles.mobileNav}>
                <NavLink
                    to="/"
                    className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}
                >
                    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className={styles.label}>Inicio</span>
                </NavLink>

                <NavLink
                    to="/about"
                    className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}
                >
                    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className={styles.label}>Sobre mí</span>
                </NavLink>

                <button
                    className={`${styles.rugbyButton} ${kickState.isKicking ? styles.kicking : ''} ${kickState.direction ? styles[kickState.direction] : ''}`}
                    onClick={handleRugbyKick}
                    aria-label="Patear balón de rugby"
                    disabled={kickState.isKicking}
                >
                    <div className={styles.rugbyBall}>
                        <svg viewBox="0 0 100 100" className={styles.ballSvg}>
                            <ellipse cx="50" cy="50" rx="30" ry="45" fill="var(--primary-color)" />
                            <ellipse cx="50" cy="50" rx="28" ry="43" fill="var(--primary-dark)" />
                            <line x1="50" y1="20" x2="50" y2="80" stroke="var(--text-color)" strokeWidth="1.5" />
                            <line x1="40" y1="45" x2="60" y2="45" stroke="var(--text-color)" strokeWidth="1.5" />
                            <line x1="40" y1="50" x2="60" y2="50" stroke="var(--text-color)" strokeWidth="1.5" />
                            <line x1="40" y1="55" x2="60" y2="55" stroke="var(--text-color)" strokeWidth="1.5" />
                        </svg>
                    </div>
                </button>

                <NavLink
                    to="/projects"
                    className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}
                >
                    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span className={styles.label}>Proyectos</span>
                </NavLink>

                <NavLink
                    to="/contact"
                    className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}
                >
                    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className={styles.label}>Contacto</span>
                </NavLink>
            </nav>
        </>
    );
}

export default MobileNav;
