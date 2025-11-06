import React from "react"
import Header from "../components/Header"
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa"

const ContactUs = () => {
  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <Header />

      {/* Background */}
      <div
        className="bg-cover bg-center max-h-screen flex flex-col justify-start"
        style={{ backgroundImage: "url('/images/contact-us-banner.png')" }}
      >
        {/* Full-width Red Section */}
        <div className="w-full flex flex-col md:flex-row py-10 md:py-28">
          {/* Left Side - Red Background */}
<div className="bg-[#dc2c2c] flex flex-col md:flex-row items-center justify-center w-full md:w-[57%] px-2 md:px-2 py-0 md:py-0">
  {/* Illustration */}
  <img
    src="/images/contact-us-gif.gif"
    alt="Contact Illustration"
    className="w-64 md:w-88 mb-6 md:mb-6 md:mr-8 object-contain"
  />

  {/* Contact Info */}
  <div className="text-black space-y-6 flex-1">
    <h2 className="text-xl md:text-2xl font-bold mb-4">
      We’re here for you –<br />Start the Conversation!
    </h2>

    <div className="space-y-4 text-base md:text-lg">
      <div className="flex items-center gap-3">
        <FaPhoneAlt className="text-black text-lg" />
        <span>+91 9867229293</span>
        
      </div>
      <hr className="border-black/60 mb-2" />

      <div className="flex items-center gap-3">
        <FaEnvelope className="text-black text-lg" />
        <span>maesteramusic@gmail.com</span>
      </div>
      <hr className="border-black/60 mb-2" />

      <div className="flex items-start gap-3">
        <FaMapMarkerAlt className="text-black text-lg mt-1 flex-shrink-0" />
        <span>
          Flat No. B-1304, Oberoi Splendor Road, Jogeshwari East,
          Mumbai – 400060 Mumbai Suburban District, Maharashtra, India
        </span>
      </div>
      <hr className="border-black/60 mb-2" />
    </div>

    {/* Social Icons */}
    <div className="flex gap-8 pt-4 text-4xl">
      <a href="#" className="hover:text-white transition">
        <FaFacebookF />
      </a>
      <a href="#" className="hover:text-white transition">
        <FaLinkedinIn />
      </a>
      <a href="#" className="hover:text-white transition">
        <FaInstagram />
      </a>
    </div>
  </div>
</div>


          {/* Right Side - Contact Form */}
          <div className="flex-1 bg-transparent text-white flex flex-col justify-center px-8 md:px-16 py-10 md:py-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
            <form className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full border-b border-gray-400 bg-transparent focus:outline-none py-2"
                />
                <input
                  type="text"
                  placeholder="Phone No."
                  className="w-full border-b border-gray-400 bg-transparent focus:outline-none py-2"
                />
              </div>

              <input
                type="email"
                placeholder="Email"
                className="w-full border-b border-gray-400 bg-transparent focus:outline-none py-2"
              />

              <textarea
                placeholder="Message"
                rows={4}
                className="w-full border-b border-gray-400 bg-transparent focus:outline-none py-2 resize-none"
              ></textarea>

              <button
                type="submit"
                className="bg-[#E53030] text-white font-semibold px-8 py-2 rounded-full hover:bg-[#c72a2a] transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/919867229293"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition"
        >
          <i className="fab fa-whatsapp text-2xl"></i>
        </a>
      </div>
    </div>
  )
}

export default ContactUs
