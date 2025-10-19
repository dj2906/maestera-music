"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import Header from "../components/Header"

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <main className="relative min-h-screen bg-black text-white">
      <Header />

      {/* Background Image Section */}
      <section
        className="relative h-[60vh] bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/images/Faq/faq-banner-1.png')",
          backgroundSize: "100% auto",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat"
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
          <div className="flex items-center justify-center max-w-2xl mx-auto">
            <div className="relative w-full">
              <div className="flex items-center bg-white/40  rounded-full border border-white/50 shadow-lg overflow-hidden">
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">FAQ Content</h2>
          <p className="text-lg text-gray-700 text-center">
            This is where your FAQ content will go. Add your frequently asked questions and answers here.
          </p>
        </div>
      </section>
    </main>
  )
}
