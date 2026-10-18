import { ProjectGrid } from '@organisms';
import { SEO } from '@atoms';
import { projectsData } from '@data/projects';
import styles from './ProjectsPage.module.css';

function ProjectsPage() {
  return (
    <section className={styles.projectsSection}>
      <SEO
        title="Proyectos · Jorge Reina"
        description="Proyectos de Jorge Reina en producción: aplicaciones Next.js y Node.js con IA, paneles multi-tenant e infraestructura propia con Docker y Cloudflare."
        url="https://jorgereina.com/projects"
      />
      <h1>Mis Proyectos</h1>
      <p>Aquí hay una selección de algunos de mis trabajos. Si quieres ver más, no dudes en contactarme.</p>
      <ProjectGrid projects={projectsData} />
    </section>
  );
}

export default ProjectsPage;
