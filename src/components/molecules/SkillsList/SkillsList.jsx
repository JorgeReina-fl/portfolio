import styles from '@styles/components/molecules/SkillsList.module.css';

function SkillsList({ skills }) {
  return (
    <ul className={styles.skillsList}>
      {skills.map((skill, index) => (
        <li key={index} className={styles.skillItem}>
          {skill}
        </li>
      ))}
    </ul>
  );
}

export default SkillsList;
