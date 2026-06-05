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

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">

      {/* HEART ICON */}
      <button
        onClick={handleWishlistClick}
        className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm p-2.5 rounded-full shadow-md border border-gray-100 z-20 hover:scale-110 transition"
      >
        {isWished(propertyId) ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="text-gray-500" />
        )}
      </button>

      {/* IMAGE */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={getImage()}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-3">

        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-sky-500 transition line-clamp-1">
          {item.title}
        </h3>

        <div className="flex justify-between items-center mt-3">
          <span className="text-sm text-gray-600">
            {item.location ? item.location.slice(0, 40) + (item.location.length > 40 ? "..." : "") : "Location not available"}
          </span>

          {item.zip_code && (
            <span className="text-xs border border-sky-200 text-sky-600 px-3 py-1 rounded-lg bg-sky-50">
              ZIP: {item.zip_code}
            </span>
          )}
        </div>

        {/* BUTTON */}
        <button
          onClick={() => navigate(`/property/${propertyId}`)}
          className="px-5 py-2.5 bg-sky-500 text-white text-sm font-medium rounded-xl hover:bg-sky-600"
        >
          View Details →
        </button>

      </div>
    </div>
  );
};

export default PropertyCard;