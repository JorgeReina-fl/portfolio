import { FeaturedProjectCard } from '@molecules';
import { motion } from 'framer-motion';
import styles from '@styles/components/organisms/FeaturedProjects.module.css';
import { projectsData } from '@data/projects';

const featuredProjects = projectsData.filter((p) => p.featured);

function FeaturedProjects() {
  return (
    <section className={styles.featuredSection}>
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Proyectos Destacados
      </motion.h2>
      <div>
        {featuredProjects.map((project, index) => (
          <FeaturedProjectCard
            key={index}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProjects;
