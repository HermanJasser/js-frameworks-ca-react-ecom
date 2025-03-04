// src/components/Header.jsx
import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.cont}>
        <a href="/" className={styles.logo}>Ecom</a>

          <a href="/Kasse" className={styles.kasse}>Kasse</a>
      </div>
    </header>
  );
};

export default Header;
