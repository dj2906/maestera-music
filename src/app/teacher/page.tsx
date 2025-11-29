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

/** ---- Pricing + Outcomes Data ---- */
type Mode = "online" | "offline";
type Subject = "Piano" | "Theory" | "Conducting";
type Level = "beginner" | "intermediate" | "advanced";
type Sessions = "10" | "20" | "36";

const PER_SESSION: Record<
  Subject,
  Record<Level, Record<Mode, number>>
> = {
  Piano: {
    beginner: { online: 900, offline: 1100 },
    intermediate: { online: 1100, offline: 1300 },
    advanced: { online: 1300, offline: 1600 },
  },
  Theory: {
    beginner: { online: 800, offline: 950 },
    intermediate: { online: 950, offline: 1100 },
    advanced: { online: 1100, offline: 1300 },
  },
  Conducting: {
    beginner: { online: 1200, offline: 1500 },
    intermediate: { online: 1400, offline: 1700 },
    advanced: { online: 1700, offline: 2000 },
  },
};

// Optional bundle discounts
const DISCOUNT: Record<Sessions, number> = {
  "10": 0,
  "20": 0.05, // 5%
  "36": 0.1,  // 10%
};

function formatINR(n: number) {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `₹${Math.round(n).toLocaleString("en-IN")}`;
  }
}

const OUTCOMES: Record<
  Subject,
  Record<
    Level,
    Record<Sessions, string[]>
  >
> = {
  Piano: {
    beginner: {
      "10": [
        "Read notes & rhythm basics",
        "Correct posture & hand shape",
        "First simple pieces hands-together",
        "Foundations of practice routine",
      ],
      "20": [
        "Confident beginner repertoire",
        "Improved sight-reading & timing",
        "Dynamic control & articulation",
        "Play for family/friends with confidence",
      ],
      "36": [
        "Extended repertoire (graded level)",
        "Phrasing & musical expression",
        "Technique: scales, arpeggios, voicing",
        "Stage-ready performance of 2–3 pieces",
      ],
    },
    intermediate: {
      "10": [
        "Refine tone & voicing",
        "Intermediate rhythm & coordination",
        "Polish 1–2 pieces",
        "Efficient practice planning",
      ],
      "20": [
        "Expand repertoire & stylistic range",
        "Sight-reading & ear training boost",
        "Pedaling & balance across voices",
        "Mock performance run-throughs",
      ],
      "36": [
        "Advanced interpretation & rubato",
        "Complex textures & technical fluency",
        "Record polished performance set",
        "Exam/recital preparation roadmap",
      ],
    },
    advanced: {
      "10": [
        "Audit technique & correct habits",
        "Refine tone palette & color",
        "Score study & analysis basics",
        "Performance anxiety tools",
      ],
      "20": [
        "High-level interpretation choices",
        "Fast passagework & voicing clarity",
        "Studio-quality recording preparation",
        "Collaborative music making",
      ],
      "36": [
        "Recital program curation",
        "Competition/exam strategy",
        "Artistic identity & stagecraft",
        "Portfolio videos + feedback loops",
      ],
    },
  },
  Theory: {
    beginner: {
      "10": [
        "Staff, clefs, note values",
        "Keys, scales, intervals (basics)",
        "Simple triads & cadences",
        "Rhythm reading drills",
      ],
      "20": [
        "Major/minor harmony foundations",
        "Form & phrases",
        "Sight singing & dictation (intro)",
        "Compose 8–12 bar melody",
      ],
      "36": [
        "Secondary chords (intro)",
        "Harmonic function & voice-leading",
        "Analyse short pieces",
        "Compose a short piano solo",
      ],
    },
    intermediate: {
      "10": [
        "Inversions & progressions",
        "Non-harmonic tones (intro)",
        "Transposition drills",
        "Two-part writing basics",
      ],
      "20": [
        "Modulation & sequence",
        "Counterpoint (intro)",
        "Form analysis (binary/ternary)",
        "Harmonise a given melody",
      ],
      "36": [
        "Chromatic harmony (overview)",
        "Figured bass realisation",
        "Analytical essay skills",
        "Compose theme & variations",
      ],
    },
    advanced: {
      "10": [
        "Late-romantic harmony overview",
        "Modal & synthetic scales",
        "Advanced dictation practice",
        "Orchestration basics",
      ],
      "20": [
        "20th-century techniques (survey)",
        "Set theory & post-tonal intro",
        "Score reading (transposing inst.)",
        "Orchestrate 16–24 bars",
      ],
      "36": [
        "Personal compositional language",
        "Large-form analysis",
        "Full short orchestration",
        "Portfolio preparation",
      ],
    },
  },
  Conducting: {
    beginner: {
      "10": [
        "Posture & baton grip",
        "Basic patterns (2/4/3/4)",
        "Cueing & cut-offs",
        "Rehearsal communication basics",
      ],
      "20": [
        "Articulation gestures",
        "Dynamics & balance",
        "Score study (intro)",
        "Lead a short ensemble excerpt",
      ],
      "36": [
        "Expressive patterning",
        "Preparatory beats & fermatas",
        "Rehearsal planning",
        "Conduct a full short piece",
      ],
    },
    intermediate: {
      "10": [
        "Complex meters & tempo changes",
        "Left-hand independence",
        "Clear cue hierarchy",
        "Sectional rehearsal craft",
      ],
      "20": [
        "Detailed score marking",
        "Balance & orchestral color",
        "Problem-solving strategies",
        "Concert excerpt readiness",
      ],
      "36": [
        "Programming & leadership",
        "Advanced expression & shaping",
        "Record rehearsal feedback loops",
        "Public performance preparation",
      ],
    },
    advanced: {
      "10": [
        "Gestural economy & clarity",
        "Professional rehearsal etiquette",
        "Working with soloists",
        "Fix-it toolkit",
      ],
      "20": [
        "Large ensemble navigation",
        "Complex contemporary notation",
        "Interpretive depth",
        "Dress rehearsal mastery",
      ],
      "36": [
        "Full concert program",
        "Recording session leadership",
        "Artistic vision & branding",
        "Career materials & showreel",
      ],
    },
  },
};

