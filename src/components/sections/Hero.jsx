import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <header className="relative min-h-screen flex items-center pt-32 pb-24 px-6 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center bg-fixed" />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/80 to-ivory/20" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto md:mx-0 md:pl-12 lg:pl-24 animate-[fadeIn_1.5s_ease-out]">
        <div className="inline-block px-4 py-1.5 md:px-5 md:py-2 bg-gold/10 text-gold border border-gold rounded-full text-xs md:text-sm font-semibold tracking-wider uppercase mb-6 md:mb-8">
          Smart Solutions • Modern Living
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-dark leading-tight mb-4 md:mb-6">
          Elevate Your Reality <br /><span className="text-gold italic block mt-1">With Smart Innovations</span>
        </h1>
        <p className="text-base md:text-xl text-gray-600 mb-8 md:mb-12 max-w-2xl leading-relaxed">
          Discover products that don't just sit on a shelf. We curate problem-solving gadgets and wow-factor innovations designed to dramatically improve your daily life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
          <Link to="/products" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 md:px-10 md:py-4 bg-dark text-white font-medium tracking-widest uppercase text-xs md:text-sm rounded hover:bg-gold hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            All Products
          </Link>
          <a href="/#mission" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 md:px-10 md:py-4 border border-dark text-dark font-medium tracking-widest uppercase text-xs md:text-sm rounded hover:bg-dark hover:text-white transition-all duration-300">
            Our Mission
          </a>
        </div>
      </div>
    </header>
  );
}
