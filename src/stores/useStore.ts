// stores/useStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'delivering' | 'complete';
  estimatedTimeToComplete: number;
  actualCompletionTime: number;
  createdAt: number;
  completedAt: number;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
  };
}

interface AppState {
  // 用户信息
  userName: string;
  setUserName: (name: string) => void;

  // 当前订单
  currentOrder: Order | null;

  // 购物车
  cart: OrderItem[];
  addToCart: (item: OrderItem) => void;
  removeFromCart: (itemId: number) => void;
  updateCartQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;

  // 订单操作
  createOrder: (customerInfo: { phone: string; address: string }) => void;
  updateOrderStatus: (status: Order['status']) => void;
  clearUserSession: () => void;

  // 自动清理
  autoCleanupTimer: NodeJS.Timeout | null;
  setAutoCleanup: (minutes: number) => void;
  clearAutoCleanup: () => void;
}

const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // 初始状态
      userName: '',
      currentOrder: null,
      cart: [],
      autoCleanupTimer: null,

      // 设置用户名
      setUserName: (name: string) => {
        set({ userName: name });
      },

      // 购物车操作
      addToCart: (item: OrderItem) => {
        const { cart } = get();
        const existingItem = cart.find(cartItem => cartItem.id === item.id);

        if (existingItem) {
          set({
            cart: cart.map(cartItem =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                : cartItem
            )
          });
        } else {
          set({ cart: [...cart, item] });
        }
      },

      removeFromCart: (itemId: number) => {
        set(state => ({
          cart: state.cart.filter(item => item.id !== itemId)
        }));
      },

      updateCartQuantity: (itemId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(itemId);
          return;
        }

        set(state => ({
          cart: state.cart.map(item =>
            item.id === itemId ? { ...item, quantity } : item
          )
        }));
      },

      clearCart: () => {
        set({ cart: [] });
      },

      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      // 创建订单
      createOrder: (customerInfo: { phone: string; address: string }) => {
        const { cart, userName } = get();
        if (cart.length === 0) return;

        const orderId = `order_${Date.now()}`;
        const total = get().getCartTotal();

        // 30-60分钟随机预估时间
        const estimatedTime = Math.floor(Math.random() * 31) + 30;

        // 实际完成时间：预估时间5分钟内的随机波动
        const timeVariation = (Math.random() - 0.5) * 10;
        const actualTime = Math.max(25, estimatedTime + timeVariation);

        const newOrder: Order = {
          id: orderId,
          items: [...cart],
          total,
          status: 'pending',
          estimatedTimeToComplete: estimatedTime,
          actualCompletionTime: actualTime,
          createdAt: Date.now(),
          completedAt: 0,
          customerInfo: {
            name: userName,
            phone: customerInfo.phone,
            address: customerInfo.address
          }
        };

        set({
          currentOrder: newOrder,
          cart: [] // 下单后清空购物车
        });

        // 模拟订单状态变化
        setTimeout(() => get().updateOrderStatus('preparing'), 20000);
        setTimeout(() => get().updateOrderStatus('delivering'), actualTime * 60 * 1000 * 0.9);
        setTimeout(() => get().updateOrderStatus('complete'), actualTime * 60 * 1000);
      },

      // 更新订单状态
      updateOrderStatus: (status: Order['status']) => {
        const { currentOrder } = get();
        if (!currentOrder) return;

        const updatedOrder = {
          ...currentOrder,
          status,
          completedAt: status === 'complete' ? Date.now() : currentOrder.completedAt
        };

        set({ currentOrder: updatedOrder });

        // 如果订单完成，设置30分钟后自动清理
        if (status === 'complete') {
          get().setAutoCleanup(30);
        }
      },

      // 设置自动清理定时器
      setAutoCleanup: (minutes: number) => {
        const { autoCleanupTimer } = get();

        if (autoCleanupTimer) {
          clearTimeout(autoCleanupTimer);
        }

        const timer = setTimeout(() => {
          get().clearUserSession();
        }, minutes * 60 * 1000);

        set({ autoCleanupTimer: timer });
      },

      // 清除自动清理定时器
      clearAutoCleanup: () => {
        const { autoCleanupTimer } = get();
        if (autoCleanupTimer) {
          clearTimeout(autoCleanupTimer);
          set({ autoCleanupTimer: null });
        }
      },

      // 清理用户会话
      clearUserSession: () => {
        get().clearAutoCleanup();
        set({
          userName: '',
          currentOrder: null,
          cart: [],
          autoCleanupTimer: null
        });
      }
    }),
    {
      name: 'chicken-order-store',
      partialize: (state) => ({
        userName: state.userName,
        currentOrder: state.currentOrder,
        cart: state.cart
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.currentOrder && state.currentOrder.status !== 'complete') {
          const { currentOrder } = state;
          const now = Date.now();
          const orderAge = (now - currentOrder.createdAt) / (1000 * 60);

          // 如果实际完成时间已过，直接标记为complete
          if (orderAge >= currentOrder.actualCompletionTime) {
            state.updateOrderStatus('complete');
          } else {
            // 重新设置完成定时器
            const remainingTime = currentOrder.actualCompletionTime - orderAge;
            setTimeout(() => {
              const currentState = useStore.getState();
              if (currentState.currentOrder?.id === currentOrder.id) {
                currentState.updateOrderStatus('complete');
              }
            }, remainingTime * 60 * 1000);
          }
        }
      }
    }
  )
);

export default useStore;