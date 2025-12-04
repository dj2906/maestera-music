"use client"

import Header from "../components/Header"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function StudentFormContent() {
  const searchParams = useSearchParams()
  const teacherName = searchParams.get("teacher")

  return (
    <div className="w-full bg-white text-black min-h-screen flex flex-col">
      {/* Navbar */}
      <Header />

      {/* Black Section */}
      <section className="bg-black text-white flex flex-col justify-center items-center min-h-[65vh] text-center px-4">
        <div className="max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            STUDENT SIGN-UP
          </h1>
          <p className="text-white leading-relaxed text-lg">
            At Maestro, music learning is fun, personal, and flexible—perfect for
            beginners or pros looking to grow with the right mentor.
          </p>
        </div>
      </section>

      {/* White Form Section (slightly overlaps upward) */}
      <section className="flex justify-center -mt-20 px-4 pb-16">
        <div className="bg-white text-black rounded-2xl shadow-xl w-full max-w-5xl p-10 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Teacher Name: <span >{teacherName || "No Teacher Selected"}</span>
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Name */}
            <div>
              <label className="block font-semibold mb-1 text-black">
                Student Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block font-semibold mb-1 text-black">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              />
            </div>

            {/* Email ID */}
            <div>
              <label className="block font-semibold mb-1 text-black">
                Email ID <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              />
            </div>

            {/* Instruments */}
            <div>
              <label className="block font-semibold mb-1 text-black">
                Instruments You Want to Learn{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block font-semibold mb-1 text-black">
                Budget Per Class <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              />
            </div>

            {/* Learning Mode */}
            <div>
              <label className="block font-semibold mb-1 text-black">
                Learning Mode <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-4 mt-1 text-black">
                <label className="flex items-center space-x-1">
                  <input type="radio" name="mode" className="accent-black" />
                  <span>Online</span>
                </label>
                <label className="flex items-center space-x-1">
                  <input
                    type="radio"
                    name="mode"
                    className="accent-black"
                    defaultChecked
                  />
                  <span>Offline</span>
                </label>
              </div>
            </div>

            {/* Full Address */}
            <div className="md:col-span-1">
              <label className="block font-semibold mb-1 text-black">
                Full Address <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={2}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              ></textarea>
            </div>

            {/* Pincode */}
            <div>
              <label className="block font-semibold mb-1 text-black">
                Pincode <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-center mt-6">
              <button
                type="submit"
                className="bg-black text-white px-10 py-3 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default function StudentSignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StudentFormContent />
    </Suspense>
  )
}
