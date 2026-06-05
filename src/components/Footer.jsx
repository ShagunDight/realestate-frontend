import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-sky-400 text-white px-6 pt-12 pb-10">
      <div className="max-w-[1300px] mx-auto grid md:grid-cols-4 gap-10">
        {/* LOGO + DESC */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Estatein</h2>
          <p className="text-sm text-white/80 leading-relaxed">
            Discover premium properties and make your real estate journey smooth and successful with Estatein.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-3 mt-4">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
              (Icon, i) => (
                <div key={i} className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-sky-500 transition cursor-pointer">
                  <Icon size={14} />
                </div>
              ),
            )}
          </div>
        </div>

        {/* LINKS */}
        <div className="flex sm:flex-row justify-between gap-8">
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white/80 cursor-pointer">
                <NavLink to="/"> Home </NavLink>
              </li>
              <li className="hover:text-white/80 cursor-pointer">
                <NavLink to="/wishlist"> Wishlist </NavLink>
              </li>
              <li className="hover:text-white/80 cursor-pointer">
                <NavLink to="/properties"> Properties </NavLink>
              </li>
              <li className="hover:text-white/80 cursor-pointer">
                <NavLink to="/about"> About </NavLink>
              </li>
              <li className="hover:text-white/80 cursor-pointer">
                <NavLink to="/contact"> Contact </NavLink>
              </li>
            </ul>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white/80 cursor-pointer">Help Center</li>
              <li className="hover:text-white/80 cursor-pointer">
                Terms of Service
              </li>
              <li className="hover:text-white/80 cursor-pointer">
                <NavLink to="/privacy-policy"> Privacy Policy </NavLink>
              </li>
              <li className="hover:text-white/80 cursor-pointer">
                <NavLink to="/faq"> FAQs </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* SUBSCRIBE */}
        <div>
          <h3 className="font-semibold mb-4">Subscribe</h3>
          <p className="text-sm text-white/80 mb-3">
            Get latest property updates & offers.
          </p>

          <div className="flex bg-white/20 rounded-lg overflow-hidden backdrop-blur">
            <input type="email" placeholder="Enter your email"
              className="bg-transparent px-3 py-2 w-full text-sm outline-none placeholder:text-white/70"/>
            <button className="bg-white text-sky-500 px-4 text-sm hover:bg-gray-100 transition">
              →
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/30 mt-10 pt-6 flex flex-col md:flex-row justify-around items-center text-sm text-white/80">
        <p>© 2024 Estatein. All rights reserved.</p>

        {/* <div className="flex gap-4 mt-3 md:mt-0">
          <span className="hover:text-white cursor-pointer">Privacy</span>
          <span className="hover:text-white cursor-pointer">Terms</span>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
