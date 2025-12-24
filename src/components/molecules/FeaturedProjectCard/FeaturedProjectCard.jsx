import { Button } from '@atoms';
import { motion } from 'framer-motion';
import styles from '@styles/components/molecules/FeaturedProjectCard.module.css';

function FeaturedProjectCard({ project, imagePosition = 'left' }) {
  const { title, description, tech, repoUrl, liveUrl, imageUrl } = project;
  const cardClassName = `${styles.card} ${imagePosition === 'right' ? styles.imageRight : ''}`;

  return (
    <motion.div
      className={cardClassName}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className={styles.imageContainer}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <img src={imageUrl} alt={`Captura de pantalla del proyecto ${title}`} className={styles.image} loading="lazy" />
      </motion.div>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, x: imagePosition === 'right' ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.description}>
          <p>{description}</p>
        </div>
        <ul className={styles.techList}>
          {tech.map((t, i) => <li key={i} className={styles.techItem}>{t}</li>)}
        </ul>
        <div className={styles.links}>
          {liveUrl && <Button to={liveUrl} variant="primary" target="_blank" rel="noopener noreferrer">Ver Demo</Button>}
          {repoUrl && <Button to={repoUrl} variant="secondary" target="_blank" rel="noopener noreferrer">Ver Código</Button>}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default FeaturedProjectCard;
