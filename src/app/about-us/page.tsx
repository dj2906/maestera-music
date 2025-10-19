"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import Header from "../components/Header"

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
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // Calculate scroll percentage
      const scrollPercent = scrollPosition / (documentHeight - windowHeight)
      
      // Total letters in the text
      const totalLetters = 142 // Approximate count of letters in the text
      const lettersToShow = Math.floor(scrollPercent * totalLetters * 2) // Multiply by 2 for smoother effect
      
      setVisibleLetters(Math.min(lettersToShow, totalLetters))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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
      <section className="bg-black text-white py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-3xl md:text-3xl font-bold leading-loose">
            {renderTextWithReveal()}
          </div>
        </div>
      </section>

      {/* Navigation Cards Section */}
      <section className="bg-white py-10 px-1 md:px-2">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Large Hero Card */}
            <div className="md:col-span-2 md:row-span-2">
              <a href="/find-a-teacher" className="block group">
                <div className="relative h-80 md:h-96 bg-gradient-to-br from-gray-800 to-black rounded-xl overflow-hidden">
                  <img 
                    src="/images/about-us/about-grid1.png" 
                    alt="Start Your Music Learning Journey"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl md:text-3xl font-bold">Start Your Music Learning Journey</h3>
                  </div>
                </div>
              </a>
            </div>

            {/* Small Cards */}
            <div className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <a href="/find-a-teacher" className="block p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Find A Teacher</h4>
              </a>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <a href="/become-a-teacher" className="block p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Become A Teacher</h4>
              </a>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <a href="/contact-us" className="block p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.94 6.413A1 1 0 013.75 6h12.5a1 1 0 01.81 1.587l-6.25 10a1 1 0 01-1.62 0l-6.25-10z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Contact Us</h4>
              </a>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <a href="/faq" className="block p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">FAQ</h4>
              </a>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <a href="#" className="block p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Offers</h4>
              </a>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <a href="#" className="block p-6 text-center">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2">
                      <svg className="w-full h-full text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm">Coming Soon - Group Classes</h4>
                  </div>
                </div>
              </a>
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


