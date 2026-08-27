import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiMapPin,
  FiArrowUpRight,
} from "react-icons/fi";

const FeaturedProperties = () => {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [expanded, setExpanded] = useState(null);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(
      html || "",
      "text/html"
    );

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

    setExpanded(null);
    fetchData(newPage);
  };

  return (
    <section className="relative overflow-hidden bg-white px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}
      <div className="pointer-events-none absolute -left-32 top-20 h-64 w-64 rounded-full bg-sky-50 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-blue-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* =====================================================
            HEADER
        ====================================================== */}
        {properties?.length > 0 ? (
          <>
            <div className="mb-8 flex flex-col gap-5 sm:mb-10 lg:mb-11 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-500 sm:text-xs">
                    Explore Properties
                  </p>
                </div>

                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl lg:text-[36px]">
                  Featured Properties
                </h2>

                <p className="mt-3 max-w-xl text-xs leading-6 text-gray-500 sm:text-sm sm:leading-7">
                  Explore handpicked premium properties for
                  investment, living and business opportunities.
                </p>
              </div>

              {/* SMALL TRUST BADGE */}
              <div className="hidden shrink-0 items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-2.5 text-xs font-semibold text-sky-600 md:flex">
                <span className="h-2 w-2 rounded-full bg-sky-500" />
                Carefully Selected Properties
              </div>
            </div>

            {/* =================================================
                LOADING
            ================================================== */}
            {loading ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="overflow-hidden rounded-[24px] border border-gray-100 bg-white shadow-sm"
                  >
                    <div className="h-52 animate-pulse bg-gray-100" />

                    <div className="space-y-3 p-5">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
                      <div className="h-3 w-1/2 animate-pulse rounded bg-gray-100" />
                      <div className="h-10 w-full animate-pulse rounded bg-gray-100" />
                      <div className="h-10 w-2/3 animate-pulse rounded bg-gray-100" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* =================================================
                    PROPERTY GRID
                ================================================== */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {properties.map((item) => {
                    const text = stripHtml(
                      item.description || ""
                    );

                    const isLong = text.length > 80;

                    const propertyId =
                      item._id || item.id;

                    const image =
                      item.image &&
                      item.image.length > 0
                        ? `https://lightblue-moose-690494.hostingersite.com/public/${
                            item.image[0]?.path ||
                            item.image[0]
                          }`
                        : "https://thumbs.dreamstime.com/b/dummy-neighbor-chat-23372551.jpg";

                    const price =
                      item.property_type?.name
                        ?.toLowerCase() ===
                      "for lease"
                        ? item.monthly_rent
                        : item.sale_price;

                    return (
                      <article
                        key={propertyId}
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
                          shadow-[0_8px_28px_rgba(15,23,42,0.06)]
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:border-sky-100
                          hover:shadow-[0_18px_45px_rgba(14,165,233,0.12)]
                        "
                      >
                        {/* =================================================
                            IMAGE
                        ================================================== */}
                        <div className="relative h-52 overflow-hidden bg-gray-100 sm:h-[220px]">
                          <img
                            className="
                              h-full
                              w-full
                              object-cover
                              transition-transform
                              duration-700
                              ease-out
                              group-hover:scale-[1.045]
                            "
                            alt={
                              item.title ||
                              "Property"
                            }
                            src={image}
                          />

                          {/* IMAGE OVERLAY */}
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                          {/* TOP STATUS */}
                          <div
                            className={`
                              absolute
                              left-3
                              top-3
                              rounded-full
                              border
                              border-white/30
                              px-3
                              py-1.5
                              text-[10px]
                              font-bold
                              uppercase
                              tracking-wide
                              text-white
                              shadow-sm
                              backdrop-blur-md
                              ${
                                item.status ===
                                "active"
                                  ? "bg-green-500/90"
                                  : item.status ===
                                      "pending"
                                  ? "bg-yellow-500/90"
                                  : item.status ===
                                      "sold"
                                  ? "bg-red-500/90"
                                  : item.status ===
                                      "rented"
                                  ? "bg-blue-500/90"
                                  : "bg-gray-700/90"
                              }
                            `}
                          >
                            {item.status
                              ?.charAt(0)
                              .toUpperCase() +
                              item.status?.slice(
                                1
                              )}
                          </div>

                          {/* FEATURED BADGE */}
                          <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/90 text-sky-500 shadow-lg backdrop-blur-md">
                            <FiArrowUpRight
                              size={16}
                            />
                          </div>

                          {/* IMAGE BOTTOM TAG */}
                          <div className="absolute bottom-3 left-3 rounded-full border border-white/30 bg-black/35 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wide text-white backdrop-blur-md">
                            Featured
                          </div>
                        </div>

                        {/* =================================================
                            CONTENT
                        ================================================== */}
                        <div className="flex flex-1 flex-col p-4 sm:p-5">
                          {/* TITLE */}
                          <h3
                            className="
                              line-clamp-1
                              text-[15px]
                              font-bold
                              leading-6
                              tracking-tight
                              text-gray-900
                              transition-colors
                              duration-200
                              group-hover:text-sky-600
                              sm:text-base
                            "
                          >
                            {item.title}
                          </h3>

                          {/* LOCATION */}
                          <div className="mt-2 flex items-center gap-1.5">
                            <FiMapPin
                              className="shrink-0 text-sky-500"
                              size={13}
                            />

                            <p className="truncate text-[11px] font-medium text-gray-500 sm:text-xs">
                              {item.location ||
                                "Location not available"}
                            </p>
                          </div>

                          {/* DESCRIPTION */}
                          <div className="mt-3 min-h-[46px]">
                            <p className="text-[11px] leading-5 text-gray-500 sm:text-xs sm:leading-5">
                              {expanded ===
                              propertyId
                                ? text
                                : text.slice(0, 80) +
                                  (isLong
                                    ? "..."
                                    : "")}
                            </p>

                            {isLong && (
                              <button
                                type="button"
                                className="mt-1.5 text-[11px] font-semibold text-sky-500 transition-colors hover:text-sky-600 sm:text-xs"
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

                          {/* DIVIDER */}
                          <div className="my-4 border-t border-gray-100" />

                          {/* FOOTER */}
                          <div className="mt-auto flex items-end justify-between gap-3">
                            {/* PRICE */}
                            <div className="min-w-0">
                              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-gray-400">
                                {item.property_type?.name
                                  ?.toLowerCase() ===
                                "for lease"
                                  ? "Monthly Rent"
                                  : "Price"}
                              </p>

                              <div className="mt-1 truncate text-sm font-extrabold tracking-tight text-gray-900 sm:text-base">
                                ₹{" "}
                                {price
                                  ? Number(
                                      price
                                    ).toLocaleString(
                                      "en-IN"
                                    )
                                  : "N/A"}
                              </div>
                            </div>

                            {/* VIEW BUTTON */}
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
                                bg-sky-50
                                px-3.5
                                py-2.5
                                text-[10px]
                                font-bold
                                text-sky-600
                                ring-1
                                ring-sky-100
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:bg-sky-500
                                hover:text-white
                                hover:ring-sky-500
                                sm:px-4
                                sm:text-xs
                              "
                            >
                              View
                              <FiArrowUpRight
                                size={13}
                              />
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {/* =================================================
                    PAGINATION
                ================================================== */}
                <div
                  className="
                    mt-8
                    flex
                    flex-col
                    gap-4
                    border-t
                    border-gray-100
                    pt-5
                    sm:mt-10
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >
                  {/* PAGE INFO */}
                  <div className="text-center sm:text-left">
                    <p className="text-xs font-medium text-gray-400">
                      Showing page{" "}
                      <span className="font-bold text-gray-800">
                        {page}
                      </span>{" "}
                      of{" "}
                      <span className="font-bold text-gray-800">
                        {lastPage}
                      </span>
                    </p>
                  </div>

                  {/* CONTROLS */}
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        changePage(
                          page - 1
                        )
                      }
                      disabled={page === 1}
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        text-gray-500
                        shadow-sm
                        transition-all
                        duration-300
                        hover:border-sky-200
                        hover:bg-sky-50
                        hover:text-sky-500
                        disabled:cursor-not-allowed
                        disabled:opacity-30
                        disabled:hover:border-gray-200
                        disabled:hover:bg-white
                        disabled:hover:text-gray-500
                      "
                      aria-label="Previous page"
                    >
                      <FiArrowLeft
                        size={16}
                      />
                    </button>

                    <div className="flex h-10 min-w-16 items-center justify-center rounded-xl border border-sky-100 bg-sky-50 px-3 text-xs font-bold text-sky-600">
                      {page} / {lastPage}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        changePage(
                          page + 1
                        )
                      }
                      disabled={
                        page === lastPage
                      }
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        text-gray-500
                        shadow-sm
                        transition-all
                        duration-300
                        hover:border-sky-200
                        hover:bg-sky-50
                        hover:text-sky-500
                        disabled:cursor-not-allowed
                        disabled:opacity-30
                        disabled:hover:border-gray-200
                        disabled:hover:bg-white
                        disabled:hover:text-gray-500
                      "
                      aria-label="Next page"
                    >
                      <FiArrowRight
                        size={16}
                      />
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        ) : null}
      </div>
    </section>
  );
};

export default FeaturedProperties;