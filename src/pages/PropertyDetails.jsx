import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import Footer from "../components/Footer";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import {
  FaMapMarkerAlt,
  FaBolt,
  FaParking,
  FaCalendar,
  FaRulerCombined,
  FaPhone,
} from "react-icons/fa";

const PropertyDetails = () => {
  const { id } = useParams();

  const [selectedDate, setSelectedDate] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isMilitary, setIsMilitary] = useState(false);
  const [loading, setLoading] = useState(false);
  const [property, setProperty] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [view, setView] = useState("aerial");
  const sliderRef = useRef(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8001/api/properties/${id}`)
      .then((res) => res.json())
      .then((data) => setProperty(data.data || data))
      .catch((err) => console.error(err));
  }, [id]);

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
      const res = await fetch("http://127.0.0.1:8001/api/visit-request", {
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

  return (
  <>
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">

      {/* ================= HEADER ================= */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {property.title}
        </h1>

        <p className="flex justify-center items-center gap-2 text-gray-500 mt-3 text-sm md:text-base">
          <FaMapMarkerAlt className="text-sky-500" />
          {property.location}
        </p>
      </div>

      {/* ================= IMAGE SLIDER ================= */}
      <div className="relative w-full h-[250px] sm:h-[350px] md:h-[500px] rounded-3xl overflow-hidden mb-5 group shadow-lg">
        <img className="w-full h-full object-cover transition duration-500" alt=""
          src={
            images.length
              ? `http://127.0.0.1:8001/${images[currentImage]?.path}`
              : "https://thumbs.dreamstime.com/b/dummy-neighbor-chat-23372551.jpg"
          }
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>

        {/* LEFT */}
        <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur shadow-lg p-3 rounded-full opacity-0 group-hover:opacity-100 transition z-10"
          onClick={() =>
            setCurrentImage(
              currentImage === 0
                ? images.length - 1
                : currentImage - 1
            )
          }
        >
          <IoIosArrowBack size={22} />
        </button>

        {/* RIGHT */}
        <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur shadow-lg p-3 rounded-full opacity-0 group-hover:opacity-100 transition z-10"
          onClick={() =>
            setCurrentImage(
              currentImage === images.length - 1
                ? 0
                : currentImage + 1
            )
          }
        >
          <IoIosArrowForward size={22} />
        </button>

      </div>

      {/* ================= THUMBNAILS ================= */}
      <div className="flex gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, i) => (
          <img key={i} src={`http://127.0.0.1:8001/${img.path}`} onClick={() => setCurrentImage(i)} alt=""
            className={`w-24 h-16 md:w-28 md:h-20 object-cover rounded-xl cursor-pointer border-2 transition duration-300 shrink-0
            ${
              i === currentImage
                ? "border-sky-500 scale-105 shadow-md"
                : "border-gray-200 hover:border-sky-300"
            }`}
          />
        ))}
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

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
              dangerouslySetInnerHTML={{ __html: property.description, }}></div>
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

            <div className="h-[350px] rounded-2xl overflow-hidden">
              {view === "aerial" ? (
                <img className="w-full h-full object-cover" alt=""
                  src={
                    images.length
                      ? `http://127.0.0.1:8001/${images[0].path}`
                      : "https://thumbs.dreamstime.com/b/dummy-neighbor-chat-23372551.jpg"
                  }
                />
              ) : (
                <iframe width="100%" height="100%" src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
                  title="map"></iframe>
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
                dangerouslySetInnerHTML={{
                  __html: property.property_overview,
                }
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
                dangerouslySetInnerHTML={{
                  __html: property.about_owner,
                }
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
                    property.building_features
                      .split(",")
                      .map((item, index) => (
                        <span key={index} className="px-3 py-1 text-xs bg-sky-50 text-sky-600 border border-sky-200 rounded-full">
                          {item.trim()}
                        </span>
                      ))
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
                      className={`min-w-[90px] border rounded-xl py-3 px-4 text-center transition flex-shrink-0
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

            {/* DIVIDER */}
            <div className="border-t my-6"></div>

            {/* MORE ABOUT */}
            <h4 className="text-xl font-semibold text-gray-900 mb-4">
              More about this property
            </h4>

            <button className="w-full border border-gray-300 hover:border-sky-500 hover:bg-sky-50 py-3 rounded-full font-medium transition">
              Email Agent
            </button>

            {/* DISCLAIMER */}
            <p className="text-[11px] text-gray-500 mt-5 leading-relaxed">
              By proceeding, you consent to receive calls and texts at the number
              you provided, including marketing by autodialer and prerecorded voice.
            </p>
          </div>

          {/* AGENT CARD */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 sticky top-6 p-6">
            <h3 className="text-xl font-semibold text-center mb-5">
              Contact Agent
            </h3>

            <div className="flex flex-col items-center">
              <img className="w-24 h-24 rounded-full object-cover border-4 border-sky-100" alt=""
                src={
                  property.agent?.img
                    ? `http://127.0.0.1:8001/${property.agent.img}`
                    : "https://img.freepik.com/premium-vector/secret-agent-icon-logo-design-illustration_586739-409.jpg"
                }/>

              <h4 className="mt-4 font-semibold text-lg text-gray-900">
                {property.agent?.name}
              </h4>

              <p className="text-gray-500 text-sm flex items-center gap-2 mt-2">
                <FaPhone className="text-sky-500" />
                {property.agent?.phone}
              </p>

              <div className="flex gap-3 mt-6 w-full">
                <button className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl text-sm transition">
                  Message
                </button>

                <button className="flex-1 border border-sky-500 text-sky-500 py-3 rounded-xl text-sm hover:bg-sky-50 transition">
                  Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </>
);
};

export default PropertyDetails;
