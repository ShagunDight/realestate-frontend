import { useEffect, useState, useRef } from "react";

const images = [
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
  "https://images.unsplash.com/photo-1560185007-cde436f6a4d0",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
  "https://images.unsplash.com/photo-1494526585095-c41746248156",
];

const MultiImageSlider = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const visibleItems = 2;

  // -------------------------
  // AUTO SLIDE FUNCTION
  // -------------------------
  const startAutoSlide = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCurrent((prev) =>
        prev === images.length - visibleItems ? 0 : prev + 1
      );
    }, 3000);
  };

  // -------------------------
  // INIT AUTO SLIDE
  // -------------------------
  useEffect(() => {
    startAutoSlide();

    return () => clearInterval(intervalRef.current);
  }, []);

  // -------------------------
  // MANUAL CONTROLS
  // -------------------------
  const nextSlide = () => {
    setCurrent((prev) =>
      prev === images.length - visibleItems ? 0 : prev + 1
    );
    startAutoSlide(); // reset timer
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - visibleItems : prev - 1
    );
    startAutoSlide(); // reset timer
  };

  return (
    <section className="w-full py-14 bg-gray-50">
      <div className="max-w-[1300px] mx-auto px-6">

        {/* Heading */}
        <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
                Explore Property News & Updates
            </h2>
            <p className="text-gray-500 mt-2">
                Latest insights, trends & premium property highlights
            </p>
        </div>

        {/* SLIDER */}
        <div
          className="relative overflow-hidden group"
          onMouseEnter={() => clearInterval(intervalRef.current)}
          onMouseLeave={startAutoSlide}
        >

          {/* TRACK */}
          <div
            className="flex gap-6 transition-transform duration-500"
            style={{
              transform: `translateX(-${current * 50}%)`,
            }}
          >
            {images.map((img, index) => (
              <div
                key={index}
                className="min-w-[50%] h-[300px] rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src={img}
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>
            ))}
          </div>

          {/* LEFT BUTTON */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-3 -translate-y-1/2 
            opacity-0 group-hover:opacity-100 
            transition duration-300 hover:scale-110
            bg-white/80 backdrop-blur-md 
            hover:bg-white 
            shadow-lg 
            p-3 rounded-full 
            border border-gray-200
            z-10"
          >
            <span className="text-lg">‹</span>
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-3 -translate-y-1/2 
            opacity-0 group-hover:opacity-100 
            transition duration-300 hover:scale-110
            bg-white/80 backdrop-blur-md 
            hover:bg-white 
            shadow-lg 
            p-3 rounded-full 
            border border-gray-200
            z-10"
          >
            <span className="text-lg">›</span>
          </button>

        </div>
      </div>
    </section>
  );
};

export default MultiImageSlider;