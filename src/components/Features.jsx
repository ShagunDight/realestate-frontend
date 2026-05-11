import React from "react";
import { HiHome, HiLightningBolt, HiCog, HiTrendingUp } from "react-icons/hi";

const Features = () => {
  const data = [
    { icon: <HiHome />, title: "Find Your Dream Home" },
    { icon: <HiLightningBolt />, title: "Unlock Property Value" },
    { icon: <HiCog />, title: "Effortless Property Management" },
    { icon: <HiTrendingUp />, title: "Smart Investment,Informed Decision" },
  ];

  return (
    <section className="w-full bg-sky-50 py-20 relative">
      <div className="max-w-[1300px] mx-auto px-6 -mt-32 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {data.map((item, i) => (
            <div
              key={i}
              className="relative group bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-3 cursor-pointer flex flex-col items-center justify-center text-center"
            >
              {/* Arrow */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition">
                ↗
              </div>

              {/*  Icon */}
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-sky-100 text-sky-500 text-2xl mb-4 group-hover:bg-sky-500 group-hover:text-white transition">
                {item.icon}
              </div>

              {/*  Title */}
              <h3 className="text-gray-800 font-semibold text-sm leading-snug">
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
