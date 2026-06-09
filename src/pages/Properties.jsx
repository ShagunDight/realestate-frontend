import React, { useEffect, useState, useCallback } from "react";
import SearchBar from "../components/SearchBar";
import FilterModal from "../components/FilterModal";
import PropertyCard from "../components/PropertyCard";
import Blogs from "./Blogs";
import MapView from "../components/MapView";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

const Properties = ({ setShowLogin }) => {
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

  const totalPages = Math.ceil(visibleProperties.length / itemsPerPage);

  const currentProperties = visibleProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
        `https://lightblue-moose-690494.hostingersite.com/api/properties?${query}`
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
      fetchData(filters);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(delay);
  }, [filters, fetchData]);

  return (
    <>
      <div className="bg-white max-w-[1440px] mx-auto min-h-screen flex flex-col">

        {/* SEARCH */}
        <div className="p-3">
          <SearchBar filters={filters} setFilters={setFilters} />

          {showModal && (
            <FilterModal filters={filters} setFilters={setFilters} onClose={() => setShowModal(false)}
              onSearch={(updatedFilters) => { setFilters(updatedFilters); fetchData(updatedFilters); setShowModal(false); }}/>
          )}
        </div>

        {/* MAIN LAYOUT */}
        <div className="flex flex-col lg:flex-row lg:h-screen lg:overflow-hidden">

          {/* MAP */}
          <div className="w-full lg:w-2/3 h-[300px] lg:h-screen lg:sticky lg:top-0 z-20">
            <MapView key="map" properties={properties} location={filters.location} onBoundsChange={setVisibleProperties}/>
          </div>

          {/* LIST */}
          <div className="w-full lg:w-1/3 p-4 space-y-6 lg:h-screen lg:overflow-y-auto scrollbar-hide">

            {currentProperties.length > 0 ? (
              currentProperties.map((item) => (
                <PropertyCard key={`prop-${item.id}`} item={item} setShowLogin={setShowLogin}/>
              ))
            ) : (
              <div className="flex items-center justify-center min-h-[500px] px-6">
                No Result Found
              </div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6 flex-wrap">
                <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} className="w-10 h-10 border rounded-full">
                  ←
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 border rounded-full ${currentPage === i + 1 ? "bg-sky-500 text-white" : "hover:bg-gray-100"}`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button className="w-10 h-10 border rounded-full" onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages)) }>
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Blogs />
      <Footer />
    </>
  );
};

export default Properties;