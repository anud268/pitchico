import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';
import { products } from '../../data/products';

export default function ProductsSection() {
  const navigate = useNavigate();

  return (
    <section id="products" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-dark mb-4">Trending Innovations</h2>
        <div className="w-16 h-1 bg-gold mx-auto my-8"></div>
        <p className="text-xl text-gray-500 font-light">Smart gadgets designed to instantly upgrade your lifestyle.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12">
        {products.filter(product => product.showOnFrontPage).map(product => (
          <div key={product.id} onClick={() => navigate(`/product/${product.id}`)} className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer group flex flex-col">
            <div className="w-full aspect-[4/5] md:aspect-square overflow-hidden bg-gray-50 relative">
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-3 md:p-8 flex flex-col flex-grow items-center text-center">
              <h3 className="text-[13px] md:text-2xl leading-tight font-display font-bold text-dark mb-1 md:mb-3 line-clamp-2 md:line-clamp-none min-h-[30px] md:min-h-0">{product.name}</h3>
              <div className="text-xs md:text-lg font-medium text-gold mb-2 md:mb-5">{formatCurrency(product.price)}</div>
              <p className="text-[11px] md:text-base text-gray-500 mb-3 md:mb-8 line-clamp-2 hidden md:-webkit-box flex-grow">{product.description}</p>
              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/checkout/${product.id}`); }}
                className="w-full mt-auto py-2.5 md:py-4 bg-dark text-white font-medium tracking-wider md:tracking-widest uppercase text-[10px] md:text-sm rounded hover:bg-gold transition-colors duration-300"
              >
                <span className="md:hidden">Buy</span>
                <span className="hidden md:inline">Acquire Piece</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
