import Header from '@/components/Header'
import Footer from '@/components/Footer'
import productsWithPrice from '@/assets/productsWithPrice'
import type { ProductWithPrice } from '@/assets/productsWithPrice'
import SpiceIcons from '@/utils/SpiceIcons'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import useStore from '@/stores/useStore'




export default function Order() {
  const navigate = useNavigate()

  const { userName, currentOrder, cart, addToCart, getCartTotal } = useStore();

  useEffect(() => {
    if (!userName) {
      navigate('/name');
    }
  }, [userName, navigate]);

  useEffect(() => {
    if (userName && currentOrder) {
      navigate('/orderStatus');
    }
  }, [userName, currentOrder, navigate]);

  const handleAddToCart = (item: ProductWithPrice) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image
    });
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <Header />
      <div className='w-full '>
        <h1 className="text-4xl font-black text-center py-12 lg:text-6xl lg:py-20"
          style={{ textShadow: '1px 0 0 currentColor, 0px 0 0 currentColor, 0 0.4px 0 currentColor, 0 -0.4px 0 currentColor' }}>Korean Fried Chicken</h1>

        {userName && (
          <div className="text-center mb-8 mt-4">
            <p className="text-xl font-semibold text-gray-800 lg:text-3xl">Welcome {userName}! 👋</p>
            <p className="text-gray-600 lg:mt-6 lg:text-xl">Choose your favorite chicken</p>
          </div>
        )}
        <div className="h-12 flex items-center justify-center text-md font-mediumsss mb-8">
          <img src="./icon-spice-one.png" alt="spice icon" className="w-5.5 h-7.5 mr-2 relative -top-1 lg:w-9 lg:h-12 lg:mr-4" /><span className="mr-4 lg:mr-8 lg:text-2xl lg:font-bold">Spice Level</span>
          <img src="./icon-star.png" alt="star icon" className="w-5.5 h-5.5 mr-2 lg:w-9 lg:h-9" /><span className="lg:text-2xl lg:font-bold ">Favorites</span>
        </div>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          {productsWithPrice.map((item: ProductWithPrice) => {
            return (
              <div key={item.id}
                className='flex flex-col w-full px-8 py-8 items-center justify-center text-center border-b-4 border-red-600'>
                <img src={item.image} alt={item.name} className='w-62.5 h-36 object-contain mb-2 lg:w-100 lg:h-58' />
                <div className='flex justify-center items-center mb-2'>
                  <span className="text-xl font-extrabold text-red-600 mr-1 lg:text-2xl">
                    {item.name}
                  </span>
                  {item.spiceLevel > 0 && <SpiceIcons level={item.spiceLevel} />}
                  {item.fav && (
                    <img
                      src="./icon-star.png"
                      alt="Favorite"
                      className="w-5.5 h-5.5 ml-1 "
                    />
                  )}
                </div>
                <p className='text-sm mb-1 lg:text-lg'>{item.description}</p>
                <span className='italic mb-1 lg:text-lg'>$ {item.price} </span>
                <button className='bg-red-600 text-white px-3 py-2 rounded-md lg:text-xl'
                  onClick={() => handleAddToCart(item)}>Add to Cart</button>
              </div>
            )
          })}
        </div>


        {cartItemCount > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg py-4 px-8">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <div>
                <span className="font-semibold whitespace-nowrap lg:text-2xl">{cartItemCount} items in cart</span>
                <br />
                <span className="text-red-600 font-bold  mx-auto lg:text-xl ">${getCartTotal().toFixed(2)}</span>
              </div>
              <button
                onClick={() => navigate('/cart')}
                className="w-40 bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors lg:text-2xl lg:w-60"
              >
                View Cart & Checkout
              </button>
            </div>
          </div>
        )}




      </div >

      <Footer />
    </>

  );
}
