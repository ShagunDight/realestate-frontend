import React, { useRef, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import Footer from "../components/Footer";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useWishlist } from "../components/WishlistContext";
import {
  FaMapMarkerAlt,
  FaBolt,
  FaParking,
  FaCalendar,
  FaRulerCombined,
  FaPhone,
  FaWhatsapp,
  FaPhoneAlt,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";

const PropertyDetails = ({setShowLogin}) => {
  const { id } = useParams();

  // ✅ ALL HOOKS FIRST (no conditions above this line)
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

  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // ✅ ALL useEffects ALSO ABOVE RETURN
  useEffect(() => {
    fetch(`https://lightblue-moose-690494.hostingersite.com/api/properties/${id}`)
      .then((res) => res.json())
      .then((data) => setProperty(data.data || data))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [galleryIndex]);

  // ❌ ONLY AFTER ALL HOOKS
  if (!property) return <p className="text-center mt-10">Loading...</p>;

  const images = property.image || [];

  // SLIDE FUNCTIONS
  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -220,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 220,
      behavior: "smooth",
    });
  };

  // TOP PE ADD KRO
  const today = new Date();

  const nextDates = Array.from({ length: 15 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);

    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      fullDate: date.toISOString().split("T")[0],
    };
  });


  const handleSubmit = async () => {
    if (!selectedDate || !email || !phone) {
      alert("Please fill all required fields");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("https://lightblue-moose-690494.hostingersite.com/api/visit-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          property_id: id,
          date: selectedDate,
          name,
          email,
          phone,
          is_military: isMilitary,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Tour request submitted successfully!");
        setSelectedDate(null);
        setEmail("");
        setPhone("");
        setIsMilitary(false);
      } else {
        alert("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();

    setZoom((prev) => {
      let next = prev + (e.deltaY < 0 ? 0.2 : -0.2);
      return Math.min(Math.max(next, 1), 3); // 1x to 3x
    });
  };

  const handleDoubleClick = () => {
    setZoom((prev) => (prev === 1 ? 2 : 1));
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
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

  // ✅ CHECK LOGIN
  const isLoggedIn = !!localStorage.getItem("customer_token");

  const handleWishlistClick = () => {
    if (!isLoggedIn) {
      setShowLogin?.(true); // open login modal
      return;
    }

    toggleWishlist(property);
  };

  return (
  <>
    <div className="bg-[#f6f9ff] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* ================= HEADER ================= */}
        <div className="bg-white/60 backdrop-blur-xl border rounded-3xl p-6 mb-8 text-center">
          <span className="text-xs px-3 py-1 bg-sky-100 text-sky-600 rounded-full">
            {property.property_type?.name}
          </span>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mt-3">
            {property.title}
          </h1>

          <p className="mt-3 text-gray-500 flex justify-center items-center gap-2">
            📍 {property.location} • Zip {property.zip_code}
          </p>
        </div>

        {/* ===== TOP ACTION BAR ===== */}
        <div className="flex justify-between items-center mb-5">

          {/* BADGE LEFT (optional vibe) */}
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs bg-sky-100 text-sky-600 rounded-full font-medium">
              Featured Property
            </span>
          </div>

          {/* WISHLIST BUTTON */}
          <button onClick={handleWishlistClick} className="flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full
            bg-white/90 backdrop-blur-md border border-gray-100 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300">
            {isWished(property.id) ? (
              <FaHeart className="text-red-500 text-lg" />
            ) : (
              <FaRegHeart className="text-gray-600 text-lg" />
            )}

            <span className="text-sm font-medium text-gray-700">
              Wishlist
            </span>
          </button>
        </div>


        {/* ===== IMAGE SECTION ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 lg:gap-4 mb-6 lg:mb-10">

          {/* MAIN IMAGE */}
          <div className="lg:col-span-4 relative h-[320px] sm:h-[420px] md:h-[520px] rounded-3xl overflow-hidden shadow-xl group bg-gray-100">
            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer" alt=""
              src={
                images.length ? `https://lightblue-moose-690494.hostingersite.com/public/${images[currentImage]?.path}` : "https://thumbs.dreamstime.com/b/dummy-neighbor-chat-23372551.jpg"
              }
              onClick={() => {
                setGalleryIndex(currentImage);
                setShowGallery(true);
              }}
            />

            {/* DARK GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

              {/* LEFT BTN */}
              <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-md p-3 rounded-full transition"
                onClick={() =>
                  setCurrentImage(
                    currentImage === 0 ? images.length - 1 : currentImage - 1
                  )
                } 
              >
                <IoIosArrowBack size={20} />
              </button>

              {/* RIGHT BTN */}
              <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-md p-3 rounded-full transition"
                onClick={() =>
                  setCurrentImage(
                    currentImage === images.length - 1 ? 0 : currentImage + 1
                  )
                }
              >
                <IoIosArrowForward size={20} />
              </button>
            </div>


            {/* ===== THUMBNAILS ===== */}
            <div className="lg:col-span-1 flex lg:flex-col gap-2 lg:gap-3 overflow-x-auto lg:overflow-visible">

              {images.slice(0, 4).map((img, i) => {
                const remaining = images.length - 4;

                return (
                  <div key={i} onClick={() => setCurrentImage(i)} className={`relative rounded-xl overflow-hidden cursor-pointer border-2 transition
                      ${i === currentImage ? "border-sky-500 shadow-md scale-[1.02]" : "border-gray-200 hover:border-sky-400"}`}>
                    
                    <img src={`https://lightblue-moose-690494.hostingersite.com/public/${img.path}`} className="w-28 h-20 lg:w-full lg:h-24 object-cover" alt=""/>

                    {/* OVERLAY FOR EXTRA IMAGES */}
                    {i === 3 && remaining > 0 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-xl" onClick={() => { setGalleryIndex(3); setShowGallery(true); }}>
                        +{remaining}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================= MAIN CONTENT ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-8">

              {/* HIGHLIGHTS */}
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-semibold mb-5 text-gray-900">
                  Highlights
                </h2>

                <div className="text-gray-600 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-2 [&_li]:marker:text-sky-500"
                  dangerouslySetInnerHTML={{ __html: property.highlights, }}></div>
              </div>

              {/* SUMMARY */}
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-semibold mb-5 text-gray-900">
                  Summary
                </h2>

                <div className="text-gray-600 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-2 [&_li]:marker:text-sky-500"
                    dangerouslySetInnerHTML={{ __html: property.description, }}>
                </div>
              </div>

              {/* MAP */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">

                {/* TABS */}
                <div className="flex gap-6 border-b mb-5">
                  <button onClick={() => setView("aerial")} className={`pb-3 text-sm font-medium transition
                    ${ view === "aerial"
                        ? "border-b-2 border-sky-500 text-sky-500"
                        : "text-gray-500"
                      }`
                    }
                  >
                    Aerial
                  </button>

                  <button onClick={() => setView("map")} className={`pb-3 text-sm font-medium transition
                    ${
                      view === "map"
                        ? "border-b-2 border-sky-500 text-sky-500"
                        : "text-gray-500"
                    }`}
                  >
                    Map
                  </button>
                </div>

              <div className="h-[250px] sm:h-[300px] md:h-[350px] rounded-2xl overflow-hidden">
                {view === "aerial" ? (
                  <div className="relative h-full rounded-2xl overflow-hidden bg-gray-100">
                    <img className="w-full h-full object-cover" alt=""
                      src={
                        images.length
                          ? `https://lightblue-moose-690494.hostingersite.com/public/${images[aerialImage]?.path}`
                          : "https://thumbs.dreamstime.com/b/dummy-neighbor-chat-23372551.jpg"
                      }
                    />

                    <button
                      onClick={() =>
                        setAerialImage(
                          aerialImage === 0 ? images.length - 1 : aerialImage - 1
                        )
                      } className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full"
                    >
                      <IoIosArrowBack size={20} />
                    </button>

                    <button
                      onClick={() =>
                        setAerialImage(
                          aerialImage === images.length - 1 ? 0 : aerialImage + 1
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full"
                    >
                      <IoIosArrowForward size={20} />
                    </button>
                  </div>
                ) : (
                  <iframe width="100%" height="100%" title="map"
                    src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
                  />
                )}
              </div>
            </div>

            {/* PROPERTY OVERVIEW */}
            {property.property_overview && (
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-semibold mb-5 text-gray-900">
                  Property Overview
                </h2>

                <div className="text-gray-600 leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-2 [&_li]:marker:text-sky-500"
                  dangerouslySetInnerHTML={{__html: property.property_overview,}
                }></div>
              </div>
            )}

            {/* ABOUT OWNER */}
            {property.about_owner && (
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-semibold mb-5 text-gray-900">
                  About the Owner
                </h2>

                <div className="text-gray-600 leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-2 [&_li]:marker:text-sky-500"
                  dangerouslySetInnerHTML={{__html: property.about_owner,}
                }></div>
              </div>
            )}

            {/* NEARBY */}
            {property.nearby && property.nearby.length > 0 && (
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                  Nearby Places
                </h2>
                  
                <div className="grid sm:grid-cols-2 gap-4">
                  {property.nearby.map((item, index) => (
                    <div key={index}
                      className="flex justify-between items-center px-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-sky-50 transition">
                      <span className="text-gray-800 font-medium">
                        {item.name}
                      </span>

                      <span className="text-sm font-semibold text-sky-600">
                        {item.distance} km
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ================= RIGHT SIDEBAR ================= */}
          <div className="space-y-8">

            <div className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white p-6 rounded-3xl">
              <p>Price</p>
              <h3 className="text-3xl font-bold mt-2">
                {property.property_type?.name === "For Lease" ? `₹ ${property.monthly_rent}/mon` : `₹ ${property.sale_price || "On Request"}`}
              </h3>
            </div>
              
            {/* PROPERTY FACTS */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                Property Facts
              </h2>

              <ul className="space-y-5 text-sm">
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaRulerCombined className="text-sky-500" />
                    Property
                  </div>

                  <span className="font-semibold text-gray-900">
                    {property.property_type?.name || "Property"}
                  </span>
                </li>

                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaRulerCombined className="text-sky-500" />
                    Total Space
                  </div>

                  <span className="font-semibold text-gray-900">
                    {property.total_space_available}{" "}
                    {property.total_size_unit}
                  </span>
                </li>

                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaParking className="text-sky-500" />
                    Parking
                  </div>

                  <span className="font-semibold text-gray-900">
                    {property.parking_ratio || 30} Sqft
                  </span>
                </li>

                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaCalendar className="text-sky-500" />
                    Year Built
                  </div>

                  <span className="font-semibold text-gray-900">
                    {property.year_built || "-"}
                  </span>
                </li>

                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaRulerCombined className="text-sky-500" />
                    Land Size
                  </div>

                  <span className="font-semibold text-gray-900">
                    {property.land_size} {property.land_size_unit}
                  </span>
                </li>

                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaRulerCombined className="text-sky-500" />
                    Building Size
                  </div>

                  <span className="font-semibold text-gray-900">
                    {property.building_size}{" "}
                    {property.building_size_unit}
                  </span>
                </li>

                {/* FEATURES */}
                <li className="pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <FaBolt className="text-sky-500" />
                    Features
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {property.building_features ? (
                      property.building_features.split(",")
                        .map((item, index) => (
                          <span key={index} className="px-3 py-1 text-xs bg-sky-50 text-sky-600 border border-sky-200 rounded-full">
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
              
            {/* SCHEDULE TOUR CARD */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Schedule Property Tour
              </h3>

              {/* DATE */}
              <div className="mb-5">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  What is your preferred tour date?
                </p>

                {/* DATE SLIDER */}
                <div className="relative">

                  {/* LEFT BUTTON */}
                  <button onClick={scrollLeft} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md border 
                    flex items-center justify-center hover:bg-sky-50">
                    <IoIosArrowBack />
                  </button>

                  {/* SLIDER */}
                  <div ref={sliderRef} className="flex gap-3 overflow-x-auto scroll-smooth px-12 pb-2 no-scrollbar">
                    {nextDates.map((item, index) => (
                      <button key={index} onClick={() => setSelectedDate(item.fullDate)}
                        className={`min-w-[75px] sm:min-w-[90px] border rounded-xl py-3 px-4 text-center transition flex-shrink-0
                          ${
                            selectedDate === item.fullDate
                              ? "border-sky-500 bg-sky-50"
                              : "hover:border-sky-500 hover:bg-sky-50"
                          }`
                        }
                      >
                        <p className="text-xs text-gray-500">{item.day}</p>
                        <p className="font-semibold text-gray-900">{item.date}</p>
                      </button>
                    ))}
                  </div>

                  {/* RIGHT BUTTON */}
                  <button onClick={scrollRight} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md border flex items-center justify-center hover:bg-sky-50">
                    <IoIosArrowForward />
                  </button>
                </div>
              </div>

              {/* Name */}
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Full Name *"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-sky-500"/>
                
              {/* EMAIL */}
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email *"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-sky-500"/>

              {/* PHONE */}
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Phone *"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-sky-500"/>

              {/* CHECKBOX */}
              <label className="flex items-start gap-2 text-sm text-gray-600 mb-5">
                <input type="checkbox" checked={isMilitary} onChange={(e) => setIsMilitary(e.target.checked)} className="mt-1 accent-sky-500"/> I've served in the military
              </label>

              {/* BUTTON */}
              <button onClick={handleSubmit} disabled={loading}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full font-semibold transition disabled:opacity-50">
                {loading ? "Sending..." : "Request Tour"}
              </button>
            </div>

            {/* AGENT CARD */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:sticky lg:top-6">
              <h3 className="text-xl font-semibold text-center mb-5">
                Contact Agent
              </h3>

              <div className="flex flex-col items-center">
                <Link to={`/agent/${property.agent?.id}`}>
                  <img className="w-24 h-24 rounded-full object-cover border-4 border-sky-100" alt=""
                    src={
                      property.agent?.img
                        ? `https://lightblue-moose-690494.hostingersite.com/public${property.agent.img}`
                        : "https://img.freepik.com/premium-vector/secret-agent-icon-logo-design-illustration_586739-409.jpg"
                    }/>

                  <h4 className="mt-4 font-semibold text-lg text-gray-900">
                    {property.agent?.name}
                  </h4>
                </Link>
                <p className="text-gray-500 text-sm flex items-center gap-2 mt-2">
                  <FaPhone className="text-sky-500" />
                  {property.agent?.phone}
                </p>

                <div className="flex gap-3 mt-6 w-full">

                  {/* MESSAGE BUTTON */}
                  <a href={`https://wa.me/${property.agent?.phone}`} target="_blank" rel="noopener noreferrer"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-sm transition text-center font-medium flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp />
                    Message
                  </a>

                  {/* CALL BUTTON */}
                  <a href={`tel:${property.agent?.phone}`}
                    className="flex-1 border border-sky-500 text-sky-500 py-3 rounded-xl text-sm hover:bg-sky-50 transition text-center font-medium flex items-center justify-center gap-2"
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
    </div>
      
    {/* FULL SCREEN GALLERY */}
    {showGallery && (
      <div className="fixed inset-0 bg-black/95 z-[99999] flex flex-col">

        {/* TOP BAR */}
        <div className="flex justify-end p-4">
          <button onClick={() => setShowGallery(false)} className="text-white text-4xl leading-none hover:scale-110 transition">
            ×
          </button>
        </div>

        {/* IMAGE VIEWER AREA */}
        <div className="flex-1 flex items-center justify-center relative overflow-hidden">

          {/* Prev */}
          <button className="absolute left-4 bg-white/90 hover:bg-white p-3 rounded-full z-20"
            onClick={() =>
              setGalleryIndex(
                galleryIndex === 0 ? images.length - 1 : galleryIndex - 1
              )
            }>
            <IoIosArrowBack size={24} />
          </button>

          {/* IMAGE WRAPPER (IMPORTANT FIX) */}
          <div className="flex-1 flex items-center justify-center overflow-hidden relative">
            <img src={`https://lightblue-moose-690494.hostingersite.com/public/${images[galleryIndex]?.path}`} alt="" draggable={false} onWheel={handleWheel} onDoubleClick={handleDoubleClick}
              onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
              className="max-h-[75vh] sm:max-h-[85vh] max-w-[95vw] object-contain select-none transition-transform duration-75"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                cursor: zoom > 1 ? (dragging ? "grabbing" : "grab") : "zoom-in",
              }}
            />
          </div>
            
          <div className="absolute top-20 right-3 sm:right-5 flex flex-col gap-2 z-30">
            <button onClick={() => setZoom((z) => Math.min(z + 0.2, 3))} className="bg-white p-2 rounded shadow">
              +
            </button>

            <button onClick={() => setZoom((z) => Math.max(z - 0.2, 1))} className="bg-white p-2 rounded shadow">
              -
            </button>

            <button className="bg-white p-2 rounded shadow text-xs" onClick={() => { setZoom(1); setPosition({ x: 0, y: 0 }); }}>
              Reset
            </button>
          </div>

          {/* Next */}
          <button className="absolute right-4 bg-white/90 hover:bg-white p-3 rounded-full z-20"
            onClick={() =>
              setGalleryIndex(
                galleryIndex === images.length - 1 ? 0 : galleryIndex + 1
              )
            }>
            <IoIosArrowForward size={24} />
          </button>
        </div>

        {/* BOTTOM SECTION */}
        <div className="pb-6 px-4">
          <div className="text-center mb-3">
            <span className="bg-black/60 text-white px-4 py-1 rounded-full text-sm">
              {galleryIndex + 1} / {images.length}
            </span>
          </div>
        </div>
      </div>
    )}
    <Footer />
  </>
);
};

export default PropertyDetails;
