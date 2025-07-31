import Header from "../components/Header";
import OrderOnline from "@/components/OrderOnline";
import homeList from "@/assets/homeList";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import HomeBG from "@/components/Homebg";




export default function Home() {



  return (
    <>
      <Header />
      <OrderOnline />
      <HomeBG />
      <div className="w-full h-140 flex flex-col  justify-center bg-black px-16 relative ">
        <div className="w-full h-24 flex text-red-600 font-black text-3xl ">
          Flavor from the Heart of Seoul.
        </div>
        <p className="text-white  font-medium text-lg ">
          We fry all our Korean fried chicken in the traditional method. Hand brushed, hand battered, and fried at lower temperatures for longer periods of time. This creates our unforgettably crispy texture. Once tossed in any of our signature sauces, you’re free to enjoy fried chicken like you’ve never tried before.			
        </p>
        <Link to="/menu" className="absolute text-white bg-red-600 z-10 px-8 py-2 text-2xl font-bold rounded-xs bottom-1 translate-y-1/2 left">Menu</Link>
      </div>
      <img src="./home-dscrbg.png" alt="" className="bg-black" />
      <div className="w-full h-167 flex flex-col bg-white px-7 items-center ">
        <span className="text-black text-5xl font-black mt-30 mb-4"
        style={{ textShadow: '1px 0 0 currentColor, 0px 0 0 currentColor, 0 0.4px 0 currentColor, 0 -0.4px 0 currentColor' }}
        >Our Favorites</span>
        <Carousel items={homeList} interval={4000} />
        <Link to="/menu" className="w-30 text-center text-white bg-red-600 px-4 py-2 text-2xl font-bold rounded-xs">Menu</Link>
      </div>
      <div className="relative w-full">
        <video src="./bbqVideo.mp4" 
          autoPlay={true} 
          loop={true} 
          muted={true} 
          playsInline={true}
          className="object-cover w-full h-122"
          ></video>
          <h1 className="absolute inset-0 flex items-center justify-start text-5xl font-light  z-10 text-transparent pl-8"
            style={{     color: 'transparent',
    WebkitTextStroke: '1px white',
 }}>
              FINEST<br/>
              CRISPIEST<br/>
              JUICIEST<br/>
              FLAKIEST<br/>
              HOTTEST<br/>
              SWEETEST<br/>
              TASTIEST
          </h1>
          
      </div>
      <Footer />
      

    </>
  );
}
