import { ProjectGrid } from '@organisms';
import { SEO } from '@atoms';
import { projectsData } from '@data/projects';
import styles from './ProjectsPage.module.css';

const blocks = [
  { title: 'En producción', category: 'produccion' },
  { title: 'Formación', category: 'academico' },
].map((block) => ({
  ...block,
  projects: projectsData.filter((p) => p.category === block.category),
}));

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
      {blocks.map(({ title, category, projects }) =>
        projects.length > 0 && (
          <section key={category} className={styles.block}>
            <h2>{title}</h2>
            <ProjectGrid projects={projects} />
          </section>
        )
      )}
    </section>
  );
}

export default ProjectsPage;
