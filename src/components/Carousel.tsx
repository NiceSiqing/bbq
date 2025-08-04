import { useState, useEffect, useRef } from "react";
import type { CarouselItem } from "@/assets/homeList";
interface CarouselProps {
    items: CarouselItem[];
    interval?: number;
}


export default function Carousel({ items, interval = 3000 }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, interval);
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    }, [items.length, interval]);

    const handleNext = () => setCurrentIndex((prev) => (prev + 1) % items.length);
    const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

    const current = items[currentIndex];

    return (
        <div className="w-full flex items-center justify-between mt-4 pb-10 lg:mt-8 lg:px-10">
            <span onClick={handlePrev} className="text-red-600 text-3xl mr-2 lg:text-5xl">◀</span>
            <div key={current.id} className="flex flex-col items-center  text-center">
                <img src={current.image} alt={current.name} className="w-58 h-34 object-cover mb-2 lg:w-116 lg:h-68 lg:mb-4" />
                <h3 className="text-3xl font-bold text-red-600 mb-2 lg:text-5xl lg:mb-4">{current.name}</h3>
                <p className="font-medium overflow-hidden h-18 lg:text-2xl">{current.description}</p>
            </div>
            <span onClick={handleNext} className="text-red-600 text-3xl ml-2 lg:text-5xl">▶</span>

        </div>
    )
}