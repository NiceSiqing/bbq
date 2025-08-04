export default function Footer() {
    return (
        <footer className="bg-black w-full h-70 flex flex-col justify-between  px-10 lg:flex-row lg:items-center lg:justify-center  ">
            <img src="./logo-compact.svg" alt="logo compact" className="pt-10 pb-8  lg:w-80 lg:mx-10 lg:mr-40 " />
            <div className=" text-center text-white text-sm font-medium pb-5  lg:text-right lg:text-2xl">
                <p className=" ">Terms & Conditions | Privacy Policy | </p>
                <p className=" ">Accessibility Statement | © 2025 BBQ Chicken.</p>
            </div>


        </footer>
    )
}