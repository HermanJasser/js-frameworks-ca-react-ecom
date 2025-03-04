import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCards/Productcards';
import '../index.css'

function Home() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://v2.api.noroff.dev/online-shop')
            .then(response => {
                console.log('Response:', response);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched products:', data);
                setProducts(data.data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='productContainer' >
            {products.length === 0 ? (
                <p>Laster produkter...</p>
            ) : (
                products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))
            )}
        </div>
        
    );
}

export default Home;
