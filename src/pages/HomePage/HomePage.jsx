import { Hero, TechShowcase, FeaturedProjects, ProfessionalProjects } from '@organisms';
import { SEO, PageTransition } from '@atoms';

function HomePage() {
  return (
    <PageTransition>
      <SEO
        title="Jorge Reina - Desarrollador Full-Stack | Portfolio"
        description="Portfolio profesional de Jorge Reina. Desarrollador full-stack especializado en React, Node.js, MongoDB y aplicaciones web modernas. Explora mis proyectos y habilidades."
        url="https://jorgereina.es"
      />
      <Hero />
      <TechShowcase />
      <ProfessionalProjects />
      <FeaturedProjects />
    </PageTransition>
  );
}

export default HomePage;
