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
      {/* Partícula decorativa de fondo - simplificada */}
      <div className={styles.particle} style={{ top: '30%', left: '15%' }}></div>

      <motion.div
        className={styles.heroGrid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo optimizado central */}
        <motion.div
          className={styles.logoContainer}
          variants={itemVariants}
        >
          <div className={styles.logoGlow}></div>
          <picture>
            <source srcSet="/logo-morado-jr.webp" type="image/webp" />
            <motion.img
              src="/logo-morado-jr-optimized.png"
              alt="Jorge Reina Logo"
              className={styles.logo}
              width="400"
              height="400"
              fetchpriority="high"
              loading="eager"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </picture>
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
