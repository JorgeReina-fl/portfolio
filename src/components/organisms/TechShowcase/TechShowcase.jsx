import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import styles from '@styles/components/organisms/TechShowcase.module.css';

const technologies = [
  { name: 'React', color: '#61DAFB' },
  { name: 'JavaScript (ES6+)', color: '#F7DF1E' },
  { name: 'Node.js', color: '#339933' },
  { name: 'Express', color: '#888888' }, // Gris neutro
  { name: 'MongoDB', color: '#47A248' },
  { name: 'HTML5', color: '#E34F26' },
  { name: 'CSS3', color: '#1572B6' },
  { name: 'Sass', color: '#CC6699' },
  { name: 'Vite', color: '#646CFF' },
  { name: 'Git', color: '#F05032' },
  { name: 'REST APIs', color: '#7D8492' }, // Gris neutro
  { name: 'GraphQL', color: '#E10098' }
];

// Cuadruplicamos para el bucle infinito más convincente
const extendedTechnologies = [...technologies, ...technologies, ...technologies, ...technologies];

function TechShowcase() {
  const scrollerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollerRef.current.offsetLeft);
    setScrollLeft(scrollerRef.current.scrollLeft);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollerRef.current.offsetLeft);
    setScrollLeft(scrollerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiplicador para sensibilidad
    scrollerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <section
      className={styles.techShowcase}
    >
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Tecnologías y Habilidades
      </motion.h2>
      <div
        className={styles.scroller}
        ref={scrollerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleDragEnd}
      >
        <div className={`${styles.scrollerInner} ${isDragging ? styles.dragging : ''}`}>
          {extendedTechnologies.map((tech, index) => (
            <div
              key={index}
              className={styles.techCard}
              style={{ '--tech-color': tech.color }} // Pasamos el color como una variable CSS
            >
              <p className={styles.techName}>{tech.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechShowcase;
