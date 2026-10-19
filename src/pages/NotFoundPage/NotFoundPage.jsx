import { Button, SEO } from '@atoms';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <section className={styles.notFoundSection}>
      <SEO
        title="Página no encontrada · Jorge Reina"
        description="La página que buscas no existe o ha cambiado de dirección."
        noindex
      />
      <h1>404 — Página no encontrada</h1>
      <p>Esta página ha salido por la línea de touch. Puede que el enlace esté mal escrito o que la página ya no exista.</p>
      <div className={styles.actions}>
        <Button variant="primary" to="/">Volver al inicio</Button>
        <Button variant="secondary" to="/projects">Ver proyectos</Button>
      </div>
    </section>
  );
}

export default NotFoundPage;
