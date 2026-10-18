import { Hero, TechShowcase, FeaturedProjects } from '@organisms';
import { SEO, PageTransition } from '@atoms';

function HomePage() {
  return (
    <PageTransition>
      <SEO
        title="Jorge Reina · Full Stack & AI Engineer en Elche"
        description="Full Stack & AI Engineer en Elche. IA en producción, Next.js, Node.js y PostgreSQL sobre infraestructura propia con Docker. Fundador de mivia.es."
        url="https://jorgereina.com"
      />
      <Hero />
      <TechShowcase />
      <FeaturedProjects />
    </PageTransition>
  );
}

export default HomePage;
