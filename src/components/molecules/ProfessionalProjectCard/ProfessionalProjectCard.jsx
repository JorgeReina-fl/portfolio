import { motion } from 'framer-motion';
import { Button } from '@atoms';
import styles from '@styles/components/molecules/ProfessionalProjectCard.module.css';

function ProfessionalProjectCard({ experience }) {
    const { company, role, period, description, tech, imageUrl, liveUrl, repoUrl } = experience;

    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className={styles.imageContainer}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={`Proyecto ${company}`}
                        className={styles.image}
                        loading="lazy"
                    />
                ) : (
                    <div className={styles.placeholderImage} />
                )}
            </motion.div>

            <div className={styles.content}>
                <div className={styles.header}>
                    <div className={styles.companyInfo}>
                        <h3 className={styles.company}>{company}</h3>
                        <span className={styles.role}>{role}</span>
                    </div>
                    <div className={styles.period}>{period}</div>
                </div>

                <p className={styles.description}>{description}</p>

                <ul className={styles.techList}>
                    {tech.map((t, index) => (
                        <li key={index} className={styles.techItem}>{t}</li>
                    ))}
                </ul>

                <div className={styles.links}>
                    {liveUrl && (
                        <Button to={liveUrl} variant="primary" target="_blank" rel="noopener noreferrer">
                            Ver Proyecto
                        </Button>
                    )}
                    {repoUrl && (
                        <Button to={repoUrl} variant="secondary" target="_blank" rel="noopener noreferrer">
                            Ver Código
                        </Button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default ProfessionalProjectCard;
