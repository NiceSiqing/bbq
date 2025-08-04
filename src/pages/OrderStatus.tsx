// components/OrderStatus.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useStore from '@/stores/useStore';

export default function OrderStatus() {
  const navigate = useNavigate();
  const { userName, currentOrder, clearUserSession } = useStore();
  const [countdown, setCountdown] = useState<number>(0);

  console.log('=== OrderStatus Debug ===');
  console.log('userName:', userName);
  console.log('currentOrder:', currentOrder);
  console.log('currentOrder status:', currentOrder?.status);
  console.log('========================');

  // 如果没有用户名或订单，返回首页
  useEffect(() => {
    if (!userName || !currentOrder) {
      navigate('/');
      return;
    }
  }, [userName, currentOrder, navigate]);

  // 倒计时逻辑
  useEffect(() => {
    if (!currentOrder) return;

    const updateCountdown = () => {
      const now = Date.now();
      const orderTime = currentOrder.createdAt;
      const actualFinishTime = orderTime + (currentOrder.actualCompletionTime * 60 * 1000);
      const remaining = Math.max(0, actualFinishTime - now);

      setCountdown(Math.ceil(remaining / 1000));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [currentOrder]);

  if (!currentOrder) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600';
      case 'preparing': return 'text-blue-600';
      case 'delivering': return 'text-purple-600';
      case 'complete': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Order Received';
      case 'preparing': return 'Preparing Your Order';
      case 'delivering': return 'Out for Delivery';
      case 'complete': return 'Order Delivered!';
      default: return 'Unknown Status';
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleNewOrder = () => {
    clearUserSession();
    navigate('/');
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-neutral-100 py-20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Hi {userName}! 👋
              </h1>
              <p className="text-gray-600">Here's your order status</p>
            </div>

            {/* 订单状态 */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Order #{currentOrder.id.slice(-6)}</h2>
                <span className={`text-lg font-bold ${getStatusColor(currentOrder.status)}`}>
                  {getStatusText(currentOrder.status)}
                </span>
              </div>

              {/* 进度条 */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div
                  className="bg-red-600 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${currentOrder.status === 'pending' ? '25%' :
                      currentOrder.status === 'preparing' ? '60%' :
                        currentOrder.status === 'delivering' ? '90%' :
                          currentOrder.status === 'complete' ? '100%' :
                            '0%'
                      }`
                  }}
                ></div>
              </div>

              {/* 倒计时和状态显示 */}
              {currentOrder.status !== 'complete' && countdown > 0 && (
                <div className="text-center mb-6">
                  <p className="text-gray-600 mb-2">
                    Estimated delivery time:
                  </p>
                  <div className="text-3xl font-bold text-red-600">
                    {formatTime(countdown)}
                  </div>
                </div>
              )}

              {currentOrder.status === 'delivering' && (
                <div className="text-center mb-6">
                  <div className="text-4xl mb-2">🚗</div>
                  <p className="text-purple-600 font-bold text-xl">Your order is on the way!</p>
                  <p className="text-gray-600">The driver will contact you when they arrive.</p>
                </div>
              )}

              {currentOrder.status === 'complete' && (
                <div className="text-center mb-6">
                  <div className="text-4xl mb-2">✅</div>
                  <p className="text-green-600 font-bold text-xl">Order delivered!</p>
                  <p className="text-gray-600">Thank you for your order. Enjoy your meal!</p>
                </div>
              )}
            </div>

            {/* 订单详情 */}
            <div className="border-t pt-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Order Details:</h3>

              {/* 客户信息 */}
              {currentOrder.customerInfo && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Delivery to:</h4>
                  <p className="text-sm text-gray-700">{currentOrder.customerInfo.name}</p>
                  <p className="text-sm text-gray-700">{currentOrder.customerInfo.phone}</p>
                  <p className="text-sm text-gray-700">{currentOrder.customerInfo.address}</p>
                </div>
              )}

              {/* 商品列表 */}
              <div className="space-y-2">
                {currentOrder.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{item.quantity}x {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-4 flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${currentOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="text-center">
              <button
                onClick={handleNewOrder}
                className={`px-8 py-3 rounded-lg font-semibold transition-colors ${currentOrder.status === 'complete'
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
                  }`}
              >
                {currentOrder.status === 'complete' ? 'Place New Order' : 'Start Over'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}