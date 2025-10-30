"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function AboutUsPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [gifIndex, setGifIndex] = useState(0)
  const [visibleLetters, setVisibleLetters] = useState(0)
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

  // Auto-scroll GIFs functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setGifIndex((prev) => (prev + 1) % 5) // 7 GIFs total, showing 3 at a time = 5 possible starting positions
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [])

 // Letter reveal animation on scroll
useEffect(() => {
  const target = document.getElementById("text-reveal-section")
  const text = "We shape meaningful musical journeys — crafting personalised learning experiences that connect teachers and learners in creative, powerful, and lasting ways."
  const totalLetters = text.length

  const handleScroll = () => {
    if (!target) return

    const rect = target.getBoundingClientRect()
    const windowHeight = window.innerHeight

    // Reveal only when section starts to appear
    const progress = Math.min(
      Math.max(0, windowHeight - rect.top),
      windowHeight
    ) / windowHeight

    const lettersToShow = Math.floor(progress * totalLetters * 1.5) // smoother effect
    setVisibleLetters(Math.min(lettersToShow, totalLetters))
  }

  window.addEventListener("scroll", handleScroll)
  handleScroll()
  return () => window.removeEventListener("scroll", handleScroll)
}, [])


  const gifs = [
    {
      src: "/images/about-us/Peronalise-Learning-3501.gif",
      title: "PERSONALIZED LEARNING EXPERIENCE",
      description: "Your lessons are tailored to your instrument, genre, budget, location, and schedule—music that fits your life."
    },
    {
      src: "/images/about-us/diverse-offerring-350.gif", 
      title: "DIVERSE OFFERINGS",
      description: "Learn everything from piano and trumpet to DJing, production, and composition—all in one place."
    },
    {
      src: "/images/about-us/For-all-skills01.gif",
      title: "FOR ALL SKILL LEVELS", 
      description: "Whether you're starting out or refining your craft, Maestera connects you with the right teacher."
    },
    {
      src: "/images/about-us/Global-Reach.gif",
      title: "GLOBAL AND LOCAL ACCESS",
      description: "Find teachers near you or around the world—wherever you prefer to learn."
    },
    {
      src: "/images/about-us/Hlistic-approach01.gif",
      title: "HOLISTIC AND INCLUSIVE APPROACH",
      description: "Explore performance, theory, and genres from Indian classical to jazz and experimental music."
    },
    {
      src: "/images/about-us/learn-at-your-convenience-350.gif",
      title: "SUPPORT EVERY STEP OF THE WAY",
      description: "Can't find a teacher? We'll personally help match you with one who fits your needs."
    },
    {
      src: "/images/about-us/Peronalise-Learning-3501.gif",
      title: "LEARN AT YOUR CONVENIENCE",
      description: "Flexible scheduling and online options make learning easy—anytime, anywhere."
    }
  ]

  // Function to render text with letter-by-letter reveal
  const renderTextWithReveal = () => {
    const text = "We shape meaningful musical journeys — crafting personalised learning experiences that connect teachers and learners in creative, powerful, and lasting ways."
    const letters = text.split('')
    
    return letters.map((letter, index) => (
      <span
        key={index}
        className={`transition-colors duration-100 ${
          index < visibleLetters ? 'text-white' : 'text-gray-600'
        }`}
      >
        {letter}
      </span>
    ))
  }

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

      {/* Why Choose Maestera Section */}
      <section className="bg-white text-black py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-[2.6rem] font-extrabold text-center mb-16">WHY CHOOSE MAESTERA?</h2>
          
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${gifIndex * (100 / 3)}%)` }}
            >
              {gifs.map((gif, index) => (
                <div key={index} className="w-1/3 flex-shrink-0 px-3">
                  <div className="text-center">
                    <div className="mb-6">
                      <img 
                        src={gif.src} 
                        alt={gif.title}
                        className="w-full h-64 object-cover rounded-lg mx-auto"
                      />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-3 text-red-600 uppercase tracking-wide">
                      {gif.title}
                    </h3>
                    <p className="text-sm md:text-lg text-gray-700 leading-relaxed">
                      {gif.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Black Text Reveal Section */}
      <section id="text-reveal-section" className="bg-black text-white py-12 px-6 md:px-12">

        <div className="max-w-4xl mx-auto">
          <div className="text-3xl md:text-3xl font-bold leading-loose">
            {renderTextWithReveal()}
          </div>
        </div>
      </section>
   {/* Navigation cards section */}
<section className="bg-white py-10 px-4">
  <div className="w-full mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {/* Column 1 */}
      <div className="grid gap-4">
        {/* Big card */}
        <div className="bg-white h-84 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.10)] hover:shadow-[0_3px_16px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer"></div>

        <div className="grid grid-cols-2 gap-4">
          {/* Tall left card */}
          <div className="bg-white h-100 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.10)] hover:shadow-[0_3px_16px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer"></div>

          {/* Right stacked small cards */}
          <div className="grid gap-4">
            <div className="bg-white h-64 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.10)] hover:shadow-[0_3px_16px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer"></div>
            <div className="bg-white h-32 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.10)] hover:shadow-[0_3px_16px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer"></div>
          </div>
        </div>
      </div>

      {/* Column 2 */}
      <div className="grid grid-cols-3 gap-4">
        {/* Row 1 */}
        <div className="bg-white h-64 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.10)] hover:shadow-[0_3px_16px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer col-span-1"></div>
        <div className="bg-white h-64 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.10)] hover:shadow-[0_3px_16px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer col-span-2"></div>

        {/* Row 2 */}
        <div className="bg-white h-52 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.10)] hover:shadow-[0_3px_16px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer col-span-2"></div>
        <div className="bg-white h-52 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.10)] hover:shadow-[0_3px_16px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer col-span-1"></div>

        {/* Row 3 */}
        <div className="bg-white h-64 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.10)] hover:shadow-[0_3px_16px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer col-span-1"></div>
        <div className="bg-white h-64 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.10)] hover:shadow-[0_3px_16px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer col-span-2"></div>
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
      <Footer />
    </main>
  )
}


