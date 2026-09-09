import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="hidden bg-sky-400 px-6 pb-10 pt-12 text-white md:block lg:px-8">
      <div className="mx-auto max-w-[1300px]">
        {/* =====================================================
            MAIN FOOTER
        ====================================================== */}
        <div className="grid gap-10 md:grid-cols-3 md:gap-12 lg:gap-16">
          {/* =================================================
              LOGO + DESCRIPTION
          ================================================== */}
          <div className="max-w-sm">
            <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-white">
              Estatein
            </h2>

            <div className="mb-4 h-1 w-10 rounded-full bg-white/70" />

            <p className="text-sm leading-7 text-white/85">
              Discover premium properties and make your real estate journey
              smooth and successful with Estatein.
            </p>

            {/* SOCIAL */}
            <div className="mt-5 flex gap-2.5">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
                (Icon, i) => (
                  <div
                    key={i}
                    className="
                    flex
                    h-10
                    w-10
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/20
                    bg-white/15
                    text-white
                    shadow-sm
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-white
                    hover:text-sky-500
                    hover:shadow-lg
                  "
                  >
                    <Icon size={14} />
                  </div>
                ),
              )}
            </div>
          </div>

          {/* =================================================
              LINKS
          ================================================== */}
          <div className="flex justify-between gap-8 sm:justify-start sm:gap-20">
            {/* QUICK LINKS */}
            <div>
              <h3 className="mb-4 text-sm font-bold tracking-wide text-white">
                Quick Links
              </h3>

              <ul className="space-y-2.5 text-sm text-white/80">
                <li className="transition-colors duration-200 hover:text-white">
                  <NavLink to="/">Home</NavLink>
                </li>

                <li className="transition-colors duration-200 hover:text-white">
                  <NavLink to="/wishlist">Wishlist</NavLink>
                </li>

                <li className="transition-colors duration-200 hover:text-white">
                  <NavLink to="/properties">Properties</NavLink>
                </li>

                <li className="transition-colors duration-200 hover:text-white">
                  <NavLink to="/about">About</NavLink>
                </li>

                <li className="transition-colors duration-200 hover:text-white">
                  <NavLink to="/contact">Contact</NavLink>
                </li>
              </ul>
            </div>

            {/* SUPPORT */}
            <div>
              <h3 className="mb-4 text-sm font-bold tracking-wide text-white">
                Support
              </h3>

              <ul className="space-y-2.5 text-sm text-white/80">
                <li className="cursor-pointer transition-colors duration-200 hover:text-white">
                  Help Center
                </li>

                <li className="cursor-pointer transition-colors duration-200 hover:text-white">
                  Terms of Service
                </li>

                <li className="transition-colors duration-200 hover:text-white">
                  <NavLink to="/privacy-policy">Privacy Policy</NavLink>
                </li>

                <li className="transition-colors duration-200 hover:text-white">
                  <NavLink to="/faq">FAQs</NavLink>
                </li>
              </ul>
            </div>
          </div>

          {/* =================================================
              SUBSCRIBE
          ================================================== */}
          <div className="max-w-sm">
            <h3 className="mb-4 text-sm font-bold tracking-wide text-white">
              Subscribe
            </h3>

            <p className="mb-3 text-sm leading-6 text-white/80">
              Get latest property updates & offers.
            </p>

            <div className="flex overflow-hidden rounded-xl border border-white/20 bg-white/15 shadow-sm backdrop-blur-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="
                  w-full
                  min-w-0
                  bg-transparent
                  px-3
                  py-3
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-white/70
                "
              />

              <button
                type="button"
                className="
                  flex
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  bg-white
                  text-sm
                  font-bold
                  text-sky-500
                  transition-all
                  duration-300
                  hover:bg-gray-100
                "
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM
        ====================================================== */}
        <div className="mt-10 border-t border-white/25 pt-6">
          <div className="flex flex-col items-center justify-around gap-3 text-center text-sm text-white/80 md:flex-row md:text-left">
            <p>© 2026 Estatein. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
