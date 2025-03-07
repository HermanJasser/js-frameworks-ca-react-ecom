import React, { useContext } from 'react';
import styles from './CartIcon.module.css';
import { ReactComponent as CartSvg } from '../../assets/cart.svg';
import { CartContext } from '../../context/CartContext';

const CartIcon = () => {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <a href="/kasse" className={styles.cart}>
        <p className={styles.amount}>{cart.length}</p>
        <CartSvg className={styles.icon} />
      </a>
    </div>
  );
};

export default CartIcon;
