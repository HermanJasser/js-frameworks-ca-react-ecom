import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home/Home';
import CheckoutSuccess from './pages/CheckoutSuccess/CheckoutSuccess';
import Cart from './pages/Cart/Cart';
import ProductPage from './pages/ProductPage/ProductPage';
import Contact from './pages/Contact/Contact';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkoutSuccess" element={<CheckoutSuccess />} />
            <Route path="/kasse" element={<Cart />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/kontakt" element={<Contact />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}

export default App;
