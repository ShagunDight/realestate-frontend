import React from "react";
import { HiHome, HiLightningBolt, HiCog, HiTrendingUp } from "react-icons/hi";

const Features = () => {
  const data = [
    {
      icon: <HiHome />,
      title: "Find Your Dream Home",
    },
    {
      icon: <HiLightningBolt />,
      title: "Unlock Property Value",
    },
    {
      icon: <HiCog />,
      title: "Effortless Property Management",
    },
    {
      icon: <HiTrendingUp />,
      title: "Smart Investment, Informed Decision",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-sky-50 py-10 sm:py-12 md:py-14 lg:py-16">
      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}
      <div className="pointer-events-none absolute -left-24 top-0 h-56 w-56 rounded-full bg-white/70 blur-3xl" />

      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-sky-100/80 blur-3xl" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-[1300px] px-4 sm:px-6 lg:px-8">
        {/* =================================================
            SECTION INTRO
        ================================================== */}
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10 md:mb-12">
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />

            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-500 sm:text-xs">
              Why Estatein
            </span>

            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            Everything You Need
            <span className="block text-sky-500">
              For Better Property Decisions
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-xs leading-6 text-gray-600 sm:text-sm sm:leading-7 md:text-base">
            Discover a simpler, smarter way to explore, manage and invest in
            real estate.
          </p>
        </div>

        {/* =================================================
            FEATURES GRID
        ================================================== */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-5">
          {data.map((item, i) => (
            <div
              key={i}
              className="
                group
                relative
                min-h-[190px]
                overflow-hidden
                rounded-[24px]
                border
                border-white
                bg-white
                p-5
                shadow-[0_10px_30px_rgba(14,165,233,0.08)]
                transition-all
                duration-300
                hover:-translate-y-1.5
                hover:border-sky-100
                hover:shadow-[0_18px_42px_rgba(14,165,233,0.14)]
                sm:p-6
              "
            >
              {/* TOP ACCENT */}
              <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* DECORATIVE CIRCLE */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-sky-50 transition-transform duration-500 group-hover:scale-125" />

              {/* NUMBER */}
              <div className="absolute right-4 top-4 text-[10px] font-bold tracking-[0.15em] text-gray-300 transition-colors duration-300 group-hover:text-sky-200">
                0{i + 1}
              </div>

              {/* ICON */}
              <div
                className="
                  relative
                  mb-5
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-sky-50
                  text-xl
                  text-sky-500
                  shadow-sm
                  ring-1
                  ring-sky-100
                  transition-all
                  duration-300
                  group-hover:bg-sky-500
                  group-hover:text-white
                  group-hover:shadow-[0_10px_24px_rgba(14,165,233,0.25)]
                  group-hover:ring-sky-500
                  sm:h-16
                  sm:w-16
                  sm:text-2xl
                "
              >
                {item.icon}
              </div>

              {/* TITLE */}
              <div className="relative z-10 pr-5">
                <h3 className="text-sm font-bold leading-6 tracking-tight text-gray-900 sm:text-[15px]">
                  {item.title}
                </h3>

                <div className="mt-4 h-px w-10 bg-sky-100 transition-all duration-300 group-hover:w-16 group-hover:bg-sky-300" />
              </div>

              {/* ARROW */}
              <div
                className="
                  absolute
                  bottom-5
                  right-5
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-sky-100
                  bg-sky-50
                  text-sm
                  font-semibold
                  text-sky-500
                  transition-all
                  duration-300
                  group-hover:translate-x-0.5
                  group-hover:bg-sky-500
                  group-hover:text-white
                  group-hover:shadow-md
                "
              >
                ↗
              </div>

              {/* BOTTOM GLOW */}
              <div className="pointer-events-none absolute -bottom-12 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-sky-100/40 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
