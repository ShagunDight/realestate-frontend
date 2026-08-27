import Team from "../components/Team";
import Footer from "../components/Footer";

export default function About() {
  const stats = [
    { num: "200+", label: "Happy Customers" },
    { num: "10k+", label: "Properties" },
    { num: "16+", label: "Years Experience" },
  ];

  const values = [
    {
      number: "01",
      title: "Trust",
      desc: "Trust is the cornerstone of every successful real estate transaction.",
    },
    {
      number: "02",
      title: "Excellence",
      desc: "We set the bar high for ourselves, from properties to services.",
    },
    {
      number: "03",
      title: "Client-Centric",
      desc: "Your needs are at the center of our universe.",
    },
    {
      number: "04",
      title: "Commitment",
      desc: "We provide the highest level of service and professionalism.",
    },
  ];

  const achievements = [
    {
      number: "01",
      title: "3+ Years Growth",
      desc: "Strong industry presence and expertise.",
    },
    {
      number: "02",
      title: "Happy Clients",
      desc: "Client satisfaction is our biggest win.",
    },
    {
      number: "03",
      title: "Industry Recognition",
      desc: "Trusted by leading professionals.",
    },
  ];

  const steps = [
    "Discover properties",
    "Shortlist your options",
    "Get expert guidance",
    "Schedule visits",
    "Final evaluation",
    "Close the deal",
  ];

  return (
    <>
      <main className="bg-white text-gray-900 overflow-hidden">

        {/* =====================================================
            HERO / OUR JOURNEY
        ====================================================== */}
        <section className="relative px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-12 sm:pt-16 lg:pt-20 pb-20 lg:pb-28">
          
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-sky-50 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 xl:gap-20 items-center">

              {/* LEFT */}
              <div className="max-w-xl">

                <div className="inline-flex items-center gap-3 mb-5">
                  <span className="w-10 h-[2px] bg-sky-500" />
                  <span className="text-sky-500 text-xs font-bold tracking-[0.22em]">
                    OUR STORY
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-[68px] font-bold tracking-[-0.04em] leading-[1.02] text-gray-950">
                  Our Journey
                  <span className="text-sky-500">.</span>
                </h1>

                <p className="mt-7 text-gray-500 text-sm sm:text-base lg:text-lg leading-7 lg:leading-8 max-w-lg">
                  Our story is one of continuous growth and evolution. We
                  started as a small team with big dreams, determined to create
                  a real estate platform that transcends the ordinary.
                </p>

                {/* STATS */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-9 max-w-lg">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="
                        bg-white
                        border border-gray-200
                        rounded-2xl
                        px-2 py-4 sm:px-4 sm:py-5
                        shadow-[0_8px_30px_rgba(15,23,42,0.05)]
                        hover:-translate-y-1
                        hover:border-sky-200
                        transition-all duration-300
                      "
                    >
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">
                        {stat.num}
                      </p>

                      <p className="mt-1 text-[9px] sm:text-xs text-gray-500 leading-4">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT VISUAL */}
              <div className="relative">

                {/* Decorative Box */}
                <div className="absolute -top-5 -right-5 w-24 h-24 border-t border-r border-sky-200 rounded-tr-[32px]" />
                <div className="absolute -bottom-5 -left-5 w-24 h-24 border-b border-l border-sky-200 rounded-bl-[32px]" />

                {/* Main Image */}
                <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden border-[6px] border-white shadow-[0_30px_80px_rgba(15,23,42,0.16)]">
                  <img
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
                    alt="house"
                    className="
                      w-full
                      h-[320px]
                      sm:h-[420px]
                      md:h-[500px]
                      lg:h-[570px]
                      object-cover
                      transition-transform duration-700
                      hover:scale-105
                    "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

                  {/* Image Caption */}
                  <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
                    <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg">
                      <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center">
                        <span className="text-sky-600 font-bold">✦</span>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-gray-900">
                          Building Dreams
                        </p>
                        <p className="text-[10px] text-gray-500">
                          One property at a time
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* =====================================================
            VALUES
        ====================================================== */}
        <section className="relative bg-gray-50/70 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-20 lg:py-28">

          <div className="max-w-7xl mx-auto">

            {/* Heading */}
            <div className="max-w-2xl mb-12 lg:mb-16">

              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-sky-500" />

                <span className="text-sky-500 text-xs font-bold tracking-[0.2em]">
                  CORE VALUES
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-950">
                What We Stand For
              </h2>

              <p className="mt-4 text-gray-500 text-sm sm:text-base leading-7">
                Our principles shape the way we work, serve our clients and
                build lasting relationships.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid md:grid-cols-2 gap-5 lg:gap-6">

              {values.map((item, index) => (
                <div
                  key={index}
                  className="
                    group
                    relative
                    bg-white
                    border border-gray-200
                    rounded-[24px]
                    p-6 sm:p-8
                    overflow-hidden
                    hover:border-sky-200
                    hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]
                    transition-all duration-300
                  "
                >
                  {/* Number */}
                  <div className="flex items-start justify-between">

                    <span className="text-4xl text-sky-500 sm:text-5xl font-bold group-hover:text-gray-300 transition-colors duration-300">
                      {item.number}
                    </span>

                    <div className="w-11 h-11 rounded-2xl bg-sky-50 flex items-center justify-center group-hover:bg-sky-500 transition-colors duration-300">
                      <span className="text-sky-500 group-hover:text-white font-bold">
                        ✦
                      </span>
                    </div>

                  </div>

                  <h3 className="mt-5 text-xl font-bold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-gray-500 leading-6">
                    {item.desc}
                  </p>

                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-sky-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                </div>
              ))}

            </div>
          </div>
        </section>


        {/* =====================================================
            ACHIEVEMENTS
        ====================================================== */}
        <section className="px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-20 lg:py-28">

          <div className="max-w-7xl mx-auto">

            <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">

              <div className="flex justify-center items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-sky-500" />

                <span className="text-sky-500 text-xs font-bold tracking-[0.2em]">
                  MILESTONES
                </span>

                <span className="w-8 h-[2px] bg-sky-500" />
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-950 tracking-tight">
                Our Achievements
              </h2>

              <p className="mt-4 text-gray-500 text-sm sm:text-base leading-7">
                Every milestone represents another step toward creating a
                better real estate experience.
              </p>

            </div>

            <div className="grid md:grid-cols-3 gap-5 lg:gap-6">

              {achievements.map((item, index) => (
                <div
                  key={index}
                  className="
                    group
                    relative
                    rounded-[26px]
                    border border-gray-200
                    bg-white
                    p-7 sm:p-8
                    overflow-hidden
                    hover:-translate-y-2
                    hover:shadow-[0_25px_60px_rgba(15,23,42,0.09)]
                    transition-all duration-300
                  "
                >

                  <div className="flex items-center justify-between">

                    <span className="text-sm font-bold text-sky-500">
                      {item.number}
                    </span>

                    <span className="text-gray-200 group-hover:text-sky-500 transition-colors">
                      ↗
                    </span>

                  </div>

                  <div className="mt-12">

                    <h3 className="text-xl font-bold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm text-gray-500 leading-6">
                      {item.desc}
                    </p>

                  </div>

                  <div className="absolute -right-12 -bottom-12 w-32 h-32 rounded-full bg-sky-50 group-hover:scale-150 transition-transform duration-500" />

                </div>
              ))}

            </div>
          </div>
        </section>


        {/* =====================================================
            PROCESS
        ====================================================== */}
        <section className="relative bg-sky-50 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-20 lg:py-28 overflow-hidden">

          {/* Background Decoration */}
          <div className="absolute -right-32 -top-32 w-[420px] h-[420px] rounded-full bg-sky-100/70 blur-3xl" />
          <div className="absolute -left-40 -bottom-40 w-[450px] h-[450px] rounded-full bg-white/70 blur-3xl" />

          <div className="relative max-w-7xl mx-auto">

            {/* Heading */}
            <div className="max-w-3xl mb-12 lg:mb-16">

              <div className="flex items-center gap-3 mb-4">
                <span className="w-9 h-[2px] bg-sky-500" />

                <span className="text-sky-600 text-xs font-bold tracking-[0.2em]">
                  PROCESS
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-950">
                Navigating Estatein Experience
              </h2>

              <p className="mt-4 text-gray-500 text-sm sm:text-base leading-7 max-w-2xl">
                A clear and guided process designed to make your property
                journey simple, transparent and stress-free.
              </p>

            </div>

            {/* Steps */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">

              {steps.map((title, index) => (
                <div
                  key={index}
                  className="
                    group
                    relative
                    bg-white
                    border border-sky-100
                    rounded-[24px]
                    p-6 sm:p-7
                    shadow-sm
                    hover:shadow-xl
                    hover:-translate-y-1
                    hover:border-sky-200
                    transition-all duration-300
                    overflow-hidden
                  "
                >

                  {/* Top */}
                  <div className="flex items-center justify-between">

                    <span className="text-xs font-bold tracking-wider text-sky-500">
                      STEP {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className="
                        w-9 h-9
                        rounded-full
                        bg-sky-50
                        border border-sky-100
                        flex items-center justify-center
                        text-sm text-sky-500
                        group-hover:bg-sky-500
                        group-hover:text-white
                        group-hover:border-sky-500
                        transition-all duration-300
                      "
                    >
                      →
                    </span>

                  </div>

                  {/* Content */}
                  <h3 className="mt-8 text-lg sm:text-xl font-bold text-gray-900">
                    {title}
                  </h3>

                  <p className="mt-3 text-sm text-gray-500 leading-6">
                    Smooth and guided process to help you find your perfect
                    property.
                  </p>

                  {/* Bottom Accent */}
                  <div
                    className="
                      absolute
                      left-0
                      bottom-0
                      w-full
                      h-[3px]
                      bg-sky-500
                      scale-x-0
                      group-hover:scale-x-100
                      origin-left
                      transition-transform duration-500
                    "
                  />

                </div>
              ))}

            </div>
          </div>
        </section>


        {/* =====================================================
            FINAL SPACING BEFORE TEAM
        ====================================================== */}
        <div className="h-16 sm:h-20 lg:h-24 bg-white" />

      </main>

      <Team />
      <Footer />
    </>
  );
}