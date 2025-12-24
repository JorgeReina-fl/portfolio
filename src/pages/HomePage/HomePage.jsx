import { Hero, TechShowcase, FeaturedProjects } from '@organisms';
import { SEO, PageTransition } from '@atoms';

function HomePage() {
  return (
    <PageTransition>
      <SEO
        title="Jorge Reina - Desarrollador Full-Stack | Portfolio"
        description="Conoce más sobre Jorge Reina, desarrollador full-stack apasionado por crear aplicaciones web modernas con React y Node.js. Experiencia en JavaScript, MongoDB y más."
        url="https://jorgereina.es/about"
      />
      <Hero />
      <TechShowcase />
      <FeaturedProjects />
    </PageTransition>
  );
}

export default HomePage;
