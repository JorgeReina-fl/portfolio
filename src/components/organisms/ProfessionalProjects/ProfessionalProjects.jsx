import { motion } from 'framer-motion';
import ProfessionalProjectCard from '@molecules/ProfessionalProjectCard/ProfessionalProjectCard'; // Direct import since index might not be updated yet
import styles from '@styles/components/organisms/ProfessionalProjects.module.css';
import { experienceData } from '@data/experience';

function ProfessionalProjects() {
    return (
        <section className={styles.section}>
            <motion.h2
                className={styles.title}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                Experiencia Profesional
            </motion.h2>

            <div className={styles.grid}>
                {experienceData.map((experience, index) => (
                    <ProfessionalProjectCard key={index} experience={experience} />
                ))}
            </div>
        </section>
    );
}

export default ProfessionalProjects;
