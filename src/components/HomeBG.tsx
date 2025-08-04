export default function HomeBG() {
    return (
        <div className="w-full h-88 relative lg:h-130">
            <img src="./home_bg.png" alt="" className="object-cover h-full lg:w-full " />
            <span className="absolute top-2/5 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap  text-white font-black text-5xl  z-10 lg:text-9xl lg:-mt-5">Real Crispy.</span>
            <span className="absolute top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap  text-white font-black text-5xl  z-10 lg:text-9xl lg:mt-8">Real Korean.</span>
        </div>
    )
}