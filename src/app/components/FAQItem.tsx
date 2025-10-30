"use client"
import { useState, useRef, useEffect } from "react"
import { Plus, Minus } from "lucide-react"

interface FAQItemProps {
  question: string
  answer: string
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const [height, setHeight] = useState("0px")

  useEffect(() => {
    if (open && contentRef.current) {
      setHeight(contentRef.current.scrollHeight + "px")
    } else {
      setHeight("0px")
    }
  }, [open])

  return (
    <div className="w-full border-b border-red-400">
      {/* Clickable Question */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex justify-between items-center text-left py-6 transition-all duration-300
        ${open ? "bg-black text-white px-6" : "text-black px-6"}
        `}
      >
        <span className="text-[1.4rem] font-semibold">{question}</span>
        {open ? <Minus className="w-8 h-8" /> : <Plus className="w-8 h-8" />}
      </button>

      {/* Animated Answer */}
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: height }}
      >
        <div
          ref={contentRef}
          className="bg-white text-black px-8 py-6 text-lg leading-relaxed border-b border-red-400 opacity-100"
        >
          {answer}
        </div>
      </div>
    </div>
  )
}
