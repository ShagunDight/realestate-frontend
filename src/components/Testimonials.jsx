import React from "react";
import { FaStar, FaQuoteRight } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight, FiMapPin } from "react-icons/fi";

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
    <section className="relative overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-sky-50 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-blue-50 blur-3xl" />

      <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-sky-50/50 blur-3xl" />

      <div className="relative mx-auto max-w-[1300px]">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-10 flex flex-col gap-5 md:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />

              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-500 sm:text-xs">
                Client Reviews
              </p>
            </div>

            <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-gray-900 sm:text-4xl lg:text-[42px]">
              Loved by People
              <span className="block text-sky-500">
                Who Found Their Place
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-xs leading-6 text-gray-500 sm:text-sm sm:leading-7 lg:text-base">
              Real experiences from clients who trusted Estatein
              to make their property journey simpler and more
              successful.
            </p>
          </div>

          {/* REVIEW SUMMARY */}
          <div className="flex w-fit items-center gap-3 rounded-2xl border border-sky-100 bg-sky-50/80 px-4 py-3 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sky-500 shadow-sm">
              <FaStar size={15} />
            </div>

            <div>
              <div className="flex items-center gap-1">
                <span className="text-lg font-extrabold text-gray-900">
                  4.9
                </span>

                <span className="text-xs text-gray-400">
                  / 5.0
                </span>
              </div>

              <p className="text-[10px] font-medium text-gray-500">
                From our valued clients
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            TESTIMONIAL GRID
        ====================================================== */}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <article
              key={index}
              className={`
                group
                relative
                flex
                min-h-[340px]
                flex-col
                overflow-hidden
                rounded-[28px]
                border
                border-gray-100
                bg-white
                p-5
                shadow-[0_10px_35px_rgba(15,23,42,0.06)]
                transition-all
                duration-500
                hover:-translate-y-1.5
                hover:border-sky-100
                hover:shadow-[0_22px_50px_rgba(14,165,233,0.12)]
                sm:p-6
                ${
                  index === 1
                    ? "lg:-translate-y-3 lg:hover:-translate-y-4"
                    : ""
                }
              `}
            >
              {/* TOP LINE */}
              <div
                className="
                  absolute
                  left-0
                  right-0
                  top-0
                  h-1
                  bg-gradient-to-r
                  from-sky-400
                  via-sky-500
                  to-blue-500
                  opacity-0
                  transition-opacity
                  duration-300
                  group-hover:opacity-100
                "
              />

              {/* LARGE QUOTE ICON */}
              <div
                className="
                  absolute
                  right-5
                  top-5
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-sky-50
                  text-sky-300
                  transition-all
                  duration-300
                  group-hover:rotate-3
                  group-hover:bg-sky-500
                  group-hover:text-white
                "
              >
                <FaQuoteRight size={18} />
              </div>

              {/* INDEX */}
              <div className="mb-6 text-[10px] font-bold tracking-[0.2em] text-gray-300">
                TESTIMONIAL 0{index + 1}
              </div>

              {/* RATING */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1.5">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="text-[10px] text-sky-500 sm:text-[11px]"
                    />
                  ))}
                </div>

                <span className="text-[10px] font-semibold text-gray-400">
                  5.0
                </span>
              </div>

              {/* TITLE */}
              <h3 className="mt-5 max-w-[75%] text-lg font-extrabold leading-6 tracking-tight text-gray-900 sm:text-xl">
                Exceptional Service
              </h3>

              {/* TEXT */}
              <p className="mt-3 text-sm leading-7 text-gray-500">
                “{item.text}”
              </p>

              {/* DIVIDER */}
              <div className="my-6 h-px w-full bg-gray-100" />

              {/* USER */}
              <div className="mt-auto flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* AVATAR */}
                  <div className="relative">
                    <div className="h-12 w-12 overflow-hidden rounded-full border-[3px] border-white bg-gray-100 shadow-md ring-1 ring-sky-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-500
                          group-hover:scale-105
                        "
                      />
                    </div>

                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-sky-500" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-gray-900">
                      {item.name}
                    </p>

                    <div className="mt-1 flex items-center gap-1 text-[10px] text-gray-400">
                      <FiMapPin size={11} className="text-sky-500" />

                      <span className="truncate">
                        {item.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* VERIFIED */}
                <span className="hidden rounded-full border border-green-100 bg-green-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-green-600 sm:inline-flex">
                  Verified
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* =====================================================
            FOOTER / NAVIGATION
        ====================================================== */}

        <div className="mt-8 flex flex-col gap-5 border-t border-gray-100 pt-6 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
          {/* PAGE INFO */}
          <div className="text-center sm:text-left">
            <p className="text-xs font-medium text-gray-400">
              Showing{" "}
              <span className="font-bold text-gray-900">
                3
              </span>{" "}
              of{" "}
              <span className="font-bold text-gray-900">
                10
              </span>{" "}
              client stories
            </p>
          </div>

          {/* CONTROLS */}
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-gray-200
                bg-white
                text-gray-500
                shadow-sm
                transition-all
                duration-300
                hover:border-sky-200
                hover:bg-sky-50
                hover:text-sky-500
                active:scale-95
              "
              aria-label="Previous testimonial"
            >
              <FiArrowLeft size={17} />
            </button>

            <div className="flex h-11 min-w-[72px] items-center justify-center rounded-xl border border-sky-100 bg-sky-50 px-4 text-xs font-bold text-sky-600">
              01 / 10
            </div>

            <button
              type="button"
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-gray-200
                bg-white
                text-gray-500
                shadow-sm
                transition-all
                duration-300
                hover:border-sky-200
                hover:bg-sky-50
                hover:text-sky-500
                active:scale-95
              "
              aria-label="Next testimonial"
            >
              <FiArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;