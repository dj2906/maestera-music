"use client"

import { useEffect, useMemo, useState } from "react"
import { Search, MapPin, Music2, Clock } from "lucide-react"
import Header from "../components/Header"
import { supabase } from "../../lib/supabaseClient"

type Teacher = {
  id: number
  "Full Name": string
  Instruments: string
  City: string
  "Teaching Fees": number | string
  "Class Formats": string
  image_url: string | null
}

const normalize = (value: any) =>
  String(value ?? "").toLowerCase().trim();

export default function FindATeacherPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchTeachers = async () => {
      const { data, error } = await supabase.from("Teacher").select("*")
      if (error) console.error("Error fetching teachers:", error)
      else setTeachers((data as Teacher[]) || [])
    }
    fetchTeachers()
  }, [])

  // OR-style search: match if ANY field contains the query
  const filteredTeachers = useMemo(() => {
    const q = normalize(searchQuery)
    if (!q) return teachers
    return teachers.filter((t) => {
      const haystack =
        normalize(t["Full Name"]) +
        " | " +
        normalize(t.Instruments) +
        " | " +
        normalize(t.City) +
        " | " +
        normalize(t["Class Formats"]) +
        " | " +
        normalize(t["Teaching Fees"])
      return haystack.includes(q)
    })
  }, [teachers, searchQuery])

  return (
    <div className="w-full bg-white text-black">
      <Header />

      {/* Banner + Search */}
      <section
        className="flex flex-col items-center justify-start text-center px-6 pt-48 pb-10 md:pb-16 bg-center relative min-h-[70vh]"
        style={{
          backgroundImage: "url('/images/find-a-teacher-banner.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "top center",
        }}
      >
        <div className="flex flex-col items-center -translate-y-10">
          <h1 className="text-white text-3xl md:text-4xl font-bold tracking-widest leading-snug mb-6">
            FIND A TEACHER
          </h1>

          <div className="flex items-center bg-white/30 border border-gray-300 rounded-full px-5 py-3 w-[90%] md:w-[700px] max-w-2xl shadow-inner">
            <Search className="text-white w-6 h-6 mr-3" />
            <input
              type="text"
              placeholder="Search by Name, Instruments, City, or Mode…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-white placeholder-white focus:outline-none text-lg"
            />
          </div>
        </div>
      </section>

      {/* Teachers + Filters (UI unchanged) */}
      <section className="bg-white py-12 px-4 md:px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium bg-black text-white px-4 py-2 rounded">
                INSTRUMENTS
              </h3>
              <input
                type="text"
                placeholder="Search by Instrument"
                className="w-full mt-2 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
                // If you want this to drive the same search, uncomment:
                // onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div>
              <h3 className="text-lg font-medium bg-black text-white px-4 py-2 rounded">
                CITY
              </h3>
              <input
                type="text"
                placeholder="Search by City"
                className="w-full mt-2 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
                // onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div>
              <h3 className="text-lg font-medium bg-black text-white px-4 py-2 rounded">
                ONLINE/OFFLINE
              </h3>
              {/* Optional: add chips/toggles later; search already checks Class Formats */}
            </div>
          </div>

          {/* Dynamic Teacher Cards (filtered) */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTeachers.length === 0 ? (
              <p className="text-gray-500 col-span-full text-center">
                No teachers found.
              </p>
            ) : (
              filteredTeachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-black/30 flex flex-col p-2 hover:bg-black hover:scale-[1.01]"
                >
                  <div className="overflow-hidden rounded-xl mb-1 p-1">
                    <img
                      src={teacher.image_url || "/images/default-teacher.jpg"}
                      alt={teacher["Full Name"]}
                      className="w-full h-64 object-cover rounded-xl transition-all duration-500 group-hover:opacity-80"
                    />
                  </div>

                  <div className="px-2.5 py-3 flex flex-col flex-grow justify-between transition-colors duration-500 group-hover:text-white">
                    <div>
                      <h3 className="text-[1.4rem] font-bold mb-2">
                        {teacher["Full Name"]}
                      </h3>
                      <p className="flex items-center text-lg text-gray-700 mb-1 group-hover:text-gray-200">
                        <Music2 className="w-5 h-5 mr-2 text-red-500 group-hover:text-red-400" />
                        {teacher.Instruments}
                      </p>
                      <p className="flex items-center text-lg text-gray-700 mb-1 group-hover:text-gray-200">
                        <MapPin className="w-5 h-5 mr-2 text-red-500 group-hover:text-red-400" />
                        {teacher.City} | {/* mode shown as Online by you earlier; use formats if you want */}
                        {teacher["Class Formats"]?.toLowerCase().includes("online")
                          ? "Online"
                          : teacher["Class Formats"]?.toLowerCase().includes("offline")
                          ? "Offline"
                          : "Online"}
                      </p>
                      <p className="flex items-center text-lg text-gray-700 mb-1 group-hover:text-gray-200">
                        <Clock className="w-5 h-5 mr-2 text-red-500 group-hover:text-red-400" />
                        Starting ₹{teacher["Teaching Fees"]}/hr
                      </p>
                    </div>

                    <button className="mt-4 bg-white border border-red-500 text-red-500 px-4 py-2 rounded-full font-semibold hover:bg-red-500 hover:text-white transition-all duration-300 group-hover:bg-red-500 group-hover:text-white">
                      Book Now
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
