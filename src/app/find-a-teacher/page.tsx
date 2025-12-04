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

const normalize = (value: unknown) =>
  String(value ?? "").toLowerCase().trim();

import { useSearchParams, useRouter } from "next/navigation"

export default function FindATeacherPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const instrumentParam = searchParams.get("instrument")

  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([])
  const [selectedCities, setSelectedCities] = useState<string[]>([])
  const [selectedModes, setSelectedModes] = useState<string[]>([])
  const [showMoreInstruments, setShowMoreInstruments] = useState(false)
  const [showMoreCities, setShowMoreCities] = useState(false)
  const [instrumentSearch, setInstrumentSearch] = useState("")
  const [citySearch, setCitySearch] = useState("")
  const [modeSearch, setModeSearch] = useState("")
  const [sortBy, setSortBy] = useState("name-asc")

  useEffect(() => {
    const fetchTeachers = async () => {
      const { data, error } = await supabase.from("Teacher").select("*")
      if (error) console.error("Error fetching teachers:", error)
      else setTeachers((data as Teacher[]) || [])
    }
    fetchTeachers()
  }, [])

  // Compute unique instruments with counts (case-insensitive)
  const instrumentsWithCount = useMemo(() => {
    const instrumentMap = new Map<string, number>()
    teachers.forEach((teacher) => {
      const instruments = teacher.Instruments?.split(",").map((i) => i.trim()) || []
      instruments.forEach((instrument) => {
        if (instrument) {
          // Normalize to proper case (first letter uppercase, rest lowercase)
          const normalized = instrument.charAt(0).toUpperCase() + instrument.slice(1).toLowerCase()
          instrumentMap.set(normalized, (instrumentMap.get(normalized) || 0) + 1)
        }
      })
    })
    return Array.from(instrumentMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [teachers])

  // Sort instruments for display (selected first)
  const sortedInstruments = useMemo(() => {
    return [...instrumentsWithCount].sort((a, b) => {
      const aSelected = selectedInstruments.includes(a.name)
      const bSelected = selectedInstruments.includes(b.name)
      if (aSelected && !bSelected) return -1
      if (!aSelected && bSelected) return 1
      return a.name.localeCompare(b.name)
    })
  }, [instrumentsWithCount, selectedInstruments])

  // Pre-select instrument from query param if valid
  useEffect(() => {
    if (instrumentParam && instrumentsWithCount.length > 0) {
      const normalizedParam = instrumentParam.charAt(0).toUpperCase() + instrumentParam.slice(1).toLowerCase()
      const exists = instrumentsWithCount.some((i) => i.name === normalizedParam)
      if (exists) {
        setSelectedInstruments([normalizedParam])
      }
    }
  }, [instrumentParam, instrumentsWithCount])

  // Filter instruments based on search
  const filteredInstruments = useMemo(() => {
    if (!instrumentSearch) return sortedInstruments
    const query = instrumentSearch.toLowerCase()
    return sortedInstruments.filter(({ name }) => name.toLowerCase().includes(query))
  }, [sortedInstruments, instrumentSearch])

  // Compute unique cities with counts (case-insensitive)
  const citiesWithCount = useMemo(() => {
    const cityMap = new Map<string, number>()
    teachers.forEach((teacher) => {
      const city = teacher.City?.trim()
      if (city) {
        // Normalize to proper case
        const normalized = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()
        cityMap.set(normalized, (cityMap.get(normalized) || 0) + 1)
      }
    })
    return Array.from(cityMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [teachers])

  // Filter cities based on search
  const filteredCities = useMemo(() => {
    if (!citySearch) return citiesWithCount
    const query = citySearch.toLowerCase()
    return citiesWithCount.filter(({ name }) => name.toLowerCase().includes(query))
  }, [citiesWithCount, citySearch])

  // Compute unique modes with counts (case-insensitive)
  const modesWithCount = useMemo(() => {
    const modeMap = new Map<string, number>()
    teachers.forEach((teacher) => {
      const formats = teacher["Class Formats"]?.split(",").map((f) => f.trim()) || []
      formats.forEach((format) => {
        if (format) {
          // Normalize to proper case
          const normalized = format.charAt(0).toUpperCase() + format.slice(1).toLowerCase()
          modeMap.set(normalized, (modeMap.get(normalized) || 0) + 1)
        }
      })
    })
    return Array.from(modeMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [teachers])

  // Filter modes based on search
  const filteredModes = useMemo(() => {
    if (!modeSearch) return modesWithCount
    const query = modeSearch.toLowerCase()
    return modesWithCount.filter(({ name }) => name.toLowerCase().includes(query))
  }, [modesWithCount, modeSearch])

  // Filter teachers based on search query and selected filters
  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      // Search query filter (OR-style across all fields)
      const q = normalize(searchQuery)
      if (q) {
        const haystack =
          normalize(teacher["Full Name"]) +
          " | " +
          normalize(teacher.Instruments) +
          " | " +
          normalize(teacher.City) +
          " | " +
          normalize(teacher["Class Formats"]) +
          " | " +
          normalize(teacher["Teaching Fees"])
        if (!haystack.includes(q)) return false
      }

      // Instrument filter (case-insensitive)
      if (selectedInstruments.length > 0) {
        const teacherInstruments = teacher.Instruments?.split(",").map((i) => {
          const trimmed = i.trim()
          return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase()
        }) || []
        const hasMatchingInstrument = selectedInstruments.some((selected) =>
          teacherInstruments.includes(selected)
        )
        if (!hasMatchingInstrument) return false
      }

      // City filter (case-insensitive)
      if (selectedCities.length > 0) {
        const normalizedCity = teacher.City?.trim()
        const properCaseCity = normalizedCity ? normalizedCity.charAt(0).toUpperCase() + normalizedCity.slice(1).toLowerCase() : ""
        if (!selectedCities.includes(properCaseCity)) return false
      }

      // Mode filter (case-insensitive)
      if (selectedModes.length > 0) {
        const teacherModes = teacher["Class Formats"]?.split(",").map((f) => {
          const trimmed = f.trim()
          return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase()
        }) || []
        const hasMatchingMode = selectedModes.some((selected) =>
          teacherModes.includes(selected)
        )
        if (!hasMatchingMode) return false
      }

      return true
    })
  }, [teachers, searchQuery, selectedInstruments, selectedCities, selectedModes])

  // Sort filtered teachers
  const sortedTeachers = useMemo(() => {
    const sorted = [...filteredTeachers]
    switch (sortBy) {
      case "name-asc":
        return sorted.sort((a, b) => a["Full Name"].localeCompare(b["Full Name"]))
      case "name-desc":
        return sorted.sort((a, b) => b["Full Name"].localeCompare(a["Full Name"]))
      case "price-asc":
        return sorted.sort((a, b) => {
          const priceA = typeof a["Teaching Fees"] === "number" ? a["Teaching Fees"] : parseFloat(String(a["Teaching Fees"])) || 0
          const priceB = typeof b["Teaching Fees"] === "number" ? b["Teaching Fees"] : parseFloat(String(b["Teaching Fees"])) || 0
          return priceA - priceB
        })
      case "price-desc":
        return sorted.sort((a, b) => {
          const priceA = typeof a["Teaching Fees"] === "number" ? a["Teaching Fees"] : parseFloat(String(a["Teaching Fees"])) || 0
          const priceB = typeof b["Teaching Fees"] === "number" ? b["Teaching Fees"] : parseFloat(String(b["Teaching Fees"])) || 0
          return priceB - priceA
        })
      default:
        return sorted
    }
  }, [filteredTeachers, sortBy])

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

      {/* Teachers + Filters */}
      <section className="bg-white py-12 px-4 md:px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          <div className="space-y-6">
            {/* Filters Heading */}
            <h2 className="text-2xl font-bold mb-4">FILTERS</h2>

            {/* Instruments Filter */}
            <div>
              <h3 className="text-lg font-medium bg-black text-white px-4 py-2 rounded">
                INSTRUMENTS
              </h3>
              <input
                type="text"
                placeholder="Search by Instrument"
                value={instrumentSearch}
                onChange={(e) => setInstrumentSearch(e.target.value)}
                className="w-full mt-2 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <div className="mt-3 space-y-2">
                {filteredInstruments.slice(0, showMoreInstruments ? undefined : 4).map(({ name, count }) => (
                  <label key={name} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input
                      type="checkbox"
                      checked={selectedInstruments.includes(name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedInstruments([...selectedInstruments, name])
                        } else {
                          setSelectedInstruments(selectedInstruments.filter((i) => i !== name))
                        }
                      }}
                      className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                    />
                    <span className="text-md">{name} <span className="text-black">({count})</span></span>
                  </label>
                ))}
                {filteredInstruments.length > 4 && (
                  <button
                    onClick={() => setShowMoreInstruments(!showMoreInstruments)}
                    className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center mt-2"
                  >
                    {showMoreInstruments ? "Show Less" : "Show More"}
                    <span className="ml-1">{showMoreInstruments ? "▲" : "▼"}</span>
                  </button>
                )}
              </div>
            </div>

            {/* City Filter */}
            <div>
              <h3 className="text-lg font-medium bg-black text-white px-4 py-2 rounded">
                CITY
              </h3>
              <input
                type="text"
                placeholder="Search by City"
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                className="w-full mt-2 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <div className="mt-3 space-y-2">
                {filteredCities.slice(0, showMoreCities ? undefined : 4).map(({ name, count }) => (
                  <label key={name} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input
                      type="checkbox"
                      checked={selectedCities.includes(name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCities([...selectedCities, name])
                        } else {
                          setSelectedCities(selectedCities.filter((c) => c !== name))
                        }
                      }}
                      className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                    />
                    <span className="text-md">{name} <span className="text-black">({count})</span></span>
                  </label>
                ))}
                {filteredCities.length > 4 && (
                  <button
                    onClick={() => setShowMoreCities(!showMoreCities)}
                    className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center mt-2"
                  >
                    {showMoreCities ? "Show Less" : "Show More"}
                    <span className="ml-1">{showMoreCities ? "▲" : "▼"}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Mode Filter */}
            <div>
              <h3 className="text-lg font-medium bg-black text-white px-4 py-2 rounded">
                ONLINE/OFFLINE
              </h3>
              <input
                type="text"
                placeholder="Search by Mode"
                value={modeSearch}
                onChange={(e) => setModeSearch(e.target.value)}
                className="w-full mt-2 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <div className="mt-3 space-y-2">
                {filteredModes.map(({ name, count }) => (
                  <label key={name} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input
                      type="checkbox"
                      checked={selectedModes.includes(name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedModes([...selectedModes, name])
                        } else {
                          setSelectedModes(selectedModes.filter((m) => m !== name))
                        }
                      }}
                      className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                    />
                    <span className="text-md">{name} <span className="text-black">({count})</span></span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Teacher Cards (filtered) */}
          <div className="md:col-span-3">
            {/* Sort Dropdown */}
            <div className="mb-4 flex justify-start">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-black/60 rounded px-4 py-2 text-base focus:outline-none bg-white cursor-pointer"
              >
                <option value="name-asc">Sort By: Name (A–Z)</option>
                <option value="name-desc">Sort By: Name (Z–A)</option>
                <option value="price-asc">Sort By: Price (Low → High)</option>
                <option value="price-desc">Sort By: Price (High → Low)</option>
              </select>
            </div>

            {/* Teacher Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedTeachers.length === 0 ? (
                <p className="text-gray-500 col-span-full text-center">
                  No teachers found.
                </p>
              ) : (
                sortedTeachers.map((teacher) => (
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
                          <Music2 className="w-5 h-5 mr-2 text-red-500 group-hover:text-red-400 flex-shrink-0" />
                          {teacher.Instruments}
                        </p>
                        <p className="flex items-center text-lg text-gray-700 mb-1 group-hover:text-gray-200">
                          <MapPin className="w-5 h-5 mr-2 text-red-500 group-hover:text-red-400" />
                          {teacher.City} |{" "}
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

                      <button
                        onClick={() => router.push(`/student-form?teacher=${encodeURIComponent(teacher["Full Name"])}`)}
                        className="mt-4 bg-white border border-red-500 text-red-500 px-4 py-2 rounded-full font-semibold hover:bg-red-500 hover:text-white transition-all duration-300 group-hover:bg-red-500 group-hover:text-white"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
