import React, { useState, useEffect } from 'react';
import { products } from './data';

// --- Components ---

function Navbar({ isScrolled }) {
  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-ivory/95 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-3xl font-display font-bold text-dark tracking-wide">
          Pitchi<span className="text-gold">co</span>
        </a>
        <div className="hidden md:flex gap-12">
          <a href="#about" className="text-sm font-medium tracking-widest uppercase text-dark hover:text-gold transition-colors">Heritage</a>
          <a href="#products" className="text-sm font-medium tracking-widest uppercase text-dark hover:text-gold transition-colors">Collection</a>
          <a href="#values" className="text-sm font-medium tracking-widest uppercase text-dark hover:text-gold transition-colors">Values</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="relative min-h-screen flex items-center pt-32 pb-24 px-6 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/kerala-hero.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/80 to-ivory/20" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto md:mx-0 md:pl-12 lg:pl-24 animate-[fadeIn_1.5s_ease-out]">
        <div className="inline-block px-5 py-2 bg-gold/10 text-gold border border-gold rounded-full text-sm font-semibold tracking-wider uppercase mb-8">
          സമ്പന്നമായ പൈതൃകം (Rich Heritage)
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-dark leading-tight mb-6">
          Experience the Timeless <br/><span className="text-gold italic">Elegance of Kerala</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl leading-relaxed">
          Discover a meticulously curated collection of handcrafted wonders. Each artifact tells a story of centuries-old tradition, blending the purest essence of God's Own Country seamlessly with modern luxury.
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          <a href="#products" className="inline-flex items-center justify-center px-10 py-4 bg-dark text-white font-medium tracking-widest uppercase text-sm rounded hover:bg-gold hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            Discover the Collection
          </a>
          <a href="#about" className="inline-flex items-center justify-center px-10 py-4 border border-dark text-dark font-medium tracking-widest uppercase text-sm rounded hover:bg-dark hover:text-white transition-all duration-300">
            Our Story
          </a>
        </div>
      </div>
    </header>
  );
}

