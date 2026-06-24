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
import { LoadScript } from "@react-google-maps/api";
import { WishlistProvider } from "./components/WishlistContext";
import CustomerProfile from "./pages/CustomerProfile";

const API_KEY = "AIzaSyD-5EHYR_BK19i4x7gASRqFx0qvVW0u28w";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const [customer, setCustomer] = useState(() => {
    const storedCustomer = localStorage.getItem("customer");
  });

  return (
    <LoadScript googleMapsApiKey={API_KEY} libraries={["places"]}>
      <WishlistProvider>
        <div className="min-h-screen bg-white">
          <CustomerLogin open={showLogin} setOpen={setShowLogin} setCustomer={setCustomer}/>
          <Navbar setShowLogin={setShowLogin} customer={customer} setCustomer={setCustomer}/>
          <div className="pb-12 md:pb-0">
            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<Properties setShowLogin={setShowLogin} />} />
              <Route path="/property/:id" element={<PropertyDetails setShowLogin={setShowLogin} />} />

              <Route path="/listings" element={<Listings />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blog/:slug" element={<BlogDetails />} />

              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/agent/:id" element={<AgentProfile />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/profile" element={<CustomerProfile />} />

              {/* 404 */}
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
        </div>
      </WishlistProvider>
    </LoadScript>
  );
}

export default App;