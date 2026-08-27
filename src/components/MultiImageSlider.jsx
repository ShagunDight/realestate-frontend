import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
} from "react-icons/fi";

const MultiImageSlider = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  const intervalRef = useRef(null);

  const [visibleItems, setVisibleItems] = useState(2);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff =
      touchStartX.current -
      touchEndX.current;

    if (Math.abs(diff) < 50) return;

    if (diff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  };

  /*
  |--------------------------------------------------------------------------
  | RESPONSIVE BREAKPOINT
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(2);
      }
    };

    updateVisible();

    window.addEventListener(
      "resize",
      updateVisible
    );

    return () =>
      window.removeEventListener(
        "resize",
        updateVisible
      );
  }, []);

  /*
  |--------------------------------------------------------------------------
  | FETCH NEWS
  |--------------------------------------------------------------------------
  */

  const fetchNews = async () => {
    try {
      const res = await fetch(
        "https://lightblue-moose-690494.hostingersite.com/api/blogs"
      );

      const data = await res.json();

      const filtered = (
        data.data || []
      ).filter(
        (item) =>
          item.type ===
          "market_news"
      );

      setNews(filtered);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | AUTO SLIDER
  |--------------------------------------------------------------------------
  */

  const startAutoSlide = () => {
    clearInterval(
      intervalRef.current
    );

    if (
      news.length <=
      visibleItems
    ) {
      return;
    }

    intervalRef.current =
      setInterval(() => {
        setCurrent((prev) => {
          const maxIndex =
            news.length -
            visibleItems;

          return prev >= maxIndex
            ? 0
            : prev + 1;
        });
      }, 3000);
  };

  useEffect(() => {
    if (news.length > 0) {
      startAutoSlide();
    }

    return () =>
      clearInterval(
        intervalRef.current
      );
  }, [
    news,
    visibleItems,
  ]);

  const nextSlide = () => {
    const maxIndex =
      news.length -
      visibleItems;

    setCurrent((prev) =>
      prev >= maxIndex
        ? 0
        : prev + 1
    );

    startAutoSlide();
  };

  const prevSlide = () => {
    const maxIndex =
      news.length -
      visibleItems;

    setCurrent((prev) =>
      prev <= 0
        ? maxIndex
        : prev - 1
    );

    startAutoSlide();
  };

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <section className="w-full bg-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="h-3 w-32 animate-pulse rounded-full bg-gray-100" />

            <div className="mt-3 h-9 w-72 max-w-full animate-pulse rounded-lg bg-gray-100" />

            <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-gray-100" />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="h-[240px] animate-pulse rounded-[28px] bg-gray-100 sm:h-[300px] lg:h-[330px]"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 sm:py-14 lg:py-16">
      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div className="pointer-events-none absolute -left-32 top-20 h-64 w-64 rounded-full bg-sky-50 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-blue-50 blur-3xl" />

      <div className="relative mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8">
        {/* =================================================
            HEADING
        ================================================== */}

        <div className="mb-8 flex flex-col gap-5 sm:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />

              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-500 sm:text-xs">
                Property Insights
              </p>
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl lg:text-[36px]">
              Property News & Updates
            </h2>

            <p className="mt-3 max-w-xl text-xs leading-6 text-gray-500 sm:text-sm sm:leading-7">
              Latest insights, trends and premium property
              highlights to keep you informed.
            </p>
          </div>

          {/* DESKTOP STATUS */}
          <div className="hidden shrink-0 items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-2.5 text-xs font-semibold text-sky-600 md:flex">
            <span className="h-2 w-2 rounded-full bg-sky-500" />
            Latest Market Insights
          </div>
        </div>

        {/* =================================================
            SLIDER
        ================================================== */}

        <div
          className="group relative select-none overflow-hidden"
          onMouseEnter={() =>
            clearInterval(
              intervalRef.current
            )
          }
          onMouseLeave={
            startAutoSlide
          }
          onTouchStart={
            handleTouchStart
          }
          onTouchMove={
            handleTouchMove
          }
          onTouchEnd={
            handleTouchEnd
          }
        >
          {/* SLIDER TRACK */}

          <div
            className="flex transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(-${
                current *
                (100 /
                  visibleItems)
              }%)`,
              willChange:
                "transform",
            }}
          >
            {news.map(
              (n, index) => (
                <div
                  key={index}
                  className="min-w-full px-1.5 sm:px-2 md:min-w-[50%]"
                >
                  {/* =================================================
                      NEWS CARD
                  ================================================== */}

                  <article
                    className="
                      group/card
                      relative
                      h-[240px]
                      overflow-hidden
                      rounded-[24px]
                      border
                      border-gray-100
                      bg-gray-100
                      shadow-[0_10px_30px_rgba(15,23,42,0.08)]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-sky-100
                      hover:shadow-[0_18px_42px_rgba(14,165,233,0.12)]
                      sm:h-[290px]
                      sm:rounded-[28px]
                      md:h-[315px]
                      lg:h-[335px]
                    "
                  >
                    {/* IMAGE */}

                    <img
                      src={`https://lightblue-moose-690494.hostingersite.com/public${n.image}`}
                      alt={n.title}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover/card:scale-[1.045]
                      "
                    />

                    {/* GRADIENT OVERLAY */}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/80
                        via-black/25
                        to-black/5
                      "
                    />

                    {/* SOFT GLOW */}

                    <div className="pointer-events-none absolute -bottom-16 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-sky-400/20 blur-3xl" />

                    {/* TOP BADGE */}

                    <div className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/25 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md sm:left-5 sm:top-5 sm:text-[10px]">
                      Market News
                    </div>

                    {/* ARROW */}

                    <Link
                      to={`/blog/${n.slug}`}
                      aria-label={`Read ${n.title}`}
                      className="
                        absolute
                        right-4
                        top-4
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/30
                        bg-white/90
                        text-gray-700
                        shadow-lg
                        backdrop-blur-md
                        transition-all
                        duration-300
                        hover:scale-105
                        hover:bg-sky-500
                        hover:text-white
                        sm:right-5
                        sm:top-5
                      "
                    >
                      <FiArrowUpRight
                        size={16}
                      />
                    </Link>

                    {/* CONTENT */}

                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7">
                      <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65 sm:text-[10px]">
                        Property Insights
                      </p>

                      <Link
                        to={`/blog/${n.slug}`}
                        className="block"
                      >
                        <h4
                          className="
                            max-w-[92%]
                            text-base
                            font-bold
                            leading-6
                            text-white
                            transition-colors
                            duration-200
                            hover:text-sky-200
                            sm:text-lg
                            sm:leading-7
                            md:text-xl
                          "
                        >
                          {n.title}
                        </h4>
                      </Link>

                      <div className="mt-4 h-px w-10 bg-white/35 transition-all duration-300 group-hover/card:w-16 group-hover/card:bg-sky-300" />
                    </div>
                  </article>
                </div>
              )
            )}
          </div>

          {/* =================================================
              LEFT ARROW
          ================================================== */}

          {news.length >
            visibleItems && (
            <button
              type="button"
              onClick={
                prevSlide
              }
              aria-label="Previous"
              className="
                absolute
                left-3
                top-1/2
                z-30
                flex
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-gray-200
                bg-white/95
                text-gray-700
                shadow-[0_8px_24px_rgba(15,23,42,0.12)]
                transition-all
                duration-300
                hover:scale-105
                hover:border-sky-500
                hover:bg-sky-500
                hover:text-white
                lg:opacity-0
                lg:group-hover:opacity-100
                sm:h-11
                sm:w-11
              "
            >
              <FiArrowLeft
                size={18}
              />
            </button>
          )}

          {/* =================================================
              RIGHT ARROW
          ================================================== */}

          {news.length >
            visibleItems && (
            <button
              type="button"
              onClick={
                nextSlide
              }
              aria-label="Next"
              className="
                absolute
                right-3
                top-1/2
                z-30
                flex
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-gray-200
                bg-white/95
                text-gray-700
                shadow-[0_8px_24px_rgba(15,23,42,0.12)]
                transition-all
                duration-300
                hover:scale-105
                hover:border-sky-500
                hover:bg-sky-500
                hover:text-white
                lg:opacity-0
                lg:group-hover:opacity-100
                sm:h-11
                sm:w-11
              "
            >
              <FiArrowRight
                size={18}
              />
            </button>
          )}
        </div>

        {/* =================================================
            SLIDER INDICATOR
        ================================================== */}

        {news.length >
          visibleItems && (
          <div className="mt-5 flex items-center justify-center gap-1.5">
            {Array.from({
              length:
                news.length -
                visibleItems +
                1,
            }).map(
              (_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to slide ${
                    index + 1
                  }`}
                  onClick={() => {
                    setCurrent(
                      index
                    );
                    startAutoSlide();
                  }}
                  className={`
                    h-1.5
                    rounded-full
                    transition-all
                    duration-300
                    ${
                      current ===
                      index
                        ? "w-7 bg-sky-500"
                        : "w-1.5 bg-gray-200 hover:bg-sky-200"
                    }
                  `}
                />
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default MultiImageSlider;