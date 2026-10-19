import { useEffect } from 'react';
import { useRouteError } from 'react-router-dom';
import { Button } from '@atoms';
import styles from './ErrorPage.module.css';

// Autónoma: se renderiza fuera de RootLayout y sin depender del router para navegar.
function ErrorPage() {
  const error = useRouteError();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.errorPage}>
      <title>Error · Jorge Reina</title>
      <h1>Algo ha fallado</h1>
      <p>Ha ocurrido un error inesperado. Recarga la página o vuelve al inicio.</p>
      <div className={styles.actions}>
        <Button variant="primary" onClick={() => window.location.reload()}>Recargar</Button>
        <a href="/" className={styles.homeLink}>Volver al inicio</a>
      </div>
    </main>
  );
}

export default ErrorPage;
