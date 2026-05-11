import React from "react";

const CTASection = () => {
  return (
    <section className="px-6 pt-6 pb-12 bg-white">
      <div className="max-w-[1300px] mx-auto">
        <div className="relative rounded-3xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            alt="real estate"
            className="absolute inset-0 w-full h-full object-cover scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-sky-900/90 via-sky-700/70 to-sky-500/60"></div>

          <div className="absolute -top-20 -left-20 w-72 h-72 bg-sky-400/30 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-50px] right-[-50px] w-72 h-72 bg-sky-300/20 blur-[120px] rounded-full"></div>

          <div className="relative z-10 px-6 py-16 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
            {/* LEFT */}
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Start Your Real Estate Journey Today
              </h2>

              <p className="mt-4 text-gray-200 text-sm md:text-base leading-relaxed">
                Discover premium properties tailored to your lifestyle. Whether
                you're buying your dream home or investing smartly, your journey
                starts here with Estatein.
              </p>
            </div>

            {/* RIGHT BUTTON */}
            <div>
              <button className="px-7 py-3 bg-white text-sky-600 font-semibold rounded-xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
                Explore Properties →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