function About() {
  return (
    <section id="about" className="py-32 px-6 max-w-7xl mx-auto flex justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="rounded-xl overflow-hidden shadow-2xl aspect-[4/5] w-full">
          <img src="https://images.unsplash.com/photo-1602216056096-3b40cc0f9944?auto=format&fit=crop&q=80&w=1000" alt="Kerala Tradition Details" className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-dark mb-4">The Heartbeat of <br/>A Grand Tradition</h2>
          <div className="w-16 h-1 bg-gold my-8"></div>
          <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>Kerala is not just a destination; it is an emotion deeply rooted in its unparalleled artistry and craftsmanship. For centuries, the master artisans of this majestic land have practiced techniques passed down through generations, yielding creations that defy the ordinary and embrace the eternal.</p>
            <p>Whether it is the intricate carving of a rosewood sculpture, the precise metallic composition of an Aranmula Kannadi, or the warm golden glow of a traditional Nilavilakku, our collection represents the pinnacle of Kerala's heritage.</p>
            <p>Our mission is to bring these authentic pieces to the world while providing a sophisticated, seamless, and premium shopping experience. We work directly with the few remaining traditional artisan families, ensuring fair trade and the preservation of these magnificent arts.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Values() {
  const values = [
    { title: "Authenticity", desc: "Every piece in our collection is 100% authentic, sourced directly from the generational artisans of Kerala." },
    { title: "Master Craftsmanship", desc: "We celebrate the intricate and patient labor that transforms raw materials into breathtaking masterpieces." },
    { title: "Sustainable Luxury", desc: "Ethical sourcing, fair wages, and environmentally conscious packaging define our commitment to a better future." }
  ];

  return (
    <section id="values" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-dark mb-4">Our Philosophy</h2>
          <p className="text-xl text-gray-500 font-light">Principles that guide our curation.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {values.map((v, i) => (
            <div key={i} className="bg-ivory p-12 rounded-xl text-center shadow-sm border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="text-5xl text-gold mb-6">✧</div>
              <h3 className="text-2xl font-display font-bold text-dark mb-4">{v.title}</h3>
              <p className="text-gray-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ... Main App Wrapper
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [checkoutStep, setCheckoutStep] = useState("form"); // form or success
  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const openDetails = (product) => {
    setSelectedProduct(product);
    setMainImage(product.images[0]);
    setIsDetailsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeDetails = () => {
    setIsDetailsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const initCheckout = (product) => {
    setSelectedProduct(product);
    setCheckoutStep("form");
    setIsDetailsOpen(false);
    setIsCheckoutOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Setup Razorpay
    const options = {
      "key": "rzp_test_YOUR_KEY_HERE",
      "amount": selectedProduct.price * 100,
      "currency": "INR",
      "name": "Aether Heritage",
      "description": "Acquiring: " + selectedProduct.name,
      "handler": function (response) {
        setCheckoutStep("success");
      },
      "prefill": {
        "name": data.name,
        "email": data.email,
        "contact": data.phone
      },
      "theme": {
        "color": "#1A1A1A"
      }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response){
      showToast("Transaction Failed. Please verify your details.");
    });
    rzp1.open();
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 4000);
  };

  return (
    <div className="min-h-screen bg-ivory text-dark font-body select-none">
      <Navbar isScrolled={isScrolled} />
      <Hero />
      <About />
      <Values />

      {/* Products Section */}
      <section id="products" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-dark mb-4">The Curator's Collection</h2>
          <div className="w-16 h-1 bg-gold mx-auto my-8"></div>
          <p className="text-xl text-gray-500 font-light">Exclusive, premium artifacts meticulously selected for you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer group" onClick={() => openDetails(product)}>
              <div className="w-full aspect-square overflow-hidden bg-gray-50 relative">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 text-center">
                <h3 className="text-2xl font-display font-bold text-dark mb-2">{product.name}</h3>
                <div className="text-lg font-medium text-gold mb-6">{formatCurrency(product.price)}</div>
                <p className="text-gray-500 mb-8 line-clamp-2">{product.description}</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); initCheckout(product); }}
                  className="w-full py-4 bg-dark text-white font-medium tracking-widest uppercase text-sm rounded hover:bg-gold transition-colors duration-300"
                >
                  Acquire Piece
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white pt-24 pb-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between border-b border-gray-800 pb-16 mb-8 gap-12">
          <div>
            <a href="#" className="text-3xl font-display font-bold tracking-wide">
              Pitchi<span className="text-gold">co</span>
            </a>
            <p className="text-gray-400 mt-4 max-w-sm">Curators of fine Kerala tradition. Preserving the artistry of masterful hands.</p>
          </div>
          <div className="flex gap-12">
            <a href="#about" className="text-sm tracking-widest uppercase text-gray-400 hover:text-gold transition-colors">Our Story</a>
            <a href="#products" className="text-sm tracking-widest uppercase text-gray-400 hover:text-gold transition-colors">Collection</a>
            <a href="#" className="text-sm tracking-widest uppercase text-gray-400 hover:text-gold transition-colors">Privacy</a>
          </div>
        </div>
        <div className="text-center text-gray-600 font-medium text-sm">
          &copy; 2026 Aether Premium. All rights reserved.
        </div>
      </footer>

      {/* Details Modal */}
      <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500 ${isDetailsOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-ivory/90 backdrop-blur-sm" onClick={closeDetails}></div>
        <div className={`relative bg-white w-full max-w-7xl h-[90vh] rounded-2xl shadow-2xl p-6 md:p-12 overflow-y-auto transform transition-transform duration-500 ${isDetailsOpen ? 'scale-100' : 'scale-95'}`}>
          <button onClick={closeDetails} className="absolute top-6 right-6 text-4xl text-gray-400 hover:text-gold transition-colors">&times;</button>
          
          {selectedProduct && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mt-4">
              <div>
                <div className="w-full h-[60vh] rounded-xl overflow-hidden bg-gray-50 mb-6">
                  <img src={mainImage} className="w-full h-full object-cover" alt="Artifact Main" />
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {selectedProduct.images.map((img, i) => (
                    <div key={i} onClick={() => setMainImage(img)} className={`w-24 h-24 flex-shrink-0 cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${mainImage === img ? 'border-gold opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                      <img src={img} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="inline-block self-start px-4 py-1.5 bg-gold/10 text-gold border border-gold rounded-full text-xs font-semibold tracking-wider uppercase mb-6">
                  Handcrafted Heritage
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-dark mb-4 leading-tight">{selectedProduct.name}</h2>
                <div className="text-3xl font-medium text-gold mb-8">{formatCurrency(selectedProduct.price)}</div>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-12">{selectedProduct.longDescription}</p>

                <div className="mb-10">
                  <h3 className="text-xl font-display font-bold text-dark border-b border-gray-200 pb-3 mb-6">Craftsmanship Details</h3>
                  <ul className="space-y-4">
                    {selectedProduct.features.map((f, i) => (
                      <li key={i} className="text-gray-600 relative pl-8 before:content-['✦'] before:absolute before:left-0 before:text-gold">{f}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-12">
                  <h3 className="text-xl font-display font-bold text-dark border-b border-gray-200 pb-3 mb-6">Why Bring It Home?</h3>
                  <ul className="space-y-4">
                    {selectedProduct.advantages.map((a, i) => (
                      <li key={i} className="text-gray-600 relative pl-8 before:content-['✦'] before:absolute before:left-0 before:text-gold">{a}</li>
                    ))}
                  </ul>
                </div>

                <button onClick={() => initCheckout(selectedProduct)} className="w-full py-5 bg-dark text-white font-medium tracking-widest uppercase rounded hover:bg-gold transition-colors duration-300 shadow-xl hover:-translate-y-1">
                  Acquire This Piece
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout/Success Modal */}
      <div className={`fixed inset-0 z-[150] flex items-center justify-center transition-all duration-500 ${isCheckoutOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeCheckout}></div>
        <div className={`relative bg-white w-full max-w-xl p-10 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh] transform transition-transform duration-500 ${isCheckoutOpen ? 'translate-y-0' : 'translate-y-12'}`}>
          <button onClick={closeCheckout} className="absolute top-6 right-6 text-3xl text-gray-400 hover:text-dark transition-colors">&times;</button>
          
          {checkoutStep === "form" && selectedProduct && (
            <>
              <div className="text-center mb-10">
                <h3 className="text-4xl font-display font-bold text-dark mb-2">Secure Acquisition</h3>
                <p className="text-gray-500 mb-4">{selectedProduct.name}</p>
                <div className="text-2xl font-bold text-gold">{formatCurrency(selectedProduct.price)}</div>
              </div>

              <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold tracking-widest text-dark uppercase mb-2">Full Name</label>
                  <input name="name" required className="w-full bg-ivory border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-gold transition-colors" placeholder="Full Name" />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold tracking-widest text-dark uppercase mb-2">Email Address</label>
                    <input name="email" type="email" required className="w-full bg-ivory border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-gold transition-colors" placeholder="Email" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest text-dark uppercase mb-2">Phone Number</label>
                    <input name="phone" type="tel" required className="w-full bg-ivory border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-gold transition-colors" placeholder="Phone" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-widest text-dark uppercase mb-2">Shipping Address</label>
                  <textarea name="address" required rows="3" className="w-full bg-ivory border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-gold transition-colors" placeholder="Complete Delivery Address"></textarea>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold tracking-widest text-dark uppercase mb-2">City/Town</label>
                    <input name="city" required className="w-full bg-ivory border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-gold transition-colors" placeholder="City" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest text-dark uppercase mb-2">Postal Code</label>
                    <input name="pincode" required className="w-full bg-ivory border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-gold transition-colors" placeholder="Pincode" />
                  </div>
                </div>

                <button type="submit" className="w-full py-4 bg-dark text-white font-medium tracking-widest uppercase rounded hover:bg-gold transition-all duration-300 shadow-lg hover:-translate-y-1 mt-4">
                  Proceed to Payment
                </button>
              </form>
            </>
          )}

          {checkoutStep === "success" && (
            <div className="text-center py-12">
              <div className="w-24 h-24 rounded-full bg-gold/10 text-gold flex items-center justify-center text-4xl mx-auto mb-8">✓</div>
              <h4 className="text-3xl font-display font-bold text-dark mb-4">Acquisition Complete</h4>
              <p className="text-gray-600 mb-10 leading-relaxed text-lg">Thank you. Your premium artifact will be securely packaged and dispatched to your coordinates.</p>
              <button onClick={closeCheckout} className="w-full py-4 border border-dark text-dark font-medium tracking-widest uppercase rounded hover:bg-dark hover:text-white transition-colors duration-300">
                Return to Collection
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      <div className={`fixed bottom-8 right-8 bg-dark text-white px-8 py-4 rounded shadow-2xl z-[2000] transition-all duration-400 ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        {toast.message}
      </div>

    </div>
  );
}
