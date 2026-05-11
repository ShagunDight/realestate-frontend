import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ item }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html || "";
    return div.textContent || div.innerText || "";
  };

  const images = item.image || [];

  const getImage = () => {
    const fallback =
      "https://thumbs.dreamstime.com/b/dummy-neighbor-chat-23372551.jpg";

    let images = item.image;

    // ✅ FIX: STRING → ARRAY
    if (typeof images === "string") {
      try {
        images = JSON.parse(images);
      } catch (e) {
        return fallback;
      }
    }

    if (!Array.isArray(images) || images.length === 0) {
      return fallback;
    }

    const firstImage = images[0];

    // ✅ OBJECT CASE
    if (typeof firstImage === "object" && firstImage.path) {
      return `https://lightblue-moose-690494.hostingersite.com/public/${firstImage.path}`;
    }

    // ✅ STRING CASE
    if (typeof firstImage === "string") {
      return `https://lightblue-moose-690494.hostingersite.com/public/${firstImage}`;
    }

    return fallback;
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">

      {/* IMAGE */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={getImage()}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          onError={(e) => {
            e.target.src =
              "https://thumbs.dreamstime.com/b/dummy-neighbor-chat-23372551.jpg";
          }}
        />

        {/* TOP BADGE */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="text-[11px] px-3 py-1 rounded-full bg-black/70 text-white backdrop-blur">
            {item.property_type?.name || "Property"}
          </span>

          <span className="text-[11px] px-3 py-1 rounded-full bg-sky-500/90 text-white">
            {item.total_space_available || 0} Sqft
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-3">

        {/* TITLE */}
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-sky-500 transition line-clamp-1">
          {item.title}
        </h3>

        {/* LOCATION */}
        <p className="text-sm text-gray-500 flex items-center gap-1">
          📍 {item.location || "Location not available"}
        </p>

        {/* DESCRIPTION */}
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm text-gray-500 leading-relaxed flex-1">
            {expanded ? stripHtml(item.description) : stripHtml(item.description).slice(0, 80) + "..."}
          </p>

          <button onClick={() => setExpanded(!expanded)} className="text-sky-500 text-sm font-medium hover:underline whitespace-nowrap" >
            {expanded ? "Less" : "Read More"}
          </button>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between pt-3 border-t">

          {/* PRICE */}
          <div className="text-gray-900 font-bold text-sm">
            {(() => {
              const type = item.property_type?.name?.toLowerCase();

              const price = type == "lease" ? item.monthly_rent : item.sale_price;

              return price ? `₹ ${price}` : "Price on Request";
            })()}
          </div>

          {/* BUTTON */}
          <button onClick={() => navigate(`/property/${item._id || item.id}`)}
            className="px-3 py-1.5 text-xs bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition shadow-sm hover:shadow-md">
            View Details
          </button>
        </div>

      </div>
    </div>
  );
};

export default PropertyCard;