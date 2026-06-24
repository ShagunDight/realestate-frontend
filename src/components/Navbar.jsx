import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaUserCircle, FaHeart, FaHome, FaSearch, FaCog, FaBuilding, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useWishlist } from "./WishlistContext";

const Navbar = ({ setShowLogin, customer, setCustomer }) => {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { wishlist } = useWishlist();
  const [customerInfo, setCustomerInfo] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("customer_token");
    const cu = localStorage.getItem("customer");

    if (cu) {
      try {
        setCustomerInfo(JSON.parse(cu));
      } catch (err) {
        console.log("navbar Do not have a values");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("customer_token");
    localStorage.removeItem("customer_id");
    localStorage.removeItem("customer");
    localStorage.removeItem("wishlist");

    setProfileOpen(false);
    setCustomer(null);
    setShowLogin(false);
    
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const navClass = ({ isActive }) =>
    `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? "bg-sky-100 text-sky-600 shadow-sm" : "text-gray-600 hover:text-sky-500 hover:bg-gray-50"}`;

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

              {!customerInfo ? (
                <button onClick={() => setShowLogin(true)} className="bg-sky-500 text-white px-5 py-2 rounded-xl hover:bg-sky-600 shadow-md transition">
                  Login
                </button>
              ) : (
                <>
                  <div className="relative" ref={profileRef}>
  

                    {/* Profile Button */}
                    <button className="ml-2 w-11 h-11 rounded-full bg-sky-100 hover:bg-sky-200 flex items-center justify-center transition"
                      onClick={() => setProfileOpen(!profileOpen)}
                    >
                      <img alt="" className="w-10 h-10 rounded-full mx-auto border-4 border-sky-500 object-cover"
                          src={ customerInfo.image ? `https://lightblue-moose-690494.hostingersite.com/public${customerInfo.image}` : `https://ui-avatars.com/api/?name=${customerInfo.name}`}
                      />
                    </button>

                    {/* Dropdown */}
                    {profileOpen && (
                      <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">

                        {/* Header */}
                        <div className="px-5 py-4 bg-gradient-to-r from-sky-500 to-blue-500 text-white">
                          <div className="flex items-center gap-3">
                            <FaUserCircle className="text-5xl" />

                            <div>
                              <h4 className="font-semibold">
                                {customerInfo?.name || "Customer"}
                              </h4>

                              <p className="text-xs text-sky-100">
                                {customerInfo?.email || ""}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Menu */}
                        <div className="p-2">

                          <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sky-50 transition" onClick={() => setProfileOpen(false)}>
                            <FaUser className="text-sky-500" />
                            My Profile
                          </Link>

                          <Link to="/wishlist" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sky-50 transition" onClick={() => setProfileOpen(false)}>
                            <FaHeart className="text-red-500" />
                            Wishlist
                          </Link>

                          <Link to="/properties" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sky-50 transition" onClick={() => setProfileOpen(false)}>
                            <FaBuilding className="text-sky-500" />
                            Browse Properties
                          </Link>

                          <hr className="my-2" />

                          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-500 transition"
                            onClick={() => {
                              setProfileOpen(false);
                              handleLogout();
                            }}
                          >
                            <FaSignOutAlt />
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* MOBILE AUTH BUTTON (ONLY MOBILE) */}
          <div className="md:hidden relative" ref={profileRef}>
            {!customerInfo ? (
              <button
                onClick={() => setShowLogin(true)}
                className="bg-sky-500 text-white px-3 py-3 rounded-xl shadow-md"
              >
                <FaUser />
              </button>
            ) : (
              <>
                {/* PROFILE BUTTON */}
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="bg-sky-100 text-sky-600 px-3 py-3 rounded-xl shadow-md"
                >
                  <FaUserCircle size={22} />
                </button>

                {/* DROPDOWN */}
                {profileOpen && (
                  <div className="absolute right-0 top-14 w-64 bg-white rounded-2xl shadow-2xl border z-50 overflow-hidden">

                    {/* HEADER */}
                    <div className="bg-gradient-to-r from-sky-500 to-blue-500 text-white p-4">
                      <p className="font-semibold">
                        {customerInfo?.name || "Customer"}
                      </p>
                      <p className="text-xs text-sky-100">
                        {customerInfo?.email}
                      </p>
                    </div>

                    {/* MENU */}
                    <div className="p-2">
                      <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 p-3 hover:bg-sky-50 rounded-xl">
                        <FaUser className="text-sky-500" />
                        My Profile
                      </Link>

                      <Link to="/wishlist" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 p-3 hover:bg-sky-50 rounded-xl">
                        <FaHeart className="text-red-500" />
                        Wishlist
                      </Link>
                        
                      <Link to="/properties" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sky-50 transition" onClick={() => setProfileOpen(false)}>
                        <FaBuilding className="text-sky-500" />
                        Browse Properties
                      </Link>

                      <hr className="my-2" />

                      <button className="w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-xl"
                        onClick={() => {
                          setProfileOpen(false);
                          handleLogout();
                        }}
                      >
                        <FaSignOutAlt />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
      
      {/* ================= MOBILE BOTTOM NAV ================= */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-50">
        <div className="grid grid-cols-4 h-16">

          {/* HOME */}
          <NavLink to="/" className={({ isActive }) => `flex flex-col items-center justify-center ${isActive ? "text-sky-500" : "text-gray-500"}` }>
            <FaHome size={20} />
            <span className="text-[11px] mt-1">Home</span>
          </NavLink>

          {/* WISHLIST */}
          <NavLink to={customerInfo ? "/wishlist" : "#"} onClick={(e) => {
            if (!customerInfo) {
              e.preventDefault();
              setShowLogin(true);
            }
            }} className={({ isActive }) => `relative flex flex-col items-center justify-center ${isActive ? "text-red-500" : "text-gray-500"}`}
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
          <NavLink to="/properties" className={({ isActive }) => `flex flex-col items-center justify-center ${isActive ? "text-sky-500" : "text-gray-500"}` }>
            <FaSearch size={20} />
            <span className="text-[11px] mt-1">Search</span>
          </NavLink>

          {/* MORE */}
          <button onClick={() => setMoreOpen(!moreOpen)} className="flex flex-col items-center justify-center text-gray-500">
            <FaCog size={20} />
            <span className="text-[11px] mt-1">More</span>
          </button>

        </div>
      </div>
      {/* ================= MORE MENU ================= */}
      {moreOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-[60]" onClick={() => setMoreOpen(false)}/>
          <div className="md:hidden fixed bottom-16 left-0 right-0 bg-white rounded-t-3xl z-[70] p-6 shadow-2xl">
            <div className="w-14 h-1.5 bg-gray-300 rounded-full mx-auto mb-6"></div>
            <h3 className="text-lg font-semibold text-center mb-5">
              More Options
            </h3>

            <div className="space-y-3">
              <NavLink to="/services" onClick={() => setMoreOpen(false)} className="block p-4 rounded-xl bg-gray-50 hover:bg-sky-50">
                Services
              </NavLink>

              <NavLink to="/faq" onClick={() => setMoreOpen(false)} className="block p-4 rounded-xl bg-gray-50 hover:bg-sky-50">
                FAQ
              </NavLink>

              <NavLink to="/about" onClick={() => setMoreOpen(false)} className="block p-4 rounded-xl bg-gray-50 hover:bg-sky-50">
                About Us
              </NavLink>

              <NavLink to="/contact" onClick={() => setMoreOpen(false)} className="block p-4 rounded-xl bg-gray-50 hover:bg-sky-50">
                Contact
              </NavLink>

              <NavLink to="/privacy-policy" onClick={() => setMoreOpen(false)} className="block p-4 rounded-xl bg-gray-50 hover:bg-sky-50">
                Privacy Policy
              </NavLink>
            </div>
          </div>
        </>
        )}
    </>
  );
};

export default Navbar;