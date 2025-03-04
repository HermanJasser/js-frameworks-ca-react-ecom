
// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./pages/Home.jsx";
import CheckoutSuccess from "./pages/CheckoutSuccess.jsx";
import Cart from "./pages/Cart.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import Contact from "./pages/Contact.jsx";

const App = () => {
  return (
    <Router>
        <div className="body-container">
        <Header />
        <main >
        <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/checkoutSuccess" element={<CheckoutSuccess />} />
                <Route path="/kasse" element={<Cart />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/kontakt" element={<Contact />} />

            </Routes>
        </main>
        <Footer />
        </div>
    </Router>
  );
};

export default App;