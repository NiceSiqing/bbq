// components/Checkout.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useStore from '@/stores/useStore';

export default function Checkout() {
  const navigate = useNavigate();
  const {
    cart,
    userName,
    getCartTotal,
    createOrder,
    currentOrder
  } = useStore();

  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 如果没有用户名或购物车为空，返回相应页面
  React.useEffect(() => {
    if (!userName) {
      navigate('/');
    } else if (cart.length === 0 && !currentOrder) {
      navigate('/cart');
    }
  }, [userName, cart, navigate, currentOrder]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone.trim() || !address.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    // 模拟提交延迟
    setTimeout(() => {
      createOrder({
        phone: phone.trim(),
        address: address.trim()
      });

      navigate('/orderStatus');
    }, 1500);
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-neutral-100 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-center mb-8 lg:text-5xl">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-red-600">${getCartTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={userName}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-red-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Address *
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Main St, City, State 12345"
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-red-400 focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? 'Processing...' : 'Confirm Order'}
                  </button>
                </div>
              </form>

              <div className="mt-3 pt-4 border-t">
                <button
                  onClick={() => navigate('/cart')}
                  className="w-full bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Back to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}