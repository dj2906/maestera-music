"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function Header() {
  const [isSticky, setIsSticky] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    let lastSticky = false
    const handleScroll = () => {
      const shouldBeSticky = window.scrollY > window.innerHeight * 0.3
      if (shouldBeSticky !== lastSticky) {
        setIsSticky(shouldBeSticky)
        lastSticky = shouldBeSticky
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
      className={`${isSticky
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
        <Link href="/" className={linkClass("/")}>
          HOME
        </Link>
        <Link href="/about-us" className={linkClass("/about-us")}>
          ABOUT US
        </Link>
        <Link href="/find-a-teacher" className={linkClass("/find-a-teacher")}>
          FIND A TEACHER
        </Link>
        <Link href="/become-a-teacher" className={linkClass("/become-a-teacher")}>
          BECOME A TEACHER
        </Link>
        <Link href="/faq" className={linkClass("/faq")}>
          FAQ
        </Link>
        <Link href="/contact-us" className={linkClass("/contact-us")}>
          CONTACT US
        </Link>
      </nav>
    </header>
  )
}
