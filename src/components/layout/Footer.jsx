import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-24 pb-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between border-b border-gray-800 pb-16 mb-8 gap-12">
        <div>
          <Link to="/" className="text-3xl font-display font-bold tracking-wide">
            Pitchi<span className="text-gold">co</span>
          </Link>
          <p className="text-gray-400 mt-4 max-w-sm">Curators of modern smart living. Bringing you problem-solving innovations with an undeniable wow factor.</p>
        </div>
        <div className="flex gap-12">
          <a href="/#mission" className="text-sm tracking-widest uppercase text-gray-400 hover:text-gold transition-colors">Our Mission</a>
          <a href="/#products" className="text-sm tracking-widest uppercase text-gray-400 hover:text-gold transition-colors">Innovations</a>
          <span className="text-sm tracking-widest uppercase text-gray-400 hover:text-gold cursor-pointer transition-colors">Privacy</span>
        </div>
      </div>
      <div className="text-center text-gray-600 font-medium text-sm">
        &copy; {new Date().getFullYear()} Pitchico Store. All rights reserved.
      </div>
    </footer>
  );
}
