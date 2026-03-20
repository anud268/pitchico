import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/formatters';
import { products } from '../data/products';

export default function AllProductsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-dark mb-4">All Innovations</h1>
        <div className="w-16 h-1 bg-gold mx-auto my-8"></div>
        <p className="text-xl text-gray-500 font-light">Explore our complete collection of smart gadgets.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10">
        {products.map(product => (
          <div key={product.id} onClick={() => navigate(`/product/${product.id}`)} className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer group flex flex-col">
            <div className="w-full aspect-[4/5] md:aspect-square overflow-hidden bg-gray-50 relative">
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              {product.hasOffer && (
                <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-gold text-white text-[8px] md:text-[10px] font-black tracking-widest px-2 py-1 md:px-3 md:py-1.5 rounded-full uppercase z-10 shadow-lg">SALE</div>
              )}
            </div>
            <div className="p-3 md:p-8 flex flex-col flex-grow items-center text-center">
              <h3 className="text-[13px] md:text-xl md:leading-tight font-display font-bold text-dark mb-1 md:mb-3 line-clamp-2 md:line-clamp-none min-h-[30px] md:min-h-0">{product.name}</h3>
              <div className="text-xs md:text-lg font-medium text-gold mb-2 md:mb-5 flex flex-col md:flex-row items-center gap-1 md:gap-2">
                {product.hasOffer && (
                  <span className="text-gray-400 line-through text-[10px] md:text-xs">{formatCurrency(product.originalPrice)}</span>
                )}
                <span>{formatCurrency(product.price)}</span>
              </div>
              <p className="text-[11px] md:text-sm text-gray-500 mb-3 md:mb-6 line-clamp-2 hidden md:-webkit-box flex-grow">{product.description}</p>
              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/checkout/${product.id}`); }}
                className="w-full mt-auto py-2.5 md:py-3 bg-dark text-white font-medium tracking-wider md:tracking-widest uppercase text-[10px] md:text-xs rounded hover:bg-gold transition-colors duration-300"
              >
                <span className="md:hidden">Buy</span>
                <span className="hidden md:inline">Acquire</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
