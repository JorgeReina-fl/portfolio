import { useState } from 'react';
import { Button } from '@atoms';
import { SEO } from '@atoms';
import styles from './ContactPage.module.css';

// Formspree endpoint - emails will be sent to jorge.ecru@gmail.com
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mwvejewy';

function ContactPage() {
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('submitting');

    const form = event.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        // Reset status after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className={styles.contactSection}>
      <SEO
        title="Contacto - Jorge Reina | Desarrollador Full-Stack"
        description="¿Tienes un proyecto en mente? Contacta con Jorge Reina para colaborar en tu próxima aplicación web. Disponible para proyectos freelance y oportunidades laborales."
        url="https://jorgereina.es/contact"
      />
      <h1>Contacto</h1>
      <p>¿Tienes alguna pregunta o quieres trabajar juntos? Envíame un mensaje.</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" name="name" required className={styles.input} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" name="email" required className={styles.input} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message">Mensaje</label>
          <textarea id="message" name="message" required className={styles.textarea}></textarea>
        </div>

        <Button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Enviando...' : 'Enviar Mensaje'}
        </Button>

        {status === 'success' && (
          <div className={styles.successMessage}>
            ✅ ¡Mensaje enviado correctamente! Te responderé pronto.
          </div>
        )}

        {status === 'error' && (
          <div className={styles.errorMessage}>
            ❌ Hubo un error al enviar el mensaje. Por favor, intenta de nuevo o contáctame directamente.
          </div>
        )}
      </form>

      <div className={styles.directContact}>
        <h2>O contáctame directamente</h2>
        <ul className={styles.contactList}>
          <li>
            <a href="mailto:jorgereina.fl@gmail.com">📧 E-mail</a>
          </li>
          <li>
            <a href="https://wa.me/34633380269" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/jorgereinafl/" target="_blank" rel="noopener noreferrer">💼 LinkedIn</a>
          </li>
          <li>
            <a href="https://github.com/JorgeReina-fl" target="_blank" rel="noopener noreferrer">🐙 GitHub</a>
          </li>
          <li>
            <a href="https://www.instagram.com/jorgereina.fl/" target="_blank" rel="noopener noreferrer">📷 Instagram</a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default ContactPage;
