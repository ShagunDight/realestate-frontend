import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import FAQ from "../components/FAQ";
import {
  FaHome,
  FaBuilding,
  FaChartLine,
  FaCogs,
  FaLightbulb,
  FaChartBar,
  FaPercentage,
  FaDraftingCompass,
  FaFileAlt,
  FaHandshake,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ServicesPage() {
  const navigate = useNavigate();

  const [services, setServices] = useState({});
  const [services1, setServices1] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://lightblue-moose-690494.hostingersite.com/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data.data || {});
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("https://lightblue-moose-690494.hostingersite.com/api/moreservices")
      .then((res) => res.json())
      .then((data) => {
        setServices1(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const parseFeatures = (features) => {
    if (!features) return [];
    if (Array.isArray(features)) return features;

    try {
      return JSON.parse(features);
    } catch {
      return [];
    }
  };

  const ICONS = {
    FaHome,
    FaBuilding,
    FaChartLine,
    FaCogs,
    FaLightbulb,
    FaChartBar,
    FaPercentage,
    FaDraftingCompass,
    FaFileAlt,
    FaHandshake,
  };

  // =========================================================
  // STATIC SERVICE CARD
  // =========================================================
  const Section = ({ title, desc, icon, features = [] }) => (
    <div
      className="
        group relative h-full overflow-hidden
        bg-white
        border border-gray-100
        rounded-[1.75rem] sm:rounded-[2rem]
        p-6 sm:p-7 lg:p-8
        shadow-sm
        transition-all duration-500
        hover:-translate-y-2
        hover:shadow-[0_25px_70px_rgba(14,165,233,0.14)]
        hover:border-sky-100
      "
    >
      {/* TOP ACCENT */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-sky-400 via-sky-500 to-cyan-400" />

      {/* BACKGROUND GLOW */}
      <div
        className="
          absolute -top-24 -right-24
          w-56 h-56
          rounded-full
          bg-sky-100
          blur-3xl
          opacity-30
          group-hover:opacity-60
          transition-opacity duration-500
        "
      />

      {/* SMALL DECORATION */}
      <div
        className="
          absolute right-6 top-6
          w-10 h-10
          rounded-full
          border border-sky-100
          opacity-50
          group-hover:scale-125
          transition-transform duration-500
        "
      />

      <div className="relative z-10 h-full flex flex-col">
        {/* ICON */}
        <div className="mb-7">
          <div
            className="
              w-16 h-16 sm:w-18 sm:h-18
              rounded-2xl sm:rounded-[1.35rem]
              bg-gradient-to-br from-sky-50 to-white
              border border-sky-100
              shadow-[0_12px_35px_rgba(14,165,233,0.12)]
              flex items-center justify-center
              text-sky-500
              text-3xl sm:text-4xl
              group-hover:bg-sky-500
              group-hover:text-white
              group-hover:scale-105
              group-hover:rotate-2
              transition-all duration-500
            "
          >
            {icon}
          </div>
        </div>

        {/* LABEL */}
        <p className="text-sky-500 text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-3 font-bold">
          Premium Service
        </p>

        {/* TITLE */}
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 leading-snug">
          {title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-gray-500 text-sm leading-7 mb-7">
          {desc}
        </p>

        {/* FEATURES */}
        {features.length > 0 && (
          <div className="space-y-3 mt-auto pt-5 border-t border-gray-100">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-3 text-sm text-gray-600"
              >
                <span
                  className="
                    mt-0.5
                    w-5 h-5
                    rounded-full
                    bg-sky-50
                    border border-sky-100
                    text-sky-500
                    flex items-center justify-center
                    flex-shrink-0
                  "
                >
                  <FaCheck className="text-[9px]" />
                </span>

                <span className="leading-5">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // =========================================================
  // API SERVICE CARD
  // =========================================================
  const Card = ({ item }) => (
    <div
      className="
        group relative h-full overflow-hidden
        bg-white
        border border-gray-100
        rounded-[1.5rem] sm:rounded-[1.75rem]
        p-6
        shadow-sm
        transition-all duration-500
        hover:-translate-y-2
        hover:shadow-[0_22px_60px_rgba(14,165,233,0.14)]
        hover:border-sky-100
      "
    >
      {/* TOP LINE */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-sky-400 via-sky-500 to-cyan-400" />

      {/* GLOW */}
      <div
        className="
          absolute -top-20 -right-20
          w-48 h-48
          rounded-full
          bg-sky-100
          blur-3xl
          opacity-25
          group-hover:opacity-50
          transition-opacity duration-500
        "
      />

      <div className="relative z-10">
        {/* ICON */}
        <div
          className="
            w-16 h-16
            rounded-2xl
            bg-sky-50
            border border-sky-100
            flex items-center justify-center
            mb-6
            transition-all duration-500
            group-hover:bg-sky-500
            group-hover:shadow-lg
            group-hover:shadow-sky-200
          "
        >
          <img
            src={`https://lightblue-moose-690494.hostingersite.com/public${item.icon}`}
            alt={item.title}
            className="
              w-8 h-8
              object-contain
              transition-all duration-500
              group-hover:brightness-0
              group-hover:invert
              group-hover:scale-110
            "
          />
        </div>

        {/* NUMBER */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-sky-500">
            Service
          </span>

          <span className="h-px w-8 bg-sky-100" />
        </div>

        {/* TITLE */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-snug">
          {item.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-gray-500 text-sm leading-7">
          {item.description}
        </p>

        {/* BOTTOM DECORATION */}
        <div className="mt-6 flex items-center gap-2 text-sky-500 text-xs font-semibold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <span>Professional Solution</span>
          <FaArrowRight className="text-[10px]" />
        </div>
      </div>
    </div>
  );

  // =========================================================
  // LOADING
  // =========================================================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 to-white">
        <div className="text-center">
          <div
            className="
              w-12 h-12
              rounded-full
              border-4
              border-sky-100
              border-t-sky-500
              animate-spin
              mx-auto mb-4
            "
          />

          <p className="text-gray-500 text-sm font-medium">
            Loading Services...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white overflow-hidden">

        {/* =====================================================
            HERO
        ====================================================== */}
        <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-white">

          {/* BACKGROUND GLOWS */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="
                absolute
                -top-32
                -left-20
                w-72 sm:w-96
                h-72 sm:h-96
                rounded-full
                bg-sky-200
                blur-3xl
                opacity-25
              "
            />

            <div
              className="
                absolute
                top-20
                right-[-100px]
                w-72 sm:w-96
                h-72 sm:h-96
                rounded-full
                bg-cyan-100
                blur-3xl
                opacity-30
              "
            />
          </div>

          {/* GRID PATTERN */}
          <div
            className="
              absolute inset-0
              opacity-[0.035]
              pointer-events-none
              bg-[linear-gradient(to_right,#0ea5e9_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e9_1px,transparent_1px)]
              bg-[size:40px_40px]
            "
          />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-28 sm:pb-32 lg:pb-36">

            {/* LABEL */}
            <div className="flex justify-center">
              <div
                className="
                  inline-flex items-center gap-2
                  px-4 py-2
                  rounded-full
                  bg-white
                  border border-sky-100
                  shadow-sm
                "
              >
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />

                <span className="text-sky-600 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                  Real Estate Services
                </span>
              </div>
            </div>

            {/* HEADING */}
            <div className="text-center mt-7 sm:mt-8">
              <h1
                className="
                  text-4xl
                  sm:text-5xl
                  lg:text-6xl
                  xl:text-7xl
                  font-bold
                  text-gray-900
                  leading-[1.08]
                  tracking-tight
                "
              >
                Elevate Your{" "}
                <span className="text-sky-500">
                  Real Estate
                </span>

                <br className="hidden sm:block" />

                <span className="text-gray-900">
                  Experience
                </span>
              </h1>

              <p
                className="
                  text-gray-500
                  text-sm
                  sm:text-base
                  lg:text-lg
                  max-w-3xl
                  mx-auto
                  mt-6
                  leading-7
                  sm:leading-8
                "
              >
                Professional property buying, selling, valuation,
                investment and architectural planning services —
                all backed by expert guidance and complete transparency.
              </p>
            </div>

            {/* HERO BOTTOM STATS */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mt-9">
              {[
                "Verified Properties",
                "Expert Guidance",
                "Transparent Process",
              ].map((item, index) => (
                <div
                  key={index}
                  className="
                    inline-flex items-center gap-2
                    px-3.5 sm:px-4
                    py-2
                    rounded-full
                    bg-white/80
                    border border-gray-100
                    shadow-sm
                    text-xs sm:text-sm
                    text-gray-600
                  "
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            MAIN
        ====================================================== */}
        <div className="bg-white px-5 sm:px-6 lg:px-8">

          {/* =================================================
              MINI SERVICE CARDS
          ================================================== */}
          <section className="relative -mt-16 sm:-mt-20 z-20 max-w-7xl mx-auto">

            {/* SOFT GLOW */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none">
              <div className="w-[70%] h-40 bg-sky-100 blur-3xl rounded-full opacity-40" />
            </div>

            <div className="relative grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">

              {[
                {
                  title: "Find Your Dream Home",
                  desc: "Verified residential & commercial properties.",
                  icon: <FaHome />,
                },
                {
                  title: "Unlock Property Value",
                  desc: "Accurate valuation & market analysis.",
                  icon: <FaChartLine />,
                },
                {
                  title: "Effortless Management",
                  desc: "Smooth property handling & support.",
                  icon: <FaCogs />,
                },
                {
                  title: "Smart Investments",
                  desc: "ROI-focused investment guidance.",
                  icon: <FaLightbulb />,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="
                    group relative overflow-hidden
                    bg-white
                    border border-gray-100
                    rounded-[1.5rem] sm:rounded-[1.75rem]
                    p-5 sm:p-6
                    shadow-[0_10px_40px_rgba(0,0,0,0.06)]
                    hover:shadow-[0_20px_60px_rgba(14,165,233,0.16)]
                    hover:-translate-y-2
                    transition-all duration-500
                  "
                >
                  {/* TOP LINE */}
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-sky-400 via-sky-500 to-cyan-400" />

                  {/* HOVER BG */}
                  <div
                    className="
                      absolute inset-0
                      bg-gradient-to-br from-sky-50 via-white to-cyan-50
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity duration-500
                    "
                  />

                  <div className="relative z-10">

                    {/* ICON */}
                    <div className="flex justify-center mb-5">
                      <div
                        className="
                          w-14 h-14 sm:w-16 sm:h-16
                          rounded-2xl
                          bg-sky-50
                          border border-sky-100
                          text-sky-500
                          text-xl sm:text-2xl
                          flex items-center justify-center
                          shadow-[0_10px_30px_rgba(14,165,233,0.10)]
                          group-hover:bg-sky-500
                          group-hover:text-white
                          group-hover:scale-110
                          transition-all duration-500
                        "
                      >
                        {item.icon}
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="text-center">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2.5 leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-500 leading-6">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =================================================
              STATIC SERVICES
          ================================================== */}
          <section className="max-w-7xl mx-auto pt-24 sm:pt-28 lg:pt-32 pb-12">

            {/* HEADING */}
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">

              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-px bg-sky-300" />

                <p className="text-sky-500 text-[10px] sm:text-xs tracking-[0.22em] uppercase font-bold">
                  What We Offer
                </p>

                <span className="w-8 h-px bg-sky-300" />
              </div>

              <h2
                className="
                  text-3xl
                  sm:text-4xl
                  lg:text-5xl
                  font-bold
                  text-gray-900
                  leading-tight
                "
              >
                Complete Property{" "}
                <span className="text-sky-500">
                  Solutions
                </span>
              </h2>

              <p className="text-gray-500 text-sm sm:text-base leading-7 mt-5">
                From property buying and selling to valuation, legal
                documentation and floor planning — we provide complete
                real estate services tailored to your needs.
              </p>
            </div>

            {/* SERVICES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">

              {services1.map((item) => {
                const Icon = ICONS[item.icon] || FaCogs;

                return (
                  <Section
                    key={item.id}
                    icon={<Icon />}
                    title={item.title}
                    desc={item.description}
                    features={parseFeatures(item.features)}
                  />
                );
              })}
            </div>
          </section>

          {/* =================================================
              DYNAMIC API SERVICES
          ================================================== */}
          {Object.entries(services).map(
            ([sectionName, sectionItems], index) => (
              <section
                key={index}
                className="
                  max-w-7xl mx-auto
                  py-14 sm:py-16 lg:py-20
                  border-t border-gray-100
                "
              >
                {/* SECTION HEADER */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-10 sm:mb-12">

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-sky-500" />

                      <p className="text-sky-500 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold">
                        Additional Services
                      </p>
                    </div>

                    <h2
                      className="
                        text-3xl
                        sm:text-4xl
                        font-bold
                        text-gray-900
                        leading-tight
                      "
                    >
                      {sectionName}
                    </h2>
                  </div>

                  <p className="text-gray-500 text-sm leading-6 max-w-xl lg:text-right">
                    Explore our premium{" "}
                    <span className="text-gray-700 font-medium">
                      {sectionName.toLowerCase()}
                    </span>{" "}
                    services designed to simplify and enhance your
                    real estate journey.
                  </p>
                </div>

                {/* CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">

                  {sectionItems.map((item) => (
                    <Card key={item.id} item={item} />
                  ))}

                </div>
              </section>
            )
          )}

          {/* =================================================
              FAQ
          ================================================== */}
          <section className="py-10 sm:py-14">
            <FAQ />
          </section>

          {/* =================================================
              CTA
          ================================================== */}
          <section
            className="
              relative
              max-w-7xl mx-auto
              mt-6 sm:mt-10
              mb-16 sm:mb-20 lg:mb-24
              overflow-hidden
              rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem]
              bg-gradient-to-br from-sky-500 via-sky-500 to-cyan-500
              p-6 sm:p-9 md:p-12 lg:p-16
              text-white
            "
          >
            {/* GLOWS */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

            <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-cyan-300/20 rounded-full blur-3xl" />

            {/* DECORATIVE CIRCLE */}
            <div className="absolute top-8 right-8 w-24 h-24 rounded-full border border-white/10 hidden sm:block" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

              {/* LEFT */}
              <div className="text-center lg:text-left">

                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-white" />

                  <p className="uppercase tracking-[0.18em] text-[10px] sm:text-xs font-bold text-sky-100">
                    Smart Investment
                  </p>
                </div>

                <h2
                  className="
                    text-2xl
                    sm:text-3xl
                    md:text-4xl
                    lg:text-5xl
                    font-bold
                    leading-tight
                    mb-4 sm:mb-5
                  "
                >
                  Build Wealth Through Real Estate
                </h2>

                <p
                  className="
                    text-sky-100
                    text-sm sm:text-base
                    leading-7
                    max-w-xl
                    mx-auto lg:mx-0
                    mb-6 sm:mb-8
                  "
                >
                  Get expert investment guidance, market insights and
                  property strategies designed to maximize long-term
                  returns.
                </p>

                <button
                  onClick={() => navigate(`/contact`)}
                  className="
                    inline-flex items-center justify-center gap-2
                    bg-white
                    text-sky-600
                    px-5 sm:px-7
                    py-3
                    rounded-xl
                    font-semibold
                    text-sm
                    shadow-lg
                    hover:bg-sky-50
                    hover:-translate-y-0.5
                    transition-all duration-300
                  "
                >
                  Get Consultation
                  <FaArrowRight className="text-xs" />
                </button>
              </div>

              {/* RIGHT CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

                {[
                  {
                    title: "Market Insight",
                    desc: "Stay ahead of market trends.",
                    icon: <FaChartBar />,
                  },
                  {
                    title: "ROI Assessment",
                    desc: "Confident investment decisions.",
                    icon: <FaPercentage />,
                  },
                  {
                    title: "Custom Strategies",
                    desc: "Tailored plans for your goals.",
                    icon: <FaLightbulb />,
                  },
                  {
                    title: "Diversification",
                    desc: "Grow across multiple property types.",
                    icon: <FaChartLine />,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="
                      group
                      bg-white/10
                      backdrop-blur-md
                      border border-white/15
                      rounded-2xl
                      p-4 sm:p-5
                      hover:bg-white/15
                      transition-all duration-300
                    "
                  >
                    <div
                      className="
                        w-10 h-10 sm:w-11 sm:h-11
                        flex items-center justify-center
                        rounded-xl
                        bg-white/15
                        border border-white/10
                        text-white
                        text-base sm:text-lg
                        mb-3 sm:mb-4
                        group-hover:bg-white
                        group-hover:text-sky-500
                        transition-all duration-300
                      "
                    >
                      {item.icon}
                    </div>

                    <h3 className="font-semibold text-sm sm:text-base mb-1.5">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-sky-100 leading-6">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}