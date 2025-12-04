"use client"

import { useRef } from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { Search, MapPin, Music2, ChevronLeft, ChevronRight } from "lucide-react"
import Header from "./components/Header"
import TeacherCarousel from "./components/TeacherCarousel"
import InstrumentCarousel from "./components/InstrumentCarousel"




/** One vertical column that scrolls digits 0–9 multiple times, then lands on target */
/** One vertical column that scrolls digits 0–9 multiple times, then lands on target */
function DigitColumn({
  digit,
  loops = 2,            // how many full 0..9 spins before landing
  duration = 2200,       // ms (slower = higher)
  delay = 0,             // ms
  play = false,          // start animation
}: {
  digit: number;
  loops?: number;
  duration?: number;
  delay?: number;
  play?: boolean;
}) {
  // number of printed rows: loops * 10 (full 0..9 cycles) + final 0..digit stack length
  const totalRows = 10 * loops + (digit % 10) + 1; // printed rows count
  // To land exactly on the final digit, we should translate by (totalRows - 1) em
  const translateRows = Math.max(0, totalRows - 1);

  return (
    <span
      className="relative inline-block h-[1em] w-[0.6em] overflow-hidden align-baseline tabular-nums"
      style={{ lineHeight: "1em" }}
    >
      <span
        className="block will-change-transform"
        style={{
          transform: play
            ? `translateY(-${translateRows}em)`
            : `translateY(0)`,
          transition: play
            ? `transform ${duration}ms cubic-bezier(.2,.8,.2,1) ${delay}ms`
            : "none",
        }}
      >
        {/* print 0–9 repeated 'loops' times + final stack that includes target digit */}
        {[...Array(loops)].map((_, li) => (
          <span key={`loop-${li}`} className="block">
            {Array.from({ length: 10 }, (_, n) => (
              <span key={`${n}-${li}`} className="block h-[1em]">
                {n}
              </span>
            ))}
          </span>
        ))}
        {/* final stack 0..digit */}
        <span className="block">
          {Array.from({ length: (digit % 10) + 1 }, (_, n) => (
            <span key={`final-${n}`} className="block h-[1em]">
              {n}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}


/** Odometer that splits number into columns; triggers on view; supports stagger */
function OdometerOnView({
  end,
  minDigits = 2,
  duration = 2200,
  baseDelay = 0,        // delay before the whole odometer starts
  digitStagger = 80,    // extra delay per digit (rightmost spins a bit earlier)
  loopsPerDigit = 2,    // you can pass array too
  suffix = "+",
  className = "",
}: {
  end: number;
  minDigits?: number;
  duration?: number;
  baseDelay?: number;
  digitStagger?: number;
  loopsPerDigit?: number | number[];
  suffix?: string | null;
  className?: string;
}) {
  const [play, setPlay] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries, o) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            // start after baseDelay
            const to = setTimeout(() => setPlay(true), baseDelay);
            o.unobserve(e.target);
            // cleanup
            return () => clearTimeout(to);
          }
        });
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [baseDelay]);

  // digits (left padded)
  const s = String(end);
  const padded = s.padStart(minDigits, "0");
  const digits = padded.split("").map((d) => parseInt(d, 10));

  // Loops config per digit (slightly more spins for left digits feels nicer)
  const loopsArray =
    Array.isArray(loopsPerDigit)
      ? loopsPerDigit
      : digits.map((_, i) => Math.max(2, (loopsPerDigit as number) + (digits.length - i - 1)));

  return (
    <span ref={ref} className={`inline-flex items-baseline ${className}`}>
      {digits.map((d, i) => (
        <DigitColumn
          key={i}
          digit={d}
          loops={loopsArray[i]}
          duration={duration}
          delay={digitStagger * (digits.length - i - 1)} // left digits start slightly later
          play={play}
        />
      ))}
      {suffix ? <span className="ml-1">{suffix}</span> : null}
    </span>
  );
}


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
        style={{
          backgroundImage: "url('/images/Home-page-banner.1.png')", backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/0"></div>

        {/* Hero content */}
        <div className="relative z-10 mt-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl mb-4 leading-tight"
          >
            <span className="font-thin text-white">FIND YOUR </span>
            <span className="font-bold text-white">RIGHT</span>
            <br />
            <span className="text-red-500 font-normal">MUSIC TEACHER</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-300 mb-10"
          >
            Your Budget, Your Location, Your Teacher
          </motion.p>

          {/* Transparent Search Bar */}
          {/* Transparent Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-between bg-white/30 rounded-full border-2 border-white/70 shadow-lg overflow-hidden w-full max-w-xl mx-auto"
          >
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
          </motion.div>


          {/* Transparent Instrument Carousel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-12 flex items-center justify-center gap-4 w-full"
          >
            <InstrumentCarousel />
          </motion.div>
        </div>

      </section>
      {/* OUR TEACHERS Section */}
      <section className="py-14 bg-white text-center" id="our-teachers">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-semibold mb-12 text-black"
        >
          OUR TEACHERS
        </motion.h2>

        <div className="flex justify-center">
          {/* 
            Container width calculation:
            Card width: w-60 = 15rem = 240px
            Gap: gap-10 = 2.5rem = 40px
            Visible area for 4 cards: (240 * 4) + (40 * 3) = 960 + 120 = 1080px
            Actually, to make the slide math easy (stride = 280px), let's assume the container shows 4 full strides.
            4 * 280 = 1120px.
            We'll set a max-width to clip the overflow.
          */}
          <div className="relative overflow-hidden w-full max-w-[1080px]">
            <TeacherCarousel />
          </div>
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
            Here&apos;s How Its Limitless
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
            <img src="/images/teacher-icon.svg" alt="Teachers" className="w-[72px] h-[72px] mr-6 md:mr-12" />
            <div className="text-left">
              <h3 className="text-6xl font-medium text-[#E3342F] leading-none">
                <OdometerOnView
                  end={66}
                  minDigits={2}
                  duration={2400}      // slower
                  baseDelay={0}        // starts first
                  digitStagger={90}
                  loopsPerDigit={2}
                />
              </h3>
              <p className="text-2xl font-semibold text-black mt-1">Teachers</p>
            </div>
          </div>

          {/* Instruments */}
          <div className="flex items-center justify-center w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-300 py-6">
            <img src="/images/instrument-icon.svg" alt="Instruments" className="w-[72px] h-[72px] mr-6 md:mr-4" />
            <div className="text-left">
              <h3 className="text-6xl font-medium text-[#E3342F] leading-none">
                <OdometerOnView
                  end={15}
                  minDigits={2}
                  duration={2400}
                  baseDelay={350}      // slight overall delay (starts second)
                  digitStagger={90}
                  loopsPerDigit={2}
                />
              </h3>
              <p className="text-2xl font-semibold text-black mt-1">Instruments</p>
            </div>
          </div>

          {/* Cities */}
          <div className="flex items-center justify-center w-full md:w-1/3 py-6">
            <img src="/images/city-icon.svg" alt="Cities" className="w-[72px] h-[72px] mr-6 md:mr-4" />
            <div className="text-left">
              <h3 className="text-6xl font-medium text-[#E3342F] leading-none">
                <OdometerOnView
                  end={17}
                  minDigits={2}
                  duration={2400}
                  baseDelay={700}      // a bit more delay (starts third)
                  digitStagger={90}
                  loopsPerDigit={2}
                />
              </h3>
              <p className="text-2xl font-semibold text-black mt-1">Cities</p>
            </div>
          </div>

        </div>
      </section>



      <section className="relative bg-black text-white py-20 px-10 flex flex-col items-center overflow-hidden">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-24"
        >
          HOW IT WORKS
        </motion.h2>

        {/* Dashed curved line (background) */}
        <img
          src="/images/process-line-2-6.png"
          alt="Curved dashed line"
          className="absolute top-[220px] left-1/2 -translate-x-1/2 w-[90%] md:w-[95%] opacity-90"
        />

        {/* Steps */}
        <div className="relative flex flex-col md:flex-row items-center justify-between w-full max-w-6xl z-10 gap-20 md:gap-12">
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center text-center max-w-sm md:relative md:-translate-y-12"
          >
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
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center text-center max-w-sm md:relative md:translate-y-0"
          >
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
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col items-center text-center max-w-sm md:relative md:translate-y-4"
          >
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
          </motion.div>
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
