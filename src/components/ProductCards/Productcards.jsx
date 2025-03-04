

import React from 'react';
import styles from "./Productcards.module.css";


function ProductCard({ product }) {
 
  return (
    
    <a className={styles.card} href={`/product/${product.id}`}>
        <img src={product.image.url} alt={product.image.alt} />
        <h3>{product.title}</h3>
        <p>Pris: {product.price}</p>
    </a>
   
  );
}

export default ProductCard;