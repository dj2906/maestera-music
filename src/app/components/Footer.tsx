"use client"
import { Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6">

        {/* Logo + Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img
            src="/images/mlogo-white.png"
            alt="Maestera Logo"
            className="w-60 md:w-75 ml-4"
          />
         
        </div>

        {/* Quick Links */}
        <div className="md:border-r md:border-gray-600 md:pr-8">
          <h3 className="text-xl font-bold mb-6 border-b-2 border-red-600 inline-block">
            QUICK LINKS
          </h3>

          <ul className="space-y-4 text-gray-300">
            <li><Link href="/faq" className="hover:text-red-600 transition">FAQ</Link></li>
            <li><Link href="/terms" className="hover:text-red-600 transition">Terms & Conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-red-600 transition">Privacy Policy</Link></li>
            <li><Link href="/guidelines" className="hover:text-red-600 transition">Guidelines</Link></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-bold mb-6 border-b-2 border-red-600 inline-block">
            CONTACT US
          </h3>

          <ul className="space-y-4 text-gray-300">
            <li className="flex gap-3 items-center">
              <Phone className="text-red-600" size={18} />
              +91 9867229293
            </li>

            <li className="flex gap-3 items-center">
              <Mail className="text-red-600" size={18} />
              maesteramusic@gmail.com
            </li>

            <li className="flex gap-3 items-start">
              <MapPin className="text-red-600 mt-1" size={18} />
              Flat No. B-1304, Oberoi Splendor Road, Jogeshwari East, Mumbai – 400060 Mumbai Suburban District, Maharashtra, India
            </li>
          </ul>

          {/* Social Media */}
          <div className="flex gap-6 mt-6">
            <Link href="#" className="bg-red-700 p-3 rounded-full hover:bg-red-600 transition">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link href="#" className="bg-red-700 p-3 rounded-full hover:bg-red-600 transition">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link href="#" className="bg-red-700 p-3 rounded-full hover:bg-red-600 transition">
              <i className="fab fa-linkedin-in"></i>
            </Link>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-red-600 text-center mt-14 pt-5 text-gray-300 text-sm px-6">
        Copyright @ 2025 FASTPRO FINANCE PRIVATE LIMITED All rights reserved.
      </div>
    </footer>
  )
}
