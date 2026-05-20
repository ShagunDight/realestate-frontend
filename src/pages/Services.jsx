import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import FAQ from "../components/FAQ";
import {
  FaHome,
  FaChartLine,
  FaCogs,
  FaLightbulb,
  FaChartBar,
  FaPercentage,
} from "react-icons/fa";

export default function ServicesPage() {
  const [services, setServices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8001/api/services").then((res) => res.json())
      .then((data) => {

        setServices(data.data || {});
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // =========================
  // CARD COMPONENT
  // =========================
  const Card = ({ item }) => (

    <div className="group relative bg-white border border-gray-200 rounded-2xl p-6 transition duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(14,165,233,0.25)]">

      {/* TOP LINE */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-sky-400 via-sky-500 to-transparent"></div>

      {/* ICON */}
      <img src={`http://127.0.0.1:8001${item.icon}`} alt={item.title} className="w-12 h-12 object-contain mb-5 transition group-hover:scale-110"/>

      {/* TITLE */}
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        {item.title}
      </h3>

      {/* DESC */}
      <p className="text-gray-500 text-sm leading-relaxed">
        {item.description}
      </p>
    </div>
  );

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white">

        {/* HERO */}
        <div className="w-full bg-sky-50 py-10 mb-8">
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <div className="max-w-4xl">
              <p className="text-sky-500 mb-3 text-xl">
                ✦ ✦ ✦
              </p>

              <h1 className="text-3xl md:text-5xl font-bold text-sky-500 mb-6 leading-tight">
                Elevate Your Real Estate Experience
              </h1>

              <p className="text-gray-600 text-sm md:text-base mb-8">
                Welcome to Estatein, where your real estate aspirations meet expert guidance.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white min-h-screen py-2 px-6 md:px-20">

          {/* MINI CARDS */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">

            {[
              { title: "Find Your Dream Home", icon: <FaHome /> },
              { title: "Unlock Property Value", icon: <FaChartLine /> },
              { title: "Effortless Management", icon: <FaCogs /> },
              { title: "Smart Investments", icon: <FaLightbulb /> },
            ].map((item, i) => (

              <div key={i} className="group bg-white border border-gray-200 rounded-2xl p-6 text-center transition duration-300 hover:-translate-y-2
                hover:shadow-[0_20px_50px_rgba(14,165,233,0.25)]">

                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-sky-100 text-sky-500 text-xl group-hover:bg-sky-500 
                  group-hover:text-white transition">
                  {item.icon}
                </div>

                <h3 className="text-sm font-semibold text-gray-900">
                  {item.title}
                </h3>

              </div>

            ))}
          </div>

          {/* ========================= */}
          {/* DYNAMIC API SECTIONS */}
          {/* ========================= */}

          {Object.entries(services).map(([sectionName, sectionItems], index) => (
            <div key={index} className="mb-24">
              <p className="text-sky-500 mb-2 text-sm">
                ✦ ✦ ✦
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {sectionName}
              </h2>

              <p className="text-gray-500 mb-12 max-w-3xl">
                Explore our premium {sectionName.toLowerCase()} services designed
                to simplify your real estate experience.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                {sectionItems.map((item) => (
                  <Card key={item.id} item={item} />
                ))}

              </div>
            </div>
          ))}

          {/* FAQ */}
          <FAQ />

          {/* SMART INVESTMENT */}
          <div className="mt-24 grid md:grid-cols-2 gap-12 items-center bg-sky-50 p-10 rounded-2xl">

            {/* LEFT */}
            <div>
              <p className="text-sky-500 mb-3 text-sm">
                ✦ ✦ ✦
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug">
                Smart Investments,
                <br />
                Informed Decisions
              </h2>

              <p className="text-gray-600 text-sm mb-8 max-w-md">
                Build a strong real estate portfolio with strategic investment planning.
              </p>

              <div className="relative bg-white border border-sky-100 rounded-xl p-5 overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="relative z-10">
                  <h3 className="text-gray-900 text-sm font-semibold mb-2">
                    Unlock Your Investment Potential
                  </h3>

                  <p className="text-gray-500 text-xs mb-4 leading-relaxed">
                    Let us handle the complexities while you enjoy the benefits.
                  </p>

                  <button className="w-full bg-sky-500 text-white text-sm py-2 rounded-md hover:bg-sky-600 transition">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="grid grid-cols-2 gap-6">

              {[
                {
                  title: "Market Insight",
                  desc: "Stay ahead of market trends.",
                  icon: <FaChartBar />,
                },
                {
                  title: "ROI Assessment",
                  desc: "Make investment decisions confidently.",
                  icon: <FaPercentage />,
                },
                {
                  title: "Customized Strategies",
                  desc: "Tailored plans for your goals.",
                  icon: <FaLightbulb />,
                },
                {
                  title: "Diversification",
                  desc: "Grow across multiple property types.",
                  icon: <FaChartLine />,
                },
              ].map((item, i) => (

                <div key={i} className="flex items-start gap-4 bg-white border border-sky-100 rounded-xl p-5 hover:shadow-md transition duration-300">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-sky-100 text-sky-500 text-lg">
                    {item.icon}
                  </div>

                  <div>
                    <h3 className="text-gray-900 font-semibold text-sm mb-1">
                      {item.title}
                    </h3>

                    <p className="text-gray-500 text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}