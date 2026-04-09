import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { formatCurrency } from '../utils/formatters';
import Toast from '../components/ui/Toast';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  
  const isCartCheckout = id === 'cart';
  const product = products.find(p => p.id === id);

  const [checkoutStep, setCheckoutStep] = useState('form');
  const [toast, setToast] = useState({ show: false, message: "" });
  
  const checkoutItems = isCartCheckout ? cart : product ? [{ product, quantity: 1 }] : [];
  const checkoutTotal = isCartCheckout ? getCartTotal() : product ? product.price : 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 4000);
  };

  if (checkoutItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-ivory text-dark">
        <h2 className="text-2xl font-bold mb-4 font-display">Your selection is empty.</h2>
        <button onClick={() => navigate('/products')} className="px-8 py-3 bg-dark text-white rounded text-sm uppercase tracking-widest font-semibold hover:bg-gold transition">
          Return to Collection
        </button>
      </div>
    );
  }

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (!data.name || !data.email || !data.phone || !data.address || !data.city || !data.pincode || !data.paymentMethod) {
      showToast("Please fill all required fields");
      return;
    }

    const orderId = Math.floor(10000 + Math.random() * 90000);
    const itemsText = checkoutItems.map((item, index) => 
`  ${index + 1}. *${item.product.name}*
      ▪ Quantity : *${item.quantity}*
      ▪ Price    : _${formatCurrency(item.product.price)}_
      ▪ Subtotal : *${formatCurrency(item.product.price * item.quantity)}*`
    ).join('\n\n');

    const phoneNumber = "+919778167652";
    const message = `🌟 *PITCHICO EXCLUSIVE ORDER* 🌟
----------------------------------
*Order Reference:* #ORD-${orderId}

🛒 *ITEMS ACQUIRED:*
${itemsText}

💰 *ORDER SUMMARY:*
----------------------------------
  *Grand Total :* 🪙 *${formatCurrency(checkoutTotal)}*
----------------------------------

👤 *CLIENT INFORMATION:*
  ▪ *Name*  : _${data.name}_
  ▪ *Phone* : _${data.phone}_
  ▪ *Email* : _${data.email}_

📦 *SHIPPING & PAYMENT:*
  ▪ *Address* : _${data.address}_
  ▪ *City*    : _${data.city}_
  ▪ *Pincode* : _${data.pincode}_
  ▪ *Payment* : _${data.paymentMethod}_

_Thank you for choosing Pitchico! Looking forward to confirming your order._ ✨`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    if (isCartCheckout) clearCart();
    setCheckoutStep('success');
    showToast("Redirecting to WhatsApp...");
  };

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-24 px-4 md:px-12 flex justify-center bg-ivory animate-[fadeIn_0.5s_ease-out]">
      <div className="w-full max-w-xl">
        <button onClick={() => navigate(-1)} className="mb-6 md:mb-8 text-gray-500 hover:text-gold flex items-center gap-2 transition-colors uppercase tracking-widest text-[10px] md:text-xs font-semibold">
          <span>&larr;</span> Back
        </button>

        <div className="bg-white p-6 md:p-10 rounded-2xl md:rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]">
          {checkoutStep === "form" && (
            <>
              <div className="text-center mb-8 md:mb-10">
                <h3 className="text-3xl md:text-4xl font-display font-bold text-dark mb-2">Secure Acquisition</h3>
                <p className="text-gray-500 mb-4 text-sm md:text-base">
                  {checkoutItems.length === 1 ? checkoutItems[0].product.name : `${checkoutItems.length} items in your order`}
                </p>

                <div className="text-xl md:text-2xl font-bold text-gold flex items-center justify-center gap-2.5 bg-gold/5 w-fit mx-auto px-6 py-2 rounded-full border border-gold/20">
                  <span>Total: {formatCurrency(checkoutTotal)}</span>
                </div>
              </div>

              <form onSubmit={handleCheckoutSubmit} className="space-y-6 md:space-y-8">
                {/* Personal Information */}
                <div>
                  <h4 className="text-[11px] md:text-xs font-bold tracking-widest uppercase text-gold mb-3 md:mb-4 border-b border-gray-100 pb-2">1. Personal Details</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] md:text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1.5 ml-1">Full Name</label>
                      <input name="name" required className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all text-sm text-dark placeholder-gray-300 shadow-sm hover:border-gray-300" placeholder="e.g. John Doe" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] md:text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1.5 ml-1">Email Address</label>
                        <input name="email" type="email" required className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all text-sm text-dark placeholder-gray-300 shadow-sm hover:border-gray-300" placeholder="e.g. john@example.com" />
                      </div>
                      <div>
                        <label className="block text-[10px] md:text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1.5 ml-1">Phone Number</label>
                        <input name="phone" type="tel" required className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all text-sm text-dark placeholder-gray-300 shadow-sm hover:border-gray-300" placeholder="e.g. +91 9876543210" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Information */}
                <div>
                  <h4 className="text-[11px] md:text-xs font-bold tracking-widest uppercase text-gold mb-3 md:mb-4 border-b border-gray-100 pb-2">2. Shipping Details</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] md:text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1.5 ml-1">Full Address</label>
                      <textarea name="address" required rows="2" className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all resize-none text-sm text-dark placeholder-gray-300 shadow-sm hover:border-gray-300" placeholder="House No, Street, Landmark"></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] md:text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1.5 ml-1">City / Town</label>
                        <input name="city" required className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all text-sm text-dark placeholder-gray-300 shadow-sm hover:border-gray-300" placeholder="e.g. Kochi" />
                      </div>
                      <div>
                        <label className="block text-[10px] md:text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1.5 ml-1">Postal Code</label>
                        <input name="pincode" required className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all text-sm text-dark placeholder-gray-300 shadow-sm hover:border-gray-300" placeholder="e.g. 682001" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div>
                  <h4 className="text-[11px] md:text-xs font-bold tracking-widest uppercase text-gold mb-3 md:mb-4 border-b border-gray-100 pb-2">3. Payment</h4>
                  <div>
                    <label className="block text-[10px] md:text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1.5 ml-1">Select Payment Method</label>
                    <div className="relative">
                      <select name="paymentMethod" required defaultValue="" className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all text-sm text-dark appearance-none cursor-pointer shadow-sm hover:border-gray-300">
                        <option value="" disabled>Select Payment Method</option>
                        <option value="Cash On Delivery">Cash On Delivery</option>
                        <option value="Prepaid">Prepaid</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full flex items-center justify-center gap-3 py-4 md:py-4 bg-dark hover:bg-gold text-white font-bold tracking-widest text-sm uppercase rounded-xl transition-all duration-500 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(201,162,39,0.5)] group">
                    Confirm Your Order
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
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
