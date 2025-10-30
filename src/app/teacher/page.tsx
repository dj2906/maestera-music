"use client";

import Header from "../components/Header";
import { FaMapMarkerAlt, FaMusic, FaClock } from "react-icons/fa";
import { useState } from "react";



export default function TeacherProfile() {
    const [active, setActive] = useState("10");
  return (
    <div className="w-full bg-white text-black">

      {/* Header Navbar */}
      <Header />

      {/* Black Top Hero Section */}
<section className="bg-black text-white pt-3 pb-10">
  <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">

    {/* Profile Photo */}
    <div className="flex-shrink-0">
      <img
        src="/images/teachers/prakriti-profile.png"
        alt="Yaashvi Kedia"
        className="w-64 h-64 rounded-full object-cover shadow-xl border-4 border-white"
      />
    </div>

    {/* Profile Info */}
    <div>
      <h1 className="text-4xl font-bold tracking-wide">YAASHVI KEDIA</h1>
      <p className="text-xl text-red-500 mt-2 font-semibold">
        Conductor & Pianist
      </p>

      <div className="flex items-center gap-3 text-gray-300 mt-3">
        <FaMapMarkerAlt />
        <p>Mumbai, Online</p>
      </div>

      <div className="bg-red-600 text-white rounded-full px-6 py-3 mt-6 inline-block font-medium hover:bg-red-700 cursor-pointer transition-all">
        Book Free Demo Class
      </div>
    </div>

  </div>
</section>


      {/* Teaching Style */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-4">Teaching Style</h2>
          <p className="text-gray-700 leading-relaxed">
            I focus on understanding music, not just playing notes. My lessons help
            you build strong foundations, listening skills, and confidence, so you
            can enjoy music, interpret pieces, and grow independently.
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            Hi, I’m Yaashvi. I help students enjoy music, build confidence, and
            learn piano, theory, and conducting step by step. My goal is to make
            learning clear, practical, and fun.
          </p>
        </div>
      </section>

      {/* What You Will Learn */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">What You Will Learn</h2>
          <ul className="space-y-3 text-gray-800 text-lg">
            <li>• Piano (Western classical) → Confident performance</li>
            <li>• Music theory & ear training → Deep understanding</li>
            <li>• Conducting → Lead choirs & orchestras</li>
            <li>• Ensemble performance → Teamwork & collaboration</li>
            <li>• Musical interpretation & expression → Personal style</li>
          </ul>
        </div>
      </section>

      {/* Experience */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Experience</h2>
          <ul className="space-y-3 text-gray-800 text-lg">
            <li>• Conductor, City Montessori School, Lucknow</li>
            <li>• Co-Director, Middlesex Chamber Orchestra, London</li>
            <li>• Concert for Friendship, Chennai</li>
          </ul>
        </div>
      </section>

      {/* Pricing + Years */}
      <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 text-lg font-semibold">
        <div className="flex gap-3 items-center">
          <FaMusic className="text-red-600" />
          <p>₹1,000/hr</p>
        </div>
        <div className="flex gap-3 items-center">
          <FaClock className="text-red-600" />
          <p>5 years of experience</p>
        </div>
      </div>

      {/* Education */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Education & Training</h2>
          <ul className="space-y-3 text-gray-800 text-lg">
            <li>• B.A. Music (Classical), Middlesex University, London</li>
            <li>• Diploma in Music, KM Music Conservatory, Chennai</li>
            <li>• Workshops & conducting mentorship with leading conductors</li>
          </ul>
        </div>
      </section>

      {/* Learning Outcomes */}
<section className="py-12 bg-white">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-2xl font-bold mb-10">Learning Outcomes</h2>

    {/* Tabs */}
    <div className="grid grid-cols-3 border-b border-gray-300 text-center">
      {["10", "20", "36"].map((num) => (
        <button
          key={num}
          onClick={() => setActive(num)}
          className={`
            pb-3 text-xl font-semibold transition
            ${active === num ? "text-red-600 border-b-4 border-red-600" : "text-gray-700"}
          `}
        >
          {num} Sessions
        </button>
      ))}
    </div>

    {/* Content */}
    <div className="mt-8">
      <ul className="space-y-4 text-gray-800 text-lg leading-relaxed">
        {active === "10" && (
          <>
            <li className="flex gap-3"><span className="mt-2 w-2 h-2 bg-black rounded-full"></span>Read music notes & rhythm basics</li>
            <li className="flex gap-3"><span className="mt-2 w-2 h-2 bg-black rounded-full"></span>Correct posture & hand shape</li>
            <li className="flex gap-3"><span className="mt-2 w-2 h-2 bg-black rounded-full"></span>Play simple beginner pieces</li>
            <li className="flex gap-3"><span className="mt-2 w-2 h-2 bg-black rounded-full"></span>Basic music interpretation</li>
          </>
        )}

        {active === "20" && (
          <>
            <li className="flex gap-3"><span className="mt-2 w-2 h-2 bg-black rounded-full"></span>Confident beginner level pieces</li>
            <li className="flex gap-3"><span className="mt-2 w-2 h-2 bg-black rounded-full"></span>Improved sight-reading & rhythm</li>
            <li className="flex gap-3"><span className="mt-2 w-2 h-2 bg-black rounded-full"></span>Better listening and coordination</li>
            <li className="flex gap-3"><span className="mt-2 w-2 h-2 bg-black rounded-full"></span>Expressive playing with dynamics</li>
          </>
        )}

        {active === "36" && (
          <>
            <li className="flex gap-3"><span className="mt-2 w-2 h-2 bg-black rounded-full"></span>Play more challenging pieces</li>
            <li className="flex gap-3"><span className="mt-2 w-2 h-2 bg-black rounded-full"></span>focus on interpretation & phrasing,</li>
            <li className="flex gap-3"><span className="mt-2 w-2 h-2 bg-black rounded-full"></span>strengthen technique, read</li>
            <li className="flex gap-3"><span className="mt-2 w-2 h-2 bg-black rounded-full"></span>express music confidently</li>
          </>
        )}
      </ul>
    </div>
  </div>
</section>


      {/* CTA Section */}
      <section className="bg-red-600 text-white py-8 text-center">
        <h2 className="text-3xl font-bold">Book Your Free 30-Minute Demo</h2>
        <button className="mt-6 bg-black text-white px-12 py-3 rounded-full font-semibold hover:opacity-90 transition">
          Get in Touch
        </button>
      </section>
    </div>
  );
}
