"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FAQItem from "../components/FAQItem";
import { filterFAQs } from "../utils/searchUtils";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [userType, setUserType] = useState<"student" | "teacher">("student");

  const activeColor = userType === "teacher" ? "#dc2626" : "#000000";

  // All FAQs in arrays
  const studentFAQs = [
    {
      question: "1. How do I find a music teacher on this platform?",
      answer:
        "You can discover teachers on our website by browsing through our existing list of teachers, which is constantly being updated with new additions. If you're having trouble selecting a teacher or need guidance, you can fill out our form and we'll help match you with a suitable teacher. Alternatively, you can reach out to us directly via email, social media, or through our contact form, and we'll be happy to assist you in finding a teacher that meets your needs.",
    },
    {
      question: "2. What instruments and areas of music-making can I learn on Maestera?",
      answer:
        "With Maestera, you can explore and learn every instrument and every type of music imaginable, from classical to contemporary and beyond.",
    },
    {
      question: "3. What age group is Maestera suitable for?",
      answer:
        "At Maestera, we believe that music is a lifelong journey, and that learning has no age limits. That's why we welcome students of all ages, from children as young as 5 to teenagers, adults & senior citizens.",
    },
    {
      question: "4. Can I book a trial lesson before committing?",
      answer:
        "Yes, many teachers offer trial lessons so you can see if their teaching style works for you.",
    },
    {
      question: "5. Do you offer online lessons?",
      answer: "Yes, Maestera provides options for both in-person and online lessons.",
    },
    {
      question: "6. What if I need to cancel or reschedule a session?",
      answer:
        "We kindly request that you provide the teacher & us with at least 24 hours' notice for any changes or cancellations. On a case-by-case basis, teachers may exercise their discretion to accommodate student requests, and we encourage open communication and mutual agreement between teachers and students to find solutions that work best for everyone.",
    },
    {
      question: "7. Is there a minimum number of classes that I have to sign up for?",
      answer: "Yes, 4 classes.",
    },
    {
      question: "8. What if I have technical issues or questions?",
      answer:
        'You can reach us via email or "Contact Us" section on the platform. We’re here to assist you with any questions or concerns.',
    },
    {
      question: "9. How will the process work?",
      answer:
        "Upon your request, we will match you with a suitable teacher, and you will have the flexibility to schedule sessions at a mutually convenient time and day. In the event of any changes or adjustments, you are welcome to directly coordinate with your teacher and keep us informed, ensuring a seamless and hassle-free learning experience.",
    },
  ];

  const teacherFAQs = [
    {
      question: "1. Who can join as a music teacher?",
      answer:
        "Anyone with proficiency in teaching a musical instrument, vocals, or music theory and a passion for sharing their knowledge can join. Whether you're a certified instructor, a professional musician, or an experienced performer, we'd love to have you on board.",
    },
    {
      question: "2. How do I sign up as a teacher?",
      answer:
        "Signing up is easy! Create a profile on our website by providing your personal details, musical expertise, teaching experience, availability, and preferred teaching format (online, in-person, or both). Once approved, you'll be ready to connect with students. Click here to sign up.",
    },
    {
      question: "3. Is there a cost to join the platform as a teacher?",
      answer:
        "Joining the platform is free. Teachers can set their own rates for lessons. Platform charges a small commission on each session. These will be shared during the onboarding process.",
    },
    {
      question: "4. How do I find students on the platform?",
      answer: `You will be matched with students in one of two ways:
      - Either a student will directly select you for music classes based on your profile, or
      - Our team will review your profile and pair you with students who are seeking music classes as per their requirement.`,
    },
  ];

  // Filtered results
  const faqsToDisplay =
    userType === "student"
      ? filterFAQs(studentFAQs, searchQuery)
      : filterFAQs(teacherFAQs, searchQuery);

  return (
    <main className="relative min-h-screen bg-black text-white">
      <Header />

      {/* Background Image Section */}
      <section
        className="flex flex-col items-center justify-start text-center px-6 pt-48 pb-10 md:pb-16 bg-center relative min-h-[70vh]"
        style={{
          backgroundImage: "url('/images/Faq/faq-banner-1.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "top center",
        }}
      >
        <div className="absolute inset-0 bg-black/0"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
          <h1 className="text-2xl md:text-4xl mb-8 leading-tight font-bold">
            FREQUENTLY ASKED QUESTIONS
          </h1>

          {/* Search Bar */}
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

      {/* FAQ Section */}
      <section className="bg-white text-black py-20 px-6 md:px-24">
        <div className="max-w-6xl mx-auto">
          {/* Toggle Buttons */}
          <div className="flex justify-center mb-12">
            <div className="flex relative">
              <button
                onClick={() => setUserType("student")}
                className={`px-15 py-[18px] font-extrabold text-2xl tracking-wide transition-all duration-300 rounded-[20px] border border-white/80 ${
                  userType === "student"
                    ? "bg-black text-white z-20"
                    : "bg-red-300 text-white/90 z-10 -mr-6"
                }`}
              >
                Student
              </button>
              <button
                onClick={() => setUserType("teacher")}
                className={`px-15 py-[18px] font-extrabold text-2xl tracking-wide transition-all duration-300 rounded-[20px] border border-white/80 ${
                  userType === "teacher"
                    ? "bg-red-600 text-white z-20"
                    : "bg-black/50 text-white/90 z-10 -ml-6"
                }`}
              >
                Teacher
              </button>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="space-y-3">
            {faqsToDisplay.length > 0 ? (
              faqsToDisplay.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  activeColor={activeColor}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 text-lg">
                No FAQs found for "{searchQuery}"
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