export default function TeacherProfile() {
  const [active, setActive] = useState<Sessions>("10");

  // NEW filters
  const [mode, setMode] = useState<Mode>("online");
  const [subject, setSubject] = useState<Subject>("Piano");
  const [level, setLevel] = useState<Level>("beginner");

  const perSession = PER_SESSION[subject][level][mode];
  const totalFor = (s: Sessions) =>
    Math.round(perSession * parseInt(s, 10) * (1 - DISCOUNT[s]));

  const price10 = totalFor("10");
  const price20 = totalFor("20");
  const price36 = totalFor("36");

  const currentOutcomes = OUTCOMES[subject][level][active];

  return (
    <div className="w-full bg-white text-black">
      {/* Header Navbar */}
      <Header />

      {/* Black Top Hero Section */}
      <section className="bg-black text-white pt-32 pb-12 relative overflow-hidden">
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

{/* New info lines with icons (subtle style) */}
<div className="flex items-center gap-3 text-gray-300 mt-3">
  <FaClock className="text-red-500 w-5 h-5" />
  <p className="text-base md:text-lg">5+ years experience</p>
</div>

<div className="flex items-center gap-3 text-gray-300 mt-1">
  <FaMusic className="text-red-500 w-5 h-5" />
  <p className="text-base md:text-lg">Starting {formatINR(perSession)} / class</p>
</div>

<div className="flex items-center gap-3 text-gray-300 mt-3">
  <FaMapMarkerAlt className="text-red-500 w-5 h-5" />
  <p className="text-lg">Mumbai, Online</p>
</div>

            <div className="relative mt-7 inline-block group">
              <div className="bg-red-600 text-white rounded-full px-7 py-3 font-medium hover:bg-red-500 cursor-pointer transition-all">
                Book Free Demo Class
              </div>
              <span className="absolute -inset-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.25),transparent)]" />
            </div>
          </Reveal>
        </div>
      </section>
      {/* === Learning Outcomes (Integrated totals selector) === */}
<section className="py-14 bg-white">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-3xl md:text-4xl font-extrabold mb-8">
      Learning Outcomes
    </h2>

    {/* Filters (small polish) */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Mode */}
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-700 mb-1">Mode</label>
        <div className="relative">
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-shadow shadow-[inset_0_0_0_0_rgba(0,0,0,0)] hover:shadow-[inset_0_0_0_9999px_rgba(0,0,0,0.01)]"
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">▾</span>
        </div>
      </div>

      {/* Subject */}
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-700 mb-1">Subject</label>
        <div className="relative">
          <select
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value as Subject);
              setActive("10"); // reset tab to 10 on change
            }}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-shadow hover:shadow-[inset_0_0_0_9999px_rgba(0,0,0,0.01)]"
          >
            <option value="Piano">Piano</option>
            <option value="Theory">Theory</option>
            <option value="Conducting">Conducting</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">▾</span>
        </div>
      </div>

      {/* Level */}
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-700 mb-1">Level</label>
        <div className="relative">
          <select
            value={level}
            onChange={(e) => {
              setLevel(e.target.value as Level);
              setActive("10");
            }}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-shadow hover:shadow-[inset_0_0_0_9999px_rgba(0,0,0,0.01)]"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">▾</span>
        </div>
      </div>
    </div>

    {/* Pricing selector row — these ARE the tabs now */}
    {(() => {
      const indexMap: Record<Sessions, number> = { "10": 0, "20": 1, "36": 2 };
      const activeIndex = indexMap[active];
      const cards: { s: Sessions; price: number }[] = [
        { s: "10", price: price10 },
        { s: "20", price: price20 },
        { s: "36", price: price36 },
      ];
      return (
        <div className="relative">
          {/* Active slider bar */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-200" />
         

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {cards.map(({ s, price }, i) => {
              const selected = active === s;
              return (
                <button
                  key={s}
                  onClick={() => setActive(s)}
                  className={`group text-left rounded-xl border p-5 transition-all will-change-transform
                    ${selected
                      ? "border-red-600 shadow-[0_10px_30px_rgba(229,48,48,0.12)]"
                      : "border-gray-200 hover:border-red-300 hover:shadow-md hover:-translate-y-0.5"
                    }
                  `}
                  aria-pressed={selected}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xl md:text-2xl font-extrabold tracking-wide ${selected ? "text-red-600" : "text-black"}`}>
                      {s} Sessions
                    </span>
                    {DISCOUNT[s] > 0 && (
                      <span className="text-[10px] md:text-xs font-semibold text-white bg-red-500 rounded-full px-2 py-0.5">
                        {Math.round(DISCOUNT[s] * 100)}% OFF
                      </span>
                    )}
                  </div>

                  <div className="text-[1.15rem] md:text-xl text-gray-800">
                    {formatINR(price)}
                  </div>

                  {/* micro underline on hover */}
                  <div className="mt-3 h-[3px] rounded bg-gray-100 overflow-hidden">
                    <div className={`h-full ${selected ? "bg-red-600 w-full" : "bg-red-500 w-0 group-hover:w-full transition-all duration-300"}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      );
    })()}

    {/* Outcomes for selected sessions */}
    <div className="mt-2">
      <ul className="space-y-4 text-gray-800 text-lg md:text-xl leading-relaxed">
        {currentOutcomes.map((line, idx) => (
          <li key={idx} className="flex gap-3">
            <span className="mt-2 w-2 h-2 bg-black rounded-full"></span>
            {line}
          </li>
        ))}
      </ul>

      {/* Price per class — upgraded presentation */}
      <div className="mt-8 ">
        <div className="p-[2px] rounded-xl bg-black  hover:bg-gradient-to-r from-red-500 via-red-400 to-red-600">
          <div className="rounded-[10px] bg-white">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                  <span className="text-red-600 text-lg">₹</span>
                </div>
                <div className="text-gray-700 text-base md:text-lg">
                  Price per class:&nbsp;
                  <span className="font-semibold text-black text-lg md:text-xl">
                    {formatINR(perSession)}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                  {subject}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tiny helper text */}
        <p className="text-gray-500 text-sm mt-3">
          Total shown above includes bundle savings (where applicable). Change sessions by selecting any card.
        </p>
      </div>
    </div>
  </div>
</section>
<section className="bg-red-600 text-white py-5 text-center relative overflow-hidden">
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
      {/* === White 3-Column Section === */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
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
                <li key={i} className="flex items-start gap-3 group hover:translate-x-1 transition-transform">
                  <span
  className="
    mt-[10px] inline-block h-2 w-2 rounded-full bg-red-500
    transition-all duration-300 ease-out
    group-hover:w-6 group-hover:h-[3px] group-hover:bg-black
  "
/>
<span>{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* === Black 2-Column Section === */}
      <section className="bg-black text-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14">
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
                <li key={i} className="flex items-start gap-3 group hover:translate-x-1 transition-transform">
                  <span className="mt-[10px] w-2 h-2 rounded-full bg-red-500 group-hover:bg-white transition-colors" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>

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
                <li key={i} className="flex items-start gap-3 group hover:translate-x-1 transition-transform">
                  <span className="mt-[10px] w-2 h-2 rounded-full bg-red-500 group-hover:bg-white transition-colors" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* === Learning Outcomes (refined) === */}
 

     

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
