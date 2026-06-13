import React, { useEffect, useState, useCallback } from "react";
import SearchBar from "../components/SearchBar";
import FilterModal from "../components/FilterModal";
import PropertyCard from "../components/PropertyCard";
import Blogs from "./Blogs";
import MapView from "../components/MapView";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";

const Properties = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [visibleProperties, setVisibleProperties] = useState([]);

  const [filters, setFilters] = useState({
    location: "",
    type: "",
    space_use: [],
    space_use_id: [],
    listing_type: "",
    min_price: "",
    max_price: "",
    land_size_min: "",
    land_size_max: "",
    building_size_min: "",
    building_size_max: "",
    year_built_min: "",
    year_built_max: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const [expanded, setExpanded] = useState(null);

  const totalPages = Math.ceil(visibleProperties.length / itemsPerPage);

  const currentProperties = visibleProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [soldProperties, setSoldProperties] = useState([]);
  const [soldPage, setSoldPage] = useState(1);

  const soldItemsPerPage = 8;

  const soldTotalPages = Math.ceil(soldProperties.length / soldItemsPerPage);
  const paginated = soldProperties.slice((soldPage - 1) * soldItemsPerPage, soldPage * soldItemsPerPage);

  const fetchSoldProperties = async () => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8001/api/sold-properties"
      );

      const data = await res.json();

      setSoldProperties(data.data || data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSoldProperties();
  }, []);

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html || "", "text/html");
    return doc.body.textContent || "";
  };

  // ---------------- FETCH ----------------
  const fetchData = useCallback(async (appliedFilters) => {
    try {
      const f = appliedFilters;

      const queryObj = {
        ...f,
        ...(f.space_use?.length && { space_use: f.space_use.join(",") }),
        ...(f.space_use_id?.length && { space_use_id: f.space_use_id.join(",") }),
        ...(f.type && { property_type_id: f.type }),
        ...(f.building_size_min && { building_min_size: f.building_size_min }),
        ...(f.building_size_max && { building_max_size: f.building_size_max }),
      };

      const query = new URLSearchParams(queryObj).toString();

      const res = await fetch(
        `http://127.0.0.1:8001/api/properties?${query}`
      );

      const data = await res.json();
      const finalData = Array.isArray(data) ? data : [];

      setProperties(finalData);
      setVisibleProperties(finalData);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  }, []);

  // ---------------- INIT ----------------
  useEffect(() => {
    let initialFilters = { ...filters };

    if (location.state?.filters) {
      initialFilters = location.state.filters;
    } else {
      const saved = localStorage.getItem("filters");
      if (saved) initialFilters = JSON.parse(saved);
    }

    setFilters(initialFilters);
  }, []);

  // ---------------- RESET SCROLL ----------------
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ---------------- FILTER DEBOUNCE ----------------
  useEffect(() => {
    const delay = setTimeout(() => {
      if (
        filters.location &&
        filters.location_selected === false
      ) {
        return;
      }

      fetchData(filters);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(delay);
  }, [filters, fetchData]);

  return (
    <>
      <div className="bg-white max-w-[1440px] mx-auto min-h-screen flex flex-col">

        {/* SEARCH */}
        <div className="p-3 py-4">
          <SearchBar filters={filters} setFilters={setFilters} />

          {showModal && (
            <FilterModal filters={filters} setFilters={setFilters} onClose={() => setShowModal(false)}
              onSearch={(updatedFilters) => { setFilters(updatedFilters); fetchData(updatedFilters); setShowModal(false); }}/>
          )}
        </div>

        {/* MAIN LAYOUT */}
        <div className="flex flex-col lg:flex-row items-start">

          {/* MAP */}
          <div className="w-full lg:w-2/3 lg:sticky lg:top-0 h-[200px] lg:h-screen p-3">
            <MapView key="map" properties={properties} location={filters.location} onBoundsChange={setVisibleProperties}/>
          </div>

          {/* PROPERTY LIST */}
          <div className="w-full lg:w-1/3 p-4 space-y-6">

            {currentProperties.length > 0 ? (
              currentProperties.map((item) => (
                <PropertyCard key={`prop-${item.id}`} item={item} setShowLogin={setShowLogin}/>
              ))
            ) : (
              <div className="flex items-center justify-center min-h-[500px] px-6">
                No Result Found
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6 flex-wrap">
                <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} className="w-10 h-10 border rounded-full">
                  ←
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 border rounded-full ${
                      currentPage === i + 1
                        ? "bg-sky-500 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button className="w-10 h-10 border rounded-full"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                >
                  →
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      <Blogs />
      {soldProperties.length > 0 && (
        <div className="bg-gray-50 py-14">
          <div className="max-w-[1180px] mx-auto px-4">

            {/* HEADER */}
            <div className="flex sm:flex-row sm:items-center justify-between mb-8 gap-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Sold Properties
              </h2>

              <span className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-medium w-fit">
                {soldProperties.length} Properties
              </span>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {paginated.map((item) => {
                const text = stripHtml(item.description || "");
                const isLong = text.length > 80;

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={
                          item.image?.length
                            ? `https://lightblue-moose-690494.hostingersite.com/public/${item.image[0]?.path}`
                            : "https://thumbs.dreamstime.com/b/dummy-neighbor-chat-23372551.jpg"
                        }
                        className="w-full h-full object-cover"
                        alt={item.title}
                      />

                      <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                        SOLD
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <h3 className="font-semibold text-gray-800 line-clamp-1">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-500 line-clamp-1">
                        📍 {item.location}
                      </p>

                      <p className="text-xs sm:text-sm text-gray-500 min-h-[40px] sm:min-h-[48px]">
                        {expanded === item.id
                          ? text
                          : text.slice(0, 80) + (isLong ? "..." : "")}
                      </p>

                      {isLong && (
                        <button
                          className="text-sky-500 text-xs sm:text-sm hover:underline"
                          onClick={() =>
                            setExpanded(expanded === item.id ? null : item.id)
                          }
                        >
                          {expanded === item.id ? "Show Less" : "Read More"}
                        </button>
                      )}

                      <div className="flex justify-between items-center pt-2">
                        <p className="text-lg font-bold text-sky-600">
                          ₹ {item.sale_price || item.monthly_rent}
                        </p>

                        <button
                          onClick={() => navigate(`/property/${item.id}`)}
                          className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-sm font-medium"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* PAGINATION */}
            {soldTotalPages > 1 && (
              <div className="flex justify-center mt-10 gap-2 flex-wrap">
                {[...Array(soldTotalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSoldPage(i + 1)}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      soldPage === i + 1
                        ? "bg-sky-500 text-white"
                        : "bg-white border hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}

          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Properties;