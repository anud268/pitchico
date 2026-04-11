import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/layout/CartDrawer';
import { CartProvider } from './context/CartContext';

// Pages
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import AllProductsPage from './pages/AllProductsPage';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Ensure scrolling works and resets when page changes
    document.body.style.overflow = 'auto';
  }, [location.pathname]);

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-ivory text-dark font-body select-none relative overflow-x-hidden">
        <Navbar isScrolled={isScrolled} />
        <CartDrawer />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout/:id" element={<CheckoutPage />} />
        </Routes>
      </main>

        <Footer />
      </div>
    </CartProvider>
  );
}
