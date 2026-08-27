import React, {
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiMapPin,
  FiSearch,
  FiSliders,
  FiChevronDown,
  FiCheckCircle,
} from "react-icons/fi";

import SearchBar from "../components/SearchBar";
import PropertyCard from "../components/PropertyCard";
import Blogs from "./Blogs";
import MapView from "../components/MapView";
import Footer from "../components/Footer";

const Properties = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [properties, setProperties] =
    useState([]);

  const [visibleProperties, setVisibleProperties] =
    useState([]);

  const [filters, setFilters] =
    useState({
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

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 3;

  const [expanded, setExpanded] =
    useState(null);

  const [soldProperties, setSoldProperties] =
    useState([]);

  const [soldPage, setSoldPage] =
    useState(1);

  const soldItemsPerPage = 8;

  /*
  |--------------------------------------------------------------------------
  | PAGINATION
  |--------------------------------------------------------------------------
  */

  const totalPages = Math.ceil(
    visibleProperties.length /
      itemsPerPage
  );

  const currentProperties =
    visibleProperties.slice(
      (currentPage - 1) *
        itemsPerPage,
      currentPage *
        itemsPerPage
    );

  const soldTotalPages =
    Math.ceil(
      soldProperties.length /
        soldItemsPerPage
    );

  const paginated =
    soldProperties.slice(
      (soldPage - 1) *
        soldItemsPerPage,
      soldPage *
        soldItemsPerPage
    );

  /*
  |--------------------------------------------------------------------------
  | SOLD PROPERTIES
  |--------------------------------------------------------------------------
  */

  const fetchSoldProperties =
    async () => {
      try {
        const res =
          await fetch(
            "https://lightblue-moose-690494.hostingersite.com/api/sold-properties"
          );

        const data =
          await res.json();

        setSoldProperties(
          data.data || data
        );
      } catch (error) {
        console.error(
          error
        );
      }
    };

  useEffect(() => {
    fetchSoldProperties();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | STRIP HTML
  |--------------------------------------------------------------------------
  */

  const stripHtml = (
    html
  ) => {
    const doc =
      new DOMParser().parseFromString(
        html || "",
        "text/html"
      );

    return (
      doc.body.textContent ||
      ""
    );
  };

  /*
  |--------------------------------------------------------------------------
  | FETCH PROPERTIES
  |--------------------------------------------------------------------------
  */

  const fetchData = useCallback(
    async (
      appliedFilters
    ) => {
      try {
        const f =
          appliedFilters;

        const queryObj = {
          ...f,

          ...(f.space_use
            ?.length && {
            space_use:
              f.space_use.join(
                ","
              ),
          }),

          ...(f.space_use_id
            ?.length && {
            space_use_id:
              f.space_use_id.join(
                ","
              ),
          }),

          ...(f.type && {
            property_type_id:
              f.type,
          }),

          ...(f.building_size_min && {
            building_min_size:
              f.building_size_min,
          }),

          ...(f.building_size_max && {
            building_max_size:
              f.building_size_max,
          }),
        };

        const query =
          new URLSearchParams(
            queryObj
          ).toString();

        const res =
          await fetch(
            `https://lightblue-moose-690494.hostingersite.com/api/properties?${query}`
          );

        const data =
          await res.json();

        const finalData =
          Array.isArray(data)
            ? data
            : [];

        setProperties(
          finalData
        );

        setVisibleProperties(
          finalData
        );
      } catch (err) {
        console.error(
          "Fetch Error:",
          err
        );
      }
    },
    []
  );

  /*
  |--------------------------------------------------------------------------
  | INITIAL FILTERS
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let initialFilters =
      {
        ...filters,
      };

    if (
      location.state?.filters
    ) {
      initialFilters =
        location.state.filters;
    } else {
      const saved =
        localStorage.getItem(
          "filters"
        );

      if (saved) {
        try {
          initialFilters =
            JSON.parse(
              saved
            );
        } catch (error) {
          console.error(
            "Saved filters error:",
            error
          );
        }
      }
    }

    setFilters(
      initialFilters
    );
  }, []);

  /*
  |--------------------------------------------------------------------------
  | RESET SCROLL
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    window.scrollTo(
      0,
      0
    );
  }, []);

  /*
  |--------------------------------------------------------------------------
  | FILTER DEBOUNCE
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const delay =
      setTimeout(() => {
        if (
          filters.location &&
          filters.location_selected ===
            false
        ) {
          return;
        }

        fetchData(
          filters
        );

        setCurrentPage(
          1
        );
      }, 500);

    return () =>
      clearTimeout(
        delay
      );
  }, [
    filters,
    fetchData,
  ]);

  /*
  |--------------------------------------------------------------------------
  | PAGE CHANGE
  |--------------------------------------------------------------------------
  */

  const changePage = (
    nextPage
  ) => {
    if (
      nextPage < 1 ||
      nextPage >
        totalPages
    ) {
      return;
    }

    setCurrentPage(
      nextPage
    );

    window.scrollTo({
      top: 0,
      behavior:
        "smooth",
    });
  };

  /*
  |--------------------------------------------------------------------------
  | SOLD PAGE CHANGE
  |--------------------------------------------------------------------------
  */

  const changeSoldPage =
    (nextPage) => {
      if (
        nextPage < 1 ||
        nextPage >
          soldTotalPages
      ) {
        return;
      }

      setSoldPage(
        nextPage
      );
    };

  return (
    <>
      {/* =====================================================
          MAIN PAGE
      ====================================================== */}

      <main className="min-h-screen bg-gray-50/40">

        {/* =================================================
            SEARCH AREA
        ================================================== */}

        <section className="border-b border-gray-100 bg-white">
          <div className="mx-auto max-w-[1440px] px-3 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-6">
            <SearchBar
              filters={filters}
              setFilters={
                setFilters
              }
              hideAdvancedFilters={
                false
              }
            />
          </div>
        </section>

        {/* =================================================
            MAIN MAP + PROPERTY AREA
        ================================================== */}

        <section className="mx-auto max-w-[1440px]">
          <div className="flex flex-col lg:flex-row lg:items-start">

            {/* =================================================
                MAP
            ================================================== */}

            <div
              className="
                w-full
                px-3
                pt-3
                sm:px-5
                lg:sticky
                lg:top-0
                lg:w-[62%]
                lg:px-5
                lg:py-5
                xl:w-[64%]
              "
            >
              <div
                className="
                  relative
                  h-[300px]
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-gray-100
                  bg-white
                  shadow-[0_10px_35px_rgba(15,23,42,0.07)]
                  sm:h-[380px]
                  md:h-[440px]
                  lg:h-[calc(100vh-180px)]
                  lg:min-h-[620px]
                  lg:rounded-[28px]
                "
              >
                {/* MAP HEADER */}
                <div className="pointer-events-none absolute left-4 top-4 z-20 hidden sm:block">
                  <div className="flex items-center gap-2 rounded-xl border border-white/60 bg-white/90 px-3 py-2 text-xs font-semibold text-gray-700 shadow-lg backdrop-blur-md">
                    <FiMapPin className="text-sky-500" />
                    Explore Properties
                  </div>
                </div>

                <MapView
                  key="map"
                  properties={
                    properties
                  }
                  location={
                    filters.location
                  }
                  onBoundsChange={
                    setVisibleProperties
                  }
                />
              </div>
            </div>

            {/* =================================================
                PROPERTY LIST
            ================================================== */}

            <div
              className="
                w-full
                px-3
                py-5
                sm:px-5
                lg:w-[38%]
                lg:px-5
                lg:py-5
                xl:w-[36%]
              "
            >
              {/* LIST HEADER */}

              <div className="mb-5 rounded-[22px] border border-gray-100 bg-white p-4 shadow-[0_8px_25px_rgba(15,23,42,0.05)] sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />

                      <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-sky-500">
                        Property Results
                      </span>
                    </div>

                    <h1 className="truncate text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
                      Properties
                    </h1>
                  </div>

                  <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-sky-50 px-3 text-xs font-bold text-sky-600">
                    {
                      visibleProperties.length
                    }
                  </div>
                </div>

                {/* CURRENT FILTER INFO */}

                <div className="mt-4 flex flex-wrap gap-2">
                  {filters.location && (
                    <span className="inline-flex max-w-full items-center gap-1.5 truncate rounded-full border border-gray-100 bg-gray-50 px-3 py-1.5 text-[10px] font-medium text-gray-500">
                      <FiMapPin
                        size={11}
                        className="shrink-0 text-sky-500"
                      />
                      <span className="truncate">
                        {
                          filters.location
                        }
                      </span>
                    </span>
                  )}

                  {filters.type && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-[10px] font-semibold text-sky-600">
                      <FiCheckCircle size={11} />
                      Filtered
                    </span>
                  )}
                </div>
              </div>

              {/* =================================================
                  RESULTS
              ================================================== */}

              {currentProperties.length >
              0 ? (
                <div className="space-y-5">
                  {currentProperties.map(
                    (item) => (
                      <div
                        key={`prop-${item.id}`}
                        className="overflow-hidden rounded-[22px] border border-gray-100 bg-white shadow-[0_8px_25px_rgba(15,23,42,0.05)] transition-all duration-300 hover:border-sky-100 hover:shadow-[0_14px_35px_rgba(14,165,233,0.10)]"
                      >
                        <PropertyCard
                          item={item}
                          setShowLogin={
                            setShowLogin
                          }
                        />
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="flex min-h-[420px] items-center justify-center rounded-[24px] border border-gray-100 bg-white px-6 text-center shadow-sm">
                  <div>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-sky-500">
                      <FiSearch
                        size={24}
                      />
                    </div>

                    <h3 className="mt-4 text-base font-bold text-gray-800">
                      No Result Found
                    </h3>

                    <p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-gray-400">
                      Try adjusting your
                      search filters to find
                      more properties.
                    </p>
                  </div>
                </div>
              )}

              {/* =================================================
                  PAGINATION
              ================================================== */}

              {totalPages >
                1 && (
                <div className="mt-6 rounded-[20px] border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[10px] font-medium text-gray-400 sm:text-xs">
                      Page{" "}
                      <span className="font-bold text-gray-800">
                        {
                          currentPage
                        }
                      </span>{" "}
                      of{" "}
                      <span className="font-bold text-gray-800">
                        {
                          totalPages
                        }
                      </span>
                    </p>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          changePage(
                            currentPage -
                              1
                          )
                        }
                        disabled={
                          currentPage ===
                          1
                        }
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-gray-200
                          bg-white
                          text-gray-500
                          transition-all
                          duration-300
                          hover:border-sky-200
                          hover:bg-sky-50
                          hover:text-sky-500
                          disabled:cursor-not-allowed
                          disabled:opacity-30
                        "
                        aria-label="Previous page"
                      >
                        <FiArrowLeft
                          size={15}
                        />
                      </button>

                      {/* PAGE NUMBERS */}

                      <div className="hidden items-center gap-1 sm:flex">
                        {Array.from({
                          length:
                            totalPages,
                        }).map(
                          (
                            _,
                            i
                          ) => (
                            <button
                              type="button"
                              key={
                                i
                              }
                              onClick={() =>
                                changePage(
                                  i +
                                    1
                                )
                              }
                              className={`
                                flex
                                h-9
                                min-w-9
                                items-center
                                justify-center
                                rounded-xl
                                px-2
                                text-xs
                                font-bold
                                transition-all
                                duration-300
                                ${
                                  currentPage ===
                                  i +
                                    1
                                    ? "bg-sky-500 text-white shadow-[0_7px_18px_rgba(14,165,233,0.20)]"
                                    : "border border-gray-200 bg-white text-gray-500 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-500"
                                }
                              `}
                            >
                              {i +
                                1}
                            </button>
                          )
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          changePage(
                            currentPage +
                              1
                          )
                        }
                        disabled={
                          currentPage ===
                          totalPages
                        }
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-gray-200
                          bg-white
                          text-gray-500
                          transition-all
                          duration-300
                          hover:border-sky-200
                          hover:bg-sky-50
                          hover:text-sky-500
                          disabled:cursor-not-allowed
                          disabled:opacity-30
                        "
                        aria-label="Next page"
                      >
                        <FiArrowRight
                          size={15}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            BLOGS
        ================================================== */}

        <Blogs />

        {/* =================================================
            SOLD PROPERTIES
        ================================================== */}

        {soldProperties.length >
          0 && (
          <section className="border-t border-gray-100 bg-gradient-to-b from-gray-50 to-white py-14 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">

              {/* HEADER */}

              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />

                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-500 sm:text-xs">
                      Property History
                    </p>
                  </div>

                  <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                    Sold Properties
                  </h2>

                  <p className="mt-2 max-w-lg text-xs leading-6 text-gray-500 sm:text-sm">
                    Browse properties that have
                    successfully found their new owners.
                  </p>
                </div>

                <span className="flex w-fit items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-xs font-bold text-sky-600">
                  <span className="h-2 w-2 rounded-full bg-sky-500" />
                  {soldProperties.length} Properties
                </span>
              </div>

              {/* =================================================
                  SOLD GRID
              ================================================== */}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {paginated.map(
                  (item) => {
                    const text =
                      stripHtml(
                        item.description ||
                          ""
                      );

                    const isLong =
                      text.length >
                      80;

                    const propertyId =
                      item.id ||
                      item._id;

                    const image =
                      item.image
                        ?.length
                        ? `https://lightblue-moose-690494.hostingersite.com/public/${item.image[0]?.path}`
                        : "https://thumbs.dreamstime.com/b/dummy-neighbor-chat-23372551.jpg";

                    const price =
                      item.sale_price ||
                      item.monthly_rent;

                    return (
                      <article
                        key={
                          propertyId
                        }
                        className="
                          group
                          flex
                          h-full
                          flex-col
                          overflow-hidden
                          rounded-[24px]
                          border
                          border-gray-100
                          bg-white
                          shadow-[0_8px_28px_rgba(15,23,42,0.05)]
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:border-gray-200
                          hover:shadow-[0_18px_42px_rgba(15,23,42,0.10)]
                        "
                      >

                        {/* IMAGE */}

                        <div className="relative h-[205px] overflow-hidden bg-gray-100">
                          <img
                            src={
                              image
                            }
                            className="
                              h-full
                              w-full
                              object-cover
                              transition-transform
                              duration-700
                              group-hover:scale-[1.045]
                            "
                            alt={
                              item.title
                            }
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                          {/* SOLD BADGE */}

                          <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-red-500/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white shadow-sm backdrop-blur-md">
                            Sold
                          </div>

                          {/* IMAGE ICON */}

                          <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/90 text-red-500 shadow-md backdrop-blur-md">
                            <FiCheckCircle
                              size={15}
                            />
                          </div>
                        </div>

                        {/* CONTENT */}

                        <div className="flex flex-1 flex-col p-4 sm:p-5">
                          <h3 className="line-clamp-1 text-[15px] font-bold tracking-tight text-gray-900">
                            {
                              item.title
                            }
                          </h3>

                          <div className="mt-2 flex items-center gap-1.5">
                            <FiMapPin
                              size={13}
                              className="shrink-0 text-sky-500"
                            />

                            <p className="truncate text-[11px] font-medium text-gray-500 sm:text-xs">
                              {
                                item.location
                              }
                            </p>
                          </div>

                          {/* DESCRIPTION */}

                          <div className="mt-3 min-h-[42px]">
                            <p className="text-[11px] leading-5 text-gray-500 sm:text-xs">
                              {expanded ===
                              propertyId
                                ? text
                                : text.slice(
                                    0,
                                    80
                                  ) +
                                  (isLong
                                    ? "..."
                                    : "")}
                            </p>

                            {isLong && (
                              <button
                                type="button"
                                className="mt-1.5 text-[11px] font-semibold text-sky-500 hover:text-sky-600 sm:text-xs"
                                onClick={() =>
                                  setExpanded(
                                    expanded ===
                                      propertyId
                                      ? null
                                      : propertyId
                                  )
                                }
                              >
                                {expanded ===
                                propertyId
                                  ? "Show Less"
                                  : "Read More"}
                              </button>
                            )}
                          </div>

                          <div className="my-4 border-t border-gray-100" />

                          {/* FOOTER */}

                          <div className="mt-auto flex items-center justify-between gap-3">
                            <div>
                              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-gray-400">
                                Price
                              </p>

                              <p className="mt-1 text-sm font-extrabold tracking-tight text-gray-900">
                                ₹{" "}
                                {price
                                  ? Number(
                                      price
                                    ).toLocaleString(
                                      "en-IN"
                                    )
                                  : "N/A"}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                navigate(
                                  `/property/${propertyId}`
                                )
                              }
                              className="
                                inline-flex
                                shrink-0
                                items-center
                                gap-1.5
                                rounded-xl
                                bg-sky-500
                                px-3.5
                                py-2.5
                                text-[10px]
                                font-bold
                                text-white
                                shadow-[0_7px_18px_rgba(14,165,233,0.18)]
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:bg-sky-600
                                hover:shadow-[0_10px_22px_rgba(14,165,233,0.25)]
                                active:translate-y-0
                                sm:text-xs
                              "
                            >
                              View
                              <FiArrowRight
                                size={12}
                              />
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  }
                )}
              </div>

              {/* =================================================
                  SOLD PAGINATION
              ================================================== */}

              {soldTotalPages >
                1 && (
                <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 sm:flex-row">
                  <p className="text-xs text-gray-400">
                    Page{" "}
                    <span className="font-bold text-gray-800">
                      {
                        soldPage
                      }
                    </span>{" "}
                    of{" "}
                    <span className="font-bold text-gray-800">
                      {
                        soldTotalPages
                      }
                    </span>
                  </p>

                  <div className="flex flex-wrap justify-center gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        changeSoldPage(
                          soldPage -
                            1
                        )
                      }
                      disabled={
                        soldPage ===
                        1
                      }
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        text-gray-500
                        transition-all
                        hover:border-sky-200
                        hover:bg-sky-50
                        hover:text-sky-500
                        disabled:cursor-not-allowed
                        disabled:opacity-30
                      "
                      aria-label="Previous sold properties page"
                    >
                      <FiArrowLeft
                        size={14}
                      />
                    </button>

                    {Array.from({
                      length:
                        soldTotalPages,
                    }).map(
                      (
                        _,
                        i
                      ) => (
                        <button
                          type="button"
                          key={i}
                          onClick={() =>
                            changeSoldPage(
                              i +
                                1
                            )
                          }
                          className={`
                            flex
                            h-9
                            min-w-9
                            items-center
                            justify-center
                            rounded-xl
                            px-2
                            text-xs
                            font-bold
                            transition-all
                            ${
                              soldPage ===
                              i +
                                1
                                ? "bg-sky-500 text-white shadow-[0_7px_18px_rgba(14,165,233,0.20)]"
                                : "border border-gray-200 bg-white text-gray-500 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-500"
                            }
                          `}
                        >
                          {i +
                            1}
                        </button>
                      )
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        changeSoldPage(
                          soldPage +
                            1
                        )
                      }
                      disabled={
                        soldPage ===
                        soldTotalPages
                      }
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        text-gray-500
                        transition-all
                        hover:border-sky-200
                        hover:bg-sky-50
                        hover:text-sky-500
                        disabled:cursor-not-allowed
                        disabled:opacity-30
                      "
                      aria-label="Next sold properties page"
                    >
                      <FiArrowRight
                        size={14}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Properties;