export default function MenuCard() {
    return (
        <div className="w-full h-140"
          style={{
            background: 'linear-gradient(to bottom, white 70%, #ef4444 70%)'
        }}>
            <div className="w-full h-24 flex text-red-600 font-black justify-center text-4xl mt-25"
              style={{textShadow: '0.5px 0 0 currentColor, -0.5px 0 0 currentColor, 0 0.5px 0 currentColor, 0 -0.5px 0 currentColor'} }>
                Menu
            </div>
            <div className="relative w-full  flex items-center justify-center px-8">
                <div className="absolute bg-black top-0 -translate-y-1/2 text-white h-10 w-48 flex justify-center items-center text-lg font-semibold z-10 rounded-sm">Featured Flavor
                </div>
                <div className="border-8 border-black w-full h-100 flex flex-col justify-between items-center relative pb-6 pt-12 px-4">
                    <span className="text-3xl font-black text-red-600 "
                        style={{textShadow:'0.5px 0 0 currentColor, -0.5px 0 0 currentColor, 0 0.5px 0 currentColor, 0 -0.5px 0 currentColor'}}>Gang-Jeong</span>
                    <p className="text-center font-semibold">A soy-based sauce with extra spice thanks to a cinnamon blend and chili garnish.</p>
                    <img src="./GangJeong.png" alt="" className="  w-65 h-38"/>
                </div>
            </div>

        </div>
    )
}