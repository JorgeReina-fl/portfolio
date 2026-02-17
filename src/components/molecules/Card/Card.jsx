import { Button } from '@atoms';
import { motion } from 'framer-motion';
import styles from '@styles/components/molecules/Card.module.css';

function Card({ title, description, repoUrl, liveUrl, imageUrl }) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <div className={styles.imageContainer}>
        {imageUrl ? (
          <picture>
            <source
              srcSet={imageUrl.replace('.png', '.webp')}
              type="image/webp"
            />
            <img
              src={imageUrl}
              alt={title}
              className={styles.image}
              width="1200"
              height="675"
              loading="lazy"
            />
          </picture>
        ) : (
          <div className={styles.imagePlaceholder}>
            <span>[Imagen del Proyecto]</span>
          </div>
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.links}>
          {liveUrl && <Button to={liveUrl} variant="primary">Ver Demo</Button>}
          {repoUrl && <Button to={repoUrl} variant="secondary">Ver Código</Button>}
        </div>
      </div>
    </motion.div>
  );
}

export default Card;
