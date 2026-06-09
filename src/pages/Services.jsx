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
    FaHome: FaHome,
    FaBuilding: FaBuilding,
    FaChartLine: FaChartLine,
    FaCogs: FaCogs,
    FaLightbulb: FaLightbulb,
    FaChartBar: FaChartBar,
    FaPercentage: FaPercentage,
    FaDraftingCompass: FaDraftingCompass,
    FaFileAlt: FaFileAlt,
    FaHandshake: FaHandshake,
  };

  // =========================
  // SERVICE CARD
  // =========================
  const Section = ({ title, desc, icon, features }) => (
    <div className="group relative bg-white border border-gray-100 rounded-[2rem] p-8 overflow-hidden transition duration-300 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(14,165,233,0.15)]">

      {/* top gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 via-sky-500 to-cyan-400"></div>

      {/* bg glow */}
      <div className="absolute -top-20 -right-20 w-52 h-52 bg-sky-100 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition"></div>

      {/* ICON */}
      <div className="relative z-10 mb-8">
        <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-sky-50 to-white border border-sky-100 shadow-[0_20px_60px_rgba(14,165,233,0.15)] flex items-center justify-center text-sky-500 text-5xl group-hover:scale-105 transition duration-300">
          {icon}
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10">

        <p className="text-sky-500 text-xs tracking-[0.2em] uppercase mb-3 font-semibold">
          Premium Service
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-snug">
          {title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-7">
          {desc}
        </p>

        {/* FEATURES */}
        <div className="space-y-3 mb-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex items-start gap-3 text-sm text-gray-700"
            >
              <span className="w-2 h-2 rounded-full bg-sky-500 mt-2 flex-shrink-0"></span>
              {f}
            </div>
          ))}
        </div>

        {/* BUTTON */}
        {/* <button className="inline-flex items-center gap-2 text-sky-500 text-sm font-semibold hover:gap-3 transition-all">
          Learn More
          <FaArrowRight className="text-xs" />
        </button> */}

      </div>
    </div>
  );

  // =========================
  // DYNAMIC CARD
  // =========================
  const Card = ({ item }) => (
    <div className="group relative bg-white border border-gray-100 rounded-3xl p-7 overflow-hidden transition duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(14,165,233,0.15)]">

      {/* glow */}
      <div className="absolute -top-16 -right-16 w-40 h-40 bg-sky-100 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition"></div>

      {/* top line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-sky-400 via-sky-500 to-cyan-400"></div>

      <div className="relative z-10">

        {/* ICON */}
        <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-6 group-hover:bg-sky-500 transition">

          <img
            src={`https://lightblue-moose-690494.hostingersite.com/public${item.icon}`}
            alt={item.title}
            className="w-8 h-8 object-contain group-hover:brightness-0 group-hover:invert transition"
          />

        </div>

        {/* TITLE */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug">
          {item.title}
        </h3>

        {/* DESC */}
        <p className="text-gray-500 text-sm leading-relaxed">
          {item.description}
        </p>

      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500 text-lg">Loading Services...</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white overflow-hidden">

        {/* ================= HERO ================= */}
        <div className="relative bg-gradient-to-b from-sky-50 via-white to-white py-24">

          {/* bg blur */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-10 left-10 w-72 h-72 bg-sky-100 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-20"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-6 md:px-20 text-center">

            <p className="text-sky-500 mb-4 text-sm tracking-[0.3em] uppercase font-semibold">
              Real Estate Services
            </p>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Elevate Your <span className="text-sky-500">Real Estate</span>
              <br />
              Experience
            </h1>

            <p className="text-gray-600 text-sm md:text-lg max-w-3xl mx-auto leading-relaxed">
              We provide professional property buying, selling, valuation,
              investment and architectural planning services with complete
              transparency and expert guidance.
            </p>

          </div>
        </div>

        <div className="bg-white min-h-screen px-6 md:px-20">

          {/* ================= MINI CARDS ================= */}
          <div className="relative -mt-14 z-20 max-w-7xl mx-auto mb-14">

            {/* background blur */}
            <div className="absolute inset-0 flex justify-center">
              <div className="w-[80%] h-40 bg-sky-100 blur-3xl opacity-30 rounded-full"></div>
            </div>

            <div className="relative grid md:grid-cols-2 xl:grid-cols-4 gap-6">

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
                  className="group relative overflow-hidden bg-white/90 backdrop-blur-xl border border-white rounded-[2rem] p-7 shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(14,165,233,0.18)] transition duration-500 hover:-translate-y-3"
                >

                  {/* hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-cyan-50 opacity-0 group-hover:opacity-100 transition duration-500"></div>

                  {/* top border */}
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-sky-400 via-sky-500 to-cyan-400"></div>

                  <div className="relative z-10">

                    {/* icon */}
                    <div className="relative mb-6 group">

                    <div className="w-18 h-18 mx-auto flex items-center justify-center relative z-10">

                      <div className="w-16 h-16 rounded-2xl border border-sky-100 text-sky-500 text-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(14,165,233,0.12)] group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition duration-500">
                        {item.icon}
                      </div>

                    </div>

                    {/* glow */}
                    <div className="absolute inset-0 blur-2xl bg-sky-200 opacity-0 group-hover:opacity-40 transition duration-500"></div>

                  </div>

                    {/* content */}
                    <div className="text-center">

                      <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-500 leading-relaxed">
                        {item.desc}
                      </p>

                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= STATIC SERVICES ================= */}
          <div className="max-w-7xl mx-auto py-8">

            {/* heading */}
            <div className="text-center mb-20">
              <p className="text-sky-500 text-sm tracking-[0.2em] uppercase mb-3 font-semibold">
                What We Offer
              </p>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
                Complete Property Solutions
              </h2>

              <p className="text-gray-500 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
                From property buying and selling to valuation, legal
                documentation and floor planning — we provide complete real
                estate services tailored to your needs.
              </p>
            </div>

            {/* services grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              
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
          </div>

          {/* ================= DYNAMIC API SECTIONS ================= */}
          {Object.entries(services).map(([sectionName, sectionItems], index) => (
            <div key={index} className="py-12 border-t border-gray-100 max-w-7xl mx-auto">

              <div className="mb-14">
                <p className="text-sky-500 text-sm tracking-[0.2em] uppercase mb-3 font-semibold">
                  Additional Services
                </p>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {sectionName}
                </h2>

                <p className="text-gray-500 max-w-3xl leading-relaxed">
                  Explore our premium {sectionName.toLowerCase()} services
                  designed to simplify and enhance your real estate journey.
                </p>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-7">

                {sectionItems.map((item) => (
                  <Card key={item.id} item={item} />
                ))}

              </div>
            </div>
          ))}

          {/* FAQ */}
          <div className="py-6">
            <FAQ />
          </div>

          {/* ================= CTA SECTION ================= */}
          <div className="relative mt-10 mb-16 sm:mb-20 lg:mb-24 overflow-hidden rounded-2xl sm:rounded-[2rem] bg-gradient-to-r from-sky-500 to-cyan-500 p-6 sm:p-10 md:p-16 text-white">

            {/* glow */}
            <div className="absolute top-0 right-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-white opacity-10 blur-3xl rounded-full"></div>

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">

              {/* LEFT */}
              <div className="text-center lg:text-left">

                <p className="uppercase tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm mb-3 text-sky-100">
                  Smart Investment
                </p>

                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-5 leading-tight">
                  Build Wealth Through Real Estate
                </h2>

                <p className="text-sky-100 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
                  Get expert investment guidance, market insights and property
                  strategies designed to maximize long-term returns.
                </p>

                <button onClick={() => navigate(`/contact`)} className="bg-white text-sky-600 px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:bg-sky-50 transition">
                  Get Consultation
                </button>

              </div>

              {/* RIGHT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

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
                    className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5"
                  >

                    <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl bg-white/20 text-white text-base sm:text-lg mb-3 sm:mb-4">
                      {item.icon}
                    </div>

                    <h3 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
                      {item.desc}
                    </p>

                  </div>
                ))}

              </div>

            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}