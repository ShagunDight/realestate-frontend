import React, { useRef, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useWishlist } from "../components/WishlistContext";
import {
  FaBolt,
  FaParking,
  FaCalendar,
  FaRulerCombined,
  FaPhone,
  FaWhatsapp,
  FaPhoneAlt,
  FaHeart,
  FaRegHeart,
  FaMapMarkerAlt,
  FaExpand,
  FaSearchPlus,
  FaSearchMinus,
  FaRedo,
  FaImages,
} from "react-icons/fa";

const PropertyDetails = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  // =========================================================
  // STATES
  // =========================================================
  const [selectedDate, setSelectedDate] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isMilitary, setIsMilitary] = useState(false);
  const [loading, setLoading] = useState(false);
  const [property, setProperty] = useState(null);

  const [currentImage, setCurrentImage] = useState(0);
  const [aerialImage, setAerialImage] = useState(0);
  const [view, setView] = useState("aerial");

  const sliderRef = useRef(null);

  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const { toggleWishlist, isWished } = useWishlist();

  const [inquiryType, setInquiryType] = useState("");
  const [message, setMessage] = useState("");

  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const [expanded, setExpanded] = useState(null);

  const [soldProperties, setSoldProperties] = useState([]);
  const [soldPage, setSoldPage] = useState(1);

  // =========================================================
  // FETCH PROPERTY
  // =========================================================
  useEffect(() => {
    fetch(
      `https://lightblue-moose-690494.hostingersite.com/api/properties/${id}`
    )
      .then((res) => res.json())
      .then((data) => setProperty(data.data || data))
      .catch((err) => console.error(err));
  }, [id]);

  // =========================================================
  // RESET GALLERY ZOOM
  // =========================================================
  useEffect(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [galleryIndex]);

  // =========================================================
  // TRACK PROPERTY VIEW
  // =========================================================
  useEffect(() => {
    if (!id) return;

    const trackView = async () => {
      try {
        await fetch(
          "https://lightblue-moose-690494.hostingersite.com/api/property-view",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              property_id: id,
              customer_id: localStorage.getItem("customer_id") || null,
              name: localStorage.getItem("customer_name") || null,
              email: localStorage.getItem("customer_email") || null,
              phone: localStorage.getItem("customer_phone") || null,
            }),
          }
        );
      } catch (err) {
        console.log("Tracking failed", err);
      }
    };

    trackView();
  }, [id]);

  // =========================================================
  // SOLD PROPERTIES
  // =========================================================
  const soldItemsPerPage = 4;

  const soldTotalPages = Math.ceil(
    soldProperties.length / soldItemsPerPage
  );

  const paginated = soldProperties.slice(
    (soldPage - 1) * soldItemsPerPage,
    soldPage * soldItemsPerPage
  );

  const fetchSoldProperties = async () => {
    try {
      const res = await fetch(
        "https://lightblue-moose-690494.hostingersite.com/api/sold-properties"
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

  // =========================================================
  // HELPERS
  // =========================================================
  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(
      html || "",
      "text/html"
    );

    return doc.body.textContent || "";
  };

  // =========================================================
  // LOADING
  // =========================================================
  if (!property) {
    return (
      <div className="min-h-screen bg-[#f6f9ff] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-sky-100 border-t-sky-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">
            Loading property...
          </p>
        </div>
      </div>
    );
  }

  const images = property.image || [];

  // =========================================================
  // SLIDER
  // =========================================================
  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -220,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 220,
      behavior: "smooth",
    });
  };

  // =========================================================
  // DATES
  // =========================================================
  const today = new Date();

  const nextDates = Array.from({ length: 15 }, (_, i) => {
    const date = new Date();

    date.setDate(today.getDate() + i);

    return {
      day: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),

      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),

      fullDate: date.toISOString().split("T")[0],
    };
  });

  // =========================================================
  // INQUIRY SUBMIT
  // =========================================================
  const handleSubmit = async () => {
    if (!inquiryType || !name || !email || !phone) {
      alert("Please fill all required fields");
      return;
    }

    if (inquiryType === "request_tour" && !selectedDate) {
      alert("Please select a tour date");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://lightblue-moose-690494.hostingersite.com/api/visit-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            property_id: id,
            inquiry_type: inquiryType,
            date:
              inquiryType === "request_tour"
                ? selectedDate
                : null,
            name,
            email,
            phone,
            message,
            is_military: isMilitary,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(
          data.message ||
            "Inquiry submitted successfully!"
        );

        setInquiryType("");
        setSelectedDate(null);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setIsMilitary(false);
      } else {
        alert(
          data.message ||
            "Something went wrong!"
        );
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // GALLERY ZOOM
  // =========================================================
  const handleWheel = (e) => {
    e.preventDefault();

    setZoom((prev) => {
      const next =
        prev + (e.deltaY < 0 ? 0.2 : -0.2);

      return Math.min(
        Math.max(next, 1),
        3
      );
    });
  };

  const handleDoubleClick = () => {
    setZoom((prev) => (prev === 1 ? 2 : 1));
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (zoom === 1) return;

    setDragging(true);

    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!dragging || zoom === 1) return;

    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const resetZoom = () => {
    setZoom(1);
    setPosition({
      x: 0,
      y: 0,
    });
  };

  // =========================================================
  // GALLERY NAVIGATION
  // =========================================================
  const previousGalleryImage = () => {
    setGalleryIndex((prev) =>
      prev === 0
        ? images.length - 1
        : prev - 1
    );
  };

  const nextGalleryImage = () => {
    setGalleryIndex((prev) =>
      prev === images.length - 1
        ? 0
        : prev + 1
    );
  };

  // =========================================================
  // LOGIN / WISHLIST
  // =========================================================
  const isLoggedIn =
    !!localStorage.getItem("customer_token");

  const handleWishlistClick = () => {
    if (!isLoggedIn) {
      setShowLogin?.(true);
      return;
    }

    toggleWishlist(property);
  };

  // =========================================================
  // IMAGE URL
  // =========================================================
  const getImageUrl = (image) => {
    if (!image?.path) {
      return "https://thumbs.dreamstime.com/b/dummy-neighbor-chat-23372551.jpg";
    }

    return `https://lightblue-moose-690494.hostingersite.com/public/${image.path}`;
  };

  return (
    <>
      <div className="bg-[#f6f9ff] min-h-screen">

        {/* =====================================================
            MAIN CONTAINER
        ====================================================== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6 py-6 sm:py-8 lg:py-10">

          {/* =====================================================
              PROPERTY HEADER
          ====================================================== */}
          <div className="relative bg-white rounded-[28px] border border-sky-100 shadow-sm overflow-hidden mb-6 sm:mb-8">

            {/* Top Accent */}
            <div className="h-1.5 bg-gradient-to-r from-sky-400 via-sky-500 to-indigo-500" />

            <div className="p-5 sm:p-7 md:p-8">

              {/* Badges */}
              <div className="flex items-center justify-between gap-3">

                <span className="inline-flex items-center px-3.5 py-1.5 bg-sky-50 border border-sky-100 text-sky-600 rounded-full text-xs sm:text-sm font-semibold">
                  {property.property_type?.name ||
                    "Property"}
                </span>

                <span
                  className={`
                    inline-flex items-center px-3.5 py-1.5 rounded-full
                    text-xs sm:text-sm font-semibold capitalize
                    ${
                      property.status === "active"
                        ? "bg-green-50 text-green-700 border border-green-100"
                        : property.status === "pending"
                        ? "bg-yellow-50 text-yellow-700 border border-yellow-100"
                        : property.status === "sold"
                        ? "bg-red-50 text-red-700 border border-red-100"
                        : property.status === "rented"
                        ? "bg-purple-50 text-purple-700 border border-purple-100"
                        : "bg-gray-50 text-gray-700 border border-gray-100"
                    }
                  `}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current mr-2" />
                  {property.status}
                </span>

              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-950 mt-5 leading-tight">
                {property.title}
              </h1>

              {/* Location */}
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">

                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-sky-500" />
                  {property.location}
                </span>

                <span className="hidden sm:block w-1 h-1 rounded-full bg-gray-300" />

                <span>
                  Zip {property.zip_code}
                </span>

              </div>

            </div>
          </div>


          {/* =====================================================
              ACTION BAR
          ====================================================== */}
          <div className="flex items-center justify-between gap-3 mb-5">

            {/* FEATURED BADGE */}
            <div className="flex items-center min-w-0">
              <span
                className="
                  inline-flex items-center gap-1.5
                  px-3 py-2
                  rounded-full
                  bg-white
                  border border-sky-100
                  text-sky-600
                  text-[10px] sm:text-xs md:text-sm
                  font-semibold
                  shadow-sm
                  whitespace-nowrap
                "
              >
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-sky-500 rounded-full animate-pulse shrink-0" />
                Featured Property
              </span>
            </div>

            {/* WISHLIST BUTTON */}
            <button
              type="button"
              onClick={handleWishlistClick}
              aria-label={
                isWished(property.id)
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
              className="
                group
                inline-flex items-center justify-center gap-1.5 sm:gap-2
                shrink-0
                px-3.5 sm:px-4 md:px-5
                py-2 sm:py-2.5
                rounded-full
                bg-white
                border border-gray-200
                text-gray-600
                shadow-sm
                hover:border-sky-200
                hover:text-sky-600
                hover:shadow-md
                active:scale-95
                transition-all duration-300
              "
            >
              {isWished(property.id) ? (
                <FaHeart className="text-red-500 text-sm sm:text-base md:text-lg transition-transform group-hover:scale-110" />
              ) : (
                <FaRegHeart className="text-gray-500 group-hover:text-sky-500 text-sm sm:text-base md:text-lg transition-all group-hover:scale-110" />
              )}

              <span className="text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap">
                {isWished(property.id) ? "Saved" : "Wishlist"}
              </span>
            </button>

          </div>


          {/* =====================================================
              IMAGE GALLERY
          ====================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 lg:gap-4 mb-8 lg:mb-10">

            {/* MAIN IMAGE */}
            <div className="lg:col-span-4">

              <div className="relative h-[300px] sm:h-[420px] md:h-[520px] lg:h-[580px] rounded-[28px] overflow-hidden shadow-xl bg-gray-100 group">

                <img
                  src={getImageUrl(images[currentImage])}
                  alt={property.title}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-[1.025]
                    cursor-pointer
                  "
                  onClick={() => {
                    setGalleryIndex(currentImage);
                    setShowGallery(true);
                  }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/10 pointer-events-none" />

                {/* Top Gallery Label */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 bg-black/35 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-medium">
                  <FaImages />
                  {currentImage + 1} / {images.length || 1}
                </div>

                {/* Expand */}
                <button
                  onClick={() => {
                    setGalleryIndex(currentImage);
                    setShowGallery(true);
                  }}
                  className="
                    absolute
                    top-4
                    right-4
                    w-10
                    h-10
                    rounded-full
                    bg-black/35
                    backdrop-blur-md
                    border border-white/20
                    text-white
                    flex
                    items-center
                    justify-center
                    hover:bg-white
                    hover:text-gray-900
                    transition-all
                  "
                  aria-label="Open gallery"
                >
                  <FaExpand size={13} />
                </button>

                {/* Previous */}
                {images.length > 1 && (
                  <button
                    onClick={() =>
                      setCurrentImage(
                        currentImage === 0
                          ? images.length - 1
                          : currentImage - 1
                      )
                    }
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      w-11
                      h-11
                      sm:w-12
                      sm:h-12
                      rounded-full
                      bg-white/90
                      backdrop-blur-md
                      shadow-xl
                      flex
                      items-center
                      justify-center
                      text-gray-800
                      hover:bg-sky-500
                      hover:text-white
                      transition-all
                    "
                  >
                    <IoIosArrowBack size={22} />
                  </button>
                )}

                {/* Next */}
                {images.length > 1 && (
                  <button
                    onClick={() =>
                      setCurrentImage(
                        currentImage === images.length - 1
                          ? 0
                          : currentImage + 1
                      )
                    }
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      w-11
                      h-11
                      sm:w-12
                      sm:h-12
                      rounded-full
                      bg-white/90
                      backdrop-blur-md
                      shadow-xl
                      flex
                      items-center
                      justify-center
                      text-gray-800
                      hover:bg-sky-500
                      hover:text-white
                      transition-all
                    "
                  >
                    <IoIosArrowForward size={22} />
                  </button>
                )}

                {/* Bottom Hint */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <span className="hidden sm:inline-flex px-4 py-2 rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-white text-xs">
                    Click image to view full gallery
                  </span>
                </div>

              </div>
            </div>


            {/* =================================================
                THUMBNAILS
            ================================================== */}
            <div className="lg:col-span-1 flex lg:flex-col gap-2.5 lg:gap-3 overflow-x-auto lg:overflow-visible no-scrollbar">

              {images.slice(0, 3).map((img, i) => {

                const remaining =
                  images.length - 3;

                const isActive =
                  i === currentImage;

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      if (i === 2 && remaining > 0) {
                        setGalleryIndex(2);
                        setShowGallery(true);
                      } else {
                        setCurrentImage(i);
                      }
                    }}
                    className={`
                      relative
                      flex-shrink-0
                      rounded-2xl
                      overflow-hidden
                      border-2
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "border-sky-500 shadow-lg scale-[1.015]"
                          : "border-white hover:border-sky-300 shadow-sm"
                      }
                    `}
                  >

                    <img
                      src={getImageUrl(img)}
                      alt=""
                      className="
                        w-28 h-20
                        sm:w-36 sm:h-24
                        lg:w-full lg:h-[calc((580px-36px)/4)]
                        object-cover
                        transition-transform
                        duration-500
                        hover:scale-105
                      "
                    />

                    {/* Active Overlay */}
                    {isActive && (
                      <div className="absolute inset-0 ring-2 ring-inset ring-white/50 pointer-events-none" />
                    )}

                    {/* Remaining */}
                    {i === 2 &&
                      remaining > 0 && (
                        <div
                          className="
                            absolute
                            inset-0
                            bg-black/65
                            flex
                            flex-col
                            items-center
                            justify-center
                            text-white
                            backdrop-blur-[2px]
                          "
                        >
                          <span className="text-xl sm:text-2xl font-bold">
                            +{remaining}
                          </span>

                          <span className="text-[10px] sm:text-xs mt-1 uppercase tracking-wider">
                            View All
                          </span>
                        </div>
                      )}

                  </button>
                );
              })}

            </div>

          </div>


          {/* =====================================================
              MAIN CONTENT
          ====================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

            {/* =================================================
                LEFT CONTENT
            ================================================== */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">

              {/* HIGHLIGHTS */}
              <div className="bg-white p-5 sm:p-6 md:p-8 rounded-[28px] shadow-sm border border-gray-100">

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center">
                    <FaBolt />
                  </div>

                  <div>
                    <p className="text-xs text-sky-500 font-semibold uppercase tracking-wider">
                      Property
                    </p>

                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                      Highlights
                    </h2>
                  </div>

                </div>

                <div
                  className="
                    text-gray-600
                    leading-7
                    [&_ul]:list-disc
                    [&_ul]:pl-5
                    [&_li]:mb-2
                    [&_li]:marker:text-sky-500
                  "
                  dangerouslySetInnerHTML={{
                    __html:
                      property.highlights,
                  }}
                />

              </div>


              {/* SUMMARY */}
              <div className="bg-white p-5 sm:p-6 md:p-8 rounded-[28px] shadow-sm border border-gray-100">

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center">
                    <FaRulerCombined />
                  </div>

                  <div>
                    <p className="text-xs text-sky-500 font-semibold uppercase tracking-wider">
                      Details
                    </p>

                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                      Summary
                    </h2>
                  </div>

                </div>

                <div
                  className="
                    text-gray-600
                    leading-7
                    [&_ul]:list-disc
                    [&_ul]:pl-5
                    [&_li]:mb-2
                    [&_li]:marker:text-sky-500
                  "
                  dangerouslySetInnerHTML={{
                    __html:
                      property.description,
                  }}
                />

              </div>


              {/* NEARBY */}
              {property.nearby &&
                property.nearby.length > 0 && (
                  <div className="bg-white p-5 sm:p-6 md:p-8 rounded-[28px] shadow-sm border border-gray-100">

                    <div className="flex items-center gap-3 mb-6">

                      <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center">
                        <FaMapMarkerAlt />
                      </div>

                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Nearby Places
                      </h2>

                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">

                      {property.nearby.map(
                        (item, index) => (
                          <div
                            key={index}
                            className="
                              flex
                              justify-between
                              items-center
                              gap-4
                              px-4
                              py-4
                              rounded-2xl
                              border
                              border-gray-100
                              bg-gray-50
                              hover:bg-sky-50
                              hover:border-sky-100
                              transition
                            "
                          >
                            <span className="text-gray-800 font-medium text-sm">
                              {item.name}
                            </span>

                            <span className="flex-shrink-0 text-xs sm:text-sm font-semibold text-sky-600 bg-white px-2.5 py-1 rounded-full">
                              {item.distance} km
                            </span>
                          </div>
                        )
                      )}

                    </div>

                  </div>
                )}


              {/* =================================================
                  MAP
              ================================================== */}
              <div className="bg-white p-3 sm:p-4 rounded-[28px] shadow-sm border border-gray-100">

                {/* Tabs */}
                <div className="flex items-center gap-6 border-b border-gray-100 px-2">

                  <button
                    onClick={() =>
                      setView("aerial")
                    }
                    className={`
                      relative
                      pb-3
                      text-sm
                      font-semibold
                      transition
                      ${
                        view === "aerial"
                          ? "text-sky-500"
                          : "text-gray-400 hover:text-gray-700"
                      }
                    `}
                  >
                    Aerial

                    {view === "aerial" && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 rounded-full" />
                    )}
                  </button>

                  <button
                    onClick={() =>
                      setView("map")
                    }
                    className={`
                      relative
                      pb-3
                      text-sm
                      font-semibold
                      transition
                      ${
                        view === "map"
                          ? "text-sky-500"
                          : "text-gray-400 hover:text-gray-700"
                      }
                    `}
                  >
                    Map

                    {view === "map" && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 rounded-full" />
                    )}
                  </button>

                </div>

                <div className="h-[250px] sm:h-[320px] md:h-[380px] rounded-2xl overflow-hidden mt-4">

                  {view === "aerial" ? (

                    <div className="relative h-full bg-gray-100">

                      <img
                        className="w-full h-full object-cover"
                        alt=""
                        src={
                          images.length
                            ? getImageUrl(
                                images[
                                  aerialImage
                                ]
                              )
                            : "https://thumbs.dreamstime.com/b/dummy-neighbor-chat-23372551.jpg"
                        }
                      />

                      <button
                        onClick={() =>
                          setAerialImage(
                            aerialImage === 0
                              ? images.length - 1
                              : aerialImage - 1
                          )
                        }
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          w-10
                          h-10
                          bg-white/90
                          shadow-lg
                          rounded-full
                          flex
                          items-center
                          justify-center
                          hover:bg-sky-500
                          hover:text-white
                          transition
                        "
                      >
                        <IoIosArrowBack />
                      </button>

                      <button
                        onClick={() =>
                          setAerialImage(
                            aerialImage ===
                              images.length - 1
                              ? 0
                              : aerialImage + 1
                          )
                        }
                        className="
                          absolute
                          right-4
                          top-1/2
                          -translate-y-1/2
                          w-10
                          h-10
                          bg-white/90
                          shadow-lg
                          rounded-full
                          flex
                          items-center
                          justify-center
                          hover:bg-sky-500
                          hover:text-white
                          transition
                        "
                      >
                        <IoIosArrowForward />
                      </button>

                    </div>

                  ) : (

                    <iframe
                      width="100%"
                      height="100%"
                      title="map"
                      className="border-0"
                      src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
                    />

                  )}

                </div>
              </div>


              {/* PROPERTY OVERVIEW */}
              {property.property_overview && (
                <div className="bg-white p-5 sm:p-6 md:p-8 rounded-[28px] shadow-sm border border-gray-100">

                  <h2 className="text-xl sm:text-2xl font-bold mb-5 text-gray-900">
                    Property Overview
                  </h2>

                  <div
                    className="
                      text-gray-600
                      leading-7
                      [&_p]:mb-4
                      [&_ul]:list-disc
                      [&_ul]:pl-5
                      [&_li]:mb-2
                      [&_li]:marker:text-sky-500
                    "
                    dangerouslySetInnerHTML={{
                      __html:
                        property.property_overview,
                    }}
                  />

                </div>
              )}


              {/* ABOUT OWNER */}
              {property.about_owner && (
                <div className="bg-white p-5 sm:p-6 md:p-8 rounded-[28px] shadow-sm border border-gray-100">

                  <h2 className="text-xl sm:text-2xl font-bold mb-5 text-gray-900">
                    About the Owner
                  </h2>

                  <div
                    className="
                      text-gray-600
                      leading-7
                      [&_p]:mb-4
                      [&_ul]:list-disc
                      [&_ul]:pl-5
                      [&_li]:mb-2
                      [&_li]:marker:text-sky-500
                    "
                    dangerouslySetInnerHTML={{
                      __html:
                        property.about_owner,
                    }}
                  />

                </div>
              )}

            </div>


            {/* =================================================
                RIGHT SIDEBAR
            ================================================== */}
            <div className="space-y-6 lg:space-y-8">

              {/* PRICE */}
              <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-sky-500 via-sky-500 to-indigo-500 text-white p-6 sm:p-7 shadow-xl">

                <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-white/10" />
                <div className="absolute -left-16 -bottom-20 w-48 h-48 rounded-full bg-white/10" />

                <div className="relative">

                  <p className="text-white/75 text-sm font-medium">
                    Price
                  </p>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 break-words">
                    {property.property_type?.name ===
                    "For Lease"
                      ? `₹ ${property.monthly_rent}/mon`
                      : `₹ ${
                          property.sale_price ||
                          "On Request"
                        }`}
                  </h3>

                  <div className="mt-5 pt-4 border-t border-white/20 flex items-center gap-2 text-sm text-white/80">
                    <FaMapMarkerAlt />
                    {property.location}
                  </div>

                </div>
              </div>


              {/* PROPERTY FACTS */}
              <div className="bg-white p-5 sm:p-6 rounded-[28px] shadow-sm border border-gray-100">

                <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900">
                  Property Facts
                </h2>

                <ul className="space-y-1 text-sm">

                  <li className="flex items-center justify-between gap-4 py-3 border-b border-gray-100">

                    <div className="flex items-center gap-2.5 text-gray-500">
                      <FaRulerCombined className="text-sky-500" />
                      Property
                    </div>

                    <span className="font-semibold text-gray-900 text-right">
                      {property.property_type?.name ||
                        "Property"}
                    </span>

                  </li>

                  <li className="flex items-center justify-between gap-4 py-3 border-b border-gray-100">

                    <div className="flex items-center gap-2.5 text-gray-500">
                      <FaRulerCombined className="text-sky-500" />
                      Total Space
                    </div>

                    <span className="font-semibold text-gray-900 text-right">
                      {property.total_space_available}{" "}
                      {property.total_size_unit}
                    </span>

                  </li>

                  <li className="flex items-center justify-between gap-4 py-3 border-b border-gray-100">

                    <div className="flex items-center gap-2.5 text-gray-500">
                      <FaParking className="text-sky-500" />
                      Parking
                    </div>

                    <span className="font-semibold text-gray-900">
                      {property.parking_ratio || 30} Sqft
                    </span>

                  </li>

                  <li className="flex items-center justify-between gap-4 py-3 border-b border-gray-100">

                    <div className="flex items-center gap-2.5 text-gray-500">
                      <FaCalendar className="text-sky-500" />
                      Year Built
                    </div>

                    <span className="font-semibold text-gray-900">
                      {property.year_built || "-"}
                    </span>

                  </li>

                  <li className="flex items-center justify-between gap-4 py-3 border-b border-gray-100">

                    <div className="flex items-center gap-2.5 text-gray-500">
                      <FaRulerCombined className="text-sky-500" />
                      Land Size
                    </div>

                    <span className="font-semibold text-gray-900 text-right">
                      {property.land_size}{" "}
                      {property.land_size_unit}
                    </span>

                  </li>

                  <li className="flex items-center justify-between gap-4 py-3">

                    <div className="flex items-center gap-2.5 text-gray-500">
                      <FaRulerCombined className="text-sky-500" />
                      Building Size
                    </div>

                    <span className="font-semibold text-gray-900 text-right">
                      {property.building_size}{" "}
                      {property.building_size_unit}
                    </span>

                  </li>


                  {/* FEATURES */}
                  <li className="pt-5 border-t border-gray-100">

                    <div className="flex items-center gap-2.5 text-gray-500 mb-4">

                      <FaBolt className="text-sky-500" />

                      <span>Features</span>

                    </div>

                    <div className="flex flex-wrap gap-2">

                      {property.building_features ? (
                        property.building_features
                          .split(",")
                          .map(
                            (item, index) => (
                              <span
                                key={index}
                                className="
                                  px-3
                                  py-1.5
                                  text-xs
                                  bg-sky-50
                                  text-sky-600
                                  border
                                  border-sky-100
                                  rounded-full
                                  font-medium
                                "
                              >
                                {item.trim()}
                              </span>
                            )
                          )
                      ) : (
                        <span className="text-gray-400">
                          N/A
                        </span>
                      )}

                    </div>

                  </li>

                </ul>
              </div>


              {/* =================================================
                  CONTACT / INQUIRY
              ================================================== */}
              <div className="bg-white rounded-[28px] shadow-lg border border-gray-100 p-5 sm:p-6">

                <div className="mb-6">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center">
                      <FaPhoneAlt />
                    </div>

                    <div>

                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Contact & Inquiry
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        Tell us what you're looking for.
                      </p>

                    </div>

                  </div>

                </div>


                {/* TYPE */}
                <div className="mb-5">

                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    What can we help you with?
                  </label>

                  <select
                    value={inquiryType}
                    onChange={(e) =>
                      setInquiryType(
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      border
                      border-gray-200
                      rounded-xl
                      px-4
                      py-3
                      bg-gray-50
                      text-sm
                      text-gray-700
                      focus:bg-white
                      focus:outline-none
                      focus:ring-2
                      focus:ring-sky-500/30
                      focus:border-sky-400
                      transition
                    "
                  >
                    <option value="">
                      Select purpose
                    </option>

                    <option value="financials">
                      Financial Information
                    </option>

                    <option value="pricing">
                      Pricing Details
                    </option>

                    <option value="request_tour">
                      Schedule a Property Tour
                    </option>

                    <option value="others">
                      General Inquiry
                    </option>
                  </select>

                </div>


                {/* TOUR DATE */}
                {inquiryType ===
                  "request_tour" && (
                  <div className="mb-6">

                    <label className="text-sm font-semibold text-gray-700 mb-3 block">
                      Choose your preferred visit date
                    </label>

                    <div className="relative">

                      <button
                        onClick={
                          scrollLeft
                        }
                        className="
                          absolute
                          left-0
                          top-1/2
                          -translate-y-1/2
                          z-10
                          w-8
                          h-8
                          rounded-full
                          bg-white
                          shadow-lg
                          border
                          border-gray-100
                          flex
                          items-center
                          justify-center
                          hover:bg-sky-50
                        "
                      >
                        <IoIosArrowBack size={15} />
                      </button>

                      <div
                        ref={sliderRef}
                        className="
                          flex
                          gap-2.5
                          overflow-x-auto
                          scroll-smooth
                          px-10
                          pb-2
                          no-scrollbar
                        "
                      >
                        {nextDates.map(
                          (item, index) => (
                            <button
                              key={index}
                              onClick={() =>
                                setSelectedDate(
                                  item.fullDate
                                )
                              }
                              className={`
                                min-w-[82px]
                                border
                                rounded-2xl
                                py-3
                                px-2
                                text-center
                                transition
                                flex-shrink-0
                                ${
                                  selectedDate ===
                                  item.fullDate
                                    ? "border-sky-500 bg-sky-50 text-sky-600 shadow-sm"
                                    : "border-gray-200 hover:border-sky-300 text-gray-600"
                                }
                              `}
                            >
                              <p className="text-xs">
                                {item.day}
                              </p>

                              <p className="font-semibold text-sm mt-0.5">
                                {item.date}
                              </p>
                            </button>
                          )
                        )}
                      </div>

                      <button
                        onClick={
                          scrollRight
                        }
                        className="
                          absolute
                          right-0
                          top-1/2
                          -translate-y-1/2
                          z-10
                          w-8
                          h-8
                          rounded-full
                          bg-white
                          shadow-lg
                          border
                          border-gray-100
                          flex
                          items-center
                          justify-center
                          hover:bg-sky-50
                        "
                      >
                        <IoIosArrowForward size={15} />
                      </button>

                    </div>
                  </div>
                )}


                {/* INPUTS */}
                <div className="space-y-3">

                  <input
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    type="text"
                    placeholder="Your full name"
                    className="
                      w-full
                      border
                      border-gray-200
                      rounded-xl
                      px-4
                      py-3
                      text-sm
                      focus:ring-2
                      focus:ring-sky-500/30
                      focus:border-sky-400
                      outline-none
                      transition
                    "
                  />

                  <input
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    type="email"
                    placeholder="Email address"
                    className="
                      w-full
                      border
                      border-gray-200
                      rounded-xl
                      px-4
                      py-3
                      text-sm
                      focus:ring-2
                      focus:ring-sky-500/30
                      focus:border-sky-400
                      outline-none
                      transition
                    "
                  />

                  <input
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    type="text"
                    placeholder="Phone number"
                    className="
                      w-full
                      border
                      border-gray-200
                      rounded-xl
                      px-4
                      py-3
                      text-sm
                      focus:ring-2
                      focus:ring-sky-500/30
                      focus:border-sky-400
                      outline-none
                      transition
                    "
                  />

                </div>


                {/* MESSAGE */}
                <div className="mt-4">

                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Additional details
                  </label>

                  <textarea
                    value={message}
                    onChange={(e) =>
                      setMessage(
                        e.target.value
                      )
                    }
                    placeholder="Tell us more about your requirement..."
                    rows={4}
                    className="
                      w-full
                      border
                      border-gray-200
                      rounded-xl
                      px-4
                      py-3
                      text-sm
                      resize-none
                      focus:ring-2
                      focus:ring-sky-500/30
                      focus:border-sky-400
                      outline-none
                      transition
                    "
                  />

                </div>


                {/* SUBMIT */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="
                    mt-5
                    w-full
                    bg-gradient-to-r
                    from-sky-500
                    to-indigo-500
                    hover:from-sky-600
                    hover:to-indigo-600
                    text-white
                    py-3.5
                    rounded-xl
                    font-semibold
                    text-sm
                    shadow-lg
                    shadow-sky-500/20
                    transition
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >
                  {loading
                    ? "Sending request..."
                    : "Submit Inquiry"}
                </button>

                <p className="text-xs text-gray-400 text-center mt-4">
                  We usually respond within a few hours.
                </p>

              </div>


              {/* =================================================
                  AGENT
              ================================================== */}
              <div className="bg-white rounded-[28px] shadow-sm border border-gray-100 p-6">

                <h3 className="text-xl font-bold text-center text-gray-900 mb-6">
                  Contact Agent
                </h3>

                <div className="flex flex-col items-center">

                  <Link
                    to={`/agent/${property.agent?.id}`}
                    className="text-center group"
                  >

                    <img
                      className="
                        w-24
                        h-24
                        rounded-full
                        object-cover
                        border-4
                        border-sky-50
                        shadow-md
                        group-hover:scale-105
                        transition
                      "
                      alt=""
                      src={
                        property.agent?.img
                          ? `https://lightblue-moose-690494.hostingersite.com/public${property.agent.img}`
                          : "https://img.freepik.com/premium-vector/secret-agent-icon-logo-design-illustration_586739-409.jpg"
                      }
                    />

                    <h4 className="mt-4 font-bold text-lg text-gray-900">
                      {property.agent?.name}
                    </h4>

                  </Link>

                  <p className="text-gray-500 text-sm flex items-center gap-2 mt-2">
                    <FaPhone className="text-sky-500" />
                    {property.agent?.phone}
                  </p>

                  <div className="flex gap-3 mt-6 w-full">

                    <a
                      href={`https://wa.me/${property.agent?.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex-1
                        bg-green-500
                        hover:bg-green-600
                        text-white
                        py-3
                        rounded-xl
                        text-sm
                        transition
                        text-center
                        font-semibold
                        flex
                        items-center
                        justify-center
                        gap-2
                      "
                    >
                      <FaWhatsapp />
                      Message
                    </a>

                    <a
                      href={`tel:${property.agent?.phone}`}
                      className="
                        flex-1
                        border
                        border-sky-500
                        text-sky-500
                        py-3
                        rounded-xl
                        text-sm
                        hover:bg-sky-50
                        transition
                        text-center
                        font-semibold
                        flex
                        items-center
                        justify-center
                        gap-2
                      "
                    >
                      <FaPhoneAlt />
                      Call
                    </a>

                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>


        {/* =====================================================
            SOLD PROPERTIES
        ====================================================== */}
        {soldProperties.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6 pb-10">

            <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-5 sm:p-6 md:p-8">

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">

                <div>

                  <div className="flex items-center gap-2 mb-2">

                    <span className="w-8 h-[2px] bg-sky-500" />

                    <span className="text-xs font-bold text-sky-500 uppercase tracking-[0.18em]">
                      Recently Sold
                    </span>

                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Sold Properties
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Recently completed and sold listings
                  </p>

                </div>

                <span className="bg-red-50 text-red-600 border border-red-100 px-4 py-2 rounded-full text-sm font-semibold w-fit">
                  {soldProperties.length} Sold
                </span>

              </div>


              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

                {paginated.map((item) => {

                  const text = stripHtml(
                    item.description || ""
                  );

                  const isLong =
                    text.length > 80;

                  return (
                    <div
                      key={item.id}
                      className="
                        group
                        bg-white
                        rounded-2xl
                        overflow-hidden
                        border
                        border-gray-100
                        shadow-sm
                        hover:shadow-xl
                        transition-all
                        duration-300
                        hover:-translate-y-1
                      "
                    >

                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">

                        <img
                          src={
                            item.image?.length
                              ? `https://lightblue-moose-690494.hostingersite.com/public/${item.image[0]?.path}`
                              : "https://thumbs.dreamstime.com/b/dummy-neighbor-chat-23372551.jpg"
                          }
                          className="
                            w-full
                            h-full
                            object-cover
                            group-hover:scale-105
                            transition-transform
                            duration-500
                          "
                          alt={item.title}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1.5 rounded-full shadow-lg font-semibold">
                          SOLD
                        </div>

                      </div>


                      {/* Content */}
                      <div className="p-4">

                        <h3 className="font-bold text-gray-900 line-clamp-1">
                          {item.title}
                        </h3>

                        <p className="text-sm text-gray-500 line-clamp-1 mt-1.5">
                          📍 {item.location}
                        </p>

                        <p className="text-xs sm:text-sm text-gray-500 min-h-[42px] leading-relaxed mt-3">
                          {expanded === item.id
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
                            onClick={() =>
                              setExpanded(
                                expanded ===
                                  item.id
                                  ? null
                                  : item.id
                              )
                            }
                            className="text-sky-500 text-xs sm:text-sm font-semibold hover:underline mt-1"
                          >
                            {expanded ===
                            item.id
                              ? "Show Less"
                              : "Read More"}
                          </button>
                        )}

                        <div className="flex justify-between items-center pt-4 mt-3 border-t border-gray-100">

                          <p className="text-lg font-bold text-sky-600">
                            ₹{" "}
                            {item.sale_price ||
                              item.monthly_rent}
                          </p>

                          <button
                            onClick={() =>
                              navigate(
                                `/property/${item.id}`
                              )
                            }
                            className="
                              px-4
                              py-2
                              bg-gradient-to-r
                              from-sky-500
                              to-indigo-500
                              hover:from-sky-600
                              hover:to-indigo-600
                              text-white
                              rounded-xl
                              text-sm
                              font-semibold
                              transition
                            "
                          >
                            View
                          </button>

                        </div>

                      </div>

                    </div>
                  );
                })}

              </div>


              {/* Pagination */}
              {soldTotalPages > 1 && (
                <div className="flex justify-center mt-8 gap-2 flex-wrap">

                  {[...Array(soldTotalPages)].map(
                    (_, i) => (
                      <button
                        key={i}
                        onClick={() =>
                          setSoldPage(i + 1)
                        }
                        className={`
                          min-w-10
                          h-10
                          px-3
                          rounded-xl
                          text-sm
                          font-semibold
                          transition
                          ${
                            soldPage ===
                            i + 1
                              ? "bg-sky-500 text-white shadow-md"
                              : "bg-white border border-gray-200 text-gray-600 hover:bg-sky-50 hover:border-sky-200"
                          }
                        `}
                      >
                        {i + 1}
                      </button>
                    )
                  )}

                </div>
              )}

            </div>

          </section>
        )}

      </div>


      {/* =========================================================
          FULL SCREEN GALLERY
      ========================================================== */}
      {showGallery && (
        <div
          className="
            fixed
            inset-0
            bg-[#05070b]/[0.98]
            z-[99999]
            flex
            flex-col
          "
        >

          {/* =====================================================
              GALLERY TOP BAR
          ====================================================== */}
          <div className="relative z-30 flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10 bg-black/30 backdrop-blur-xl">

            {/* Left */}
            <div className="min-w-0 pr-3">

              <p className="text-white font-semibold text-sm sm:text-base truncate max-w-[220px] sm:max-w-[500px]">
                {property.title}
              </p>

              <div className="flex items-center gap-2 mt-1 text-white/50 text-xs">
                <FaImages size={11} />
                Property Gallery
              </div>

            </div>


            {/* Center Counter */}
            <div className="absolute left-1/2 -translate-x-1/2">

              <span className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white text-xs sm:text-sm font-medium backdrop-blur-md">
                {galleryIndex + 1} /{" "}
                {images.length}
              </span>

            </div>


            {/* Close */}
            <button
              onClick={() =>
                setShowGallery(false)
              }
              className="
                flex-shrink-0
                w-10
                h-10
                rounded-full
                bg-white/10
                border
                border-white/10
                text-white
                flex
                items-center
                justify-center
                text-2xl
                hover:bg-white
                hover:text-black
                transition-all
              "
              aria-label="Close gallery"
            >
              ×
            </button>

          </div>


          {/* =====================================================
              IMAGE VIEWER
          ====================================================== */}
          <div className="relative flex-1 min-h-0 flex items-center justify-center overflow-hidden">

            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-sky-500/5 blur-3xl" />
            </div>


            {/* PREVIOUS */}
            {images.length > 1 && (
              <button
                onClick={previousGalleryImage}
                className="
                  absolute
                  left-3
                  sm:left-6
                  lg:left-8
                  top-1/2
                  -translate-y-1/2
                  z-30
                  w-11
                  h-11
                  sm:w-12
                  sm:h-12
                  rounded-full
                  bg-white/10
                  hover:bg-white
                  text-white
                  hover:text-gray-900
                  border
                  border-white/10
                  backdrop-blur-xl
                  flex
                  items-center
                  justify-center
                  shadow-2xl
                  transition-all
                "
              >
                <IoIosArrowBack size={24} />
              </button>
            )}


            {/* IMAGE WRAPPER */}
            <div
              className="
                relative
                w-full
                h-full
                flex
                items-center
                justify-center
                overflow-hidden
                px-16
                sm:px-20
                lg:px-28
                py-8
              "
            >

              <img
                src={getImageUrl(
                  images[galleryIndex]
                )}
                alt={property.title}
                draggable={false}
                onWheel={handleWheel}
                onDoubleClick={
                  handleDoubleClick
                }
                onMouseDown={
                  handleMouseDown
                }
                onMouseMove={
                  handleMouseMove
                }
                onMouseUp={
                  handleMouseUp
                }
                onMouseLeave={
                  handleMouseUp
                }
                className="
                  max-h-[70vh]
                  sm:max-h-[72vh]
                  lg:max-h-[76vh]
                  max-w-full
                  object-contain
                  select-none
                  rounded-xl
                  shadow-2xl
                "
                style={{
                  transform: `
                    translate(${position.x}px, ${position.y}px)
                    scale(${zoom})
                  `,
                  cursor:
                    zoom > 1
                      ? dragging
                        ? "grabbing"
                        : "grab"
                      : "zoom-in",
                  transition: dragging
                    ? "none"
                    : "transform 75ms ease-out",
                }}
              />

            </div>


            {/* NEXT */}
            {images.length > 1 && (
              <button
                onClick={nextGalleryImage}
                className="
                  absolute
                  right-3
                  sm:right-6
                  lg:right-8
                  top-1/2
                  -translate-y-1/2
                  z-30
                  w-11
                  h-11
                  sm:w-12
                  sm:h-12
                  rounded-full
                  bg-white/10
                  hover:bg-white
                  text-white
                  hover:text-gray-900
                  border
                  border-white/10
                  backdrop-blur-xl
                  flex
                  items-center
                  justify-center
                  shadow-2xl
                  transition-all
                "
              >
                <IoIosArrowForward size={24} />
              </button>
            )}


            {/* =================================================
                ZOOM CONTROLS
            ================================================== */}
            <div className="absolute right-3 sm:right-6 top-4 sm:top-6 z-30 flex items-center gap-2">

              <button
                onClick={() =>
                  setZoom((z) =>
                    Math.min(
                      z + 0.2,
                      3
                    )
                  )
                }
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-white/10
                  hover:bg-white
                  text-white
                  hover:text-gray-900
                  border
                  border-white/10
                  backdrop-blur-xl
                  flex
                  items-center
                  justify-center
                  transition
                "
                title="Zoom In"
              >
                <FaSearchPlus size={13} />
              </button>

              <button
                onClick={() =>
                  setZoom((z) =>
                    Math.max(
                      z - 0.2,
                      1
                    )
                  )
                }
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-white/10
                  hover:bg-white
                  text-white
                  hover:text-gray-900
                  border
                  border-white/10
                  backdrop-blur-xl
                  flex
                  items-center
                  justify-center
                  transition
                "
                title="Zoom Out"
              >
                <FaSearchMinus size={13} />
              </button>

              <button
                onClick={resetZoom}
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-white/10
                  hover:bg-white
                  text-white
                  hover:text-gray-900
                  border
                  border-white/10
                  backdrop-blur-xl
                  flex
                  items-center
                  justify-center
                  transition
                "
                title="Reset Zoom"
              >
                <FaRedo size={12} />
              </button>

            </div>

          </div>


          {/* =====================================================
              BOTTOM THUMBNAILS
          ====================================================== */}
          <div className="relative z-30 border-t border-white/10 bg-black/50 backdrop-blur-xl px-3 sm:px-5 py-3 sm:py-4">

            <div className="max-w-5xl mx-auto">

              <div className="flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar justify-start sm:justify-center pb-1">

                {images.map(
                  (img, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setGalleryIndex(
                          index
                        )
                      }
                      className={`
                        relative
                        flex-shrink-0
                        w-16
                        h-12
                        sm:w-20
                        sm:h-14
                        md:w-24
                        md:h-16
                        rounded-lg
                        overflow-hidden
                        border-2
                        transition-all
                        duration-200
                        ${
                          galleryIndex ===
                          index
                            ? "border-sky-400 opacity-100 scale-105"
                            : "border-white/10 opacity-55 hover:opacity-100 hover:border-white/40"
                        }
                      `}
                    >
                      <img
                        src={getImageUrl(
                          img
                        )}
                        alt=""
                        className="w-full h-full object-cover"
                      />

                      {galleryIndex ===
                        index && (
                        <div className="absolute inset-0 bg-sky-500/10" />
                      )}
                    </button>
                  )
                )}

              </div>


              {/* Help Text */}
              <div className="hidden sm:flex justify-center items-center gap-4 mt-3 text-[11px] text-white/40">

                <span>
                  Double click to zoom
                </span>

                <span>•</span>

                <span>
                  Scroll to zoom
                </span>

                <span>•</span>

                <span>
                  Drag when zoomed
                </span>

              </div>

            </div>

          </div>

        </div>
      )}

      <Footer />
    </>
  );
};

export default PropertyDetails;