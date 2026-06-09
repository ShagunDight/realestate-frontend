import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FAQ = () => {
  const navigate = useNavigate();

  const [faqs, setFaqs] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    fetch("https://lightblue-moose-690494.hostingersite.com/api/faqs")
      .then((res) => res.json())
      .then((data) => {
        const finalData = data.data || data;
        setFaqs(Array.isArray(finalData) ? finalData : []);
      })
      .catch(() => setFaqs([]));
  }, []);

  const isLongText = (text) => {
    return (text || "").length > 110;
  };

  return (
    <section className="bg-gradient-to-b from-white to-sky-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
          <div>
            <div className="flex gap-1 mb-3">
              <span className="w-2 h-2 bg-sky-400 rounded-full"></span>
              <span className="w-3 h-3 bg-sky-500 rounded-full"></span>
              <span className="w-2 h-2 bg-sky-300 rounded-full"></span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Frequently Asked Questions
            </h2>

            <p className="text-gray-500 text-sm mt-2 max-w-xl">
              Everything you need to know about properties, listings, and services.
            </p>
          </div>

          <button onClick={() => navigate(`/faq`) } className="self-start md:self-auto px-5 py-2 text-sm border border-gray-300 rounded-lg hover:bg-sky-500 hover:text-white transition">
            View All
          </button>
        </div>

        {/* FAQ GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {faqs.length > 0 ? (
            faqs.slice(0, 3).map((item, index) => (
              <div key={item.id || index} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

                {/* QUESTION */}
                <h3 className="text-gray-800 font-semibold text-base mb-3 group-hover:text-sky-500">
                  {item?.question || "No Question"}
                </h3>

                {/* ANSWER */}
                <p className={`text-sm text-gray-500 leading-relaxed transition-all duration-300 ${ active === index ? "" : "line-clamp-2" }`}>
                  {item?.answer || "No Answer"}
                </p>

                {/* BUTTON */}
                {isLongText(item?.answer) && (
                  <button onClick={() => setActive(active === index ? null : index)} className="mt-3 text-sky-500 text-sm font-medium hover:underline">
                    {active === index ? "Show Less" : "Read More"}
                  </button>
                )}

              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400">
              No FAQs Found
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default FAQ;