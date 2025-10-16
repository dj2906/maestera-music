"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import Header from "../components/Header"

export default function AboutUsPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const videoSources = [
    "/images/about-video.mp4",
    
  ]
  const [sourceIndex, setSourceIndex] = useState(0)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted
      const playPromise = videoRef.current.play()
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {
          // Some browsers block autoplay even when muted; try reload
          videoRef.current?.load()
          videoRef.current?.play().catch(() => {})
        })
      }
    }
  }, [muted, sourceIndex])

  return (
    <main className="relative min-h-screen bg-black text-white">
      <Header />

      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black h-screen pointer-events-none">
        <video
          ref={videoRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 h-screen w-auto object-contain object-top"
          autoPlay
          loop
          playsInline
          muted
          preload="auto"
          src={videoSources[sourceIndex]}
          onError={() => {
            setSourceIndex((prev) => (prev + 1 < videoSources.length ? prev + 1 : prev))
          }}
        />
      </div>

      {/* Spacer so split section starts after the video viewport */}
      <div className="h-screen" />

      {/* Split Section below video - sticky left, scrolling right */}
      <section className="relative z-20 grid grid-cols-1 md:grid-cols-2">
        {/* Left half: black with logo and tagline (sticky) */}
        <div className="bg-black text-white p-8 sticky top-0 h-screen flex items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <img src="/images/about-logo.png" alt="About Maestera" className="w-100 h-auto mb-6" />
            <h2 className="text-xl md:text-5xl font-bold tracking-wide uppercase">The Smart Way to Learn Music</h2>
          </div>
        </div>
        {/* Right half: stacked white sections */}
        <div className="flex flex-col divide-y divide-black">
          {/* Section 1 */}
          <div className="bg-white text-black flex items-center justify-center p-8 min-h-screen -mt-px">
            <div className="max-w-xl w-full text-lg md:text-[1.6rem] text-justify leading-normal px-6 md:px-10">
              Maestera is an <span className="text-red-600 font-bold">innovative music education platform</span>. designed to transform the way people connect and learn through music. Built on the principles of <span className="text-red-600 font-bold">flexibility, accessibility, and personalization</span>, Maestera caters to the unique needs of music enthusiasts and learners.
            </div>
          </div>
          {/* Section 2 */}
          <div className="bg-white text-black flex items-center justify-center p-8 min-h-screen">
            <div className="max-w-xl w-full text-lg md:text-[1.6rem] text-justify leading-normal px-6 md:px-10">
              Unlike traditional platforms, Maestera doesn’t limit you to fixed courses or pricing. We offer a <span className="text-red-600 font-bold">highly customizable learning experience</span>, tailored to your preferences—whether it’s your choice of instrument, budget, genre, location, or preferred schedule. This allows us to connect learners and teachers from all walks of life, ensuring music education is accessible to <span className="text-red-600 font-bold">everyone, everywhere.</span>
            </div>
          </div>
          {/* Section 3 */}
          <div className="bg-white text-black flex items-center justify-center p-8 min-h-screen">
            <div className="max-w-xl w-full text-lg md:text-[1.6rem] text-justify leading-normal px-6 md:px-10">
              Maestera offers <span className="text-red-600 font-bold">lessons in a vast array of instruments</span>, covering everything from the most popular to the unique. In addition, we provide <span className="text-red-600 font-bold">comprehensive education in non-instrumental</span> subjects like music production, orchestration, composition, and more, ensuring a <span className="text-red-600 font-bold">complete learning experience</span> for every music enthusiast.
            </div>
          </div>
          {/* Section 4 */}
          <div className="bg-white text-black flex items-center justify-center p-8 min-h-screen">
            <div className="max-w-xl w-full text-lg md:text-[1.6rem] text-justify leading-normal px-6 md:px-10">
              Whether you’re a toddler discovering your love for music, an adult refining your skills, a professional looking to enhance your expertise, or someone with special needs exploring new creative outlets, Maestera ensures your journey is as unique as your goals.<span className="text-red-600 font-bold"> Music is for everyone, at any age or stage in life.</span> With Maestera, the world of music is limitless. <span className="text-red-600 font-bold">Your path to creativity starts here.</span>
            </div>
          </div>
        </div>
      </section>


      {/* Mute/Unmute Floating Button */}
      <button
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="fixed bottom-6 right-6 z-20 w-14 h-14 rounded-full bg-white/40 text-white backdrop-blur flex items-center justify-center shadow-md transition"
      >
        {muted ? (
          <VolumeX className="w-6 h-6" />
        ) : (
          <Volume2 className="w-6 h-6" />
        )}
      </button>
    </main>
  )
}


