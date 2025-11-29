"use client"

import { useState, useEffect } from "react"

const teachers = [
    { name: "SHAMEER MOHAMMED", instruments: "Piano, Guitar", location: "Online", img: "/images/teachers/carissa-profile.png" },
    { name: "SHASHI SUTAR", instruments: "Guitar, Keyboard", location: "Mumbai, Online", img: "/images/teachers/prakriti-profile.png" },
    { name: "SUKHENDU CHAKRABORTY", instruments: "Guitar, Piano, Keyboard", location: "Kolkata, Online", img: "/images/teachers/tryphosa-profile.png" },
    { name: "TRYPHOSA JADHAV", instruments: "Keyboard, Guitar", location: "Bangalore, Online", img: "/images/teachers/carissa-profile.png" },
    { name: "SHAMEER MOHAMMED", instruments: "Piano, Guitar", location: "Online", img: "/images/teachers/carissa-profile.png" },
    { name: "SHASHI SUTAR", instruments: "Guitar, Keyboard", location: "Mumbai, Online", img: "/images/teachers/prakriti-profile.png" },
    { name: "SUKHENDU CHAKRABORTY", instruments: "Guitar, Piano, Keyboard", location: "Kolkata, Online", img: "/images/teachers/tryphosa-profile.png" },
    { name: "TRYPHOSA JADHAV", instruments: "Keyboard, Guitar", location: "Bangalore, Online", img: "/images/teachers/carissa-profile.png" },
]

// Clone the first 4 teachers to append at the end for infinite loop illusion
const extendedTeachers = [...teachers, ...teachers.slice(0, 4)]

export default function TeacherCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => prev + 1)
            setIsTransitioning(true)
        }, 4000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (currentIndex === teachers.length) {
            // Wait for the transition to finish (700ms), then snap back to 0 without transition
            const timeout = setTimeout(() => {
                setIsTransitioning(false)
                setCurrentIndex(0)
            }, 700)
            return () => clearTimeout(timeout)
        }
    }, [currentIndex])

    return (
        <div
            className="flex gap-10"
            style={{
                transform: `translateX(-${currentIndex * 280}px)`, // 240px card + 40px gap
                transition: isTransitioning ? "transform 700ms ease-in-out" : "none",
            }}
        >
            {extendedTeachers.map((teacher, i) => (
                <div
                    key={i}
                    className="w-60 flex-shrink-0 bg-white rounded-2xl transition transform hover:-translate-y-1 overflow-hidden"
                >
                    <img
                        src={teacher.img}
                        alt={teacher.name}
                        className="w-full h-60 object-cover"
                        style={{
                            transform: `scale(1.0)`,
                            transition: isTransitioning ? "transform 700ms ease-in-out" : "none",
                        }}
                    />
                    <div className="pt-3 text-left">
                        <h3 className="font-bold text-black text-lg">{teacher.name}</h3>
                        <p className="text-red-500 text-md font-semibold mt-1">
                            {teacher.instruments} | {teacher.location}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}
