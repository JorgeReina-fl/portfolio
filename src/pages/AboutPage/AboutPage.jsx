import { motion } from 'framer-motion';
import { SkillsList } from '@molecules';
import { SEO } from '@atoms';
import styles from './AboutPage.module.css';

const skillGroups = [
  { title: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { title: 'Backend', skills: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'MongoDB', 'Redis'] },
  { title: 'IA', skills: ['Gemini API', 'embeddings con pgvector'] },
  { title: 'Infraestructura y seguridad', skills: ['Docker', 'Nginx', 'Linux', 'Cloudflare', 'Oracle Cloud', 'GitHub Actions', "Let's Encrypt"] },
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
        title="Sobre mí · Jorge Reina, Full Stack & AI Engineer"
        description="Desarrollador full stack en Elche y fundador de mivia.es. IA en producción, infraestructura propia y seguridad. Estudia Estadística Empresarial en la UMH."
        url="https://jorgereina.com/about"
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
            Desarrollo producto de la base de datos al servidor.
          </motion.h2>
          <motion.p variants={itemVariants}>
            Soy Jorge Reina, desarrollador full stack en Elche. Fundé mivia.es, un estudio de software con productos propios y proyectos para clientes: gestión de obras con lectura de facturas y presupuestos por voz con Gemini, una plataforma para equipos de rugby y varias webs con su panel de administración.
          </motion.p>
          <motion.p variants={itemVariants}>
            Administro yo mismo la infraestructura donde corren: 16 servicios en Docker, origen cerrado a Cloudflare, backups cifrados con restauración ensayada y respuesta a incidentes. Ahora mido calidad y coste de los modelos de IA antes de elegir cuál usar en cada tarea.
          </motion.p>
          <motion.p variants={itemVariants}>
            Estudio el Grado en Estadística Empresarial en la UMH y entreno al equipo de rugby 7s de la universidad.
          </motion.p>
          {skillGroups.map(({ title, skills }) => (
            <motion.div key={title} variants={itemVariants}>
              <h3 className={styles.skillGroupTitle}>{title}</h3>
              <SkillsList skills={skills} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default AboutPage;
