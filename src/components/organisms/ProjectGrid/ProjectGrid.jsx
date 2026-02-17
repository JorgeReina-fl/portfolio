import { Card } from '@molecules';
import styles from '@styles/components/organisms/ProjectGrid.module.css';

function ProjectGrid({ projects }) {
  return (
    <div className={styles.grid}>
      {projects.map((project, index) => (
        <Card
          key={index}
          title={project.title}
          description={project.description}
          repoUrl={project.repoUrl}
          liveUrl={project.liveUrl}
          imageUrl={project.imageUrl}
        />
      ))}
    </div>
  );
}

export default ProjectGrid;
