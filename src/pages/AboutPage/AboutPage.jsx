import { motion } from 'framer-motion';
import { SkillsList } from '@molecules';
import { SEO } from '@atoms';
import styles from './AboutPage.module.css';

const mySkills = [
  'React', 'JavaScript (ES6+)', 'Node.js', 'Express', 'MongoDB', 'HTML5', 'CSS3', 'Sass', 'Vite', 'Git', 'REST APIs', 'GraphQL'
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
            ¡Hola! Soy Jorge Reina, un desarrollador de software con un profundo interés en construir aplicaciones web que no solo funcionen a la perfección, sino que también ofrezcan una experiencia de usuario intuitiva y agradable. Mi viaje en el mundo de la programación comenzó con la curiosidad de cómo las ideas se transforman en productos digitales tangibles.
          </motion.p>
          <motion.p variants={itemVariants}>
            Me especializo en el ecosistema de JavaScript, trabajando cómodamente tanto en el frontend con librerías como React, como en el backend desarrollando APIs robustas con Node.js. Disfruto enfrentándome a retos complejos y estoy en un proceso de aprendizaje y mejora continua.
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
