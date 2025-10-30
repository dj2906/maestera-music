"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import Header from "../components/Header"
import FAQItem from "../components/FAQItem"


export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [userType, setUserType] = useState("student")

  return (
    <main className="relative min-h-screen bg-black text-white">
      <Header />

      {/* Background Image Section */}
      <section
        className="relative bg-white"
        style={{ 
          backgroundImage: "url('/images/Faq/faq-banner-1.png')",
          backgroundSize: "contain",
          backgroundPosition: "top ",
          backgroundRepeat: "no-repeat",
          height: "auto",
          minHeight: "400px",
          paddingTop: "42%" /* This maintains the image's aspect ratio */
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/0"></div>

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
          <h1 className="text-2xl md:text-4xl mb-8 leading-tight font-bold">
            FREQUENTLY ASKED QUESTIONS
          </h1>

          {/* Translucent Search Bar */}
          <div className="flex items-center justify-center max-w-4xl mx-auto w-full px-4">
            <div className="relative w-full">
              <div className="flex items-center bg-white/40 rounded-full border border-white/50 shadow-lg overflow-hidden">
                <div className="flex items-center px-6 py-4 w-full">
                  <Search className="w-6 h-6 text-white mr-4" />
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-white placeholder-gray-300 outline-none w-full text-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* White Content Section */}
      <section className="bg-white text-black py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-12">
<div className="flex justify-center mb-12">
  <div className="flex relative">

    {/* Student */}
    <button
      onClick={() => setUserType("student")}
      className={`
        px-15 py-[18px] font-extrabold text-2xl tracking-wide transition-all duration-300
        rounded-[20px] border border-white/80
        ${userType === "student"
          ? "bg-black text-white z-20"
          : "bg-red-300 text-white/90 z-10 -mr-6"
        }
      `}
    >
      Student
    </button>

    {/* Teacher */}
    <button
      onClick={() => setUserType("teacher")}
      className={`
        px-15 py-[18px] font-extrabold text-2xl tracking-wide transition-all duration-300
        rounded-[20px] border border-white/80
        ${userType === "teacher"
          ? "bg-red-600 text-white z-20"
          : "bg-black/50 text-white/90 z-10 -ml-6"
        }
      `}
    >
      Teacher
    </button>

  </div>
</div>



</div>


          {/* FAQ Content based on user type */}
          <div className="space-y-8">
            {userType === 'student' ? (
  <>

    <div className="space-y-4">
      <FAQItem
        question="1. How do I find a music teacher on this platform?"
        answer="You can discover teacher on our website by browsing through our existing list of teacher, which is constantly being updated with new additions. If you're having trouble selecting a teacher or need guidance, you can fill out our form and we'll help match you with a suitable teacher. Alternatively, you can reach out to us directly via email, social media, or through our contact form, and we'll be happy to assist you in finding a teacher that meets your needs."
      />
      <FAQItem
        question="2. What instruments and areas of music-making can I learn on Maestera?"
        answer="We offer a wide variety of music programs including..."
      />
      <FAQItem
        question="3. What age group is Maestera suitable for?"
        answer="Maestera welcomes learners of all ages..."
      />
      {/* Add more FAQs here */}
    </div>
  </>
) : (
  <>  

    <div className="space-y-4">
      <FAQItem
        question="How do I become a teacher?"
        answer="You can sign up and apply through our platform..."
      />
      {/* Add more Teacher FAQs */}
    </div>
  </>
)}

          </div>
        </div>
      </section>
    </main>
  )
}
