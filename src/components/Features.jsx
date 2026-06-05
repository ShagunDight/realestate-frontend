import React from "react";
import { HiHome, HiLightningBolt, HiCog, HiTrendingUp } from "react-icons/hi";

const Features = () => {
  const data = [
    { icon: <HiHome />, title: "Find Your Dream Home" },
    { icon: <HiLightningBolt />, title: "Unlock Property Value" },
    { icon: <HiCog />, title: "Effortless Property Management" },
    { icon: <HiTrendingUp />, title: "Smart Investment, Informed Decision" },
  ];

  return (
    <section className="w-full bg-sky-50 py-14 md:py-20 relative">

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 relative z-10">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">

          {data.map((item, i) => (
            <div
              key={i}
              className="relative group bg-white border border-gray-200 rounded-2xl p-5 md:p-6
              shadow-md hover:shadow-xl transition-all duration-300
              hover:-translate-y-2 cursor-pointer flex flex-col items-center text-center"
            >

              {/* Arrow */}
              <div className="absolute top-3 right-3 w-7 h-7 md:w-8 md:h-8 rounded-full bg-sky-100 
              flex items-center justify-center text-sky-500 
              group-hover:bg-sky-500 group-hover:text-white transition text-xs md:text-sm">
                ↗
              </div>

              {/* ICON */}
              <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center 
              rounded-full bg-sky-100 text-sky-500 text-xl md:text-2xl mb-3 md:mb-4
              group-hover:bg-sky-500 group-hover:text-white transition">
                {item.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-gray-800 font-semibold text-xs sm:text-sm md:text-sm leading-snug px-2">
                {item.title}
              </h3>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;