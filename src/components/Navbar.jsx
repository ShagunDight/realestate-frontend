import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiChevronDown,
} from "react-icons/fi";
import {
  FaUserCircle,
  FaHeart,
  FaHome,
  FaSearch,
  FaCog,
  FaBuilding,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useWishlist } from "./WishlistContext";

const Navbar = ({ setShowLogin, customer, setCustomer }) => {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { wishlist } = useWishlist();
  const [customerInfo, setCustomerInfo] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
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
    `
      relative flex items-center justify-center
      px-4 py-2.5
      rounded-xl
      text-sm font-medium
      whitespace-nowrap
      transition-all duration-300 ease-out
      ${
        isActive
          ? "bg-sky-100 text-sky-600 shadow-sm"
          : "text-gray-600 hover:text-sky-500 hover:bg-gray-50"
      }
    `;

  const mobileNavClass = ({ isActive }) =>
    `
      flex flex-col items-center justify-center
      h-full
      relative
      transition-all duration-300
      ${
        isActive
          ? "text-sky-500"
          : "text-gray-500 hover:text-sky-500"
      }
    `;

  return (
    <>
      {/* =====================================================
          NAVBAR
      ====================================================== */}
      <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-2xl border-b border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">

        {/* =================================================
            TOP ANNOUNCEMENT BAR
        ================================================== */}
        <div className="relative overflow-hidden bg-gradient-to-r from-sky-500 to-blue-500 text-white">
          <div className="mx-auto flex min-h-[34px] max-w-7xl items-center justify-center px-4 text-center">
            <p className="text-[11px] font-medium tracking-wide sm:text-xs md:text-sm">
              Discover Your Dream Property — Built for Modern Living
            </p>
          </div>
        </div>

        {/* =================================================
            MAIN NAVIGATION
        ================================================== */}
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-5 md:px-6 md:py-4 lg:px-8">

          {/* =================================================
              LOGO
          ================================================== */}
          <Link
            to="/"
            className="group flex min-w-0 items-center gap-2.5"
          >
            <div
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-2xl
                bg-sky-500
                shadow-[0_8px_20px_rgba(14,165,233,0.25)]
                transition-all duration-300
                group-hover:-translate-y-0.5
                group-hover:shadow-[0_10px_25px_rgba(14,165,233,0.32)]
                sm:h-11 sm:w-11
              "
            >
              <span className="text-base font-bold text-white sm:text-lg">
                E
              </span>
            </div>

            <div className="hidden min-[400px]:block">
              <span className="block text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
                Estatein
              </span>
              <span className="hidden text-[9px] font-medium uppercase tracking-[0.18em] text-gray-400 lg:block">
                Premium Real Estate
              </span>
            </div>
          </Link>

          {/* =================================================
              DESKTOP MENU
          ================================================== */}
          <div className="hidden items-center gap-2 md:flex">

            {/* MENU WRAPPER */}
            <div className="flex items-center gap-1 rounded-2xl border border-gray-100 bg-gray-50/70 p-1.5 shadow-sm backdrop-blur-sm">

              <NavLink to="/" className={navClass}>
                Home
              </NavLink>

              <NavLink to="/about" className={navClass}>
                About
              </NavLink>

              <NavLink to="/properties" className={navClass}>
                Properties
              </NavLink>

              <NavLink to="/services" className={navClass}>
                Services
              </NavLink>

              <NavLink to="/contact" className={navClass}>
                Contact
              </NavLink>
            </div>

            {/* =================================================
                AUTH AREA
            ================================================== */}
            <div className="ml-1.5 flex items-center">

              {!customerInfo ? (
                <button
                  onClick={() => setShowLogin(true)}
                  className="
                    rounded-xl
                    bg-sky-500
                    px-5 py-2.5
                    text-sm font-semibold
                    text-white
                    shadow-[0_8px_20px_rgba(14,165,233,0.20)]
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:bg-sky-600
                    hover:shadow-[0_10px_24px_rgba(14,165,233,0.28)]
                    active:translate-y-0
                  "
                >
                  Login
                </button>
              ) : (
                <div
                  className="relative"
                  ref={profileRef}
                >

                  {/* PROFILE BUTTON */}
                  <button
                    type="button"
                    onClick={() => setProfileOpen(!profileOpen)}
                    aria-label="Open profile menu"
                    className="
                      ml-1
                      flex h-11 w-11
                      items-center justify-center
                      rounded-full
                      bg-sky-50
                      p-0.5
                      shadow-sm
                      ring-1 ring-sky-100
                      transition-all duration-300
                      hover:scale-105
                      hover:bg-sky-100
                      hover:shadow-md
                    "
                  >
                    <img
                      alt=""
                      className="
                        h-10 w-10
                        rounded-full
                        border-[3px]
                        border-sky-500
                        object-cover
                      "
                      src={
                        customerInfo.image
                          ? `https://lightblue-moose-690494.hostingersite.com/public${customerInfo.image}`
                          : `https://ui-avatars.com/api/?name=${customerInfo.name}`
                      }
                    />
                  </button>

                  {/* =================================================
                      DESKTOP PROFILE DROPDOWN
                  ================================================== */}
                  {profileOpen && (
                    <div
                      className="
                        absolute right-0 mt-3 w-[300px]
                        overflow-hidden
                        rounded-2xl
                        border border-gray-100
                        bg-white
                        shadow-[0_20px_60px_rgba(0,0,0,0.14)]
                        animate-fadeIn
                      "
                    >
                      {/* HEADER */}
                      <div className="bg-gradient-to-r from-sky-500 to-blue-500 p-5 text-white">
                        <div className="flex items-center gap-3.5">

                          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white/40 bg-white/15">
                            {customerInfo.image ? (
                              <img
                                src={`https://lightblue-moose-690494.hostingersite.com/public${customerInfo.image}`}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <FaUserCircle className="text-5xl" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <h4 className="truncate text-sm font-semibold sm:text-base">
                              {customerInfo?.name || "Customer"}
                            </h4>

                            <p className="mt-0.5 truncate text-xs text-sky-100">
                              {customerInfo?.email || ""}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* MENU */}
                      <div className="p-2.5">

                        <Link
                          to="/profile"
                          className="
                            group flex items-center gap-3
                            rounded-xl px-4 py-3
                            text-sm text-gray-700
                            transition-all duration-200
                            hover:bg-sky-50
                            hover:text-sky-600
                          "
                          onClick={() => setProfileOpen(false)}
                        >
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 transition group-hover:bg-sky-100">
                            <FaUser className="text-sky-500" />
                          </span>
                          <span className="font-medium">
                            My Profile
                          </span>
                        </Link>

                        <Link
                          to="/wishlist"
                          className="
                            group flex items-center gap-3
                            rounded-xl px-4 py-3
                            text-sm text-gray-700
                            transition-all duration-200
                            hover:bg-red-50
                            hover:text-red-500
                          "
                          onClick={() => setProfileOpen(false)}
                        >
                          <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 transition group-hover:bg-red-100">
                            <FaHeart className="text-red-500" />

                            {wishlist?.length > 0 && (
                              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                                {wishlist.length}
                              </span>
                            )}
                          </span>

                          <span className="font-medium">
                            Wishlist
                          </span>
                        </Link>

                        <Link
                          to="/properties"
                          className="
                            group flex items-center gap-3
                            rounded-xl px-4 py-3
                            text-sm text-gray-700
                            transition-all duration-200
                            hover:bg-sky-50
                            hover:text-sky-600
                          "
                          onClick={() => setProfileOpen(false)}
                        >
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 transition group-hover:bg-sky-100">
                            <FaBuilding className="text-sky-500" />
                          </span>

                          <span className="font-medium">
                            Browse Properties
                          </span>
                        </Link>

                        <div className="my-2 border-t border-gray-100" />

                        <button
                          type="button"
                          className="
                            flex w-full items-center gap-3
                            rounded-xl px-4 py-3
                            text-sm font-medium
                            text-red-500
                            transition-all duration-200
                            hover:bg-red-50
                          "
                          onClick={() => {
                            setProfileOpen(false);
                            handleLogout();
                          }}
                        >
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50">
                            <FaSignOutAlt />
                          </span>

                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* =================================================
              MOBILE AUTH
          ================================================== */}
          <div
            className="relative flex items-center md:hidden"
            ref={profileRef}
          >
            {!customerInfo ? (
              <button
                type="button"
                onClick={() => setShowLogin(true)}
                aria-label="Login"
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-xl
                  bg-sky-500
                  text-white
                  shadow-[0_6px_18px_rgba(14,165,233,0.22)]
                  transition-all duration-300
                  hover:bg-sky-600
                  active:scale-95
                "
              >
                <FaUser size={15} />
              </button>
            ) : (
              <>
                {/* PROFILE BUTTON */}
                <button
                  type="button"
                  onClick={() => setProfileOpen(!profileOpen)}
                  aria-label="Open profile menu"
                  className="
                    flex h-11 w-11
                    items-center justify-center
                    rounded-xl
                    bg-sky-50
                    p-0.5
                    shadow-sm
                    ring-1 ring-sky-100
                    transition-all duration-300
                    hover:bg-sky-100
                    active:scale-95
                  "
                >
                  <img
                    alt=""
                    className="
                      h-10 w-10
                      rounded-full
                      border-[3px]
                      border-sky-500
                      object-cover
                    "
                    src={
                      customerInfo.image
                        ? `https://lightblue-moose-690494.hostingersite.com/public${customerInfo.image}`
                        : `https://ui-avatars.com/api/?name=${customerInfo.name}`
                    }
                  />
                </button>

                {/* MOBILE PROFILE DROPDOWN */}
                {profileOpen && (
                  <div
                    className="
                      absolute right-0 top-[52px]
                      z-[80]
                      w-[280px]
                      overflow-hidden
                      rounded-2xl
                      border border-gray-100
                      bg-white
                      shadow-[0_20px_50px_rgba(0,0,0,0.16)]
                      animate-fadeIn
                    "
                  >
                    {/* HEADER */}
                    <div className="bg-gradient-to-r from-sky-500 to-blue-500 p-4 text-white">
                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white/40 bg-white/15">
                          {customerInfo.image ? (
                            <img
                              src={`https://lightblue-moose-690494.hostingersite.com/public${customerInfo.image}`}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <FaUserCircle className="text-4xl" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {customerInfo?.name || "Customer"}
                          </p>

                          <p className="mt-0.5 truncate text-[11px] text-sky-100">
                            {customerInfo?.email || ""}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* MENU */}
                    <div className="p-2">

                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="
                          flex items-center gap-3
                          rounded-xl px-3 py-3
                          text-sm text-gray-700
                          transition-all duration-200
                          hover:bg-sky-50
                          hover:text-sky-600
                        "
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50">
                          <FaUser className="text-sky-500" />
                        </span>

                        <span className="font-medium">
                          My Profile
                        </span>
                      </Link>

                      <Link
                        to="/wishlist"
                        onClick={() => setProfileOpen(false)}
                        className="
                          flex items-center gap-3
                          rounded-xl px-3 py-3
                          text-sm text-gray-700
                          transition-all duration-200
                          hover:bg-red-50
                          hover:text-red-500
                        "
                      >
                        <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-red-50">
                          <FaHeart className="text-red-500" />

                          {wishlist?.length > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                              {wishlist.length}
                            </span>
                          )}
                        </span>

                        <span className="font-medium">
                          Wishlist
                        </span>
                      </Link>

                      <Link
                        to="/properties"
                        onClick={() => setProfileOpen(false)}
                        className="
                          flex items-center gap-3
                          rounded-xl px-3 py-3
                          text-sm text-gray-700
                          transition-all duration-200
                          hover:bg-sky-50
                          hover:text-sky-600
                        "
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50">
                          <FaBuilding className="text-sky-500" />
                        </span>

                        <span className="font-medium">
                          Browse Properties
                        </span>
                      </Link>

                      <div className="my-2 border-t border-gray-100" />

                      <button
                        type="button"
                        className="
                          flex w-full items-center gap-3
                          rounded-xl px-3 py-3
                          text-sm font-medium
                          text-red-500
                          transition-all duration-200
                          hover:bg-red-50
                        "
                        onClick={() => {
                          setProfileOpen(false);
                          handleLogout();
                        }}
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50">
                          <FaSignOutAlt />
                        </span>

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

      {/* =====================================================
          MOBILE BOTTOM NAVIGATION
          ALWAYS FIXED AT BOTTOM
      ====================================================== */}
      <div
        className="
          fixed bottom-0 left-0 right-0
          z-[100]
          border-t border-gray-200/80
          bg-white/95
          shadow-[0_-8px_30px_rgba(0,0,0,0.08)]
          backdrop-blur-xl
          md:hidden
        "
      >
        <div className="mx-auto grid h-[68px] max-w-md grid-cols-4 px-2">

          {/* HOME */}
          <NavLink
            to="/"
            className={mobileNavClass}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute top-0 h-1 w-8 rounded-b-full bg-sky-500" />
                )}

                <span
                  className={`
                    flex h-9 w-9 items-center justify-center rounded-xl
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-sky-50 text-sky-500"
                        : "text-gray-500"
                    }
                  `}
                >
                  <FaHome size={18} />
                </span>

                <span
                  className={`
                    mt-0.5 text-[10px] font-medium
                    ${
                      isActive
                        ? "text-sky-500"
                        : "text-gray-500"
                    }
                  `}
                >
                  Home
                </span>
              </>
            )}
          </NavLink>

          {/* WISHLIST */}
          <NavLink
            to={customerInfo ? "/wishlist" : "#"}
            onClick={(e) => {
              if (!customerInfo) {
                e.preventDefault();
                setShowLogin(true);
              }
            }}
            className={({ isActive }) =>
              `${mobileNavClass({
                isActive: customerInfo && isActive,
              })}`
            }
          >
            {({ isActive }) => {
              const active = customerInfo && isActive;

              return (
                <>
                  {active && (
                    <span className="absolute top-0 h-1 w-8 rounded-b-full bg-red-500" />
                  )}

                  <span
                    className={`
                      relative flex h-9 w-9 items-center justify-center rounded-xl
                      transition-all duration-300
                      ${
                        active
                          ? "bg-red-50 text-red-500"
                          : "text-gray-500"
                      }
                    `}
                  >
                    <FaHeart size={18} />

                    {wishlist?.length > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white shadow-sm">
                        {wishlist.length > 99 ? "99+" : wishlist.length}
                      </span>
                    )}
                  </span>

                  <span
                    className={`
                      mt-0.5 text-[10px] font-medium
                      ${
                        active
                          ? "text-red-500"
                          : "text-gray-500"
                      }
                    `}
                  >
                    Wishlist
                  </span>
                </>
              );
            }}
          </NavLink>

          {/* SEARCH */}
          <NavLink
            to="/properties"
            className={mobileNavClass}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute top-0 h-1 w-8 rounded-b-full bg-sky-500" />
                )}

                <span
                  className={`
                    flex h-9 w-9 items-center justify-center rounded-xl
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-sky-50 text-sky-500"
                        : "text-gray-500"
                    }
                  `}
                >
                  <FaSearch size={17} />
                </span>

                <span
                  className={`
                    mt-0.5 text-[10px] font-medium
                    ${
                      isActive
                        ? "text-sky-500"
                        : "text-gray-500"
                    }
                  `}
                >
                  Search
                </span>
              </>
            )}
          </NavLink>

          {/* MORE */}
          <button
            type="button"
            onClick={() => setMoreOpen(!moreOpen)}
            className="
              relative flex h-full flex-col
              items-center justify-center
              text-gray-500
              transition-all duration-300
              hover:text-sky-500
            "
          >
            {moreOpen && (
              <span className="absolute top-0 h-1 w-8 rounded-b-full bg-sky-500" />
            )}

            <span
              className={`
                flex h-9 w-9 items-center justify-center rounded-xl
                transition-all duration-300
                ${
                  moreOpen
                    ? "bg-sky-50 text-sky-500"
                    : "text-gray-500"
                }
              `}
            >
              <FaCog size={18} />
            </span>

            <span
              className={`
                mt-0.5 text-[10px] font-medium
                ${
                  moreOpen
                    ? "text-sky-500"
                    : "text-gray-500"
                }
              `}
            >
              More
            </span>
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE MORE MENU
      ====================================================== */}
      {moreOpen && (
        <>
          {/* OVERLAY */}
          <div
            className="
              fixed inset-0
              z-[110]
              bg-black/40
              backdrop-blur-[2px]
              md:hidden
            "
            onClick={() => setMoreOpen(false)}
          />

          {/* BOTTOM SHEET */}
          <div
            className="
              fixed bottom-[68px] left-0 right-0
              z-[120]
              rounded-t-[28px]
              border-t border-gray-100
              bg-white
              p-5
              shadow-[0_-15px_50px_rgba(0,0,0,0.14)]
              animate-fadeIn
              md:hidden
            "
          >
            {/* HANDLE */}
            <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-gray-300" />

            {/* HEADER */}
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  More Options
                </h3>

                <p className="mt-0.5 text-xs text-gray-400">
                  Explore more from Estatein
                </p>
              </div>

              <button
                type="button"
                onClick={() => setMoreOpen(false)}
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-xl
                  bg-gray-50
                  text-gray-500
                  transition-all duration-200
                  hover:bg-gray-100
                  hover:text-gray-700
                "
                aria-label="Close menu"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* OPTIONS */}
            <div className="grid grid-cols-2 gap-3">

              <NavLink
                to="/services"
                onClick={() => setMoreOpen(false)}
                className="
                  group flex items-center gap-3
                  rounded-2xl
                  border border-gray-100
                  bg-gray-50/80
                  p-4
                  transition-all duration-300
                  hover:border-sky-100
                  hover:bg-sky-50
                "
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sky-500 shadow-sm transition group-hover:bg-sky-50">
                  <FaBuilding size={15} />
                </span>

                <span className="text-sm font-semibold text-gray-700 group-hover:text-sky-600">
                  Services
                </span>
              </NavLink>

              <NavLink
                to="/faq"
                onClick={() => setMoreOpen(false)}
                className="
                  group flex items-center gap-3
                  rounded-2xl
                  border border-gray-100
                  bg-gray-50/80
                  p-4
                  transition-all duration-300
                  hover:border-sky-100
                  hover:bg-sky-50
                "
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sky-500 shadow-sm transition group-hover:bg-sky-50">
                  <span className="text-sm font-bold">?</span>
                </span>

                <span className="text-sm font-semibold text-gray-700 group-hover:text-sky-600">
                  FAQ
                </span>
              </NavLink>

              <NavLink
                to="/about"
                onClick={() => setMoreOpen(false)}
                className="
                  group flex items-center gap-3
                  rounded-2xl
                  border border-gray-100
                  bg-gray-50/80
                  p-4
                  transition-all duration-300
                  hover:border-sky-100
                  hover:bg-sky-50
                "
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sky-500 shadow-sm transition group-hover:bg-sky-50">
                  <FaUserCircle size={17} />
                </span>

                <span className="text-sm font-semibold text-gray-700 group-hover:text-sky-600">
                  About Us
                </span>
              </NavLink>

              <NavLink
                to="/contact"
                onClick={() => setMoreOpen(false)}
                className="
                  group flex items-center gap-3
                  rounded-2xl
                  border border-gray-100
                  bg-gray-50/80
                  p-4
                  transition-all duration-300
                  hover:border-sky-100
                  hover:bg-sky-50
                "
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sky-500 shadow-sm transition group-hover:bg-sky-50">
                  <FaSearch size={15} />
                </span>

                <span className="text-sm font-semibold text-gray-700 group-hover:text-sky-600">
                  Contact
                </span>
              </NavLink>

              <NavLink
                to="/privacy-policy"
                onClick={() => setMoreOpen(false)}
                className="
                  col-span-2
                  group flex items-center justify-center gap-2
                  rounded-2xl
                  border border-gray-100
                  bg-gray-50/80
                  p-3.5
                  text-center
                  transition-all duration-300
                  hover:border-sky-100
                  hover:bg-sky-50
                "
              >
                <span className="text-sm font-semibold text-gray-700 group-hover:text-sky-600">
                  Privacy Policy
                </span>
              </NavLink>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;