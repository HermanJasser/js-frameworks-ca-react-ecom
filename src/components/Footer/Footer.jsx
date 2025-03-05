import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.Footer}>
      <div className={styles.cont}>
        <a href="/kontakt" className={styles.kontakt}>
          Kontakt oss
        </a>
        <p>&copy; 2025 Ecom</p>
      </div>
    </footer>
  );
}

export default Footer;
