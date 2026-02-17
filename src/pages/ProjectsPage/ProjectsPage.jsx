import { ProjectGrid, ProfessionalProjects } from '@organisms';
import { SEO } from '@atoms';
import { projectsData } from '@data/projects';
import styles from './ProjectsPage.module.css';

function ProjectsPage() {
  return (
    <section className={styles.projectsSection}>
      <SEO
        title="Proyectos - Jorge Reina | Portfolio de Desarrollo Web"
        description="Explora los proyectos de desarrollo web de Jorge Reina. Aplicaciones full-stack con React, Node.js, MongoDB y más tecnologías modernas."
        url="https://jorgereina.es/projects"
      />
      <h1>Mis Proyectos</h1>
      <p>Aquí hay una selección de algunos de mis trabajos. Si quieres ver más, no dudes en contactarme.</p>

      <ProfessionalProjects />

      <h2 style={{ textAlign: 'center', margin: '4rem 0 2rem', fontSize: '2rem' }}>Proyectos Personales</h2>
      <ProjectGrid projects={projectsData} />
    </section>
  );
}

export default ProjectsPage;
