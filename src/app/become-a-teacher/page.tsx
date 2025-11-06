"use client"

import Header from "../components/Header"
import { useEffect, useState } from "react"

export default function BecomeTeacher() {
  const [gifIndex, setGifIndex] = useState(0)
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  const teachers = [
    { id: 1, name: "Amritha Rajesh Chelat", image: "/images/teachers/carissa-profile.png" },
    { id: 2, name: "CH Eshwar", image: "/images/teachers/carissa-profile.png" },
    { id: 3, name: "Naveena S", image: "/images/teachers/carissa-profile.png" },
    { id: 4, name: "Aditya Ganesh", image: "/images/teachers/carissa-profile.png" },
    { id: 5, name: "Prakriti Pandey", image: "/images/teachers/carissa-profile.png" },
    { id: 6, name: "Aastha Mohapatra", image: "/images/teachers/carissa-profile.png" },
  ]

  const gifs = [
    {
      src: "/images/become-a-teacher/gif/Decide-Your-Own-Pricing-black.gif",
      title: "PERSONALIZED LEARNING EXPERIENCE",
      description:
        "Your lessons are tailored to your instrument, genre, budget, location, and schedule—music that fits your life.",
    },
    {
      src: "/images/become-a-teacher/gif/Diverse-Opportunities-black.gif",
      title: "DIVERSE OFFERINGS",
      description:
        "Learn everything from piano and trumpet to DJing, production, and composition—all in one place.",
    },
    {
      src: "/images/become-a-teacher/gif/Flexibility-Black.gif",
      title: "FOR ALL SKILL LEVELS",
      description:
        "Whether you're starting out or refining your craft, Maestera connects you with the right teacher.",
    },
    {
      src: "/images/become-a-teacher/gif/Global-Reach-black.gif",
      title: "GLOBAL AND LOCAL ACCESS",
      description:
        "Find teachers near you or around the world—wherever you prefer to learn.",
    },
    {
      src: "/images/become-a-teacher/gif/Personalized-Matches-black.gif",
      title: "HOLISTIC AND INCLUSIVE APPROACH",
      description:
        "Explore performance, theory, and genres from Indian classical to jazz and experimental music.",
    },
    {
      src: "/images/become-a-teacher/gif/Supportive-Community-black.gif",
      title: "SUPPORT EVERY STEP OF THE WAY",
      description:
        "Can't find a teacher? We'll personally help match you with one who fits your needs.",
    },
  ]

  const testimonials = [
    {
      text: "Maestera is a fantastic platform where we can connect with like minded teachers. We can follow our interests and get connected to the right teacher. I learnt western singing from Pravalikaa and Carnatic singing from Arvindh Sithu. Both of them were very experienced teachers and I have improved my singing from them.",
      name: "Saatvik Sannuthi",
    },
    {
      text: "It's been an absolute joy learning with Freya at Maestera. We've been working through the fundamentals and refining my vocal technique, and I’m seeing real progress. Freya is knowledgeable, supportive, and easy to work with.",
      name: "Rhea Jain",
    },
  ]

  // Auto-scroll GIFs
  useEffect(() => {
    const interval = setInterval(() => {
      setGifIndex((prev) => (prev + 1) % 4)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className="w-full text-white bg-black">
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
            style={{ textShadow: "4px 4px 0 rgba(0,0,0,0.8)" }}
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

      {/* Everything below hero is black */}
      <section className="w-full bg-black text-white px-6 md:px-12 pt-20 pb-20 relative">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wide px-8 text-left">
          YOUR PLATFORM,
          <span className="text-red-600 ml-2 font-bold drop-shadow-[3px_3px_0px_rgba(0,0,0,0.6)]">
            YOUR RULES
          </span>
        </h2>

        <p className="mt-8 text-lg md:text-[1.9rem] font-bold leading-relaxed px-8 text-left">
          At Maestera, we believe that teachers thrive when they have<br />
          the{" "}
          <span className="bg-red-600 text-white px-2 py-1">
            freedom to teach their way.
          </span>{" "}
          Whether it’s your field of expertise, teaching style, schedule, or pricing,
          you’re in control.<br />
          We simply provide the platform to connect.
        </p>

        <h1 className="mt-16 text-3xl md:text-[6.5rem] font-bold text-white/50 tracking-wide text-center">
          TEACHERS
        </h1>

        {/* Randomly placed teacher cards */}
        <div className="relative w-full h-[1500px] mt-20">
          {teachers.map((teacher, index) => (
            <div
              key={index}
              className="absolute flex flex-col items-center text-center transition-transform duration-300 hover:scale-105"
              style={{
                top: ["10%", "20%", "40%", "60%", "80%", "95%"][index],
                left: ["25%", "65%", "45%", "75%", "35%", "55%"][index],
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-3xl shadow-lg"
              />
              <h3 className="text-lg font-semibold text-white mt-3">{teacher.name}</h3>
            </div>
          ))}
        </div>

        <h1 className="mt-28 text-3xl md:text-[6.0rem] font-bold text-white/50 tracking-wide text-center">
          WHY JOIN MAESTERA?
        </h1>

        {/* GIF Section */}
        <div className="relative mt-16 overflow-hidden">
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
                  <p className="text-sm md:text-lg text-gray-400 leading-relaxed">
                    {gif.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TESTIMONIALS SECTION */}
        {/* TESTIMONIALS SECTION */}
<section className="bg-black text-white mt-8 text-center py-8 px-2 md:px-4 relative overflow-hidden">
  <h1 className="text-3xl md:text-[6.6rem] font-bold text-white/50 tracking-wide text-center">
    TESTIMONIALS
  </h1>

  {/* Fixed-height container to prevent jumping */}
  <div className="max-w-4xl mx-auto py-16 relative transition-all duration-700 ease-in-out h-[380px] flex flex-col justify-center items-center">
    <div className="transition-opacity duration-700 ease-in-out text-center">
      <p className="text-xl md:text-2xl leading-relaxed mb-6 italic text-white/90">
        “{testimonials[testimonialIndex].text}”
      </p>
      <h4 className="text-xl font-semibold text-red-500">
        — {testimonials[testimonialIndex].name}
      </h4>
    </div>
  </div>
</section>


        {/* FAQ SECTION */}
        <section className="w-full bg-black text-white px-6 md:px-6 pt-12 pb-4">
          <h1 className="text-center text-3xl md:text-5xl font-bold tracking-wide mb-16">
            FREQUENTLY ASKED QUESTIONS <span className="text-red-600">»</span>
          </h1>

          <FAQItem
            question="Who Can Join As A Music Teacher?"
            answer="Anyone with proficiency in teaching a musical instrument, vocals, or music theory and a passion for sharing their knowledge can join. Whether you're a certified instructor, a professional musician, or an experienced performer, we'd love to have you on board."
          />

          <FAQItem
  question="How Do I Sign Up As A Teacher?"
  answer={
    <>
      Signing up is easy! Create a profile on our website by providing your personal details, musical expertise, teaching experience, availability, and preferred teaching format (online, in-person, or both). Once approved, you'll be ready to connect with students.{" "}
      <a
        href="https://maestera-onboarding.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white font-semibold px-1 py-1 rounded-full ml-1 transition"
      >
        "sign up"
      </a>
      .
    </>
  }
/>


          <FAQItem
            question="Do I Need Prior Teaching Experience?"
            answer="Teaching experience is helpful but not mandatory. If you are skilled, passionate, and committed to helping students learn, you're welcome at Maestera."
          />

          <FAQItem
            question="Can I Teach Online Or In Person?"
            answer="You can choose either format or both. Maestera supports teachers who want to teach online, in-person, or in a hybrid model."
          />
        </section>
      </section>
    </div>
  )
}

// ===== FAQ COMPONENT =====
function FAQItem({
  question,
  answer,
}: {
  question: string
  answer: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-[#222] text-left px-6 py-6 rounded-lg flex justify-between items-center text-xl md:text-2xl font-semibold"
      >
        <span>{question}</span>
        <span className="text-3xl">{open ? "–" : "+"}</span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ${
          open ? "max-h-[300px] opacity-100 py-6" : "max-h-0 opacity-0"
        } bg-[#111] px-6 rounded-b-lg text-lg md:text-xl`}
      >
        {answer}
      </div>
    </div>
  )
}
