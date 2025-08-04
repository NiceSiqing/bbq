// components/Cart.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useStore from '@/stores/useStore';

export default function Cart() {
  const navigate = useNavigate();
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    getCartTotal,
    userName
  } = useStore();

  // 如果没有用户名，回到首页
  React.useEffect(() => {
    if (!userName) {
      navigate('/');
    }
  }, [userName, navigate]);

  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate('/checkout');
    }
  };

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-neutral-100 py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-3xl font-bold text-center mb-8 lg:text-5xl">Your Cart</h1>
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add some delicious items to get started!</p>
              <button
                onClick={() => navigate('/order')}
                className="bg-red-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-red-700 transition-colors"
              >
                Browse Menu
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-neutral-100 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-center mb-8 lg:text-5xl">Your Cart</h1>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <>
                  <div key={item.id} className="flex gap-4 items-center lg:px-20 lg:justify-between">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-37 h-20 object-cover rounded-lg -translate-x-2"
                    />

                    <div className="lg:text-center">
                      <h3 className="w-30 font-semibold text-lg lg:text-xl whitespace-nowrap ">{item.name}</h3>
                      <p className="text-red-600 font-bold">${item.price.toFixed(2)}</p>

                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          -
                        </button>

                        <span className="w-8 text-center font-semibold">{item.quantity}</span>

                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          +
                        </button>
                      </div>


                    </div>

                  </div>
                  {/* 商品小计和删除按钮 */}
                  <div className="flex justify-between items-center mt-2 px-6 lg:px-27">
                    <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800 text-sm transition-colors"
                    >
                      Remove
                    </button>
                  </div>

                </>

              ))}
            </div>

            <div className="border-t pt-6 lg:px-8">
              <div className="flex justify-between items-center mb-6 lg:justify-center ">
                <span className="text-xl font-semibold lg:mr-5 lg:text-2xl">Total:</span>
                <span className="text-xl font-bold text-red-600 lg:text-2xl">${getCartTotal().toFixed(2)}</span>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => navigate('/order')}
                  className="flex-1 bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Continue Shopping
                </button>

                <button
                  onClick={handleCheckout}
                  className="flex-1 bg-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-800 transition-colors"
                >
                  Continue Checkout
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