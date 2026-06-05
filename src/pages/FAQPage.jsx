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
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white py-16 px-4">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-14">
          <div className="flex justify-center mb-4">
            <div className="flex gap-2">
              <span className="w-2 h-2 bg-sky-400 rounded-full"></span>
              <span className="w-3 h-3 bg-sky-500 rounded-full"></span>
              <span className="w-2 h-2 bg-sky-300 rounded-full"></span>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
            Frequently Asked Questions
          </h1>

          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Everything you need to know about properties, services, pricing and support.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-4">

          {faqs.length === 0 ? (
            <div className="text-center text-gray-400">
              No FAQs found
            </div>
          ) : (
            faqs.map((faq, index) => (
              <div
                key={faq._id || index}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all"
              >

                {/* QUESTION */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center text-left px-6 py-5"
                >
                  <span className="font-semibold text-gray-800 pr-4">
                    {faq.question}
                  </span>

                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-50 text-sky-600 text-xl">
                    {openIndex === index ? "−" : "+"}
                  </div>
                </button>

                {/* ANSWER */}
                <div
                  className={`px-6 overflow-hidden transition-all duration-300 text-gray-600 text-sm leading-relaxed ${
                    openIndex === index
                      ? "max-h-96 pb-5"
                      : "max-h-0"
                  }`}
                >
                  {faq.answer}
                </div>

              </div>
            ))
          )}
        </div>

      </div>
      </div>
    <Footer />
    </>
  );
};

export default FAQPage;