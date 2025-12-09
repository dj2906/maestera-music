"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

const teachers = [
    {
        id: 1,
        name: "Aastha Mohapatra",
        instrument: "Vocals",
        image: "/images/teachers/aastha.png",
        description: "Experienced vocal coach specializing in classical and contemporary styles."
    },
    {
        id: 2,
        name: "Aamir Saeed",
        instrument: "Guitar",
        image: "/images/teachers/aamir.png",
        description: "Passionate guitar instructor helping students master chords and solos."
    },
    {
        id: 3,
        name: "Abhishek Dutta",
        instrument: "Piano",
        image: "/images/teachers/abhishek.png",
        description: "Piano virtuoso with a focus on technique and musical expression."
    },
    {
        id: 4,
        name: "Amos Masih",
        instrument: "Drums",
        image: "/images/teachers/amos.png",
        description: "Energetic drum teacher who makes learning rhythm fun and engaging."
    },
]

// Clone for infinite loop
const extendedTeachers = [...teachers, ...teachers, ...teachers]

export default function TeacherCarousel() {
    const router = useRouter()
    const [currentIndex, setCurrentIndex] = useState(teachers.length) // Start at the first cloned set
    const [isTransitioning, setIsTransitioning] = useState(false)

    const moveNext = () => {
        setIsTransitioning(true)
        setCurrentIndex((prev) => prev + 1)
    }

    const movePrev = () => {
        setIsTransitioning(true)
        setCurrentIndex((prev) => prev - 1)
    }

    // Handle infinite loop reset
    useEffect(() => {
        if (!isTransitioning) return

        if (currentIndex >= teachers.length * 2) {
            setTimeout(() => {
                setIsTransitioning(false)
                setCurrentIndex(teachers.length)
            }, 500)
        } else if (currentIndex < teachers.length) {
            setTimeout(() => {
                setIsTransitioning(false)
                setCurrentIndex(teachers.length * 2 - 1)
            }, 500)
        }
    }, [currentIndex, isTransitioning])

    // Auto-scroll
    useEffect(() => {
        const interval = setInterval(moveNext, 4000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative w-full max-w-[1080px] mx-auto px-4 py-8">
            {/* Navigation Buttons */}
            <button
                onClick={movePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors"
            >
                <ChevronLeft className="w-8 h-8" />
            </button>

            <button
                onClick={moveNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors"
            >
                <ChevronRight className="w-8 h-8" />
            </button>

            {/* Carousel Container */}
            <div className="overflow-hidden w-full">
                <motion.div
                    className="flex gap-5"
                    animate={{ x: `-${currentIndex * (255 + 20)}px` }} // 255px width + 20px gap. fits 4 in 1080
                    transition={{ duration: isTransitioning ? 0.5 : 0, ease: "easeInOut" }}
                >
                    {extendedTeachers.map((teacher, index) => (
                        <div
                            key={index}
                            className="w-[255px] flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-lg group relative"
                        >
                            {/* Image with Parallax Effect */}
                            <div className="h-80 overflow-hidden relative">
                                <motion.img
                                    src={teacher.image}
                                    alt={teacher.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-4 text-center">
                                <h3 className="text-xl font-bold text-black mb-1">{teacher.name}</h3>
                                <p className="text-red-500 font-medium mb-2">{teacher.instrument}</p>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{teacher.description}</p>

                                <button
                                    onClick={() => router.push(`/student-form?teacher=${encodeURIComponent(teacher.name)}`)}
                                    className="px-6 py-2 border border-black text-black rounded-full font-semibold hover:bg-black hover:text-white transition-all"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
