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
    fetch("https://lightblue-moose-690494.hostingersite.com/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // CARD
  const Card = ({ item }) => (
    <div
      className="group relative bg-white border border-gray-200 rounded-2xl p-6
      transition duration-300 hover:-translate-y-2
      hover:shadow-[0_20px_50px_rgba(14,165,233,0.25)]"
    >
      {/* Gradient Line */}
      <div
        className="absolute top-0 left-0 w-full h-[2px] 
      bg-gradient-to-r from-sky-400 via-sky-500 to-transparent"
      ></div>

      {/* Icon */}
      <img
        src={`https://lightblue-moose-690494.hostingersite.com${item.icon}`}
        alt={item.title}
        className="w-10 h-10 mb-4 transition group-hover:scale-110"
      />

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>

      {/* Description */}
      <p className="text-gray-500 text-sm leading-relaxed">
        {item.description}
      </p>
    </div>
  );

  return (
    <>
      <div className="bg-white">
        {/* ===== HERO BANNER  ===== */}
        <div className="w-full bg-sky-50  py-10 mb-8">
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <div className="max-w-4xl">
              <p className="text-sky-500 mb-3 text-xl">✦ ✦ ✦</p>
              <h1 className="text-3xl md:text-5xl font-bold text-sky-500 mb-6 leading-tight">
                Elevate Your Real Estate Experience
              </h1>

              <p className="text-gray-600 text-sm md:text-base mb-8">
                Welcome to Estatein, where your real estate aspirations meet
                expert guidance. Explore our comprehensive range of services,
                each designed to cater to your unique needs and dreams.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white min-h-screen py-2 px-6 md:px-20">
          {/* ===== MINI CARDS ===== */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              { title: "Find Your Dream Home", icon: <FaHome /> },
              { title: "Unlock Property Value", icon: <FaChartLine /> },
              { title: "Effortless Management", icon: <FaCogs /> },
              { title: "Smart Investments", icon: <FaLightbulb /> },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-white border border-gray-200 rounded-2xl p-6
              text-center transition duration-300 hover:-translate-y-2
              hover:shadow-[0_20px_50px_rgba(14,165,233,0.25)]"
              >
                <div
                  className="w-14 h-14 mx-auto mb-4 flex items-center justify-center 
              rounded-full bg-sky-100 text-sky-500 text-xl
              group-hover:bg-sky-500 group-hover:text-white transition"
                >
                  {item.icon}
                </div>

                <h3 className="text-sm font-semibold text-gray-900">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

          {/* ===== Unlock Section ===== */}
          {services["Unlock Property Value"] && (
            <>
              <p className="text-sky-500 mb-2 text-sm">✦ ✦ ✦</p>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Unlock Property Value
              </h2>

              <p className="text-gray-500 mb-12 max-w-3xl">
                Selling your property should be a rewarding experience, and at
                Estatein, we make sure it is. Our Property Selling Service is
                designed to maximize the value of your property.
              </p>

              <div className="grid md:grid-cols-4 gap-6 mb-20">
                {services["Unlock Property Value"].map((item, i) => (
                  <Card key={i} item={item} />
                ))}
              </div>
            </>
          )}

          {/* ===== Management Section ===== */}
          {services["Effortless Property Management"] && (
            <>
              <p className="text-sky-500 mb-2 text-sm">✦ ✦ ✦</p>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Effortless Property Management
              </h2>

              <p className="text-gray-500 mb-12 max-w-3xl">
                Owning a property should be a pleasure, not a hassle. Estatein's
                Property Management Service takes the stress out of property
                ownership.
              </p>

              <div className="grid md:grid-cols-4 gap-6 mb-20">
                {services["Effortless Property Management"].map((item, i) => (
                  <Card key={i} item={item} />
                ))}
              </div>
              <FAQ />
              {/* ===== SMART INVESTMENT SECTION ===== */}
              <div className="mt-24 grid md:grid-cols-2 gap-12 items-center bg-sky-50 p-10 rounded-2xl">
                {/* LEFT SIDE */}
                <div>
                  <p className="text-sky-500 mb-3 text-sm">✦ ✦ ✦</p>

                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug">
                    Smart Investments, <br /> Informed Decisions
                  </h2>

                  <p className="text-gray-600 text-sm mb-8 max-w-md">
                    Building a real estate portfolio requires a strategic
                    approach. Estatein's Investment Advisory Service empowers
                    you to make smart investments and informed decisions.
                  </p>

                  <div className="relative bg-white border border-sky-100 rounded-xl p-5 overflow-hidden shadow-sm hover:shadow-md transition">
                    <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle,_#0ea5e9_1px,_transparent_1px)] [background-size:20px_20px]"></div>

                    <div className="relative z-10">
                      <h3 className="text-gray-900 text-sm font-semibold mb-2">
                        Unlock Your Investment Potential
                      </h3>

                      <p className="text-gray-500 text-xs mb-4 leading-relaxed">
                        Explore our Property Management Service categories and
                        let us handle the complexities while you enjoy the
                        benefits.
                      </p>

                      <button className="w-full bg-sky-500 text-white text-sm py-2 rounded-md hover:bg-sky-600 transition">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE CARDS */}
                <div className="grid grid-cols-2 gap-12">
                  {[
                    {
                      title: "Market Insight",
                      desc: "Stay ahead of market trends with our expert Market Analysis.",
                      icon: <FaChartBar />,
                    },
                    {
                      title: "ROI Assessment",
                      desc: "Make investment decisions with confidence using ROI insights.",
                      icon: <FaPercentage />,
                    },
                    {
                      title: "Customized Strategies",
                      desc: "We develop tailored strategies for your specific goals.",
                      icon: <FaLightbulb />,
                    },
                    {
                      title: "Diversification Mastery",
                      desc: "Diversify your portfolio across multiple property types.",
                      icon: <FaChartLine />,
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 bg-white border border-sky-100 
                     rounded-xl p-5 hover:shadow-md transition duration-300"
                    >
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
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
