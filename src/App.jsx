import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import About from "./pages/About";
import Services from "./pages/Services";
import CustomerLogin from "./pages/CustomerLogin";
import AgentProfile from "./pages/AgentProfile";
import WishlistPage from "./pages/WishlistPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQPage from "./pages/FAQPage";
import CustomerProfile from "./pages/CustomerProfile";

import { LoadScript } from "@react-google-maps/api";
import { WishlistProvider } from "./components/WishlistContext";

const API_KEY =
  "AIzaSyD-5EHYR_BK19i4x7gASRqFx0qvVW0u28w";

const GOOGLE_MAPS_LIBRARIES = ["places"];

function App() {
  const [showLogin, setShowLogin] =
    useState(false);

  const [customer, setCustomer] =
    useState(() => {
      const storedCustomer =
        localStorage.getItem(
          "customer"
        );

      try {
        return storedCustomer
          ? JSON.parse(storedCustomer)
          : null;
      } catch {
        return null;
      }
    });

  return (
    <LoadScript
      googleMapsApiKey={API_KEY}
      libraries={GOOGLE_MAPS_LIBRARIES}
    >
      <WishlistProvider>
        <div className="app-shell min-h-screen bg-white text-gray-900">

          <CustomerLogin
            open={showLogin}
            setOpen={setShowLogin}
            setCustomer={setCustomer}
          />

          <Navbar
            setShowLogin={setShowLogin}
            customer={customer}
            setCustomer={setCustomer}
          />

          <main className="app-main pb-12 md:pb-0">
            <Routes>

              <Route
                path="/"
                element={<Home />}
              />

              <Route
                path="/properties"
                element={
                  <Properties
                    setShowLogin={
                      setShowLogin
                    }
                  />
                }
              />

              <Route
                path="/property/:id"
                element={
                  <PropertyDetails
                    setShowLogin={
                      setShowLogin
                    }
                  />
                }
              />

              <Route
                path="/listings"
                element={<Listings />}
              />

              <Route
                path="/blogs"
                element={<Blogs />}
              />

              <Route
                path="/blog/:slug"
                element={<BlogDetails />}
              />

              <Route
                path="/about"
                element={<About />}
              />

              <Route
                path="/services"
                element={<Services />}
              />

              <Route
                path="/contact"
                element={<Contact />}
              />

              <Route
                path="/agent/:id"
                element={<AgentProfile />}
              />

              <Route
                path="/wishlist"
                element={<WishlistPage />}
              />

              <Route
                path="/faq"
                element={<FAQPage />}
              />

              <Route
                path="/privacy-policy"
                element={<PrivacyPolicy />}
              />

              <Route
                path="/profile"
                element={<CustomerProfile />}
              />

              <Route
                path="*"
                element={
                  <div className="flex min-h-[70vh] items-center justify-center px-4">
                    <div className="text-center">
                      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                        Error 404
                      </p>

                      <h1 className="text-3xl font-bold tracking-tight text-gray-700 sm:text-4xl">
                        Page Not Found
                      </h1>

                      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
                        The page you are looking for
                        does not exist or may have
                        been moved.
                      </p>
                    </div>
                  </div>
                }
              />

            </Routes>
          </main>
        </div>
      </WishlistProvider>
    </LoadScript>
  );
}

export default App;