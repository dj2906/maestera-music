"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isSticky, setIsSticky] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.3) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const linkClass = (path: string) =>
    pathname === path
      ? "text-red-500 font-semibold"
      : isSticky
      ? "text-black hover:text-red-500"
      : "text-white hover:text-red-500"

  return (
    <header
      className={`${
        isSticky
          ? "fixed top-0 left-0 w-full bg-white text-black shadow-md translate-y-0"
          : "absolute top-0 left-0 w-full bg-transparent text-white"
      } z-30 flex items-center justify-between px-18 py-1 transition-all duration-300`}
    >
      <div className="flex items-center">
        <img
          src={isSticky ? "/images/mlogo-black.png" : "/images/mlogo-white.png"}
          alt="Maestera Logo"
          className={`${isSticky ? "h-25" : "h-30"} w-auto object-contain transition-all duration-300`}
        />
      </div>

      <nav className="flex items-center space-x-8 font-medium">
        <a href="/" className={linkClass("/")}>
          HOME
        </a>
        <a href="/about-us" className={linkClass("/about-us")}>
          ABOUT US
        </a>
        <a href="/find-a-teacher" className={linkClass("/find-a-teacher")}>
          FIND A TEACHER
        </a>
        <a href="/become-a-teacher" className={linkClass("/become-a-teacher")}>
          BECOME A TEACHER
        </a>
        <a href="/faq" className={linkClass("/faq")}>
          FAQ
        </a>
        <a href="/contact-us" className={linkClass("/contact-us")}>
          CONTACT US
        </a>
      </nav>
    </header>
  )
}
