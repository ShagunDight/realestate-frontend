import Team from "../components/Team";
import Footer from "../components/Footer";
export default function About() {
  return (
    <>
      <div className="bg-white min-h-screen px-6 md:px-20 py-16">
        {/* ===== Journey Section ===== */}
        <div className="grid md:grid-cols-2 max-w-6xl mx-auto gap-16 items-center mb-28">
          {/* Left Content */}
          <div>
            <p className="text-sky-500 mb-2 text-sm">✦ ✦ ✦ </p>

            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>

            <p className="text-gray-500 leading-relaxed mb-8 max-w-lg">
              Our story is one of continuous growth and evolution. We started as
              a small team with big dreams, determined to create a real estate
              platform that transcends the ordinary. Over the years, we've
              expanded our reach, forged valuable partnerships, and gained the
              trust of countless clients.
            </p>

            {/* Stats */}
            <div className="flex gap-6 flex-wrap">
              <div className="bg-white border border-gray-200 px-6 py-4 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold text-gray-900">200+</h3>
                <p className="text-sm text-gray-500">Happy Customers</p>
              </div>

              <div className="bg-white border border-gray-200 px-6 py-4 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold text-gray-900">10k+</h3>
                <p className="text-sm text-gray-500">Properties For Clients</p>
              </div>

              <div className="bg-white border border-gray-200 px-6 py-4 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold text-gray-900">16+</h3>
                <p className="text-sm text-gray-500">Years of Experience</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <div className="relative bg-sky-50 p-8 rounded-3xl shadow-xl">
              {/* subtle pattern effect */}
              <div className="absolute inset-0 rounded-3xl opacity-10 bg-[radial-gradient(circle,_#0ea5e9_1px,_transparent_1px)] [background-size:20px_20px]"></div>

              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
                alt="house"
                className="relative rounded-xl w-full max-w-md object-cover"
              />
            </div>
          </div>
        </div>
        {/* ===== Values Section ===== */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left Text */}
          <div className="text-center max-w-lg mx-auto mt-16 mb-12">
            <p className="text-sky-500 mb-2 text-sm">✦ ✦ ✦</p>

            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>

            <p className="text-gray-500 leading-relaxed mx-auto">
              Our story is one of continuous growth and evolution. We started as
              a small team with big dreams, determined to create a real estate
              platform that transcends the ordinary.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl shadow-lg p-6 relative">
            <div className="absolute inset-0 opacity-5 rounded-3xl bg-[radial-gradient(circle,_#0ea5e9_1px,_transparent_1px)] [background-size:20px_20px]"></div>

            {/* Lines */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-gray-200"></div>
            <div className="hidden md:block absolute left-0 right-0 top-1/2 h-px bg-gray-200"></div>

            {/* Content */}
            <div className="relative grid md:grid-cols-2">
              {[
                {
                  title: "Trust",
                  desc: "Trust is the cornerstone of every successful real estate transaction.",
                },
                {
                  title: "Excellence",
                  desc: "We set the bar high for ourselves, from properties to services.",
                },
                {
                  title: "Client-Centric",
                  desc: "Your needs are at the center of our universe.",
                },
                {
                  title: "Our Commitment",
                  desc: "We provide the highest level of service and professionalism.",
                },
              ].map((item, index) => (
                <div key={index} className="p-6">
                  {/* ICON + TITLE */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-sky-400 text-sky-500 bg-white">
                      ★
                    </div>

                    <h3 className="text-md font-semibold text-gray-900">
                      {item.title}
                    </h3>
                  </div>

                  {/* Desc */}
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* ===== Achievements Section ===== */}
        <div className="mt-24 max-w-6xl mx-auto">
          <p className="text-sky-500 text-sm mb-2">✦ ✦ ✦</p>

          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Achievements
          </h2>

          <p className="text-gray-500 mb-12">
            Our story is one of continuous growth and evolution. We started as a
            small team with big dreams, determined to create a real estate
            platform.
          </p>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "3+ Years of Excellence",
                desc: "With years of industry experience, we’ve built strong knowledge and trust.",
              },
              {
                title: "Happy Clients",
                desc: "Our greatest achievement is the satisfaction of our clients.",
              },
              {
                title: "Industry Recognition",
                desc: "We’ve earned respect from industry leaders and clients.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-2xl p-6 text-left hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Steps Section ===== */}
        <div className="mt-28">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sky-500 text-sm mb-2">✦ ✦ ✦</p>

            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Navigating the Estatein Experience
            </h2>

            <p className="text-gray-500">
              We’ve designed a simple process to help you find and purchase your
              dream property with ease.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "Step 01",
                title: "Discover a World of Possibilities",
                desc: "Your journey begins with exploring our carefully curated property listings. Use our intuitive search tools to filter properties based on your preferences, including location, type, size, and budget.",
              },
              {
                step: "Step 02",
                title: "Narrowing Down Your Choices",
                desc: "Once you've found properties that catch your eye, save them to your account or make a shortlist. This allows you to compare and revisit your favorites as you make your decision.",
              },
              {
                step: "Step 03",
                title: "Personalized Guidance",
                desc: "Have questions about a property or need more information? Our dedicated team of real estate experts is just a call or message away.",
              },
              {
                step: "Step 04",
                title: "See It for Yourself",
                desc: "Arrange viewings of the properties you're interested in. We'll coordinate with the property owners and accompany you to ensure you get a firsthand look at your potential new home.",
              },
              {
                step: "Step 05",
                title: "Making Informed Decisions",
                desc: "Before making an offer, our team will assist you with due diligence, including property inspections, legal checks, and market analysis. We want you to be fully informed and confident in your choice.",
              },
              {
                step: "Step 06",
                title: "Getting the Best Deal",
                desc: "We'll help you negotiate the best terms and prepare your offer. Our goal is to secure the property at the right price and on favorable terms",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative border border-gray-200 rounded-2xl p-6 bg-white 
              transition duration-300 
              hover:-translate-y-1
              hover:shadow-[0_20px_60px_rgba(59,130,246,0.25),0_10px_30px_rgba(168,85,247,0.15)]"
              >
                {/* Step label */}
                <span className="text-xs text-sky-500 font-semibold">
                  {item.step}
                </span>

                <h3 className="font-semibold text-gray-900 mt-2 mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm">{item.desc}</p>
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
