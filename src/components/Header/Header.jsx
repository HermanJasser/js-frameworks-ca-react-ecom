import React from 'react';
import styles from './Header.module.css';
import CartIcon from '../CartIcon/CartIcon';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.cont}>
        <a href="/" className={styles.logo}>
          Ecom
        </a>
        <nav className={styles.nav}>
          <a href="/kontakt" className={styles.kontakt}>
            Kontakt oss
          </a>
          {location.pathname !== '/kasse' && <CartIcon />}
        </nav>
      </div>
    </header>
  );
};

export default Header;
