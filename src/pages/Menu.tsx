import Header from "../components/Header";
import OrderOnline from "@/components/OrderOnline";
import MenuCard from "@/components/MenuCard";
import Footer from "@/components/Footer";
import products from "@/assets/products";
import type { Product } from "@/assets/products";
import SpiceIcons from "@/utils/SpiceIcons";



export default function Menu() {

  return (
    <>
      <div className="lg:flex lg:text-white lg:drop-shadow-[0.4px_0_0_currentColor,_-0.4px_0_0_currentColor,_0_0.4px_0_currentColor,_0_-0.4px_0_currentColor] lg:shadow-[0_16px_16px_rgba(0,0,0,0.4)] ">
        <Header />
        <OrderOnline />
      </div>
      <MenuCard />
      <div className="py-12 lg:py-20">
        <h1 className="text-4xl font-black text-center py-12 lg:text-6xl"
          style={{ textShadow: '1px 0 0 currentColor, 0px 0 0 currentColor, 0 0.4px 0 currentColor, 0 -0.4px 0 currentColor' }}>Korean Fried Chicken</h1>
        <p className="text-center px-3 mb-8 text-sm font-medium lg:text-lg lg:px-100 ">The fried chicken we serve in America is true to the recipes, ingredients and methods we use in Korea, and our flavors range from traditional favorites to adventurous new creations. We mix every flavor differently, which means some are available as whole chicken (wings, breasts, and thighs), boneless, and traditional wings, while others are only available in some styles. Flavors also vary by restaurant.</p>
        <div className="h-12 flex items-center justify-center text-md font-medium mt-2 mb-8 lg:h-24 lg:font-bold">
          <img src="./icon-spice-one.png" alt="spice icon" className="w-5.5 h-7.5 mr-2 relative -top-1 lg:w-11 lg:h-15 lg:mr-6" /><span className="mr-4 lg:text-2xl lg:mr-12">Spice Level</span>
          <img src="./icon-star.png" alt="star icon" className="w-5.5 h-5.5 mr-2 lg:w-11 lg:h-11 lg:mr-6" /><span className=" lg:text-2xl">Favorites</span>
        </div>
      </div>
      <div className="grid gap-10 pb-8 lg:grid-cols-3">
        {
          products.map((item: Product) => (
            <div key={item.id} className="w-full flex flex-col justify-center items-center mb-4" >
              <img
                src={item.image}
                alt={item.name}
                className="w-62.5 h-36 object-contain mb-4
                lg:w-100 lg:h-60 lg:mb-8"
              />
              <div className="w-full flex items-center justify-center mb-2 ">
                <span className="text-3xl font-extrabold text-red-600 mr-1 lg:text-4xl">
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
              <div className="text-gray-700 px-14 text-center font-medium lg:text-xl">{item.description}</div>
            </div>
          ))
        }
      </div>
      <Footer />

    </>
  );
}