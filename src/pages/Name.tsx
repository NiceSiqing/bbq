import Header from "@/components/Header";
import Footer from "@/components/Footer"
import HomeBG from "@/components/HomeBG";
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import useStore from "@/stores/useStore";
export default function Name() {
  const [name, setName] = useState('')
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  const { userName, currentOrder, setUserName } = useStore();

  useEffect(() => {
    if (userName && currentOrder && currentOrder.status !== 'complete') {
      navigate('/orderStatus');
    }
  }, [userName, currentOrder, navigate]);

  useEffect(() => {
    const handleWindowKeyDown = (e: KeyboardEvent) => {
      if (!e.ctrlKey && !e.altKey && !e.metaKey) {
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleWindowKeyDown)
    return () => window.removeEventListener("keydown", handleWindowKeyDown)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (name) {
        setUserName(name.trim());
        navigate("/order")
      }
      e.preventDefault()
    }
  }

  const handleStart = () => {
    if (name) {
      setUserName(name.trim());
      navigate("/order");
    }
  }

  return (
    <>
      <Header />
      <HomeBG />
      <div className="w-full flex flex-col text-center items-center bg-neutral-100 py-20 ">
        <h1 className="text-5xl font-black text-red-600 mb-8 lg:text-7xl lg:mb-16 lg:mt-10">Let's Get Started</h1>
        <p className="px-6 mb-8 text-xl lg:text-2xl">Ready for the crispiest, juiciest chicken?
          Tell us your name to begin your order.</p>
        <input type="text" placeholder="Your full name" className="h-12 border-gray-200 border-3 rounded-xl px-3 py-2 focus:border-red-400 focus:outline-none lg:h-24 lg:px-6 lg:py-4 lg:text-3xl lg:border-6"
          ref={inputRef} onChange={e => setName(e.target.value)} value={name} onKeyDown={handleKeyDown} autoFocus
        />
        {name && (
          <button className="text-xl bg-red-600 text-white font-semibold mt-8 rounded-md px-4 py-2 lg:mt-12
          lg:text-3xl lg:px-8"
            onClick={handleStart}>START</button>
        )}

      </div>
      <Footer />
    </>
  );
}
