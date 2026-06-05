import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import {
  FaHeart,
  FaHome,
  FaSearch,
  FaCog,
  FaUser, FaSignOutAlt
} from "react-icons/fa";
import { useWishlist } from "./WishlistContext";

const Navbar = ({ setShowLogin, customer, setCustomer }) => {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { wishlist } = useWishlist();

  useEffect(() => {
    const token = localStorage.getItem("customer_token");
    const email = localStorage.getItem("customer_email");

    if (token && email) {
      setCustomer({ email });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("customer_token");
    localStorage.removeItem("customer_email");
    localStorage.removeItem("wishlist");

    setCustomer(null);
    setShowLogin(false);
  };

  const navClass = ({ isActive }) =>
    `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-sky-100 text-sky-600 shadow-sm"
        : "text-gray-600 hover:text-sky-500 hover:bg-gray-50"
    }`;

  return (
    <>
    <nav className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">

      {/* TOP BAR */}
      <div className="w-full bg-gradient-to-r from-sky-500 to-blue-500 text-white text-center py-2 text-xs md:text-sm">
        Discover Your Dream Property — Built for Modern Living
      </div>

      {/* MAIN NAV */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-bold">E</span>
          </div>
          <span className="text-xl font-bold text-gray-900">
            Estatein
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-2 bg-white px-3 py-2 rounded-2xl border border-gray-100">

          <NavLink to="/" className={navClass}>Home</NavLink>
          <NavLink to="/about" className={navClass}>About</NavLink>
          <NavLink to="/properties" className={navClass}>Properties</NavLink>
          <NavLink to="/services" className={navClass}>Services</NavLink>
          <NavLink to="/contact" className={navClass}>Contact</NavLink>

          {/* AUTH */}
          <div className="ml-3 flex items-center gap-2">

            {!customer ? (
              <button
                onClick={() => setShowLogin(true)}
                className="bg-sky-500 text-white px-5 py-2 rounded-xl hover:bg-sky-600 shadow-md transition"
              >
                Login
              </button>
            ) : (
              <>
                {/* WISHLIST ICON WITH COUNT */}
                <NavLink to="/wishlist"
                  className="relative px-3 py-2 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-500 transition">
                  <FaHeart />

                  {/* 🔥 BADGE */}
                  {wishlist?.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                      {wishlist.length}
                    </span>
                  )}
                </NavLink>

                <button onClick={handleLogout}
                  className="border border-red-300 text-red-500 px-4 py-2 rounded-xl hover:bg-red-50 transition">
                  Logout
                </button>
              </>
            )}

          </div>
        </div>

        {/* MOBILE AUTH BUTTON (ONLY MOBILE) */}
          <div className="md:hidden">
            {!customer ? (
              <button
                onClick={() => setShowLogin(true)}
                className="bg-sky-500 text-white px-6 py-2 rounded-xl hover:bg-sky-600 shadow-md transition"
              >
                <FaUser />
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 shadow-md transition"
              >
                <FaSignOutAlt />
              </button>
            )}
          </div>
      </div>
      </nav>
      
      {/* ================= MOBILE BOTTOM NAV ================= */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-50">

        <div className="grid grid-cols-4 h-16">

          {/* HOME */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center ${
                isActive ? "text-sky-500" : "text-gray-500"
              }`
            }
          >
            <FaHome size={20} />
            <span className="text-[11px] mt-1">Home</span>
          </NavLink>

          {/* WISHLIST */}
          <NavLink
            to={customer ? "/wishlist" : "#"}
            onClick={(e) => {
              if (!customer) {
                e.preventDefault();
                setShowLogin(true);
              }
            }}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center ${
                isActive ? "text-red-500" : "text-gray-500"
              }`
            }
          >
            <FaHeart size={20} />

            {wishlist?.length > 0 && (
              <span className="absolute top-1 right-7 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}

            <span className="text-[11px] mt-1">Wishlist</span>
          </NavLink>

          {/* SEARCH */}
          <NavLink
            to="/properties"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center ${
                isActive ? "text-sky-500" : "text-gray-500"
              }`
            }
          >
            <FaSearch size={20} />
            <span className="text-[11px] mt-1">Search</span>
          </NavLink>

          {/* MORE */}
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className="flex flex-col items-center justify-center text-gray-500"
          >
            <FaCog size={20} />
            <span className="text-[11px] mt-1">More</span>
          </button>

        </div>
      </div>
      {/* ================= MORE MENU ================= */}
      {moreOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-[60]"
            onClick={() => setMoreOpen(false)}
          />

          <div className="md:hidden fixed bottom-16 left-0 right-0 bg-white rounded-t-3xl z-[70] p-6 shadow-2xl">

            <div className="w-14 h-1.5 bg-gray-300 rounded-full mx-auto mb-6"></div>

            <h3 className="text-lg font-semibold text-center mb-5">
              More Options
            </h3>

            <div className="space-y-3">

              <NavLink
                to="/about"
                onClick={() => setMoreOpen(false)}
                className="block p-4 rounded-xl bg-gray-50 hover:bg-sky-50"
              >
                About Us
              </NavLink>

              <NavLink
                to="/services"
                onClick={() => setMoreOpen(false)}
                className="block p-4 rounded-xl bg-gray-50 hover:bg-sky-50"
              >
                Services
              </NavLink>

              <NavLink
                to="/contact"
                onClick={() => setMoreOpen(false)}
                className="block p-4 rounded-xl bg-gray-50 hover:bg-sky-50"
              >
                Contact
              </NavLink>

            </div>
          </div>
        </>
        )}
    </>
  );
};

export default Navbar;