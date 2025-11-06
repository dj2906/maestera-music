"use client";

import Header from "../components/Header";
import { FaMapMarkerAlt, FaMusic, FaClock } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

/** Tiny reveal-on-scroll wrapper (no external libs) */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.remove("opacity-0", "translate-y-6");
            el.classList.add("opacity-100", "translate-y-0");
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`opacity-0 translate-y-6 transition-all duration-700 ease-out ${className}`}
    >
      {children}
    </div>
  );
}

export default function TeacherProfile() {
  const [active, setActive] = useState("10");

  return (
    <div className="w-full bg-white text-black">
      {/* Header Navbar */}
      <Header />

      {/* Black Top Hero Section */}
      <section className="bg-black text-white pt-32 pb-12 relative overflow-hidden">
        {/* Soft vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 relative">
          {/* Profile Photo */}
          <Reveal className="flex-shrink-0">
            <img
              src="/images/teachers/prakriti-profile.png"
              alt="Yaashvi Kedia"
              className="w-64 h-64 rounded-full object-cover shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-4 border-white/90 hover:scale-[1.02] transition-transform duration-300"
            />
          </Reveal>

          {/* Profile Info */}
          <Reveal delay={120} className="w-full">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                YAASHVI KEDIA
              </span>
            </h1>
            <p className="text-2xl mt-2 font-semibold text-red-400/90">
              Conductor &amp; Pianist
            </p>

            <div className="flex items-center gap-3 text-gray-300 mt-4">
              <FaMapMarkerAlt />
              <p className="text-lg">Mumbai, Online</p>
            </div>

            <div className="relative mt-7 inline-block group">
              <div className="bg-red-600 text-white rounded-full px-7 py-3 font-medium hover:bg-red-500 cursor-pointer transition-all">
                Book Free Demo Class
              </div>
              {/* Shine */}
              <span className="absolute -inset-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.25),transparent)]" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* === White 3-Column Section (About / Style / What you’ll learn) === */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Me */}
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4 group inline-block">
              <span className="bg-gradient-to-r from-black to-black/60 bg-clip-text text-transparent">
                About Me
              </span>
              <span className="block h-1 w-14 bg-red-500 mt-2 rounded group-hover:w-24 transition-all duration-300" />
            </h2>
            <p className="text-[1.05rem] md:text-lg text-gray-700 leading-relaxed">
              Hi, I’m Yaashvi. I help students enjoy music, build confidence, and
              learn piano, theory, and conducting step by step. My goal is to make
              learning clear, practical, and fun.
            </p>
          </Reveal>

          {/* Teaching Style */}
          <Reveal delay={120}>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4 group inline-block">
              <span className="bg-gradient-to-r from-black to-black/60 bg-clip-text text-transparent">
                Teaching Style
              </span>
              <span className="block h-1 w-14 bg-red-500 mt-2 rounded group-hover:w-24 transition-all duration-300" />
            </h2>
            <p className="text-[1.05rem] md:text-lg text-gray-700 leading-relaxed">
              I focus on understanding music, not just playing notes. My lessons help
              you build strong foundations, listening skills, and confidence, so you
              can enjoy music, interpret pieces, and grow independently.
            </p>
          </Reveal>

          {/* What You Will Learn */}
          <Reveal delay={200}>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4 group inline-block">
              <span className="bg-gradient-to-r from-black to-black/60 bg-clip-text text-transparent">
                What You Will Learn
              </span>
              <span className="block h-1 w-14 bg-red-500 mt-2 rounded group-hover:w-24 transition-all duration-300" />
            </h2>
            <ul className="space-y-3 text-gray-900 text-[1.05rem] md:text-lg">
              {[
                "Piano (Western classical) → Play pieces you love confidently",
                "Music theory & ear training → Understand music deeply, not just notes",
                "Conducting choirs & orchestras → Experience leading and performing with others",
                "Developing ensembles → Learn collaboration and musical teamwork",
                "Interpretation & expression → Bring your own voice to every piece",
              ].map((t, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 group hover:translate-x-1 transition-transform"
                >
                  <span className="mt-[10px] w-2 h-2 rounded-full bg-red-500 group-hover:bg-black transition-colors" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* === Black 2-Column Section (Education / Experience) === */}
      <section className="bg-black text-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14">
          {/* Musical Education */}
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 group inline-block">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Musical Education
              </span>
              <span className="block h-1 w-14 bg-red-500 mt-2 rounded group-hover:w-24 transition-all duration-300" />
            </h2>
            <ul className="space-y-4 text-white/90 text-[1.05rem] md:text-lg">
              {[
                "B.A. Music (Classical), Middlesex University, London → Strong foundation for student learning",
                "Diploma in Higher Education in Music, KM Music Conservatory, Chennai → High-level training shared in lessons",
                "Conducting Mentorship & Workshops with Charlotte Corderoy, Alice Farnham, Daryl Griffith, Dr. James Bunch → Professional techniques brought into student teaching",
              ].map((t, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 group hover:translate-x-1 transition-transform"
                >
                  <span className="mt-[10px] w-2 h-2 rounded-full bg-red-500 group-hover:bg-white transition-colors" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Experience */}
          <Reveal delay={120}>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 group inline-block">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Experience
              </span>
              <span className="block h-1 w-14 bg-red-500 mt-2 rounded group-hover:w-24 transition-all duration-300" />
            </h2>
            <ul className="space-y-4 text-white/90 text-[1.05rem] md:text-lg">
              {[
                "Conductor, City Montessori School, Lucknow → Bringing professional ensemble experience to students",
                "Co-Director & Conductor, Middlesex Chamber Orchestra, London → Guiding students with real-world performance insights",
                "Concert for Friendship, Chennai → Sharing techniques from professional concerts with learners",
              ].map((t, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 group hover:translate-x-1 transition-transform"
                >
                  <span className="mt-[10px] w-2 h-2 rounded-full bg-red-500 group-hover:bg-white transition-colors" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* === Learning Outcomes (UI enhanced, logic same) === */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-10">
            Learning Outcomes
          </h2>

          {/* Tabs */}
          <div className="grid grid-cols-3 text-center relative">
            {["10", "20", "36"].map((num) => {
              const activeTab = active === num;
              return (
                <button
                  key={num}
                  onClick={() => setActive(num)}
                  className={`pb-3 text-xl md:text-2xl font-semibold transition-colors ${
                    activeTab ? "text-red-600" : "text-gray-700 hover:text-black"
                  }`}
                >
                  {num} Sessions
                  <span
                    className={`block mx-auto mt-2 h-[3px] rounded bg-red-600 transition-all duration-300 ${
                      activeTab ? "w-36" : "w-0 group-hover:w-10"
                    }`}
                  />
                </button>
              );
            })}
          </div>
          

          {/* Content */}
          <Reveal className="mt-8">
            <ul className="space-y-4 text-gray-800 text-lg md:text-xl leading-relaxed">
              {active === "10" && (
                <>
                  <li className="flex gap-3">
                    <span className="mt-2 w-2 h-2 bg-black rounded-full"></span>
                    Read music notes &amp; rhythm basics
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 w-2 h-2 bg-black rounded-full"></span>
                    Correct posture &amp; hand shape
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 w-2 h-2 bg-black rounded-full"></span>
                    Play simple beginner pieces
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 w-2 h-2 bg-black rounded-full"></span>
                    Basic music interpretation
                  </li>
                </>
              )}
              {active === "20" && (
                <>
                  <li className="flex gap-3">
                    <span className="mt-2 w-2 h-2 bg-black rounded-full"></span>
                    Confident beginner level pieces
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 w-2 h-2 bg-black rounded-full"></span>
                    Improved sight-reading &amp; rhythm
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 w-2 h-2 bg-black rounded-full"></span>
                    Better listening and coordination
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 w-2 h-2 bg-black rounded-full"></span>
                    Expressive playing with dynamics
                  </li>
                </>
              )}
              {active === "36" && (
                <>
                  <li className="flex gap-3">
                    <span className="mt-2 w-2 h-2 bg-black rounded-full"></span>
                    Play more challenging pieces
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 w-2 h-2 bg-black rounded-full"></span>
                    Focus on interpretation &amp; phrasing
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 w-2 h-2 bg-black rounded-full"></span>
                    Strengthen technique &amp; reading
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 w-2 h-2 bg-black rounded-full"></span>
                    Express music confidently
                  </li>
                </>
              )}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* === Thin Red CTA Strip === */}
      <section className="bg-red-600 text-white py-5 text-center relative overflow-hidden">
        {/* diagonal sheen */}
        <div className="pointer-events-none absolute -left-40 top-0 h-full w-40 rotate-12 bg-white/10 blur-md animate-[pulse_2.4s_infinite]" />
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <h3 className="text-xl md:text-2xl font-semibold">
            Book a Free 30-Minute Demo
          </h3>
          <button className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:scale-[1.02] hover:opacity-90 transition">
            Get in Touch
          </button>
        </div>
      </section>

      {/* === YouTube Videos Section === */}
      <section className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-8 group inline-block">
            <span className="bg-gradient-to-r from-black to-black/60 bg-clip-text text-transparent">
              Watch Performances &amp; Lessons
            </span>
            <span className="block h-1 w-14 bg-red-500 mt-2 rounded group-hover:w-24 transition-all duration-300" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["VIDEO_ID_1", "VIDEO_ID_2", "VIDEO_ID_3"].map((id) => (
              <div
                key={id}
                className="aspect-video w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${id}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
