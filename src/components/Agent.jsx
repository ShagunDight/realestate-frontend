import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = "https://lightblue-moose-690494.hostingersite.com";

const FALLBACK_IMAGE =
  "https://thumbs.dreamstime.com/b/dummy-neighbor-chat-23372551.jpg";

const PER_PAGE = 4;

export default function Agent() {
  const [agents, setAgents] = useState([]);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(true);

  const [location, setLocation] = useState({
    city: "",
    state: "",
  });

  const [locationMatchedBy, setLocationMatchedBy] = useState("all");

  const [error, setError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Get Current Location
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          /*
           * Reverse geocoding current browser location.
           *
           * We only need city + state.
           */
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            {
              headers: {
                Accept: "application/json",
              },
            },
          );

          if (!response.ok) {
            throw new Error("Unable to detect current location.");
          }

          const data = await response.json();

          const address = data?.address || {};

          const city =
            address.city ||
            address.town ||
            address.village ||
            address.municipality ||
            "";

          const state = address.state || "";

          setLocation({
            city,
            state,
          });
        } catch (error) {
          console.error("Location detection error:", error);

          setLocation({
            city: "",
            state: "",
          });
        } finally {
          setLocationLoading(false);
        }
      },

      (error) => {
        console.log("Location permission/error:", error.message);

        setLocationLoading(false);
      },

      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 15 * 60 * 1000,
      },
    );
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Fetch Featured Agents
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    /*
     * Don't call API until location detection is completed.
     */
    if (locationLoading) {
      return;
    }

    fetchAgents(page);
  }, [page, locationLoading, location.city, location.state]);

  const fetchAgents = async (currentPage) => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      params.set("page", currentPage);
      params.set("per_page", PER_PAGE);

      if (location.city) {
        params.set("city", location.city);
      }

      if (location.state) {
        params.set("state", location.state);
      }

      const response = await fetch(
        `${API_BASE}/api/agent?${params.toString()}`,
      );

      if (!response.ok) {
        throw new Error("Failed to load featured agents.");
      }

      const data = await response.json();

      if (!data?.status) {
        throw new Error(data?.message || "Unable to load featured agents.");
      }

      setAgents(Array.isArray(data?.data) ? data.data : []);

      setLastPage(Number(data?.pagination?.last_page || 1));

      setLocationMatchedBy(data?.location?.matched_by || "all");
    } catch (error) {
      console.error("Featured agents error:", error);

      setAgents([]);
      setError("Unable to load featured agents right now.");
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Image URL
  |--------------------------------------------------------------------------
  */

  const getAgentImage = (member) => {
    if (!member?.img) {
      return FALLBACK_IMAGE;
    }

    const image = String(member.img);

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    if (image.startsWith("/")) {
      return `${API_BASE}/public${image}`;
    }

    return `${API_BASE}/public/${image}`;
  };

  /*
  |--------------------------------------------------------------------------
  | Pagination
  |--------------------------------------------------------------------------
  */

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const goToNextPage = () => {
    if (page < lastPage) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <section className="relative mt-16 md:mt-20 mb-14 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-sky-100/40 rounded-full blur-3xl" />

        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================
            HEADER
        ========================== */}

        <div className="mb-10 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-[2px] bg-sky-500"></span>

                <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-sky-500">
                  Our Experts
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-tight font-bold text-gray-900">
                Meet Our <span className="text-sky-500">Featured Agents</span>
              </h2>

              <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-2xl leading-relaxed">
                Connect with trusted real estate professionals who are ready to
                help you find the right property.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-1 text-sky-400">
              <span>✦</span>
              <span className="opacity-70">✦</span>
              <span className="opacity-40">✦</span>
            </div>
          </div>

          {/* Location indicator */}

          {!locationLoading && location.city && (
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-sky-50 border border-sky-100">
              <span className="text-sky-500 text-sm">📍</span>

              <span className="text-xs sm:text-sm text-gray-600">
                Showing featured agents near{" "}
                <strong className="text-gray-800">{location.city}</strong>
                {locationMatchedBy === "state" && location.state && (
                  <> / {location.state}</>
                )}
              </span>
            </div>
          )}
        </div>

        {/* =========================
            LOADING
        ========================== */}

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm animate-pulse"
              >
                <div className="h-64 bg-gray-200"></div>

                <div className="p-5">
                  <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-3"></div>

                  <div className="h-3 bg-gray-100 rounded w-1/2 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =========================
            ERROR
        ========================== */}

        {!loading && error && (
          <div className="flex justify-center">
            <div className="w-full max-w-lg rounded-2xl border border-red-100 bg-red-50 px-5 py-6 text-center">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        )}

        {/* =========================
            EMPTY
        ========================== */}

        {!loading && !error && agents.length === 0 && (
          <div className="rounded-2xl border border-gray-100 bg-white px-6 py-12 text-center shadow-sm">
            <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-sky-50 flex items-center justify-center">
              <span className="text-xl text-sky-500">★</span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900">
              Featured agents coming soon
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Our featured real estate professionals will appear here.
            </p>
          </div>
        )}

        {/* =========================
            AGENTS
        ========================== */}

        {!loading && !error && agents.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {agents.map((member, index) => {
                const agentId = member?.id || member?._id;

                return (
                  <Link
                    key={agentId || index}
                    to={`/agent/${agentId}`}
                    className="group block"
                  >
                    <article
                      className="
                          relative
                          bg-white
                          rounded-2xl
                          overflow-hidden
                          border border-gray-100
                          shadow-sm
                          transition-all
                          duration-500
                          hover:-translate-y-2
                          hover:shadow-[0_20px_50px_rgba(14,165,233,0.16)]
                        "
                    >
                      {/* Top line */}

                      <div
                        className="
                          absolute
                          top-0
                          left-0
                          right-0
                          h-[3px]
                          bg-gradient-to-r
                          from-sky-400
                          via-blue-500
                          to-cyan-400
                          z-20
                        "
                      />

                      {/* Image */}

                      <div
                        className="
                          relative
                          h-64
                          sm:h-60
                          md:h-64
                          bg-gradient-to-b
                          from-sky-50
                          to-white
                          overflow-hidden
                        "
                      >
                        <img
                          src={getAgentImage(member)}
                          alt={member?.name || "Featured Agent"}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null;

                            e.currentTarget.src = FALLBACK_IMAGE;
                          }}
                          className="
                              w-full
                              h-full
                              object-contain
                              transition-transform
                              duration-700
                              group-hover:scale-105
                            "
                        />

                        {/* Featured Badge */}

                        <div
                          className="
                            absolute
                            top-4
                            left-4
                            inline-flex
                            items-center
                            gap-1.5
                            px-3
                            py-1.5
                            rounded-full
                            bg-white/95
                            backdrop-blur-sm
                            border
                            border-sky-100
                            shadow-sm
                          "
                        >
                          <span className="text-yellow-500 text-xs">★</span>

                          <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-700">
                            Featured
                          </span>
                        </div>

                        {/* Arrow */}

                        <div
                          className="
                            absolute
                            right-4
                            bottom-4
                            w-9
                            h-9
                            rounded-full
                            bg-white/95
                            flex
                            items-center
                            justify-center
                            text-sky-500
                            shadow-md
                            transition-all
                            duration-300
                            translate-y-2
                            opacity-0
                            group-hover:translate-y-0
                            group-hover:opacity-100
                          "
                        >
                          →
                        </div>
                      </div>

                      {/* Content */}

                      <div className="relative px-5 pt-5 pb-5 text-center">
                        {/* Star */}

                        <div
                          className="
                            absolute
                            -top-5
                            left-1/2
                            -translate-x-1/2
                            w-10
                            h-10
                            rounded-full
                            bg-white
                            border-2
                            border-sky-100
                            shadow-md
                            flex
                            items-center
                            justify-center
                          "
                        >
                          <span className="text-sky-500 text-sm">★</span>
                        </div>

                        <h3
                          className="
                            mt-2
                            text-base
                            sm:text-lg
                            font-bold
                            text-gray-900
                            truncate
                            transition-colors
                            duration-300
                            group-hover:text-sky-500
                          "
                        >
                          {member?.name || "Real Estate Agent"}
                        </h3>

                        {member?.profession && (
                          <p className="mt-1 text-xs sm:text-sm text-gray-500 truncate">
                            {member.profession}
                          </p>
                        )}

                        <div className="mt-4 flex items-center justify-center gap-2">
                          <span className="h-px w-8 bg-gray-200"></span>

                          <span className="text-[10px] font-semibold uppercase tracking-widest text-sky-500">
                            View Profile
                          </span>

                          <span className="h-px w-8 bg-gray-200"></span>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>

            {/* =========================
                  PAGINATION
              ========================== */}

            {lastPage > 1 && (
              <div className="mt-10 flex items-center justify-center gap-3">
                {/* Previous */}

                <button
                  type="button"
                  onClick={goToPreviousPage}
                  disabled={page === 1 || loading}
                  className={`
                      inline-flex
                      items-center
                      justify-center
                      w-10
                      h-10
                      rounded-full
                      border
                      transition-all
                      duration-300
                      ${
                        page === 1 || loading
                          ? "border-gray-200 text-gray-300 cursor-not-allowed"
                          : "border-sky-200 text-sky-500 hover:bg-sky-500 hover:text-white"
                      }
                    `}
                >
                  ←
                </button>

                {/* Page */}

                <div
                  className="
                    min-w-24
                    h-10
                    px-4
                    rounded-full
                    bg-sky-50
                    border
                    border-sky-100
                    flex
                    items-center
                    justify-center
                    text-sm
                    font-semibold
                    text-gray-700
                  "
                >
                  Page {page} of {lastPage}
                </div>

                {/* Next */}

                <button
                  type="button"
                  onClick={goToNextPage}
                  disabled={page === lastPage || loading}
                  className={`
                      inline-flex
                      items-center
                      justify-center
                      w-10
                      h-10
                      rounded-full
                      border
                      transition-all
                      duration-300
                      ${
                        page === lastPage || loading
                          ? "border-gray-200 text-gray-300 cursor-not-allowed"
                          : "border-sky-200 text-sky-500 hover:bg-sky-500 hover:text-white"
                      }
                    `}
                >
                  →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
