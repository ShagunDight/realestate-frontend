import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const MultiImageSlider = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  const intervalRef = useRef(null);

  // 👉 RESPONSIVE CHANGE: dynamic visible items
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
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) < 50) return;

    if (diff > 0) nextSlide();
    else prevSlide();
  };
  
  // =========================
  // RESPONSIVE BREAKPOINT FIX
  // =========================
  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 640) setVisibleItems(1);
      else if (window.innerWidth < 1024) setVisibleItems(2);
      else setVisibleItems(2);
    };

    updateVisible();
    window.addEventListener("resize", updateVisible);

    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  // =========================
  // FETCH NEWS
  // =========================
  const fetchNews = async () => {
    try {
      const res = await fetch("https://lightblue-moose-690494.hostingersite.com/api/blogs");
      const data = await res.json();
      const filtered = (data.data || []).filter(
        (item) => item.type === "market_news"
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

  const startAutoSlide = () => {
    clearInterval(intervalRef.current);
    if (news.length <= visibleItems) return;

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => {
        const maxIndex = news.length - visibleItems;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 3000);
  };

  useEffect(() => {
    if (news.length > 0) startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, [news, visibleItems]);

  const nextSlide = () => {
    const maxIndex = news.length - visibleItems;
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    startAutoSlide();
  };

  const prevSlide = () => {
    const maxIndex = news.length - visibleItems;
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));
    startAutoSlide();
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-500">
        Loading news...
      </div>
    );
  }

  return (
    <section className="w-full py-10 sm:py-14 bg-gray-50">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6">

        {/* HEADING */}
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Explore Property News & Updates
          </h2>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Latest insights, trends & premium property highlights
          </p>
        </div>

        {/* SLIDER */}
        <div className="relative overflow-hidden group select-none" onMouseEnter={() => clearInterval(intervalRef.current)}
          onMouseLeave={startAutoSlide} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>

          {/* TRACK */}
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${current * (100 / visibleItems)}%)`, willChange: "transform", }}>

            {news.map((n, index) => (
              <div key={index} className="min-w-full sm:min-w-[100%] md:min-w-[50%] px-2">
                <div className="h-[200px] sm:h-[260px] md:h-[320px] rounded-2xl overflow-hidden shadow-lg relative bg-gray-200">

                  {/* IMAGE */}
                  <img src={`https://lightblue-moose-690494.hostingersite.com/public${n.image}`} alt={n.title}
                    className="w-full h-full object-cover hover:scale-110 transition duration-700"/>

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 sm:p-5">
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-200 mb-2">
                      Market News
                    </span>

                    <Link to={`/blog/${n.slug}`}>
                      <h4 className="text-white font-semibold text-base sm:text-lg md:text-xl line-clamp-2">
                        {n.title}
                      </h4>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

          </div>

          {/* LEFT BUTTON */}
          {news.length > visibleItems && (
            <button onClick={prevSlide} type="button" aria-label="Previous" className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center 
              justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 shadow-xl border border-gray-200 z-30 cursor-pointer opacity-100 
              lg:opacity-0 lg:group-hover:opacity-100 hover:scale-110 hover:bg-sky-500 hover:text-white transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
          )}

          {/* RIGHT BUTTON */}
          {news.length > visibleItems && (
            <button onClick={nextSlide} type="button" aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center 
              w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 shadow-xl border border-gray-200 z-30 cursor-pointer opacity-100 lg:opacity-0 lg:group-hover:opacity-100
              hover:scale-110 hover:bg-sky-500 hover:text-white transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          )}

        </div>
      </div>
    </section>
  );
};

export default MultiImageSlider;