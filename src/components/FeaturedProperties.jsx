import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FeaturedProperties = () => {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [expanded, setExpanded] = useState(null);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html || "", "text/html");
    return doc.body.textContent || "";
  };

  const fetchData = async (pageNo = 1) => {
    setLoading(true);

    try {
      const res = await fetch(
        `https://lightblue-moose-690494.hostingersite.com/api/featuredProperty?page=${pageNo}`
      );

      const data = await res.json();

      setProperties(data.data || []);
      setLastPage(data.last_page || 1);
      setPage(data.current_page || pageNo);

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const changePage = (newPage) => {
    if (newPage < 1 || newPage > lastPage) return;
    fetchData(newPage);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Featured Properties
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-xl">
            Explore handpicked premium properties for investment and business opportunities.
          </p>
        </div>
      </div>

      {/* GRID */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {properties.map((item) => {
            const text = stripHtml(item.description || "");
            const isLong = text.length > 80;

            return (
              <div
                key={item._id || item.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >

                {/* IMAGE */}
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <img
                    src={
                      item.image && item.image.length > 0
                        ? `https://lightblue-moose-690494.hostingersite.com/${item.image[0]?.path || item.image[0]}`
                        : "https://thumbs.dreamstime.com/b/dummy-neighbor-chat-23372551.jpg"
                    }
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-4 flex flex-col gap-3">

                  <h3 className="text-base font-semibold text-gray-800">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    📍 {item.location || "Location not available"}
                  </p>

                  <p className="text-sm text-gray-500 min-h-[48px]">
                    {expanded === item._id
                      ? text
                      : text.slice(0, 80) + (isLong ? "..." : "")}
                  </p>

                  {isLong && (
                    <button
                      onClick={() =>
                        setExpanded(expanded === item._id ? null : item._id)
                      }
                      className="text-sky-500 text-sm"
                    >
                      {expanded === item._id ? "Show Less" : "Read More"}
                    </button>
                  )}

                  <div className="flex justify-between items-center pt-3 border-t">

                    <div className="font-semibold text-sm">
                      ₹{" "}
                      {item.property_type?.name?.toLowerCase() === "for lease"
                        ? item.monthly_rent
                        : item.sale_price || "N/A"}
                    </div>

                    <button
                      onClick={() =>
                        navigate(`/property/${item._id || item.id}`)
                      }
                      className="px-3 py-1.5 text-xs bg-sky-500 text-white rounded-lg"
                    >
                      View
                    </button>

                  </div>
                </div>
              </div>
            );
          })}

        </div>
      )}

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-10 text-gray-600 text-sm">

        <p>
          Page {page} of {lastPage}
        </p>

        <div className="flex gap-3">

          <button
            onClick={() => changePage(page - 1)}
            disabled={page === 1}
            className="w-9 h-9 flex items-center justify-center border rounded-full hover:bg-sky-500 hover:text-white disabled:opacity-40"
          >
            ←
          </button>

          <button
            onClick={() => changePage(page + 1)}
            disabled={page === lastPage}
            className="w-9 h-9 flex items-center justify-center border rounded-full hover:bg-sky-500 hover:text-white disabled:opacity-40"
          >
            →
          </button>

        </div>
      </div>

    </section>
  );
};

export default FeaturedProperties;