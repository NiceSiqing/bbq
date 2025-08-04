export default function MenuCard() {
    return (
        <div className="w-full h-140 lg:h-200"
            style={{
                background: 'linear-gradient(to bottom, white 70%, #ef4444 70%)'
            }}>
            <div className="w-full h-24 flex text-red-600 font-black justify-center text-4xl mt-25 lg:text-6xl lg:mt-40 lg:-translate-y-8"
                style={{ textShadow: '0.5px 0 0 currentColor, -0.5px 0 0 currentColor, 0 0.5px 0 currentColor, 0 -0.5px 0 currentColor' }}>
                Menu
            </div>
            <div className="relative w-full  flex items-center justify-center px-8 lg:px-20 ">
                <div className="absolute bg-black top-0 -translate-y-6 text-white h-10 w-48 flex justify-center items-center text-lg font-semibold z-10 rounded-sm lg:text-2xl lg:h-20 lg:w-96 ">Featured Flavor
                </div>
                <div className="inset-0 outline outline-2 outline-black outline-8 outline-offset w-full h-96 flex flex-col justify-between items-center relative pb-6 pt-12 px-4 lg:h-160 lg:outline-offset-[-20px]">
                    <span className="text-3xl font-black text-red-600 -mb-8 lg:mt-15 lg:text-5xl"
                        style={{ textShadow: '0.5px 0 0 currentColor, -0.5px 0 0 currentColor, 0 0.5px 0 currentColor, 0 -0.5px 0 currentColor' }}>Gang-Jeong</span>
                    <p className="text-center font-semibold lg:text-2xl lg:mx-auto">A soy-based sauce with extra spice thanks to a cinnamon blend and chili garnish.</p>
                    <img src="./GangJeong.png" alt="" className="  w-65 h-38 lg:w-130 lg:h-76" />
                </div>
            </div>

        </div>
    )
}