import Team from "../components/Team";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <div className="bg-gradient-to-b from-white to-sky-50 min-h-screen px-6 md:px-20 py-16">

        {/* ===== HERO / JOURNEY ===== */}
        <div className="grid md:grid-cols-2 max-w-6xl mx-auto gap-16 items-center mb-24">

          {/* LEFT */}
          <div>
            <p className="text-sky-500 font-semibold tracking-widest text-xs mb-3">
              OUR STORY
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5">
              Our Journey
            </h2>

            <p className="text-gray-500 leading-relaxed mb-8">
              Our story is one of continuous growth and evolution. We started as
              a small team with big dreams, determined to create a real estate
              platform that transcends the ordinary.
            </p>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { num: "200+", label: "Happy Customers" },
                { num: "10k+", label: "Properties" },
                { num: "16+", label: "Years Experience" },
              ].map((s, i) => (
                <div key={i} className="bg-white border border-sky-100 rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition">
                  <h3 className="text-xl font-bold text-sky-600">{s.num}</h3>
                  <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <div className="absolute -inset-4 bg-sky-200/30 blur-3xl rounded-full"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-sky-100">
              <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa" alt="house" className="w-full h-[420px] object-cover" />
            </div>
          </div>
        </div>

        {/* ===== VALUES ===== */}
        <div className="max-w-6xl mx-auto mb-28">
          <div className="text-center mb-14">
            <p className="text-sky-500 text-xs tracking-widest mb-2">
              CORE VALUES
            </p>

            <h2 className="text-4xl font-bold text-gray-900">
              Our Values
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Trust", desc: "Trust is the cornerstone of every successful real estate transaction." },
              { title: "Excellence", desc: "We set the bar high for ourselves, from properties to services." },
              { title: "Client-Centric", desc: "Your needs are at the center of our universe." },
              { title: "Commitment", desc: "We provide the highest level of service and professionalism." },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center font-bold">
                    ★
                  </div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                </div>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== ACHIEVEMENTS ===== */}
        <div className="max-w-6xl mx-auto mb-28">

          <div className="text-center mb-12">
            <p className="text-sky-500 text-xs tracking-widest mb-2">
              MILESTONES
            </p>

            <h2 className="text-4xl font-bold text-gray-900">
              Our Achievements
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "3+ Years Growth", desc: "Strong industry presence and expertise." },
              { title: "Happy Clients", desc: "Client satisfaction is our biggest win." },
              { title: "Industry Recognition", desc: "Trusted by leading professionals." },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl transition">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== STEPS ===== */}
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-14">
            <p className="text-sky-500 text-xs tracking-widest mb-2">
              PROCESS
            </p>

            <h2 className="text-4xl font-bold text-gray-900">
              Navigating Estatein Experience
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Discover properties",
              "Shortlist your options",
              "Get expert guidance",
              "Schedule visits",
              "Final evaluation",
              "Close the deal",
            ].map((title, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
                <p className="text-sky-500 text-xs font-semibold mb-2">
                  STEP {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-500 text-sm mt-2">
                  Smooth and guided process to help you find your perfect property.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Team />
      <Footer />
    </>
  );
}