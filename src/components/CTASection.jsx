import React from "react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="px-4 py-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden shadow-xl">

          {/* BACKGROUND IMAGE */}
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" alt="real estate" className="absolute inset-0 w-full h-full object-cover scale-105" />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-900/95 via-sky-800/80 to-sky-600/70" />

          {/* SOFT GLOW */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-sky-400/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-60px] right-[-60px] w-72 h-72 bg-sky-300/20 blur-[120px] rounded-full"></div>

          {/* CONTENT */}
          <div className="relative z-10 px-6 py-20 md:px-16 flex flex-col md:flex-row items-center justify-between gap-10 text-white">

            {/* LEFT TEXT */}
            <div className="max-w-2xl text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Start Your Real Estate Journey Today
              </h2>

              <p className="mt-5 text-sky-100 text-sm md:text-base leading-relaxed">
                Discover premium properties tailored to your lifestyle.
                Whether you're buying your dream home or investing smartly,
                your journey starts with a single step.
              </p>

              {/* small highlight line */}
              <div className="mt-6 flex justify-center md:justify-start gap-2">
                <span className="w-2 h-2 bg-white/70 rounded-full"></span>
                <span className="w-3 h-3 bg-white rounded-full"></span>
                <span className="w-2 h-2 bg-white/70 rounded-full"></span>
              </div>
            </div>

            {/* RIGHT BUTTON */}
            <div className="flex flex-col items-center md:items-end gap-4">
              <button onClick={() => navigate(`/properties`) }
                className="px-8 py-3 bg-white text-sky-600 font-semibold rounded-xl shadow-lg hover:bg-sky-50 hover:scale-105 transition-all duration-300">
                Explore Properties →
              </button>

              <p className="text-xs text-sky-100">
                Trusted by 10,000+ investors & buyers
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;