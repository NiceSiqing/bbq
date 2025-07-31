export default function Header() {
    return (
        <div className="w-full">
            <header className="bg-black w-full h-24 flex flex-col justify-center px-5">
                <div className="w-full flex justify-between items-center">
                    <img src="./logo.svg" alt="bbq chicken logo" className="w-60 h-9"/>
                    <a href="/menu" className="text-white font-bold border-b-[3px] border-red-600"> MENU</a>
                </div>
            </header>
        </div>
    )
}