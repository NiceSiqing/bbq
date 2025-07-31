import Header from "../components/Header";
import OrderOnline from "@/components/home/OrderOnline";
import MenuCard from "@/components/home/MenuCard";
import Footer from "@/components/Footer";
import products from "@/assets/products";
import type { Product } from "@/assets/products";




export default function Menu() {
  function renderSpiceIcons(level: number) {
    const spiceNum = [];
    for(let i = 0; i < level; i ++ ){
      spiceNum.push(
        <img key={i} src="./icon-spice-one.png" alt="spice icon" className="w-5.5 h-7.5  relative -top-1" />
      )
    }
    return <>{spiceNum}</>
  }
  return (
    <>
      <Header />
      <OrderOnline />
      <MenuCard />
      <div className="py-12">
        <h1 className="text-4xl font-black text-center py-12"
          style={{ textShadow: '1px 0 0 currentColor, 0px 0 0 currentColor, 0 0.4px 0 currentColor, 0 -0.4px 0 currentColor' }}>Korean Fried Chicken</h1>
        <p className="text-center px-3 mb-8 text-sm font-medium">The fried chicken we serve in America is true to the recipes, ingredients and methods we use in Korea, and our flavors range from traditional favorites to adventurous new creations. We mix every flavor differently, which means some are available as whole chicken (wings, breasts, and thighs), boneless, and traditional wings, while others are only available in some styles. Flavors also vary by restaurant.</p>
        <div className="h-12 flex items-center justify-center text-md font-medium mt-2 mb-8">
          <img src="./icon-spice-one.png" alt="spice icon" className="w-5.5 h-7.5 mr-2 relative -top-1" /><span className="mr-4">Spice Level</span>
          <img src="./icon-star.png" alt="star icon" className="w-5.5 h-5.5 mr-2" /><span className=" ">Favorites</span>
        </div>
      </div>
      <div className="grid gap-10 pb-8">
        {
          products.map((item: Product)=> (
            <div key={item.id} className="w-full flex flex-col justify-center items-center mb-4" >
              <img
                src={item.image}
                alt={item.name}
                className="w-62.5 h-36 object-contain mb-4"
              />
              <div className="w-full flex items-center justify-center mb-2 ">
                <span className="text-3xl font-extrabold text-red-600 mr-1">
                  {item.name}
                </span>
                
                {item.spiceLevel > 0 && renderSpiceIcons(item.spiceLevel)}
                
                {item.fav && (
                  <img
                    src="./icon-star.png"
                    alt="Favorite"
                    className="w-5.5 h-5.5 ml-1 "
                  />
                )}
              </div>
              <div className="text-gray-700 px-14 text-center font-medium">{item.description}</div>
            </div>
          ))
        }
      </div>
      <Footer />

    </>
  );
}