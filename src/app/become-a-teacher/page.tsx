"use client"

import Header from "../components/Header"

export default function BecomeTeacher() {
  return (
    <div className="w-full bg-white text-black">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center text-center px-6 py-20 bg-cover bg-center relative min-h-screen"
        style={{
          backgroundImage: "url('/images/become-a-teacher/become-teacher.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="translate-y-10">
          <h1 className="text-white text-3xl md:text-5xl font-bold tracking-widest leading-snug">
            INSPIRE THE NEXT
          </h1>

          <h2
            className="text-red-600 text-5xl md:text-5xl font-bold tracking-widest leading-snug mt-3"
            style={{
              textShadow: "4px 4px 0 rgba(0,0,0,0.8)",
            }}
          >
            GENERATION OF MUSICIANS
          </h2>

          <a
            href="https://maestera-onboarding.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block bg-white text-black font-semibold px-8 py-3 rounded-full shadow-md transition hover:bg-gray-200"
          >
            Sign Up
          </a>
        </div>
      </section>

      {/* Black Section */}
      <section className="w-full bg-black text-white px-6 md:px-20 py-18">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-left">
          YOUR PLATFORM,
          <span className="text-red-600 ml-2 font-bold drop-shadow-[3px_3px_0px_rgba(0,0,0,0.6)]">
            YOUR RULES
          </span>
        </h2>

        <p className="mt-8  text-lg md:text-[1.9rem] font-bold leading-relaxed text-left">
          At Maestera, we believe that teachers thrive when they have<br></br> the{" "}
          <span className="bg-red-600 text-white px-2 py-1">
            freedom to teach their way.
          </span>{" "}
          Whether it’s your field of expertise, teaching style, schedule, or pricing, you’re in
          control.<br></br> We simply provide the platform to connect.
        </p>
<h1 className="mt-12 text-3xl md:text-[6.5rem] font-bold text-white/50 tracking-wide text-center">TEACHERS</h1>

      </section>

    </div>
  )
}
