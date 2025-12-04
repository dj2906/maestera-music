"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

const instruments = [
    { name: "Flute", image: "/images/instruments/trumpet.png" },
    { name: "Saxophone", image: "/images/instruments/saxophone.png" },
    { name: "Trumpet", image: "/images/instruments/trumpet.png" },
    { name: "Drum Set", image: "/images/instruments/drum.png" },
    { name: "Violin", image: "/images/instruments/violin.png" },
    { name: "Double Bass", image: "/images/instruments/double bass.png" },
    { name: "Trombone", image: "/images/instruments/trombone.png" },
    { name: "Piano", image: "/images/instruments/violin.png" },
    { name: "Mandolin", image: "/images/instruments/mandolin.png" },
    { name: "Guitar", image: "/images/instruments/double bass.png" },
]

// Clone the first 7 instruments to append at the end for infinite loop illusion
const extendedInstruments = [...instruments, ...instruments.slice(0, 7)]

export default function InstrumentCarousel() {
    const router = useRouter()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(true)

    const nextSlide = () => {
        setCurrentIndex((prev) => prev + 1)
        setIsTransitioning(true)
    }

    const prevSlide = () => {
        if (currentIndex === 0) {
            setIsTransitioning(false)
            setCurrentIndex(instruments.length)
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsTransitioning(true)
                    setCurrentIndex(instruments.length - 1)
                })
            })
        } else {
            setCurrentIndex((prev) => prev - 1)
            setIsTransitioning(true)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide()
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (currentIndex === instruments.length) {
            const timeout = setTimeout(() => {
                setIsTransitioning(false)
                setCurrentIndex(0)
            }, 500) // Match transition duration
            return () => clearTimeout(timeout)
        }
    }, [currentIndex])

    return (
        <div className="flex items-center gap-4">
            <button
                onClick={prevSlide}
                className="p-2 bg-white/75 text-black rounded-full shadow hover:bg-white/30 backdrop-blur-sm z-10"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative overflow-hidden w-[828px] rounded-full bg-white/70 backdrop-transparent border border-white/20 shadow-lg px-4 py-2">
                <div
                    className="flex gap-4"
                    style={{
                        transform: `translateX(-${currentIndex * 116}px)`, // 100px item + 16px gap
                        transition: isTransitioning ? "transform 500ms ease-in-out" : "none",
                    }}
                >
                    {extendedInstruments.map((inst, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center w-[100px] flex-shrink-0 cursor-pointer"
                            onClick={() => {
                                const queryName = inst.name === "Drum Set" ? "Drums" : inst.name
                                router.push(`/find-a-teacher?instrument=${queryName}`)
                            }}
                        >
                            <img
                                src={inst.image}
                                alt={inst.name}
                                className="h-10 w-10 object-contain mb-2 transition-transform duration-200 hover:scale-110 hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                            />
                            <span className="text-sm font-medium whitespace-nowrap text-black">{inst.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={nextSlide}
                className="p-2 bg-white/75 text-black rounded-full shadow hover:bg-white/30 backdrop-blur-sm z-10"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>
    )
}
