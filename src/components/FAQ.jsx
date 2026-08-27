import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowUpRight,
  FiPlus,
  FiMinus,
  FiHelpCircle,
} from "react-icons/fi";

const FAQ = () => {
  const navigate = useNavigate();

  const [faqs, setFaqs] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    fetch(
      "https://lightblue-moose-690494.hostingersite.com/api/faqs"
    )
      .then((res) => res.json())
      .then((data) => {
        const finalData = data.data || data;

        setFaqs(
          Array.isArray(finalData)
            ? finalData
            : []
        );
      })
      .catch(() => setFaqs([]));
  }, []);

  const isLongText = (text) => {
    return (text || "").length > 100;
  };

  const getAnswerText = (answer, index) => {
    const text = answer || "";

    if (active === index || text.length <= 100) {
      return text;
    }

    return `${text.slice(0, 100)}...`;
  };

  const toggleFaq = (index) => {
    setActive((prev) =>
      prev === index ? null : index
    );
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-sky-50/70 px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-sky-50 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-blue-50 blur-3xl" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-100/30 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px]">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-9 flex flex-col gap-6 sm:mb-11 lg:flex-row lg:items-end lg:justify-between">

          <div className="max-w-2xl">

            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-500 sm:text-xs">
                Need To Know
              </span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-gray-900 sm:text-4xl lg:text-[42px]">
              Frequently Asked
              <span className="block text-sky-500">
                Questions
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-xs leading-6 text-gray-500 sm:text-sm sm:leading-7 lg:text-base">
              Everything you need to know about properties,
              listings and services before making your next
              real-estate decision.
            </p>

          </div>

          {/* VIEW ALL */}

          <button
            type="button"
            onClick={() => navigate("/faq")}
            className="
              group
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-xl
              border
              border-sky-100
              bg-white
              px-4
              py-2.5
              text-xs
              font-bold
              text-sky-600
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-sky-500
              hover:bg-sky-500
              hover:text-white
              hover:shadow-[0_10px_24px_rgba(14,165,233,0.20)]
              sm:px-5
              sm:py-3
              sm:text-sm
            "
          >
            View All

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-50 text-sky-500 transition-all duration-300 group-hover:bg-white group-hover:text-sky-500">
              <FiArrowUpRight size={14} />
            </span>
          </button>
        </div>

        {/* =====================================================
            FAQ GRID
        ====================================================== */}

        {faqs.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

            {faqs.slice(0, 3).map((item, index) => {

              const isActive =
                active === index;

              const answer =
                item?.answer || "";

              const hasLongAnswer =
                isLongText(answer);

              return (
                <article
                  key={
                    item.id || index
                  }
                  className={`
                    group
                    relative
                    flex
                    min-h-[285px]
                    flex-col
                    overflow-hidden
                    rounded-[26px]
                    border
                    bg-white
                    p-5
                    transition-all
                    duration-300
                    sm:p-6
                    ${
                      isActive
                        ? "border-sky-200 shadow-[0_18px_40px_rgba(14,165,233,0.13)]"
                        : "border-gray-100 shadow-[0_10px_32px_rgba(15,23,42,0.05)] hover:-translate-y-1 hover:border-sky-100 hover:shadow-[0_16px_38px_rgba(14,165,233,0.10)]"
                    }
                  `}
                >

                  {/* TOP ACCENT */}

                  <div
                    className={`
                      absolute
                      left-0
                      right-0
                      top-0
                      h-1
                      bg-gradient-to-r
                      from-sky-400
                      via-sky-500
                      to-blue-500
                      transition-opacity
                      duration-300
                      ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }
                    `}
                  />

                  {/* TOP ROW */}

                  <div className="flex items-start justify-between gap-3">

                    {/* NUMBER */}

                    <div
                      className={`
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        text-xs
                        font-extrabold
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? "bg-sky-500 text-white shadow-[0_8px_20px_rgba(14,165,233,0.22)]"
                            : "bg-sky-50 text-sky-500"
                        }
                      `}
                    >
                      0{index + 1}
                    </div>

                    {/* PLUS / MINUS */}

                    <button
                      type="button"
                      onClick={() =>
                        toggleFaq(index)
                      }
                      aria-expanded={
                        isActive
                      }
                      aria-label={
                        isActive
                          ? "Show less"
                          : "Show more"
                      }
                      className={`
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? "border-sky-500 bg-sky-500 text-white"
                            : "border-gray-100 bg-gray-50 text-gray-500 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-500"
                        }
                      `}
                    >
                      {isActive ? (
                        <FiMinus size={16} />
                      ) : (
                        <FiPlus size={16} />
                      )}
                    </button>

                  </div>

                  {/* QUESTION ICON */}

                  <div className="mt-5 flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-sky-500 transition-all duration-300 group-hover:bg-sky-50">
                    <FiHelpCircle size={17} />
                  </div>

                  {/* QUESTION */}

                  <h3 className="mt-4 text-base font-extrabold leading-6 tracking-tight text-gray-900 sm:text-lg">
                    {item?.question ||
                      "No Question"}
                  </h3>

                  {/* ANSWER */}

                  <div className="mt-3">

                    <p
                      className={`
                        text-xs
                        leading-6
                        text-gray-500
                        transition-all
                        duration-300
                        sm:text-sm
                        sm:leading-6
                        ${
                          isActive
                            ? "max-h-[500px]"
                            : "max-h-[72px]"
                        }
                      `}
                    >
                      {getAnswerText(
                        answer,
                        index
                      )}
                    </p>

                    {/* READ MORE / SHOW LESS */}

                    {hasLongAnswer && (
                      <button
                        type="button"
                        onClick={() =>
                          toggleFaq(
                            index
                          )
                        }
                        className="
                          mt-3
                          inline-flex
                          items-center
                          gap-1
                          rounded-lg
                          text-xs
                          font-bold
                          text-sky-500
                          transition-all
                          duration-200
                          hover:gap-2
                          hover:text-sky-600
                        "
                      >
                        <span>
                          {isActive
                            ? "Show Less"
                            : "Read More"}
                        </span>

                        {isActive ? (
                          <FiMinus
                            size={12}
                          />
                        ) : (
                          <FiArrowUpRight
                            size={12}
                          />
                        )}
                      </button>
                    )}

                  </div>

                  {/* BOTTOM GLOW */}

                  <div
                    className={`
                      pointer-events-none
                      absolute
                      -bottom-14
                      right-[-20px]
                      h-28
                      w-28
                      rounded-full
                      bg-sky-100
                      blur-2xl
                      transition-opacity
                      duration-300
                      ${
                        isActive
                          ? "opacity-70"
                          : "opacity-0 group-hover:opacity-50"
                      }
                    `}
                  />

                </article>
              );
            })}

          </div>
        ) : (
          /* =====================================================
              EMPTY STATE
          ====================================================== */

          <div className="rounded-[26px] border border-gray-100 bg-white px-6 py-14 text-center shadow-sm">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-500">
              <FiHelpCircle size={24} />
            </div>

            <h3 className="mt-4 text-base font-bold text-gray-800">
              No FAQs Found
            </h3>

            <p className="mt-1 text-xs text-gray-400">
              There are currently no frequently asked
              questions available.
            </p>

          </div>
        )}

        {/* =====================================================
            BOTTOM INFORMATION
        ====================================================== */}

        {faqs.length > 0 && (
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-sky-100 bg-sky-50/60 px-5 py-4 sm:flex-row">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sky-500 shadow-sm">
                <FiHelpCircle size={16} />
              </div>

              <div>
                <p className="text-xs font-bold text-gray-800">
                  Still have questions?
                </p>

                <p className="mt-0.5 text-[10px] text-gray-500">
                  Explore our complete FAQ section for more answers.
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={() =>
                navigate("/faq")
              }
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-xl
                bg-white
                px-4
                py-2.5
                text-xs
                font-bold
                text-sky-600
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-sky-500
                hover:text-white
              "
            >
              Explore FAQ

              <FiArrowUpRight
                size={13}
              />
            </button>

          </div>
        )}

      </div>
    </section>
  );
};

export default FAQ;