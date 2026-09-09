import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowUpRight, FiCheck, FiHome } from "react-icons/fi";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        {/* =====================================================
            MAIN CTA
        ====================================================== */}
        <div className="group relative min-h-[430px] overflow-hidden rounded-[30px] border border-white shadow-[0_25px_70px_rgba(15,23,42,0.16)] sm:min-h-[460px] lg:min-h-[500px] lg:rounded-[36px]">
          {/* =================================================
              BACKGROUND IMAGE
          ================================================== */}
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            alt="Luxury real estate property"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              scale-[1.03]
              transition-transform
              duration-1000
              ease-out
              group-hover:scale-[1.06]
            "
          />

          {/* =================================================
              IMAGE OVERLAYS
          ================================================== */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-950/95 via-sky-900/85 to-sky-700/55" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* =================================================
              DECORATIVE GLOWS
          ================================================== */}
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sky-300/20 blur-[110px]" />

          <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-sky-200/20 blur-[120px]" />

          {/* =================================================
              DECORATIVE GRID
          ================================================== */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.08]
            "
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* =================================================
              CONTENT
          ================================================== */}
          <div className="relative z-10 flex min-h-[430px] flex-col justify-center gap-10 px-5 py-12 sm:min-h-[460px] sm:px-8 sm:py-14 md:px-12 lg:min-h-[500px] lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-16 lg:py-16 xl:px-20">
            {/* =================================================
                LEFT CONTENT
            ================================================== */}
            <div className="max-w-2xl text-center lg:text-left">
              {/* EYEBROW */}
              <div className="mb-4 flex justify-center lg:justify-start">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md sm:text-[10px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  Your Next Move Starts Here
                </span>
              </div>

              {/* HEADING */}
              <h2 className="text-3xl font-extrabold leading-[1.05] tracking-[-0.035em] text-white sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[58px]">
                Start Your
                <span className="block text-sky-200">Real Estate Journey</span>
                Today
              </h2>

              {/* DESCRIPTION */}
              <p className="mx-auto mt-5 max-w-2xl text-xs leading-6 text-sky-100/90 sm:text-sm sm:leading-7 md:text-base lg:mx-0 lg:max-w-xl">
                Discover premium properties tailored to your lifestyle. Whether
                you're buying your dream home or investing smartly, your journey
                starts with a single step.
              </p>

              {/* =================================================
                  BENEFITS
              ================================================== */}
              <div className="mt-6 flex flex-wrap justify-center gap-2.5 lg:justify-start">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] font-medium text-white/90 backdrop-blur-md">
                  <FiCheck size={12} />
                  Curated Properties
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] font-medium text-white/90 backdrop-blur-md">
                  <FiCheck size={12} />
                  Trusted Guidance
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] font-medium text-white/90 backdrop-blur-md">
                  <FiCheck size={12} />
                  Smarter Decisions
                </div>
              </div>
            </div>

            {/* =================================================
                RIGHT ACTION PANEL
            ================================================== */}
            <div className="flex w-full max-w-[360px] flex-col items-center lg:items-end">
              {/* GLASS CARD */}
              <div
                className="
                  w-full
                  rounded-[24px]
                  border
                  border-white/20
                  bg-white/10
                  p-5
                  shadow-[0_20px_50px_rgba(0,0,0,0.16)]
                  backdrop-blur-xl
                  sm:p-6
                  lg:max-w-[340px]
                "
              >
                {/* ICON */}
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sky-500 shadow-lg">
                    <FiHome size={20} />
                  </div>

                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/80">
                    Estatein
                  </span>
                </div>

                {/* PANEL TEXT */}
                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-100/70">
                  Find your next opportunity
                </p>

                <p className="mt-2 text-base font-bold leading-6 text-white sm:text-lg">
                  Explore properties that fit your vision.
                </p>

                {/* BUTTON */}
                <button
                  type="button"
                  onClick={() => navigate("/properties")}
                  className="
                    group/btn
                    mt-5
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    bg-white
                    px-6
                    py-3.5
                    text-sm
                    font-bold
                    text-sky-600
                    shadow-[0_10px_28px_rgba(0,0,0,0.16)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-sky-50
                    hover:shadow-[0_14px_32px_rgba(0,0,0,0.20)]
                    active:translate-y-0
                  "
                >
                  Explore Properties
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-50 text-sky-600 transition-all duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:bg-sky-500 group-hover/btn:text-white">
                    <FiArrowUpRight size={15} />
                  </span>
                </button>

                {/* TRUST */}
                <div className="mt-4 flex items-center justify-center gap-2 text-center text-[10px] text-sky-100/75">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-300" />
                  Trusted by 10,000+ investors & buyers
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              SMALL DECORATIVE CIRCLE
          ================================================== */}
          <div className="pointer-events-none absolute right-8 top-8 hidden h-16 w-16 rounded-full border border-white/10 lg:block" />

          <div className="pointer-events-none absolute bottom-8 left-8 hidden h-10 w-10 rounded-full border border-white/10 lg:block" />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
