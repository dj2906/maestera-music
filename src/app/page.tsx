"use client"

import { useRef } from "react"
import { useEffect, useState } from "react"

import { Search, MapPin, Music2, ChevronLeft, ChevronRight } from "lucide-react"
import Header from "./components/Header"

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isSticky, setIsSticky] = useState(false)
  const [testimonialIndex, setTestimonialIndex] = useState(0)

useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > window.innerHeight * 0.5) {
      setIsSticky(true)
    } else {
      setIsSticky(false)
    }
  }

  window.addEventListener("scroll", handleScroll)
  return () => window.removeEventListener("scroll", handleScroll)
}, [])


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


  const testimonials = [
    {
      quote:
        "Maestera is a fantastic platform where we can connect with like minded teachers. We can follow our interests and get connected to the right teacher. I learnt western singing from Pravalikaa and Carnatic singing from Arvindh Sithu. Both of them were very experienced teachers and I have improved my singing from them.",
      author: "Saatvik Sannuthi",
    },
    {
      quote:
        "Thanks to Maestera, I found a teacher who understands my style and goals. The onboarding was seamless and I look forward to every class now!",
      author: "Ananya Rao",
    },
    {
      quote:
        "I switched to online lessons through Maestera and it has been super convenient. My progress has been consistent with the right mentorship.",
      author: "Rohan Mehta",
    },
  ]

  const showPrevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const showNextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
  }

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [testimonials.length])


  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -250, behavior: "smooth" })
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 250, behavior: "smooth" })
  //  useEffect(() => {
  //   const scrollContainer = scrollRef.current
  //   if (!scrollContainer) return

  //   const scrollStep = 1 // pixels per frame
  //   const scrollSpeed = 10 // ms per frame (~2 sec per card)

  //   const scroll = () => {
  //     if (!scrollContainer) return
  //     scrollContainer.scrollLeft += scrollStep

  //     // when halfway (since instruments are duplicated), reset back to start
  //     if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
  //       scrollContainer.scrollLeft = 0
  //     }
  //   }

  //   const interval = setInterval(scroll, scrollSpeed)
  //   return () => clearInterval(interval)
  // }, [])


  return (
    <main className="min-h-screen flex flex-col bg-black text-white">
      {/* Navbar */}
     <Header />



      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center text-center px-6 py-20 bg-cover bg-center relative min-h-screen"
        style={{ backgroundImage: "url('/images/Home-page-banner.1.png')",backgroundSize: "cover",
  backgroundPosition: "center", }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/0"></div>

        {/* Hero content */}
        <div className="relative z-10 mt-20">
          <h2 className="text-4xl md:text-6xl mb-4 leading-tight">
  <span className="font-thin text-white">FIND YOUR </span>
  <span className="font-bold text-white">RIGHT</span>
  <br />
  <span className="text-red-500 font-normal">MUSIC TEACHER</span>
</h2>

          <p className="text-lg text-gray-300 mb-10">
            Your Budget, Your Location, Your Teacher
          </p>

          {/* Transparent Search Bar */}
          {/* Transparent Search Bar */}
<div className="flex items-center justify-between bg-white/30 rounded-full border-2 border-white/70 shadow-lg overflow-hidden w-full max-w-xl mx-auto">
  {/* Instrument Input */}
  <div className="flex items-center px-4 py-3 w-1/2">
    <Music2 className="w-5 h-5 text-white mr-2" />
    <input
      type="text"
      placeholder="Instrument"
      className="bg-transparent text-white placeholder-gray-200 outline-none w-full"
    />
  </div>

  {/* Location Input */}
  <div className="flex items-center px-4 py-3 w-1/2">
    <MapPin className="w-5 h-5 text-white mr-2" />
    <input
      type="text"
      placeholder="Location"
      className="bg-transparent text-white placeholder-gray-200 outline-none w-full"
    />
  </div>

  {/* Search Button */}
  <button className="bg-white text-black font-semibold px-6 py-2 rounded-full mr-1 shadow-md hover:bg-gray-100 transition">
    Search
  </button>
</div>


          {/* Transparent Instrument Carousel */}
          <div className="mt-12 flex items-center gap-4">
            <button
              onClick={scrollLeft}
              className="p-2 bg-white/75 text-black rounded-full shadow hover:bg-white/30 backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div
  ref={scrollRef}
  className="flex gap-4 overflow-x-scroll no-scrollbar px-4 py-2 bg-white/50 backdrop-blur-sm  text-black rounded-full shadow-lg scroll-smooth w-[800px] border border-white/20"
>
  {[...instruments, ...instruments].map((inst, i) => (
    <div key={i} className="flex flex-col items-center min-w-[80px]">
      <img
        src={inst.image}
        alt={inst.name}
        className="h-10 w-10 object-contain mb-2 transition-transform duration-200 hover:scale-110 hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
      />
      <span className="text-sm font-medium">{inst.name}</span>
    </div>
  ))}
</div>


            <button
              onClick={scrollRight}
              className="p-2 bg-white/75 text-black rounded-full shadow hover:bg-white/30 backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        
      </section>
      {/* OUR TEACHERS Section */}
<section className="py-14 bg-white text-center" id="our-teachers">
  <h2 className="text-5xl font-semibold mb-12 text-black">OUR TEACHERS</h2>

  <div className="flex flex-wrap justify-center gap-10 px-10">
    {[
      { name: "SHAMEER MOHAMMED", instruments: "Piano, Guitar", location: "Online", img: "/images/teachers/carissa-profile.png" },
      { name: "SHASHI SUTAR", instruments: "Guitar, Keyboard", location: "Mumbai, Online", img: "/images/teachers/prakriti-profile.png" },
      { name: "SUKHENDU CHAKRABORTY", instruments: "Guitar, Piano, Keyboard", location: "Kolkata, Online", img: "/images/teachers/tryphosa-profile.png" },
      { name: "TRYPHOSA JADHAV", instruments: "Keyboard, Guitar", location: "Bangalore, Online", img: "/images/teachers/carissa-profile.png" },
    ].map((teacher, i) => (
      <div
        key={i}
        className="w-60 bg-white rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
      >
        <img
          src={teacher.img}
          alt={teacher.name}
          className="rounded-t-2xl w-full h-60 object-cover"
        />
        <div className="p-4 text-left">
          <h3 className="font-bold text-black text-lg">{teacher.name}</h3>
          <p className="text-red-500 text-sm mt-1">
            {teacher.instruments} | {teacher.location}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>

{/* Red Information Section */}
<section className="relative bg-[#E3342F] text-white h-[700px] flex items-start justify-start px-20 pt-16">
  <div className="max-w-3xl text-left">
    <h2 className="text-[2.6rem] md:text-[2.7rem] font-semibold leading-snug">
      MAESTERA ISN’T YOUR REGULAR
      <br />
      MUSIC EDUCATION PLATFORM
    </h2>
    <p className="text-lg md:text-[1.9rem] font-semibold mt-1">
      Here's How Its Limitless
    </p>
     <img
      src="/images/Vector-70.png"
      alt="Curved line"
      className="absolute left-40 top-[270px] w-[500px] md:w-[400px] opacity-90"
    />
  </div>
  <p className="absolute bottom-40 right-40 text-base md:text-[1.7rem] font-normal text-left max-w-xl leading-normal">
    Get Matched With Expert Teachers
    <br />
    Based On Your Goals, Style, And Budget
    <br />
    For A Truly Personalized Experience.
  </p>
</section>
{/* Floating White Stats Section */}
<section className="relative z-20 flex justify-center">
  <div className="bg-white shadow-xl py-2 px-8 md:px-12 flex flex-col md:flex-row items-stretch justify-between max-w-6xl w-[90%] -mt-20">
    
    {/* Teachers */}
    <div className="flex items-center justify-center w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-300 py-6">
      <img src="/images/teacher-icon.svg" alt="Teachers" className="w-18 h-18 mr-12" />
      <div className="text-left">
        <h3 className="text-6xl font-medium text-[#E3342F] leading-none">66+</h3>
        <p className="text-2xl font-semibold text-black mt-1">Teachers</p>
      </div>
    </div>

    {/* Instruments */}
    <div className="flex items-center justify-center w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-300 py-6">
      <img src="/images/instrument-icon.svg" alt="Instruments" className="w-18 h-18 mr-4" />
      <div className="text-left">
        <h3 className="text-6xl font-medium text-[#E3342F] leading-none">15+</h3>
        <p className="text-2xl font-semibold text-black mt-1">Instruments</p>
      </div>
    </div>

    {/* Cities */}
    <div className="flex items-center justify-center w-full md:w-1/3 py-6">
      <img src="/images/city-icon.svg" alt="Cities" className="w-18 h-18 mr-4" />
      <div className="text-left">
        <h3 className="text-6xl font-medium text-[#E3342F] leading-none">17+</h3>
        <p className="text-2xl font-semibold text-black mt-1">Cities</p>
      </div>
    </div>

  </div>
</section>


<section className="relative bg-black text-white py-20 px-10 flex flex-col items-center overflow-hidden">
  {/* Heading */}
  <h2 className="text-4xl md:text-5xl font-bold text-center mb-24">
    HOW IT WORKS
  </h2>

  {/* Dashed curved line (background) */}
  <img
    src="/images/process-line-2-6.png"
    alt="Curved dashed line"
    className="absolute top-[220px] left-1/2 -translate-x-1/2 w-[90%] md:w-[95%] opacity-90"
  />

  {/* Steps */}
  <div className="relative flex flex-col md:flex-row items-center justify-between w-full max-w-6xl z-10 gap-20 md:gap-12">
    {/* Step 1 */}
    <div className="flex flex-col items-center text-center max-w-sm md:relative md:-translate-y-12">
      <div className="group bg-[#E3342F] p-7 rounded-full mb-6 transition-all duration-300 hover:bg-white">
        <img
          src="/images/people-team.png"
          alt="Teacher"
          className="w-12 h-12 transition-all duration-300 group-hover:filter group-hover:invert"
        />
      </div>
      <h3 className="text-2xl font-extrabold mb-3">Find Your Music Teacher</h3>
      <p className="text-gray-300 text-[1.2rem] text-base">
        Browse our teacher list or sign up—we’ll match you with the right music teacher based on your goals and preferences.
      </p>
    </div>

    {/* Step 2 */}
    <div className="flex flex-col items-center text-center max-w-sm md:relative md:translate-y-0">
      <div className="group bg-[#E3342F] p-7 rounded-full mb-6 transition-all duration-300 hover:bg-white">
        <img
          src="/images/thumb-up.png"
          alt="Schedule"
          className="w-12 h-12 transition-all duration-300 filter invert group-hover:filter-none"
        />
      </div>
      <h3 className="text-2xl font-extrabold mb-3">Choose Your Mode & Schedule</h3>
      <p className="text-gray-300 text-[1.2rem] text-base">
        Pick between online or in-person lessons and set a time that works for you. We handle the logistics, so you don’t have to.
      </p>
    </div>

    {/* Step 3 */}
    <div className="flex flex-col items-center text-center max-w-sm md:relative md:translate-y-4">
      <div className="group bg-[#E3342F] p-7 rounded-full mb-6 transition-all duration-300 hover:bg-white">
        <img
          src="/images/music-icon.png"
          alt="Learning"
          className="w-12 h-12 transition-all duration-300 group-hover:filter group-hover:invert"
        />
      </div>
      <h3 className="text-2xl font-extrabold mb-3">Start Learning</h3>
      <p className="text-gray-300 text-[1.2rem] text-base">
        Join your lesson—virtually or in person—and begin your personalized music journey with expert guidance in any instrument or genre.
      </p>
    </div>
  </div>


</section>


<section className="relative bg-white text-black py-12 px-6 md:px-12 overflow-hidden">
  <div className="quote-backdrop absolute inset-0" aria-hidden="true"></div>

  <div className="relative z-10 max-w-6xl mx-auto text-center">
    <h2 className="text-[2.4rem] md:text-[3.0rem] font-bold tracking-wide mb-10">WALL OF WINS</h2>

    <div className="relative flex items-center justify-center">
      {/* Outer left red chevron */}
      <button
        onClick={showPrevTestimonial}
        aria-label="Previous testimonial"
        className="arrow-btn mr-3 hidden md:flex"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      

      <div className="w-[800px] md:w-[1000px] flex flex-col items-center">
        <p className="text-xl md:text-[1.4rem] leading-none md:leading-[2.2rem] font-medium text-[#0a0a0a] text-center">
          {testimonials[testimonialIndex].quote}
        </p>
        <p className="mt-10 text-3xl md:text-4xl font-semibold text-[#E3342F]">
          {testimonials[testimonialIndex].author}
        </p>
      </div>


      {/* Outer right red chevron */}
      <button
        onClick={showNextTestimonial}
        aria-label="Next testimonial"
        className="arrow-btn ml-3 hidden md:flex"
      >
        <ChevronRight className="w-7 h-7" />
      </button>
    </div>
  </div>
</section>


    </main>
  )
}
