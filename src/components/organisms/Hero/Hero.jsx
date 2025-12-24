import { Button } from '@atoms';
import { motion } from 'framer-motion';
import styles from '@styles/components/organisms/Hero.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

function Hero() {
  return (
    <section className={styles.hero}>
      {/* Partículas decorativas de fondo */}
      <div className={styles.particle} style={{ top: '20%', left: '10%' }}></div>
      <div className={styles.particle} style={{ top: '60%', left: '80%' }}></div>
      <div className={styles.particle} style={{ top: '40%', right: '15%' }}></div>

      <motion.div
        className={styles.heroGrid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo animado central */}
        <motion.div
          className={styles.logoContainer}
          variants={itemVariants}
        >
          <div className={styles.logoGlow}></div>
          <motion.img
            src="/logo-morado-jr.png"
            alt="Jorge Reina Logo"
            className={styles.logo}
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          {/* Partículas orbitando el logo */}
          <div className={styles.orbit}>
            <div className={styles.orbitParticle}></div>
          </div>
          <div className={`${styles.orbit} ${styles.orbit2}`}>
            <div className={styles.orbitParticle}></div>
          </div>
          <div className={`${styles.orbit} ${styles.orbit3}`}>
            <div className={styles.orbitParticle}></div>
          </div>
        </motion.div>

        <motion.h1
          className={styles.headline}
          variants={itemVariants}
        >
          Desarrollador <br /> Full-Stack
        </motion.h1>
        <motion.p
          className={styles.subheadline}
          variants={itemVariants}
        >
          Transformo ideas en aplicaciones web escalables y elegantes. Especializado en React, Node.js y arquitecturas modernas, con un enfoque obsesivo en la calidad del código y la experiencia de usuario.
        </motion.p>
        <motion.div
          className={styles.ctaContainer}
          variants={itemVariants}
        >
          <Button variant="primary" to="/projects">Ver Proyectos</Button>
          <Button variant="secondary" to="/contact">Contactar</Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
