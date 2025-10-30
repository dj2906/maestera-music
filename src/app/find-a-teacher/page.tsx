"use client"

import { Search, MapPin, Music2, Clock } from "lucide-react"
import Header from "../components/Header"

export default function FindATeacherPage() {
  const teachers = [
    {
      name: "AASTHA MOHAPATRA",
      instruments: "Voice, Piano",
      location: "Oxford | Online",
      price: "₹ 1,200/hr",
      image: "/images/teachers/carissa-profile.png",
    },
    {
      name: "ADITI GOSAVI",
      instruments: "Harmonium",
      location: "Pune | Online",
      price: "₹ 700/hr",
      image: "/images/teachers/aditi.jpg",
    },
    {
      name: "ADITYA GANESH",
      instruments: "Piano, Voice",
      location: "Chennai | Online",
      price: "₹ 800/hr",
      image: "/images/teachers/aditya.jpg",
    },
    {
      name: "ADITYA GANESH",
      instruments: "Piano, Voice",
      location: "Chennai | Online",
      price: "₹ 800/hr",
      image: "/images/teachers/aditya.jpg",
    },
  ]

  return (
    <div className="w-full bg-white text-black">
      {/* Header Navbar */}
      <Header />

     {/* Banner Section */}
<section
  className="flex flex-col items-center justify-start text-center px-6 pt-32 pb-10 md:pb-16 bg-center relative min-h-[70vh]"
  style={{
    backgroundImage: "url('/images/find-a-teacher-banner.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "top center",
  }}
>
  <div className="flex flex-col items-center -translate-y-10">
    <h1 className="text-white text-3xl md:text-5xl font-bold tracking-widest leading-snug mb-6">
      FIND A TEACHER
    </h1>

    <div className="flex items-center bg-white/20 backdrop-blur-md border border-gray-300 rounded-full px-5 py-3 w-[90%] md:w-[700px] max-w-2xl shadow-inner">
      <Search className="text-white w-6 h-6 mr-3" />
      <input
        type="text"
        placeholder="Search by Name, Instruments, City..."
        className="w-full bg-transparent text-white placeholder-white focus:outline-none text-lg"
      />
    </div>
  </div>

  {/* Gradient fade for smooth transition */}
  </section>


      {/* Teachers + Filters Section */}
      <section className="bg-white py-12 px-4 md:px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {/* Filters Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold bg-black text-white px-4 py-2 rounded">
                INSTRUMENTS
              </h3>
              <input
                type="text"
                placeholder="Search by Instrument"
                className="w-full mt-2 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
              />
              <ul className="mt-3 space-y-1 text-lg">
                <li><input type="checkbox" className="mr-2" /> Piano (3)</li>
                <li><input type="checkbox" className="mr-2" /> Guitar (2)</li>
                <li><input type="checkbox" className="mr-2" /> Violin (1)</li>
                <li><input type="checkbox" className="mr-2" /> Drums (2)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold bg-black text-white px-4 py-2 rounded">
                CITY
              </h3>
              <input
                type="text"
                placeholder="Search by City"
                className="w-full mt-2 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
              />
              <ul className="mt-3 space-y-1 text-lg">
                <li><input type="checkbox" className="mr-2" /> Chennai (9)</li>
                <li><input type="checkbox" className="mr-2" /> Pune (5)</li>
                <li><input type="checkbox" className="mr-2" /> Mumbai (12)</li>
              </ul>
            </div>
          </div>

          {/* Teacher Cards */}
<div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {teachers.map((teacher, index) => (
    <div
      key={index}
      className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-black/30 flex flex-col p-3 hover:bg-black hover:scale-[1.01]"
    >
      <div className="overflow-hidden rounded-xl mb-1 p-1">
        <img
          src={teacher.image}
          alt={teacher.name}
          className="w-full h-64 object-cover rounded-xl transition-all duration-500 group-hover:opacity-80"
        />
      </div>
      {/* reduced padding from p-3 → px-2.5 py-3 for tighter sides */}
      <div className="px-2.5 py-3 flex flex-col flex-grow justify-between transition-colors duration-500 group-hover:text-white">
        <div>
          <h3 className="text-[1.4rem] font-bold mb-2">{teacher.name}</h3>
          {/* increased icon size from w-4 h-4 → w-5 h-5 */}
          <p className="flex items-center text-lg text-gray-700 mb-1 group-hover:text-gray-200 transition-colors">
            <Music2 className="w-5 h-5 mr-2 text-red-500 group-hover:text-red-400 transition-colors" />
            {teacher.instruments}
          </p>
          <p className="flex items-center text-lg text-gray-700 mb-1 group-hover:text-gray-200 transition-colors">
            <MapPin className="w-5 h-5 mr-2 text-red-500 group-hover:text-red-400 transition-colors" />
            {teacher.location}
          </p>
          <p className="flex items-center text-lg text-gray-700 mb-1 group-hover:text-gray-200 transition-colors">
            <Clock className="w-5 h-5 mr-2 text-red-500 group-hover:text-red-400 transition-colors" />
            Starting {teacher.price}
          </p>
        </div>

        <button className="mt-4 bg-white border border-red-500 text-red-500 px-4 py-2 rounded-full font-semibold hover:bg-red-500 hover:text-white transition-all duration-300 group-hover:bg-red-500 group-hover:text-white">
          Book Now
        </button>
      </div>
    </div>
  ))}
</div>


        </div>
      </section>
    </div>
  )
}
