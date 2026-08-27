import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";

const FAQPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetch("https://lightblue-moose-690494.hostingersite.com/api/faqs")
      .then((res) => res.json())
      .then((data) => setFaqs(data.data || []))
      .catch(() => setFaqs([]));
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white">

        {/* =====================================================
            HERO / HEADER
        ====================================================== */}
        <section className="relative overflow-hidden px-5 sm:px-8 md:px-12 lg:px-20 pt-14 sm:pt-18 md:pt-20 pb-14 md:pb-16">

          {/* Decorative Background */}
          <div className="absolute -top-32 -right-32 w-[420px] h-[420px] bg-sky-100/70 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[350px] h-[350px] bg-sky-50 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto">
            <div className="max-w-3xl mx-auto text-center">

              {/* Label */}
              <div className="inline-flex items-center gap-3 mb-5">
                <span className="w-8 h-[2px] bg-sky-500" />

                <span className="text-sky-600 text-xs font-bold tracking-[0.22em]">
                  FAQ
                </span>

                <span className="w-8 h-[2px] bg-sky-500" />
              </div>

              {/* Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-tight text-gray-950">
                Frequently Asked
                <span className="block text-sky-500">
                  Questions
                </span>
              </h1>

              {/* Description */}
              <p className="mt-5 text-gray-500 text-sm sm:text-base md:text-lg leading-7 max-w-2xl mx-auto">
                Everything you need to know about properties, services,
                pricing and support.
              </p>

            </div>
          </div>
        </section>


        {/* =====================================================
            FAQ SECTION
        ====================================================== */}
        <section className="px-5 sm:px-8 md:px-12 lg:px-20 pb-20 md:pb-28">

          <div className="max-w-4xl mx-auto">

            {/* Small Intro */}
            <div className="flex items-center justify-between mb-6">

              <div>
                <p className="text-xs font-semibold text-sky-500 uppercase tracking-[0.18em]">
                  Help Center
                </p>

                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                  Common Questions
                </h2>
              </div>

              {faqs.length > 0 && (
                <span className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-xs font-medium text-sky-600">
                  {faqs.length} Questions
                </span>
              )}

            </div>


            {/* FAQ LIST */}
            <div className="space-y-4">

              {faqs.length === 0 ? (

                /* EMPTY STATE */
                <div className="bg-white border border-gray-100 rounded-3xl p-10 sm:p-14 text-center shadow-sm">

                  <div className="w-14 h-14 mx-auto rounded-2xl bg-sky-50 flex items-center justify-center mb-5">
                    <span className="text-sky-500 text-xl font-bold">
                      ?
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900">
                    No FAQs found
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    Please check back later for frequently asked questions.
                  </p>

                </div>

              ) : (

                faqs.map((faq, index) => {

                  const isOpen = openIndex === index;

                  return (
                    <div
                      key={faq._id || index}
                      className={`
                        group
                        bg-white
                        border
                        rounded-2xl
                        overflow-hidden
                        transition-all duration-300
                        ${
                          isOpen
                            ? "border-sky-200 shadow-[0_15px_40px_rgba(14,165,233,0.10)]"
                            : "border-gray-100 shadow-sm hover:border-sky-100 hover:shadow-md"
                        }
                      `}
                    >

                      {/* QUESTION */}
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full flex items-center gap-4 text-left px-5 sm:px-6 md:px-7 py-5 sm:py-6"
                      >

                        {/* Number */}
                        <span
                          className={`
                            hidden sm:flex
                            flex-shrink-0
                            w-9 h-9
                            rounded-xl
                            items-center justify-center
                            text-xs font-bold
                            transition-all duration-300
                            ${
                              isOpen
                                ? "bg-sky-500 text-white"
                                : "bg-sky-50 text-sky-500 group-hover:bg-sky-100"
                            }
                          `}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>


                        {/* Question */}
                        <span
                          className={`
                            flex-1
                            font-semibold
                            text-sm sm:text-base md:text-[17px]
                            leading-6
                            pr-2
                            transition-colors duration-300
                            ${
                              isOpen
                                ? "text-sky-600"
                                : "text-gray-800"
                            }
                          `}
                        >
                          {faq.question}
                        </span>


                        {/* Toggle */}
                        <span
                          className={`
                            flex-shrink-0
                            w-9 h-9 sm:w-10 sm:h-10
                            rounded-full
                            flex items-center justify-center
                            text-lg sm:text-xl
                            border
                            transition-all duration-300
                            ${
                              isOpen
                                ? "bg-sky-500 border-sky-500 text-white rotate-180"
                                : "bg-sky-50 border-sky-100 text-sky-600 group-hover:bg-sky-100"
                            }
                          `}
                        >
                          {isOpen ? "−" : "+"}
                        </span>

                      </button>


                      {/* ANSWER */}
                      <div
                        className={`
                          overflow-hidden
                          transition-all duration-300 ease-in-out
                          ${
                            isOpen
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
                          }
                        `}
                      >
                        <div className="px-5 sm:px-6 md:px-7 pb-6">

                          <div className="sm:ml-[52px] pl-4 border-l-2 border-sky-100">
                            <p className="text-gray-500 text-sm sm:text-[15px] leading-7">
                              {faq.answer}
                            </p>
                          </div>

                        </div>
                      </div>

                    </div>
                  );
                })
              )}

            </div>
          </div>
        </section>


        {/* =====================================================
            SUPPORT CTA
        ====================================================== */}
        <section className="px-5 sm:px-8 md:px-12 lg:px-20 pb-20 md:pb-28">

          <div className="max-w-5xl mx-auto">

            <div className="relative overflow-hidden rounded-[28px] bg-sky-50 border border-sky-100 px-6 sm:px-10 md:px-14 py-10 md:py-12">

              {/* Decorative Circles */}
              <div className="absolute -right-16 -top-20 w-52 h-52 rounded-full bg-white/70" />
              <div className="absolute -left-20 -bottom-24 w-56 h-56 rounded-full bg-sky-100/70" />

              <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-7">

                <div className="max-w-xl">

                  <p className="text-sky-600 text-xs font-bold uppercase tracking-[0.18em] mb-2">
                    Still Have Questions?
                  </p>

                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    We're here to help.
                  </h2>

                  <p className="mt-3 text-sm sm:text-base text-gray-500 leading-6">
                    Our team is always ready to help you with your real estate
                    journey and provide the information you need.
                  </p>

                </div>

                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-sky-100 flex items-center justify-center">
                    <span className="text-sky-500 text-xl font-bold">
                      ?
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default FAQPage;