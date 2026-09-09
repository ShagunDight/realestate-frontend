import React, { useState } from "react";

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

  const handleSearch = async () => {
    try {
      const query = new URLSearchParams(filters).toString();

      const res = await fetch(
        `https://lightblue-moose-690494.hostingersite.com/api/properties?${query}`,
      );

      const data = await res.json();

      console.log("SEARCH RESULT:", data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* =========================================================
          MOBILE + TABLET HERO
      ========================================================== */}
      <section className="block overflow-hidden bg-white lg:hidden">
        <div className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-white">
          {/* Decorative Background */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />

          <div className="pointer-events-none absolute -left-28 top-64 h-64 w-64 rounded-full bg-blue-100/40 blur-3xl" />

          <div className="pointer-events-none absolute right-1/3 top-1/3 h-24 w-24 rounded-full bg-sky-100/30 blur-2xl" />

          <div className="relative mx-auto w-full max-w-5xl px-4 pb-10 pt-8 sm:px-6 sm:pb-12 sm:pt-12 md:px-8 md:pt-14">
            {/* HERO TEXT */}
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/90 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-sky-500 shadow-sm backdrop-blur-sm sm:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                  Find Your Perfect Place
                </span>
              </div>

              <h1 className="text-[34px] font-extrabold leading-[1.04] tracking-[-0.04em] text-gray-900 sm:text-[44px] md:text-[52px]">
                Find Your
                <span className="block text-sky-500">Dream Property</span>
                With Confidence
              </h1>

              <p className="mx-auto mt-4 max-w-[620px] text-[13px] leading-6 text-gray-600 sm:text-sm sm:leading-7 md:text-base">
                Find the perfect property easily with our modern platform
                designed to simplify your search and help you discover a place
                that truly feels like home.
              </p>
            </div>

            {/* SEARCH */}
            <div className="relative z-20 mx-auto mt-7 max-w-4xl sm:mt-9 md:mt-10">
              <div
                className="
                  rounded-[22px]
                  border border-white
                  bg-white/90
                  p-1.5
                  shadow-[0_18px_50px_rgba(14,165,233,0.12)]
                  backdrop-blur-xl
                  sm:rounded-3xl
                  sm:p-2
                "
              >
                <SearchBar
                  filters={filters}
                  setFilters={setFilters}
                  onSearch={handleSearch}
                  hideAdvancedFilters={true}
                />
              </div>
            </div>

            {/* SMALL TRUST ROW */}
            <div className="mx-auto mt-7 grid max-w-xl grid-cols-3 gap-2 sm:mt-9 sm:gap-3">
              <div className="rounded-2xl border border-gray-100 bg-white/85 px-2 py-3 text-center shadow-sm backdrop-blur-sm">
                <p className="text-base font-extrabold text-gray-900 sm:text-lg">
                  10K+
                </p>

                <p className="mt-0.5 text-[9px] font-medium uppercase tracking-wide text-gray-400 sm:text-[10px]">
                  Properties
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white/85 px-2 py-3 text-center shadow-sm backdrop-blur-sm">
                <p className="text-base font-extrabold text-gray-900 sm:text-lg">
                  200+
                </p>

                <p className="mt-0.5 text-[9px] font-medium uppercase tracking-wide text-gray-400 sm:text-[10px]">
                  Customers
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white/85 px-2 py-3 text-center shadow-sm backdrop-blur-sm">
                <p className="text-base font-extrabold text-gray-900 sm:text-lg">
                  16+
                </p>

                <p className="mt-0.5 text-[9px] font-medium uppercase tracking-wide text-gray-400 sm:text-[10px]">
                  Experience
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE NEARBY */}
        <div className="bg-white px-4 pb-10 pt-4 sm:px-6 md:px-8 md:pb-12">
          <MobileNearbyProperties />
        </div>
      </section>

      {/* =========================================================
          DESKTOP HERO
      ========================================================== */}
      <section className="relative hidden overflow-hidden bg-white lg:block">
        {/* BACKGROUND DECORATION */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-sky-100/70 blur-3xl" />

        <div className="pointer-events-none absolute -left-48 bottom-[-120px] h-[460px] w-[460px] rounded-full bg-blue-50/70 blur-3xl" />

        <div className="pointer-events-none absolute left-[45%] top-16 h-24 w-24 rounded-full bg-sky-50/60 blur-2xl" />

        <div className="relative mx-auto max-w-[1380px] px-6 xl:px-8">
          {/* HERO CONTENT */}
          <div className="grid min-h-[555px] grid-cols-2 items-center gap-12 py-12 xl:gap-20 xl:py-16">
            {/* LEFT CONTENT */}
            <div className="relative z-10">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-500">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                Find Your Perfect Place
              </span>

              <h1 className="max-w-[680px] text-5xl font-extrabold leading-[1.02] tracking-[-0.045em] text-gray-900 xl:text-[68px]">
                Find Your
                <span className="block text-sky-500">Dream Property</span>
                With Confidence
              </h1>

              <p className="mt-6 max-w-[560px] text-base leading-7 text-gray-600 xl:text-lg xl:leading-8">
                Find the perfect property easily with our modern platform
                designed to simplify your search and help you discover homes
                that truly match your lifestyle and budget.
              </p>

              {/* STATS */}
              <div className="mt-9 grid max-w-[600px] grid-cols-3 gap-4">
                {[
                  {
                    num: "200+",
                    text: "Customers",
                  },
                  {
                    num: "10k+",
                    text: "Properties",
                  },
                  {
                    num: "16+",
                    text: "Experience",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="
                      group
                      rounded-2xl
                      border border-gray-100
                      bg-white/95
                      px-4
                      py-5
                      text-center
                      shadow-[0_8px_25px_rgba(0,0,0,0.05)]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-sky-100
                      hover:shadow-[0_15px_35px_rgba(14,165,233,0.12)]
                    "
                  >
                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                      {item.num}
                    </h2>

                    <p className="mt-1.5 text-xs font-medium text-gray-500">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* TRUST TEXT */}
              <div className="mt-6 flex items-center gap-3 text-xs text-gray-400">
                <span className="h-px w-8 bg-gray-200" />

                <span>Trusted by property seekers worldwide</span>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative flex justify-end">
              <div className="absolute -inset-10 rounded-[60px] bg-sky-200/25 blur-3xl" />

              <div className="relative h-[430px] w-full max-w-[620px] xl:h-[465px]">
                <div className="relative h-full w-full overflow-hidden rounded-[36px] border border-white/80 bg-gray-100 shadow-[0_30px_80px_rgba(0,0,0,0.16)]">
                  <img
                    src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00"
                    alt="Modern property building"
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      hover:scale-[1.03]
                    "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                  <div className="absolute right-5 top-5 rounded-full border border-white/30 bg-white/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-700 shadow-lg backdrop-blur-md">
                    Premium Living
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-white/90 p-4 shadow-xl backdrop-blur-md">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-gray-400">
                          Discover
                        </p>

                        <p className="mt-1 text-sm font-bold text-gray-900">
                          Your next home awaits
                        </p>
                      </div>

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white shadow-md">
                        ↗
                      </div>
                    </div>
                  </div>
                </div>

                {/* ROTATING CIRCLE */}
                <div className="absolute -left-14 top-1/2 -translate-y-1/2">
                  <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-sky-200 bg-white/90 shadow-[0_18px_40px_rgba(0,0,0,0.13)] backdrop-blur-xl">
                    <svg
                      className="absolute h-full w-full animate-spin-slow"
                      viewBox="0 0 100 100"
                    >
                      <defs>
                        <path
                          id="circlePath"
                          d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                        />
                      </defs>

                      <text fill="#0EA5E9" fontSize="10" letterSpacing="2">
                        <textPath href="#circlePath">
                          • DISCOVER • DREAM • PROPERTY •
                        </textPath>
                      </text>
                    </svg>

                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 text-lg font-bold text-white shadow-lg">
                      ↗
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP SEARCH */}
        <div className="relative z-30 mx-auto max-w-[1380px] px-6 pb-10 xl:px-8">
          <div
            className="
              rounded-[28px]
              border border-gray-100
              bg-white
              p-2
              shadow-[0_22px_60px_rgba(0,0,0,0.10)]
            "
          >
            <SearchBar
              filters={filters}
              setFilters={setFilters}
              onSearch={handleSearch}
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          OTHER SECTIONS
      ========================================================== */}

      <div className="relative bg-white">
        <Features />
      </div>

      <div className="relative bg-white">
        <FeaturedProperties />
      </div>

      <div className="relative bg-white">
        <MultiImageSlider />
      </div>

      <div className="relative bg-white">
        <Testimonials />
      </div>

      <div className="relative bg-white">
        <CTASection />
      </div>

      <div className="relative bg-white">
        <FAQ />
      </div>

      <Footer />
    </>
  );
};

export default Home;
