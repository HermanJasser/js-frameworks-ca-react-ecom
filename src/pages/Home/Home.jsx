import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCards/Productcards';
import styles from './Home.module.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('https://v2.api.noroff.dev/online-shop')
      .then((response) => {
        console.log('Response:', response);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched products:', data);
        setProducts(data.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredProducts = products.filter((product) => {
    const productTitleWords = product.title.toLowerCase().split(' ');
    const searchWords = searchQuery.toLowerCase().split(' ');

    return searchWords.every((searchWord) =>
      productTitleWords.some((titleWord) => titleWord.startsWith(searchWord))
    );
  });
  return (
    <div>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Søk etter produkt"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchBar}
        />
      </div>
      <div className={styles.cont}>
        {products.length === 0 ? (
          <p>Laster produkter...</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
