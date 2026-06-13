import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "./WishlistContext";

const PropertyCard = ({ item, setShowLogin }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const { toggleWishlist, isWished } = useWishlist();

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html || "";
    return div.textContent || div.innerText || "";
  };
  
  const propertyId = item._id || item.id;

  const isLoggedIn = !!localStorage.getItem("customer_token");

  const handleWishlistClick = () => {
    if (!isLoggedIn) {
      setShowLogin?.(true);
      return;
    }

    toggleWishlist(item);
  };

  const getImage = () => {
    const fallback =
      "https://thumbs.dreamstime.com/b/dummy-neighbor-chat-23372551.jpg";

    let images = item.image;

    if (typeof images === "string") {
      try {
        images = JSON.parse(images);
      } catch {
        return fallback;
      }
    }

    if (!Array.isArray(images) || images.length === 0) {
      return fallback;
    }

    const firstImage = images[0];

    if (typeof firstImage === "object" && firstImage.path) {
      return `https://lightblue-moose-690494.hostingersite.com/public/${firstImage.path}`;
    }

    if (typeof firstImage === "string") {
      return `https://lightblue-moose-690494.hostingersite.com/public/${firstImage}`;
    }

    return fallback;
  };

  const statusStyles = {
    active: "bg-green-100 text-green-700",
    sold: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div onClick={() => navigate(`/property/${propertyId}`)} className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 
      shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">

      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img src={getImage()} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500"/>

        {/* STATUS BADGE */}
        <div className="absolute top-3 left-3">
          <span className={`text-xs px-3 py-1 rounded-full font-semibold shadow-sm backdrop-blur-md ${statusStyles[item.status] || "bg-gray-100 text-gray-600"}`}>
            {item.status === "active"
              ? "Active"
              : item.status === "sold"
              ? "Sold"
              : item.status === "pending"
              ? "Pending"
              : "Unknown"}
          </span>
        </div>

        {/* HEART ICON */}
        <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-2.5 rounded-full shadow-md hover:scale-110 transition z-10"
          onClick={(e) => {
            e.stopPropagation();
            handleWishlistClick();
          }}
        >
          {isWished(propertyId) ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-500" />
          )}
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-3">
        {/* TITLE */}
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-sky-600 transition line-clamp-1">
          {item.title}
        </h3>

        {/* LOCATION */}
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-gray-500 truncate flex-1">
            📍 {item.location || "Location not available"}
          </p>

          {item.zip_code && (
            <span className="text-xs px-2.5 py-1 rounded-lg bg-sky-50 text-sky-600 border border-sky-100 whitespace-nowrap">
              {item.zip_code}
            </span>
          )}
        </div>

        {/* PRICE (optional but recommended) */}
        {item.sale_price && (
          <div className="text-base font-bold text-sky-600">
            ₹{Number(item.sale_price).toLocaleString()}
          </div>
        )}

        {/* BUTTON */}
        <button className="w-full mt-2 px-4 py-2.5 bg-sky-500 text-white text-sm font-medium rounded-xl hover:bg-sky-600 transition"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/property/${propertyId}`);
          }}
        >
          View Details →
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;