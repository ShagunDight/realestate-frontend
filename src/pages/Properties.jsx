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
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  const currentProperties = properties.slice(
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

      const res = await fetch(
        `https://lightblue-moose-690494.hostingersite.com/api/properties?${query}`
      );

      const data = await res.json();
      console.log("Res :", data);
      setProperties(Array.isArray(data) ? data : []);
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
            <MapView properties={properties} location={filters.location} />
          </div>

          {/* LISTING */}
          <div className="w-1/2 overflow-y-auto p-4 space-y-6 h-full">

            {currentProperties.length > 0 ? (
              currentProperties.map((item) => (
                <PropertyCard key={item.id} item={item} />
              ))
            ) : (
              <p className="text-gray-500">No Properties Found</p>
            )}

            {/* PAGINATION */}
            {properties.length > itemsPerPage && (
              <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">

                <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} className="w-10 h-10 rounded-full border hover:bg-sky-500 hover:text-white transition disabled:opacity-40">
                  ←
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 border rounded-full ${
                      currentPage === i + 1 ? "bg-sky-500 text-white" : "hover:bg-gray-100"
                    }`
                  }>
                    {i + 1}
                  </button>
                ))}

                <button onClick={() =>
                    setCurrentPage((p) =>
                      Math.min(p + 1, totalPages)
                    )
                  } className="w-10 h-10 rounded-full border hover:bg-sky-500 hover:text-white transition disabled:opacity-40">
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