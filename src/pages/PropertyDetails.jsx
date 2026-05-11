import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import Footer from "../components/Footer";

import {
  FaMapMarkerAlt,
  FaBolt,
  FaParking,
  FaCalendar,
  FaRulerCombined,
  FaPhone,
} from "react-icons/fa";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const PropertyDetails = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [view, setView] = useState("aerial");

  useEffect(() => {
    fetch(`http://127.0.0.1:8001/api/properties/${id}`)
      .then((res) => res.json())
      .then((data) => setProperty(data.data || data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!property) return <p className="text-center mt-10">Loading...</p>;

  const images = property.image || [];

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* TITLE */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">{property.title}</h1>
          
          <p className="flex justify-center items-center gap-2 text-gray-500 mt-2">
            <FaMapMarkerAlt className="text-sky-500" />
            {property.location}
          </p>
        </div>

        {/* IMAGE SLIDER */}
        <div className="relative w-full h-[420px] rounded-xl overflow-hidden mb-6 group">
          <img
            src={
              images.length
                ? `http://127.0.0.1:8001/${images[currentImage]?.path}`
                : "https://thumbs.dreamstime.com/b/dummy-neighbor-chat-23372551.jpg"
            }
            className="w-full h-full object-cover" alt=""
          />

          {/* LEFT */}
          <button
            onClick={() =>
              setCurrentImage(
                currentImage === 0 ? images.length - 1 : currentImage - 1,
              )
            } className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full opacity-0 group-hover:opacity-100 transition">
            <IoIosArrowBack size={22} />
          </button>

          {/* RIGHT */}
          <button
            onClick={() =>
              setCurrentImage(
                currentImage === images.length - 1 ? 0 : currentImage + 1,
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <IoIosArrowForward size={22} />
          </button>
        </div>

        {/* THUMBNAILS */}
        <div className="flex gap-3 mb-10 flex-wrap">
          {images.map((img, i) => (
            <img
              key={i}
              src={`http://127.0.0.1:8001/${img.path}`}
              onClick={() => setCurrentImage(i)}
              className={`w-24 h-16 object-cover rounded cursor-pointer border transition ${
                i === currentImage
                  ? "border-sky-500 scale-105"
                  : "border-gray-200"
              }`}
              alt=""
            />
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {/* DESCRIPTION */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Highlights</h2>

            <div
              className="text-gray-600 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-2 [&_li]:marker:text-sky-500"
              dangerouslySetInnerHTML={{ __html: property.highlights }}
            ></div>
          </div>

          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>

            <div className="text-gray-600 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-2 [&_li]:marker:text-sky-500"
              dangerouslySetInnerHTML={{ __html: property.description }}
            ></div>
          </div>

          {/* PROPERTY FACTS */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-5">Property Facts</h2>

            <ul className="space-y-4 text-sm">

              {/* PROPERTY TYPE */}
              <li className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaRulerCombined className="text-sky-500 text-sm" />
                  Property
                </div>
                <span className="font-medium text-gray-900">
                  {property.property_type?.name || "Property"}
                </span>
              </li>

              {/* TOTAL SPACE */}
              <li className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaRulerCombined className="text-sky-500 text-sm" />
                  Total Space
                </div>
                <span className="font-medium text-gray-900">
                  {property.total_space_available} {property.total_size_unit}
                </span>
              </li>

              {/* PARKING */}
              <li className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaParking className="text-sky-500 text-sm" />
                  Parking Space
                </div>
                <span className="font-medium text-gray-900">
                  {property.parking_ratio || 30} Sqft
                </span>
              </li>

              {/* YEAR BUILT */}
              <li className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaCalendar className="text-sky-500 text-sm" />
                  Year Built
                </div>
                <span className="font-medium text-gray-900">
                  {property.year_built || "-"}
                </span>
              </li>

              {/* LAND SIZE */}
              <li className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaRulerCombined className="text-sky-500 text-sm" />
                  Land Size
                </div>
                <span className="font-medium text-gray-900">
                  {property.land_size} {property.land_size_unit}
                </span>
              </li>

              {/* BUILDING SIZE */}
              <li className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaRulerCombined className="text-sky-500 text-sm" />
                  Building Size
                </div>
                <span className="font-medium text-gray-900">
                  {property.building_size} {property.building_size_unit}
                </span>
              </li>

              {/* FEATURES (IMPROVED SECTION) */}
              <li className="items-start justify-between gap-6 pt-2 border-t border-gray-100">

                {/* LABEL */}
                <div className="flex items-center gap-2 text-gray-600">
                  <FaBolt className="text-sky-500 text-sm" />
                  Features
                </div>

                {/* VALUES */}
                <div className="flex flex-wrap gap-2 justify-end">

                  {property.building_features
                    ? property.building_features
                        .split(",")
                        .map((item, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-xs bg-sky-50 text-sky-600 border border-sky-200 rounded-full whitespace-nowrap hover:bg-sky-100 transition"
                          >
                            {item.trim()}
                          </span>
                        ))
                    : <span className="text-gray-400">N/A</span>
                  }

                </div>

              </li>

            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* MAP */}
          <div className="md:col-span-2">
            {/* TABS */}
            <div className="flex gap-6 border-b mb-4">
              <button
                onClick={() => setView("aerial")}
                className={`pb-2 ${
                  view === "aerial"
                    ? "border-b-2 border-sky-500 text-sky-500"
                    : "text-gray-500"
                }`}
              >
                Aerial
              </button>

              <button
                onClick={() => setView("map")}
                className={`pb-2 ${
                  view === "map"
                    ? "border-b-2 border-sky-500 text-sky-500"
                    : "text-gray-500"
                }`}
              >
                Map
              </button>
            </div>

            <div className="h-[350px] rounded-xl overflow-hidden shadow">
              {view === "aerial" ? (
                <img
                  src={
                    images.length
                      ? `http://127.0.0.1:8001/${images[0].path}`
                      : "https://thumbs.dreamstime.com/b/dummy-neighbor-chat-23372551.jpg"
                  }
                  className="w-full h-full object-cover"
                  alt=""
                />
              ) : (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
                  title="map"
                ></iframe>
              )}
            </div>
          </div>
          {/* AGENT CARD */}
          <div className="bg-white rounded-2xl shadow-lg border p-6 w-full h-fit">
            <h3 className="text-lg font-semibold text-center mb-4">
              Contact Agent
            </h3>

            <div className="flex flex-col items-center">
              {/* IMAGE */}
              <img
                src={
                  property.agent?.img
                    ? `http://127.0.0.1:8001/public/${property.agent.img}`
                    : "https://img.freepik.com/premium-vector/secret-agent-icon-logo-design-illustration_586739-409.jpg"
                }
                className="w-20 h-20 rounded-full object-cover border-2 border-sky-500"
                alt=""
              />

              {/* NAME */}
              <h4 className="mt-3 font-semibold text-lg">
                {property.agent?.name}
              </h4>

              {/* PHONE */}
              <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                <FaPhone className="text-sky-500" />
                {property.agent?.phone}
              </p>

              {/* BUTTONS */}
              <div className="flex gap-3 mt-5 w-full">
                <button className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg text-sm transition">
                  Message
                </button>

                <button className="flex-1 border border-sky-500 text-sky-500 py-2 rounded-lg text-sm hover:bg-sky-50">
                  Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-10 space-y-6">
        {property.nearby && property.nearby.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-md transition hover:shadow-lg">
            
            <h2 className="text-xl font-semibold mb-5 text-sky-500 border-b pb-2">
              Nearby Places
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {property.nearby.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center px-4 py-3 rounded-lg border bg-gray-50 hover:bg-sky-50 transition"
                >
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
          
        {/* Property Overview */}
        {property.property_overview && (
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            
            <h2 className="text-xl font-semibold mb-5 text-sky-500 border-b pb-2">
              Property Overview
            </h2>

            <div
              className="text-gray-600 leading-relaxed
              [&_p]:mb-4 
              [&_ul]:list-disc 
              [&_ul]:pl-5 
              [&_li]:mb-2 
              [&_li]:marker:text-sky-500"
              dangerouslySetInnerHTML={{
                __html: property.property_overview,
              }}
            />
          </div>
        )}

        {/* About Owner */}
        {property.about_owner && (
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            
            <h2 className="text-xl font-semibold mb-5 text-sky-500 border-b pb-2">
              About the Owner
            </h2>

            <div
              className="text-gray-600 leading-relaxed
              [&_p]:mb-4 
              [&_ul]:list-disc 
              [&_ul]:pl-5 
              [&_li]:mb-2 
              [&_li]:marker:text-sky-500"
              dangerouslySetInnerHTML={{
                __html: property.about_owner,
              }}
            />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PropertyDetails;
