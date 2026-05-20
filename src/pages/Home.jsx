import React, { useState } from "react";
import { HiSparkles } from "react-icons/hi";
import Features from "../components/Features";
import FeaturedProperties from "../components/FeaturedProperties";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import MultiImageSlider from "../components/MultiImageSlider";

const Home = () => {
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    space_use: "",
    listing_type: "",
    min_price: "",
    max_price: "",
  });

  const handleSearch = async () => {
    try {
      const query = new URLSearchParams(filters).toString();

      const res = await fetch(`http://127.0.0.1:8001/api/properties?${query}`);

      const data = await res.json();

      console.log("RESULT:", data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      {/* HERO SECTION */}
      <section className="w-full bg-white py-16">
        <div className="max-w-[1300px] mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
          {/* LEFT */}
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Discover Your Dream Property with Estatein
            </h1>

            <p className="mt-4 text-gray-600 max-w-md">
              Find the perfect property easily with our modern platform designed
              to simplify your search and help you discover homes that truly
              match your lifestyle and budget.
            </p>

            {/* SEARCH BAR */}
            <div className="mt-6">
              <SearchBar filters={filters} setFilters={setFilters} onSearch={handleSearch}/>
            </div>
            <div className="mt-6 flex gap-4 flex-wrap">
              {/* <button className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition">
                Learn More
              </button> */}

              {/* <button className="px-6 py-3 bg-sky-500 text-white rounded-xl hover:bg-sky-600 shadow-md">
                Browse Properties
              </button> */}
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-xl">
              {[
                { num: "200+", text: "Customers" },
                { num: "10k+", text: "Properties" },
                { num: "16+", text: "Experience" },
              ].map((item, i) => (
                <div key={i} className="bg-sky-100/70 border border-gray-200 rounded-xl py-4 shadow-sm text-center">
                  <h2 className="text-lg font-bold text-gray-900">
                    {item.num}
                  </h2>
                  <p className="text-xs text-gray-500">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[650px] h-[380px] lg:h-[400px]">
              <div className="absolute inset-0 bg-sky-300/20 blur-[100px] rounded-full"></div>
              <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00" alt="building" className="w-full h-full object-cover rounded-3xl shadow-xl"/>

              {/* Circle */}
              <div className="absolute left-[-50px] top-1/2 -translate-y-1/2">
                <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-sky-200 shadow-lg">
                  <svg className="absolute w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                    <defs>
                      <path id="circlePath" d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"/>
                    </defs>

                    <text fill="#0EA5E9" fontSize="10" letterSpacing="2">
                      <textPath href="#circlePath">
                        • DISCOVER • DREAM • PROPERTY •
                      </textPath>
                    </text>
                  </svg>

                  <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center text-white z-10">
                    ↗
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {}
      <Features />
      <FeaturedProperties />
      <MultiImageSlider />
      <Testimonials />
      <CTASection />
      <FAQ />
      <Footer />
    </>
  );
};

export default Home;
