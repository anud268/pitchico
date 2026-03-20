import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { formatCurrency } from '../utils/formatters';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState("");
  const product = products.find(p => p.id === id);
  const scrollRef = useRef(null);
  const relatedProducts = products.filter(p => p.showOnFrontPage && p.id !== product?.id);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 400 : 200;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setMainImage(product.images[0]);
    }
  }, [product, id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-ivory text-dark pt-32 pb-24 px-6">
        <h2 className="text-3xl font-display font-bold mb-4">Product Not Found</h2>
        <button onClick={() => navigate('/')} className="px-8 py-3 bg-dark text-white text-sm font-medium tracking-widest uppercase rounded">
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto animate-[fadeIn_0.5s_ease-out]">
      <button onClick={() => navigate(-1)} className="mb-8 text-gray-500 hover:text-gold flex items-center gap-2 transition-colors uppercase tracking-widest text-xs font-semibold">
        <span>&larr;</span> Back
      </button>

      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <div className="w-full h-[60vh] rounded-xl overflow-hidden bg-gray-50 mb-6 relative">
              <img src={mainImage} className="w-full h-full object-cover" alt={product.name} />
              {product.hasOffer && (
                <div className="absolute top-6 right-6 bg-gold text-white text-sm font-black tracking-widest px-4 py-2 rounded-full uppercase shadow-xl z-10">SALE</div>
              )}
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {product.images.map((img, i) => (
                <div key={i} onClick={() => setMainImage(img)} className={`w-24 h-24 flex-shrink-0 cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${mainImage === img ? 'border-gold opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                  <img src={img} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="inline-block self-start px-4 py-1.5 bg-gold/10 text-gold border border-gold rounded-full text-xs font-semibold tracking-wider uppercase mb-6">
              Premium Utility
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-dark mb-4 leading-tight">{product.name}</h1>
            <div className="text-3xl font-medium text-gold mb-8 flex items-center gap-4">
              {product.hasOffer && (
                <span className="text-gray-400 line-through text-2xl">{formatCurrency(product.originalPrice)}</span>
              )}
              <span>{formatCurrency(product.price)}</span>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-12">{product.longDescription}</p>

            <div className="mb-10">
              <h3 className="text-xl font-display font-bold text-dark border-b border-gray-200 pb-3 mb-6">Innovative Features</h3>
              <ul className="space-y-4">
                {product.features.map((f, i) => (
                  <li key={i} className="text-gray-600 relative pl-8 before:content-['✦'] before:absolute before:left-0 before:text-gold">{f}</li>
                ))}
              </ul>
            </div>

            <div className="mb-12">
              <h3 className="text-xl font-display font-bold text-dark border-b border-gray-200 pb-3 mb-6">Why You Need This</h3>
              <ul className="space-y-4">
                {product.advantages.map((a, i) => (
                  <li key={i} className="text-gray-600 relative pl-8 before:content-['✦'] before:absolute before:left-0 before:text-gold">{a}</li>
                ))}
              </ul>
            </div>

            <button onClick={() => navigate(`/checkout/${product.id}`)} className="w-full py-5 bg-dark text-white font-medium tracking-widest uppercase rounded hover:bg-gold transition-colors duration-300 shadow-xl hover:-translate-y-1">
              Acquire This Piece
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-dark">Featured Innovations</h2>
            <div className="flex gap-2">
              <button onClick={() => scroll('left')} className="p-2 md:p-3 rounded-full bg-white border border-gray-200 text-dark hover:bg-gold hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={() => scroll('right')} className="p-2 md:p-3 rounded-full bg-white border border-gray-200 text-dark hover:bg-gold hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
          <div 
            ref={scrollRef} 
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-8 snap-x"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {relatedProducts.map(p => (
              <div 
                key={p.id} 
                onClick={() => navigate(`/product/${p.id}`)} 
                className="min-w-[160px] md:min-w-[240px] w-[160px] md:w-[240px] flex-shrink-0 bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer snap-start flex flex-col"
              >
                <div className="w-full aspect-square overflow-hidden bg-gray-50 relative">
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                  {p.hasOffer && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-[8px] md:text-[10px] font-black tracking-widest px-2 py-1 rounded-full uppercase shadow-lg z-10">SALE</div>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-grow text-center items-center">
                  <h3 className="text-sm md:text-lg font-display font-bold text-dark mb-1 line-clamp-2 min-h-[40px] md:min-h-[50px]">{p.name}</h3>
                  <div className="text-xs md:text-sm font-medium text-gold mb-3 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2">
                    {p.hasOffer && (
                      <span className="text-gray-400 line-through text-[10px] md:text-xs">{formatCurrency(p.originalPrice)}</span>
                    )}
                    <span>{formatCurrency(p.price)}</span>
                  </div>
                  <button className="w-full mt-auto py-2 bg-dark text-white text-[10px] md:text-xs font-medium tracking-widest uppercase rounded hover:bg-gold transition-colors duration-300">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
