import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { formatCurrency } from '../utils/formatters';
import Toast from '../components/ui/Toast';

export default function CheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);

  const [checkoutStep, setCheckoutStep] = useState('form');
  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 4000);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Product not found.</h2>
      </div>
    );
  }

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (!data.name || !data.email || !data.phone) {
      showToast("Please fill all required fields");
      return;
    }

    const phoneNumber = "8086261973";
    const message = `*✨ New Order Request ✨*
    
*Product Details:*
Item: ${product.name}
${product.hasOffer ? `*Offer Applied!*
Actual Price: ~${formatCurrency(product.originalPrice)}~
Offer Price: *${formatCurrency(product.price)}*` : `Amount: ${formatCurrency(product.price)}`}

*Customer Details:*
Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}

*Shipping Information:*
Address: ${data.address}
City: ${data.city}
Pincode: ${data.pincode}

Looking forward to completing this order!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    setCheckoutStep('success');
    showToast("Redirecting to WhatsApp...");
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 flex justify-center bg-ivory animate-[fadeIn_0.5s_ease-out]">
      <div className="w-full max-w-xl">
        <button onClick={() => navigate(-1)} className="mb-8 text-gray-500 hover:text-gold flex items-center gap-2 transition-colors uppercase tracking-widest text-xs font-semibold">
          <span>&larr;</span> Back
        </button>

        <div className="bg-white p-10 rounded-2xl shadow-2xl">
          {checkoutStep === "form" && (
            <>
              <div className="text-center mb-10">
                <h3 className="text-4xl font-display font-bold text-dark mb-2">Secure Acquisition</h3>
                <p className="text-gray-500 mb-4">{product.name}</p>

                <div className="text-2xl font-bold text-gold flex items-center justify-center gap-3">
                  {product.hasOffer && (
                    <span className="text-gray-400 line-through text-lg">{formatCurrency(product.originalPrice)}</span>
                  )}
                  <span>{formatCurrency(product.price)}</span>
                </div>
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

                <button type="submit" className="w-full flex items-center justify-center gap-3 py-4 bg-green-600 text-white font-medium tracking-widest uppercase rounded hover:bg-green-700 transition-all duration-300 shadow-lg hover:-translate-y-1 mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.1.133 1.396 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" /></svg>
                  Send Order via WhatsApp
                </button>
              </form>
            </>
          )}

          {checkoutStep === "success" && (
            <div className="text-center py-12">
              <div className="w-24 h-24 rounded-full bg-gold/10 text-gold flex items-center justify-center text-4xl mx-auto mb-8">✓</div>
              <h4 className="text-3xl font-display font-bold text-dark mb-4">Request Initiated</h4>
              <p className="text-gray-600 mb-10 leading-relaxed text-lg">Your order details have been prepared. Please send the WhatsApp message we just opened to finalize your acquisition.</p>
              <button onClick={() => navigate('/')} className="w-full py-4 border border-dark text-dark font-medium tracking-widest uppercase rounded hover:bg-dark hover:text-white transition-colors duration-300">
                Return to Collection
              </button>
            </div>
          )}
        </div>
      </div>
      <Toast toast={toast} />
    </div>
  );
}
