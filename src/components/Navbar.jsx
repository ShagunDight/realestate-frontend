import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = ({ setShowLogin, customer, setCustomer }) => {
  const [open, setOpen] = useState(false);
  // ✅ auth state
  // const [customer, setCustomer] = useState(null);

  // check login
  useEffect(() => {
    const token = localStorage.getItem("customer_token");
    const email = localStorage.getItem("customer_email");

    if (token && email) {
      setCustomer({
        email,
      });
    }
  }, []);

  // logout
  const handleLogout = () => {
    localStorage.removeItem("customer_token");
    localStorage.removeItem("customer_email");

    setCustomer(null);
  };

  const navClass = ({ isActive }) =>
    `px-5 py-2.5 rounded-lg transition-all ${
      isActive
        ? "bg-sky-100/70 text-sky-600 backdrop-blur-lg border border-white/40 shadow-sm"
        : "text-gray-600 hover:text-sky-500"
    }`;

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">

      {/* TOP BAR */}
      <div className="w-full bg-sky-50 py-3 text-center border-b border-sky-100">
        <p className="text-sm text-gray-600">
          Discover Your Dream Property
          <span className="underline ml-2 cursor-pointer text-sky-500">
            Learn More
          </span>
        </p>
      </div>

      {/* MAIN NAV */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-sky-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">E</span>
          </div>

          <span className="text-xl font-bold text-gray-900">
            Estatein
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-2">

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

          {/* AUTH BUTTONS */}
          <div className="flex items-center gap-3 ml-4">

            {!customer ? (
              <button
                onClick={() => setShowLogin(true)}
                className="bg-sky-500 text-white px-5 py-2.5 rounded-lg hover:bg-sky-600 transition"
              >
                Login/Signup
              </button>
            ) : (
              <div className="flex items-center gap-3">

                {/* USER EMAIL */}
                {/* <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm">
                  {customer.email}
                </div> */}

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="border border-red-300 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE ICON */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-4 pb-4">

          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-4 flex flex-col gap-3 animate-fadeIn">

            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className={navClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setOpen(false)}
              className={navClass}
            >
              About
            </NavLink>

            <NavLink
              to="/properties"
              onClick={() => setOpen(false)}
              className={navClass}
            >
              Properties
            </NavLink>

            <NavLink
              to="/services"
              onClick={() => setOpen(false)}
              className={navClass}
            >
              Services
            </NavLink>

            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="bg-sky-500 text-white px-4 py-3 rounded-lg text-center hover:bg-sky-600 transition"
            >
              Contact
            </Link>

            {/* MOBILE AUTH */}
            <div className="border-t pt-4 flex flex-col gap-3">

              <NavLink
                to="/agent/login"
                onClick={() => setOpen(false)}
                className="text-center border border-gray-300 py-3 rounded-lg hover:bg-gray-50"
              >
                Login
              </NavLink>

              <NavLink
                to="/agent/register"
                onClick={() => setOpen(false)}
                className="text-center border border-gray-300 py-3 rounded-lg hover:bg-gray-50"
              >
                Sign Up
              </NavLink>

            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;