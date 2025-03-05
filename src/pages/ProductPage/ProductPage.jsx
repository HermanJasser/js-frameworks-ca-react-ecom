// src/pages/ProductPage/ProductPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import styles from './ProductPage.module.css';

const Product = () => {
  const { id } = useParams();
  const { cart, setCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    fetch(`https://v2.api.noroff.dev/online-shop/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Loading...</div>;

  const discountPercentage =
    product.price > product.discountedPrice
      ? Math.round(
          ((product.price - product.discountedPrice) / product.price) * 100
        )
      : 0;

  const handleAddToCart = () => {
    setCart((prevCart) => [...prevCart, product.id]);
    console.log(`Produkt ${product.id} lagt til i handlekurven.`);
    setNotification(true);
    setTimeout(() => {
      setNotification(false);
    }, 3000);
  };

  return (
    <div className={styles.cont}>
      <img
        src={product.image.url}
        alt={product.image.alt}
        style={{ maxWidth: '100%' }}
      />
      <h2>{product.title}</h2>
      <p className={styles.desc}>{product.description}</p>
      <p className={styles.price}>
        Pris: {product.discountedPrice} NOK{' '}
        {discountPercentage > 0 && (
          <span>(Du sparer {discountPercentage}%)</span>
        )}
      </p>
      <button className={styles.btn} onClick={handleAddToCart}>
        Legg i handlekurv
      </button>
      {product.reviews && product.reviews.length > 0 && (
        <div className={styles.reviews}>
          <h3>Anmeldelser</h3>
          <ul>
            {product.reviews.map((review) => (
              <li key={review.id}>
                <span>{review.username}</span>
                <span className={styles.rating}>{review.rating} stjerner</span>
                <span>{review.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {notification && (
        <div className={styles.notification}>
          Produktet er lagt til i handlekurven.
        </div>
      )}
    </div>
  );
};

export default Product;
