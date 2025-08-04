import Header from "../components/Header";
import OrderOnline from "@/components/OrderOnline";
import homeList from "@/assets/homeList";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import HomeBG from "@/components/HomeBG";




export default function Home() {



  return (
    <>
      <div className="lg:flex lg:text-white lg:text-shadow-custom lg:shadow-[0_16px_16px_rgba(0,0,0,0.4)]">
        <Header />
        <OrderOnline />
      </div>
      <HomeBG />
      <div className="lg:flex">
        <div className="w-full h-140 flex flex-col  justify-center bg-black px-16 relative  ">
          <div className="w-full h-24 flex text-red-600 font-black text-3xl lg:text-5xl lg:-translate-y-15 ">
            Flavor from the Heart of Seoul.
          </div>
          <p className="text-white  font-medium text-lg lg:text-2xl lg:-translate-y-12">
            We fry all our Korean fried chicken in the traditional method. Hand brushed, hand battered, and fried at lower temperatures for longer periods of time. This creates our unforgettably crispy texture. Once tossed in any of our signature sauces, you’re free to enjoy fried chicken like you’ve never tried before.
          </p>
          <Link to="/menu" className="absolute text-white bg-red-600 z-10 px-8 py-2 text-2xl font-bold rounded-xs bottom-1 translate-y-1/2 left lg:text-4xl lg:bottom-20 lg:-translate-y-5">Menu</Link>
        </div>
        <img src="./home-dscrbg.png" alt=""
          className="bg-black lg:h-140" />
      </div>
      <div className="w-full h-167 flex flex-col bg-white px-7 items-center lg:h-250">
        <span className="text-black text-5xl font-black mt-30 mb-4 lg:text-7xl lg:mt-45"
          style={{ textShadow: '1px 0 0 currentColor, 0px 0 0 currentColor, 0 0.4px 0 currentColor, 0 -0.4px 0 currentColor' }}
        >Our Favorites</span>
        <Carousel items={homeList} interval={4000} />
        <Link to="/menu" className="w-30 text-center text-white bg-red-600 px-4 py-2 text-2xl font-bold rounded-xs lg:text-4xl lg:px-8 lg:w-60 lg:py-4">Menu</Link>
      </div>
      <div className="relative w-full">
        <video src="./bbqVideo.mp4"
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline={true}
          className="object-cover w-full h-122 lg:h-180"
        ></video>
        <h1 className="absolute inset-0 flex items-center justify-start text-5xl font-light  z-10 text-transparent pl-8 lg:ml-50 lg:text-7xl"
          style={{
            color: 'transparent',
            WebkitTextStroke: '1px white',
          }}>
          FINEST<br />
          CRISPIEST<br />
          JUICIEST<br />
          FLAKIEST<br />
          HOTTEST<br />
          SWEETEST<br />
          TASTIEST
        </h1>

      </div>
      <Footer />


    </>
  );
}
