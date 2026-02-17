import styles from '@styles/components/atoms/Button.module.css';

function Button({ children, to, onClick, variant = 'primary', type = 'button', ...rest }) {
  const className = `${styles.button} ${styles[variant]}`;

  if (to) {
    // Use a regular <a> tag for links, allowing for external URLs and attributes like target="_blank"
    return (
      <a href={to} className={className} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={className} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}

export default Button;
