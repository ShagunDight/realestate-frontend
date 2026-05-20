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
import { LoadScript } from "@react-google-maps/api";

const API_KEY = "AIzaSyD-5EHYR_BK19i4x7gASRqFx0qvVW0u28w";
function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [customer, setCustomer] = useState(() => {
    const token = localStorage.getItem("customer_token");
    const email = localStorage.getItem("customer_email");

    return token && email ? { email } : null;
  });
  return (
    <LoadScript googleMapsApiKey={API_KEY} libraries={["places"]}>
      <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
        <CustomerLogin open={showLogin} setOpen={setShowLogin} setCustomer={setCustomer}/>
        <Navbar setShowLogin={setShowLogin} customer={customer} setCustomer={setCustomer}/>
        <Routes>

          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* PROPERTY */}
          <Route path="/properties" element={<Properties />} />
          <Route path="/property/:id" element={<PropertyDetails />} />

          {/* LISTINGS */}
          <Route path="/listings" element={<Listings />} />

          {/* BLOG */}
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />

          {/* PAGES */}
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />

          {/* 404 PAGE */}
          <Route path="*"
            element={
              <div className="flex items-center justify-center min-h-[80vh]">
                <h1 className="text-3xl font-bold text-gray-700">
                  404 - Page Not Found
                </h1>
              </div>
            }
          />
        </Routes>
      </div>
    </LoadScript>
  );
}

export default App;
