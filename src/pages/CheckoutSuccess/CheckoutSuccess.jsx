import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CheckoutSuccess.module.css';

const Checkout = () => {
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Hent handlekurven fra localStorage (lagret som en array med produkt-IDer)
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Lag en frekvens-teller for antall forekomster per produkt-ID
    const frequencyMap = cart.reduce((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});

    // Hent alle produktene fra API-et
    fetch('https://v2.api.noroff.dev/online-shop')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Kunne ikke hente produkter');
        }
        return response.json();
      })
      .then((data) => {
        const allProducts = data.data;
        // Filtrer ut de produktene som finnes i handlekurven, og legg til antall (count)
        const purchased = allProducts
          .filter((product) => frequencyMap[product.id])
          .map((product) => ({
            ...product,
            count: frequencyMap[product.id],
          }));
        setPurchasedProducts(purchased);
        setLoading(false);
        // Tøm handlekurven i localStorage
        localStorage.removeItem('cart');
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Beregn totalpris basert på discountedPrice og antall
  const totalPrice = purchasedProducts.reduce(
    (acc, product) => acc + product.discountedPrice * product.count,
    0
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h2>Ordre bekreftelse</h2>
      <p>Takk for din bestilling!</p>
      {purchasedProducts.length === 0 ? (
        <p>Ingen produkter kjøpt</p>
      ) : (
        <>
          <ul className={styles.productList}>
            {purchasedProducts.map((product) => (
              <li key={product.id} className={styles.productItem}>
                <img
                  src={product.image.url}
                  alt={product.image.alt}
                  className={styles.productImage}
                />
                <div className={styles.productInfo}>
                  <h3>{product.title}</h3>
                  <p>Antall: {product.count}</p>
                  <p>Pris: {product.discountedPrice} NOK</p>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.totalPrice}>
            <h3>Totalt: {totalPrice.toFixed(2)} NOK</h3>
          </div>
        </>
      )}
      <div className={styles.buttonContainer}>
        <button className={styles.homeButton} onClick={() => navigate('/')}>
          Hjem
        </button>
      </div>
    </div>
  );
};

export default Checkout;
