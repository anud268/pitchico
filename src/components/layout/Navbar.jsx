import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ isScrolled }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(()=>{
    onscroll=()=>{
      setIsMobileMenuOpen(false);
    }
  },[])

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-0 ${isScrolled ? 'bg-ivory border-b border-gray-200 py-4 md:py-5 shadow-sm' : 'bg-transparent py-4 md:py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl md:text-3xl font-display font-bold text-dark tracking-wide z-50">
          Pitchi<span className="text-gold">co</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12 items-center">
          <a href="/" className="text-sm font-medium tracking-widest uppercase text-dark hover:text-gold transition-colors">Home</a>
          <a href="/#mission" className="text-sm font-medium tracking-widest uppercase text-dark hover:text-gold transition-colors">Our Mission</a>
          <Link to="/products" className="text-sm font-medium tracking-widest uppercase text-dark hover:text-gold transition-colors">All Products</Link>
          <a href="/#values" className="text-sm font-medium tracking-widest uppercase text-dark hover:text-gold transition-colors">Values</a>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="md:hidden z-50 p-2 text-dark focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-ivory/90 z-49 w-full h-full flex flex-col items-center justify-center transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0 ' : 'translate-x-full'} md:hidden`}>
          <div className="flex flex-col items-center gap-10">
            <a href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-display font-bold tracking-widest uppercase text-dark hover:text-gold transition-colors">Home</a>
            <a href="/#mission" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-display font-bold tracking-widest uppercase text-dark hover:text-gold transition-colors">Our Mission</a>
            <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-display font-bold tracking-widest uppercase text-dark hover:text-gold transition-colors">All Products</Link>
            <a href="/#values" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-display font-bold tracking-widest uppercase text-dark hover:text-gold transition-colors">Values</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
