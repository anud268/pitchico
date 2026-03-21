import React from 'react';
import { Link } from 'react-router-dom';

export default function SummerOfferCard() {
  return (
    <React.Fragment>
      <div className="relative w-full lg:max-w-[380px] max-w-[680px] rounded-[2.5rem] p-2.5 md:p-3 bg-gold/70 backdrop-blur-xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] group transition-all duration-[800ms] hover:shadow-[0_40px_80px_-20px_rgba(184,134,11,0.25)] hover:-translate-y-2 mt-4 md:mt-0">
        <div className="relative rounded-[2rem] overflow-hidden bg-white">
          
          {/* Luxury Banner Image */}
          <div className="relative h-50 overflow-hidden">
            {/* Aesthetic Palm Shadow Image */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618220048045-10a6a896ceaf?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center transform group-hover:scale-110 transition-transform duration-[2s] ease-out" />
            
            {/* Premium Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gold/95 via-yellow-500/40 to-transparent transition-opacity duration-700 group-hover:opacity-90" />
            
            {/* Floating Badge */}
            <div className="absolute top-5 right-5  backdrop-blur-md border border-black text-black text-[9px] font-bold tracking-[0.3em] uppercase px-4 py-1.5 rounded-full overflow-hidden">
              <span className="relative z-10 text-black">Limited Edition</span>
            </div>

            {/* Typography */}
            <div className="absolute bottom-6 left-0 w-full px-8 text-left">
              <h3 className="text-5xl font-display font-medium text-white tracking-widest leading-none drop-shadow-md transition-transform duration-700 group-hover:-translate-y-1">SUMMER</h3>
              <p className="text-4xl text-black -mt-2 ml-4 transition-transform duration-700 delay-75 group-hover:-translate-y-1" style={{ fontFamily: "'Great Vibes', cursive", textShadow: "0 4px 12px rgba(0,0,0,0.4)" }}>Collection</p>
            </div>
          </div>
          
          {/* Content Bottom */}
          <div className="px-8 pb-8 pt-7 relative z-20">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-6">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] mb-1">Exclusive Access</p>
                <h4 className="text-4xl font-display font-bold animate-blink-gold-white">Up to 50% Off</h4>
              </div>
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform duration-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
            </div>
            
            <p className="text-[13px] text-gray-500 mb-8 leading-relaxed font-light">
              Elevate your surroundings with our meticulously curated summer innovations. Discover premium craftsmanship and timeless design.
            </p>
            
            <Link to="/products" className="relative flex items-center justify-center w-full py-4 text-xs font-semibold tracking-[0.2em] uppercase text-dark border border-dark rounded-xl overflow-hidden group/btn transition-colors hover:border-gold">
              <div className="absolute inset-0 w-0 bg-gold transition-all duration-[400ms] ease-out group-hover/btn:w-full" />
              <span className="relative transition-colors duration-300 group-hover/btn:text-white flex items-center gap-2">
                Unlock Offers <span className="text-lg leading-none transform group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
