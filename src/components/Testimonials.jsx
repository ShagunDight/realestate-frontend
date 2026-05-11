import React from "react";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Wade Warren",
    location: "USA, California",
    text: "Our experience with Estatein was outstanding. Their team's dedication and professionalism made finding our dream home a breeze.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Emelie Thomson",
    location: "USA, Florida",
    text: "Estatein provided us with top-notch service. They helped us sell our property quickly and at a great price.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "John Mans",
    location: "USA, Nevada",
    text: "The Estatein team guided us through the entire buying process. Their knowledge and commitment were impressive.",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-[1300px] mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            {/* DECORATIVE ICONS */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-sky-400 rounded-full"></span>
              <span className="w-3 h-3 bg-sky-500 rounded-full"></span>
              <span className="w-2 h-2 bg-sky-300 rounded-full"></span>
            </div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-2 mx-6">
              What Our Clients Say
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-8">
              Read the success stories and heartfelt testimonials from our
              valued clients.
            </p>
          </div>

          <button className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-sky-500 hover:text-white transition">
            View All Testimonials
          </button>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-3">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >
              {/* STARS */}
              <div className="flex gap-1 mb-4 text-yellow-400">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="text-sky-400  hover:scale-110 transition"
                    />
                  ))}
                </div>
              </div>

              {/* TITLE */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Exceptional Service!
              </h3>

              {/* TEXT */}
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {item.text}
              </p>

              {/* USER */}
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center mt-10 text-gray-500 text-sm">
          <p>01 of 10</p>

          <div className="flex gap-3">
            <button className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-full hover:bg-sky-500 hover:text-white transition">
              ←
            </button>
            <button className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-full hover:bg-sky-500 hover:text-white transition">
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
