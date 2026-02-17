import { motion } from 'framer-motion';
import { SkillsList } from '@molecules';
import { SEO } from '@atoms';
import styles from './AboutPage.module.css';

const mySkills = [
  'React 19', 'Next.js 15', 'TypeScript', 'Node.js', 'PostgreSQL', 'Supabase', 'Docker', 'Cypress (E2E)', 'Vite', 'Tailwind 4', 'GSAP', 'Zod'
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const imageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

function AboutPage() {
  return (
    <section className={styles.aboutSection}>
      <SEO
        title="Sobre Mí - Jorge Reina | Desarrollador Full-Stack"
        description="Conoce más sobre Jorge Reina, desarrollador full-stack apasionado por crear aplicaciones web modernas con React y Node.js. Experiencia en JavaScript, MongoDB y más."
        url="https://jorgereina.es/about"
      />
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Sobre Mí
      </motion.h1>
      <motion.div
        className={styles.aboutContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className={styles.profileImage} variants={imageVariants}>
          <picture>
            <source srcSet="/developer.webp" type="image/webp" />
            <img src="/developer-optimized.png" alt="Jorge Reina" className={styles.image} width="800" height="800" loading="lazy" />
          </picture>
        </motion.div>
        <motion.div className={styles.bio} variants={itemVariants}>
          <motion.h2 variants={itemVariants}>
            Apasionado por la tecnología y la creación de soluciones.
          </motion.h2>
          <motion.p variants={itemVariants}>
            **Ventaja Competitiva:** Mi trayectoria de 9 años en Rugby federado ha forjado un enfoque disciplinado hacia el liderazgo y la resiliencia bajo presión. Aplico estos mismos principios a los equipos de desarrollo: comunicación clara, adaptabilidad estratégica y un impulso inquebrantable para alcanzar los objetivos.
          </motion.p>
          <motion.p variants={itemVariants}>
            Como adoptador temprano de tecnologías emergentes como **React 19** y **Tailwind 4**, no solo sigo tendencias, las aprovecho para construir la web del mañana hoy. Me especializo en migrar sistemas heredados a arquitecturas modernas de alto rendimiento (Next.js 14/15) que impactan directamente en la agilidad del negocio.
          </motion.p>
          <motion.div variants={itemVariants}>
            <SkillsList skills={mySkills} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default AboutPage;
