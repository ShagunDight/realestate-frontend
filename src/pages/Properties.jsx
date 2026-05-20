import React, { useEffect, useState, useCallback, useRef } from "react";
import SearchBar from "../components/SearchBar";
import FilterModal from "../components/FilterModal";
import PropertyCard from "../components/PropertyCard";
import Blogs from "./Blogs";
import MapView from "../components/MapView";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

const Properties = () => {
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

  // -------------------------
  // PAGINATION CALC
  // -------------------------
  const totalPages = Math.ceil(visibleProperties.length / itemsPerPage);

  const currentProperties = visibleProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // -------------------------
  // FETCH FUNCTION (STABLE)
  // -------------------------
  const fetchData = useCallback(async (appliedFilters) => {
    try {
      const f = appliedFilters;

      const queryObj = {
        ...f,

        ...(f.space_use?.length && {
          space_use: f.space_use.join(","),
        }),

        ...(f.space_use_id?.length && {
          space_use_id: f.space_use_id.join(","),
        }),

        ...(f.type && {
          property_type_id: f.type,
        }),

        ...(f.building_size_min && {
          building_min_size: f.building_size_min,
        }),

        ...(f.building_size_max && {
          building_max_size: f.building_size_max,
        }),
      };

      const query = new URLSearchParams(queryObj).toString();
      const res = await fetch(`http://127.0.0.1:8001/api/properties?${query}`);
      const data = await res.json();
      
      console.log("Res :", data);
      const finalData = Array.isArray(data) ? data : [];

      setProperties(finalData);
      setVisibleProperties(finalData);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  }, []);

  // -------------------------
  // INIT LOAD (ONLY ONCE)
  // -------------------------
  useEffect(() => {
    let initialFilters = { ...filters };

    if (location.state?.filters) {
      initialFilters = location.state.filters;
    } else {
      const saved = localStorage.getItem("filters");
      if (saved) {
        initialFilters = JSON.parse(saved);
      }
    }

    setFilters(initialFilters);
    // fetchData(initialFilters);
  }, []);

  // -------------------------
  // FILTER CHANGE (DEBOUNCE)
  // -------------------------
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchData(filters);
      setCurrentPage(1); // reset page on filter change
    }, 300);

    return () => clearTimeout(delay);
  }, [filters, fetchData]);

  return (
    <>
      <div className="bg-white max-w-[1440px] min-h-screen mx-auto flex flex-col">

        {/* SEARCH BAR + FILTER */}
        <div className="p-6">
          <SearchBar filters={filters} setFilters={setFilters} />

          {showModal && (
            <FilterModal filters={filters} setFilters={setFilters} onClose={() => setShowModal(false)}
              onSearch={(updatedFilters) => {
                setFilters(updatedFilters);
                fetchData(updatedFilters);
                setShowModal(false);
              }}
            />  
          )}
        </div>

        <div className="flex flex-1 h-[calc(100vh-120px)]">

          {/* MAP */}
          <div className="w-1/2 p-4 sticky top-0 h-screen">
            <MapView properties={properties} location={filters.location} onBoundsChange={setVisibleProperties}/>
          </div>

          {/* LISTING */}
          <div className="w-1/2 overflow-y-auto p-4 space-y-6 h-full">

            {currentProperties.length > 0 ? (
              currentProperties.map((item) => (
                <PropertyCard key={item.id} item={item} />
              ))
            ) : (
              <div className="flex items-center justify-center min-h-[500px] px-6">
                <div className="relative max-w-lg w-full">
                  <div className="absolute inset-0 bg-sky-100 blur-3xl opacity-40 rounded-full"></div>
                  <div className="relative bg-white/90 backdrop-blur-lg border border-gray-100 shadow-2xl rounded-[32px] px-10 py-14 text-center overflow-hidden">

                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500"></div>
                    <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-sky-100 to-cyan-50 flex items-center justify-center shadow-inner mb-8">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10l9-7 9 7"/>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 9.5V20a1 1 0 001 1h4m8-11.5V20a1 1 0 01-1 1h-4"/>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 21v-6a2 2 0 012-2 2 2 0 012 2v6"/>
                      </svg>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800 mb-4 tracking-tight">
                      No Result Found
                    </h2>

                    <p className="text-gray-500 leading-7 text-[15px] max-w-md mx-auto">
                      Try adjusting your search area or changing or removing some of your filters
                    </p>

                    <div className="mt-10 flex items-center justify-center gap-3 text-sm text-gray-400">
                      <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                      Updated listings are added regularly
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PAGINATION */}
            {visibleProperties.length > itemsPerPage && (
              <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
                <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} className="w-10 h-10 rounded-full border hover:bg-sky-500 hover:text-white transition disabled:opacity-40">
                  ←
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-3 py-1 border rounded-full ${ currentPage === i + 1 ? "bg-sky-500 text-white" : "hover:bg-gray-100" }`
                  }>{i + 1}
                  </button>
                ))}

                <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} className="w-10 h-10 rounded-full border hover:bg-sky-500 
                  hover:text-white transition disabled:opacity-40">
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