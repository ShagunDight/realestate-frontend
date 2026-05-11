import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm">
      {/* Top Banner */}
      <div className="w-full bg-sky-50 py-3 text-center border-b border-sky-100">
        <p className="text-sm text-gray-600">
          Discover Your Dream Property{" "}
          <span className="underline ml-2 cursor-pointer text-sky-500">
            Learn More
          </span>
        </p>
      </div>

      {/* Main  */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-sky-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">E</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Estatein</span>
        </div>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-2 p-1 rounded-xl ">
          <NavLink to="/"
            className={({ isActive }) =>
              `px-5 py-2.5 rounded-lg transition-all ${
                isActive
                  ? "bg-sky-100/70 text-sky-600 backdrop-blur-lg border border-white/40 shadow-sm"
                  : "text-gray-600 hover:text-sky-500"
              }`
            }>
            Home
          </NavLink>

          <NavLink to="/about"
            className={({ isActive }) =>
              `px-5 py-2.5 rounded-lg transition-all ${
                isActive
                  ? "bg-sky-100/70 text-sky-600 backdrop-blur-lg border border-white/40 shadow-sm"
                  : "text-gray-600 hover:text-sky-500"
              }`
            }>
            About
          </NavLink>

          <NavLink to="/properties"
            className={({ isActive }) =>
              `px-5 py-2.5 rounded-lg transition-all ${
                isActive
                  ? "bg-sky-100/70 text-sky-600 backdrop-blur-lg border border-white/40 shadow-sm"
                  : "text-gray-600 hover:text-sky-500"
              }`
            }>
            Properties
          </NavLink>

          <NavLink to="/services"
            className={({ isActive }) =>
              `px-5 py-2.5 rounded-lg transition-all ${
                isActive
                  ? "bg-sky-100/70 text-sky-600 backdrop-blur-lg border border-white/40 shadow-sm"
                  : "text-gray-600 hover:text-sky-500"
              }`
            }>
            Services
          </NavLink>

          {/*Button */}
          <div className="hidden md:block">
            <Link to="/contact" className="bg-sky-500 text-white px-5 py-2 rounded-lg hover:bg-sky-600">
              Contact
            </Link>
          </div>
        </ul>


        {/* Menu Icon */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-4 flex flex-col gap-3 animate-fadeIn">
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-center ${
                  isActive
                    ? "bg-sky-100 text-sky-600 backdrop-blur-md"
                    : "text-gray-700 hover:bg-sky-50"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-center ${
                  isActive
                    ? "bg-sky-100 text-sky-600 backdrop-blur-md"
                    : "text-gray-700 hover:bg-sky-50"
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/properties"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-center ${
                  isActive
                    ? "bg-sky-100 text-sky-600 backdrop-blur-md"
                    : "text-gray-700 hover:bg-sky-50"
                }`
              }
            >
              Properties
            </NavLink>

            <NavLink
              to="/services"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-center ${
                  isActive
                    ? "bg-sky-100 text-sky-600 backdrop-blur-md"
                    : "text-gray-700 hover:bg-sky-50"
                }`
              }
            >
              Services
            </NavLink>

            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 bg-sky-500 text-white px-4 py-2 rounded-lg text-center hover:bg-sky-600"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
