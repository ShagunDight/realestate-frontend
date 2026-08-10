import React, { useEffect, useState } from "react";

import Features from "../components/Features";
import FeaturedProperties from "../components/FeaturedProperties";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import MultiImageSlider from "../components/MultiImageSlider";
import MobileNearbyProperties from "../components/MobileNearbyProperties";

const Home = () => {

  const [filters, setFilters] = useState({
    location: "",
    type: "",
    space_use: "",
    listing_type: "",
    min_price: "",
    max_price: "",
  });

  const getMobileProperties = async (latitude = null, longitude = null) => {

    try {

      let url = "https://lightblue-moose-690494.hostingersite.com/api/properties";

      const params = new URLSearchParams();

      if (latitude && longitude) {

        params.append("latitude", latitude);
        params.append("longitude", longitude);
      }

      const response = await fetch(`${url}?${params.toString()}`);

      const data = await response.json();

      const properties =
        data?.data ||
        data?.properties ||
        data ||
        [];


    } catch (error) {

      console.error("Property Error:", error);

    } finally {

    }
  };

  useEffect(() => {

    if (!navigator.geolocation) {
      getMobileProperties();

      return;
    }

    navigator.geolocation.getCurrentPosition(

      (position) => {

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log("CURRENT LOCATION:", {
          latitude,
          longitude,
        });

        getMobileProperties(latitude, longitude);
      },

      (error) => {

        console.log("Location permission denied:", error);

        getMobileProperties();
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }, []);


  const handleSearch = async () => {

    try {

      const query = new URLSearchParams(filters).toString();

      const res = await fetch(`https://lightblue-moose-690494.hostingersite.com/api/properties?${query}`);

      const data = await res.json();

      console.log("SEARCH RESULT:", data);

    } catch (err) {

      console.error(err);
    }
  };


  const MobilePropertyCard = ({ property }) => {

    const image =
      property?.images?.[0] ||
      property?.image ||
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6";


    return (
      <div className="min-w-[285px] max-w-[285px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_8px_25px_rgba(0,0,0,0.07)]">

        {/* IMAGE */}

        <div className="relative h-[175px] w-full">
          <img src={image} alt={property?.title || "Property"} className="h-full w-full object-cover"/>

          {/* Listing Badge */}

          {property?.listing_type && (
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold text-sky-600 backdrop-blur">
              {property.listing_type}
            </span>
          )}
        </div>


        {/* CONTENT */}

        <div className="p-4">
          <h3 className="truncate text-base font-bold text-gray-900">
            {property?.title || "Beautiful Property"}
          </h3>

          <p className="mt-1 truncate text-xs text-gray-500">
            📍 {property?.location || "Nearby location"}
          </p>


          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-400">
                Price
              </p>

              <p className="text-sm font-bold text-sky-500">
                {property?.price ? `₹${property.price}` : "Price on request"}
              </p>
            </div>


            <button className="rounded-lg bg-sky-500 px-3 py-2 text-xs font-semibold text-white">
              View
            </button>
          </div>
        </div>
      </div>
    );
  };


  return (
    <>
      <section className="block overflow-hidden bg-white lg:hidden">

        {/* MOBILE HERO */}

        <div className="bg-gradient-to-b from-sky-50 to-white px-4 pb-7 pt-9">
          <div className="text-center">

            <h1 className="text-[36px] font-extrabold leading-[1.08] tracking-tight text-gray-900">
              Find Your

              <span className="block text-sky-500">
                Dream Property
              </span>

              With Confidence
            </h1>

            <p className="mx-auto mt-4 max-w-[350px] text-sm leading-6 text-gray-600">
              Find the perfect property easily with our modern
              platform designed to simplify your search.
            </p>

          </div>


          {/* SEARCH */}

          <div className="mt-7">
            <SearchBar filters={filters} setFilters={setFilters} onSearch={handleSearch} hideAdvancedFilters={true} />
          </div>
        </div>

        <MobileNearbyProperties />

      </section>


      <section className=" relative hidden overflow-hidden bg-white lg:block">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* LEFT */}
            <div className="text-center lg:text-left">

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                Find Your
                <span className="block text-sky-500">
                  Dream Property
                </span>
                With Confidence
              </h1>

              <p className="mt-4 text-gray-600 max-w-md mx-auto lg:mx-0 text-sm sm:text-base">
                Find the perfect property easily with our modern platform designed
                to simplify your search and help you discover homes that truly
                match your lifestyle and budget.
              </p>

              {/* STATS */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0">

                {
                  [
                    { num: "200+", text: "Customers" },
                    { num: "10k+", text: "Properties" },
                    { num: "16+", text: "Experience" },
                  ].map((item, i) => (
                    <div key={i} className="bg-white border border-gray-100 rounded-2xl py-4 sm:py-5 shadow-lg text-center">
                      <h2 className="text-base sm:text-lg font-bold text-gray-900">
                        {item.num}
                      </h2>
                      <p className="text-xs text-gray-500">
                        {item.text}
                      </p>
                    </div>
                  )
                )}

              </div>
            </div>

            {/* RIGHT */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] lg:max-w-[650px] h-[260px] sm:h-[320px] md:h-[380px] lg:h-[400px]">

                {/* glow */}
                <div className="absolute inset-0 bg-sky-300/20 blur-[80px] sm:blur-[100px] rounded-full"></div>

                <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00" alt="building" className="w-full h-full object-cover rounded-2xl sm:rounded-[32px] shadow-2xl"/>

                {/* ROTATING CIRCLE (HIDE ON SMALL SCREENS) */}
                <div className="hidden sm:block absolute left-[-40px] lg:left-[-50px] top-1/2 -translate-y-1/2">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-sky-200 shadow-lg">
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

                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-sky-500 rounded-full flex items-center justify-center text-white z-10 text-xs sm:text-sm">
                      ↗
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* DESKTOP SEARCH */}

        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <div className="mt-6 md:mt-8 mb-6 md:mb-8">

            <SearchBar filters={filters} setFilters={setFilters} onSearch={handleSearch}/>

          </div>
        </div>
      </section>


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