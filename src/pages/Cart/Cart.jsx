import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.css';

const Cart = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [cart, setCart] = useState(
    () => JSON.parse(localStorage.getItem('cart')) || []
  );
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://v2.api.noroff.dev/online-shop')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Kunne ikke hente produkter');
        }
        return response.json();
      })
      .then((data) => {
        setAllProducts(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const frequencyMap = cart.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});

  const cartProducts = allProducts
    .filter((product) => frequencyMap[product.id])
    .map((product) => ({
      ...product,
      count: frequencyMap[product.id],
    }));

  const totalPrice = cartProducts.reduce(
    (acc, product) => acc + product.discountedPrice * product.count,
    0
  );

  const handleIncrease = (id) => {
    setCart((prevCart) => [...prevCart, id]);
  };

  const handleDecrease = (id) => {
    setCart((prevCart) => {
      const index = prevCart.indexOf(id);
      if (index === -1) return prevCart;
      const newCart = [...prevCart];
      newCart.splice(index, 1);
      return newCart;
    });
  };

  // Funksjon for å bekrefte kjøpet og navigere til checkoutSuccess
  const handleCheckout = () => {
    // Her kan du eventuelt legge til logikk for å sende data til en server, tømme handlekurven osv.
    navigate('/checkoutSuccess');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h2>Kasse</h2>
      {cartProducts.length === 0 ? (
        <p>Handlekurven er tom</p>
      ) : (
        <>
          <ul className={styles.productList}>
            {cartProducts.map((product) => (
              <li key={product.id} className={styles.productItem}>
                <img
                  src={product.image.url}
                  alt={product.image.alt}
                  className={styles.productImage}
                />
                <div className={styles.productInfo}>
                  <h3>{product.title}</h3>
                  <p>Pris: {product.discountedPrice} NOK</p>
                  <div className={styles.quantity}>
                    <button
                      className={styles.btn}
                      onClick={() => handleDecrease(product.id)}
                    >
                      -
                    </button>
                    <span className={styles.count}>{product.count}</span>
                    <button
                      className={styles.btn}
                      onClick={() => handleIncrease(product.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.totalPrice}>
            <h3>Totalt: {totalPrice.toFixed(2)} NOK</h3>
          </div>
          <div className={styles.checkout}>
            <button className={styles.checkoutBtn} onClick={handleCheckout}>
              Bekreft kjøp
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
