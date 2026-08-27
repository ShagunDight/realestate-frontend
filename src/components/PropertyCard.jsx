import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import {
  FiArrowUpRight,
  FiMapPin,
} from "react-icons/fi";
import { useWishlist } from "./WishlistContext";

const PropertyCard = ({
  item,
  setShowLogin,
}) => {
  const navigate = useNavigate();

  const {
    toggleWishlist,
    isWished,
  } = useWishlist();

  const stripHtml = (html) => {
    const div =
      document.createElement("div");

    div.innerHTML = html || "";

    return (
      div.textContent ||
      div.innerText ||
      ""
    );
  };

  const propertyId =
    item._id || item.id;

  const isLoggedIn = !!localStorage.getItem(
    "customer_token"
  );

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

    if (
      !Array.isArray(images) ||
      images.length === 0
    ) {
      return fallback;
    }

    const firstImage = images[0];

    if (
      typeof firstImage === "object" &&
      firstImage.path
    ) {
      return `https://lightblue-moose-690494.hostingersite.com/public/${firstImage.path}`;
    }

    if (
      typeof firstImage === "string"
    ) {
      return `https://lightblue-moose-690494.hostingersite.com/public/${firstImage}`;
    }

    return fallback;
  };

  const statusStyles = {
    active:
      "bg-green-500/90 text-white border-green-300/30",
    sold:
      "bg-red-500/90 text-white border-red-300/30",
    pending:
      "bg-yellow-500/90 text-white border-yellow-300/30",
  };

  const statusLabel =
    item.status === "active"
      ? "Active"
      : item.status === "sold"
      ? "Sold"
      : item.status === "pending"
      ? "Pending"
      : "Unknown";

  const price =
    item.sale_price;

  return (
    <article
      onClick={() =>
        navigate(
          `/property/${propertyId}`
        )
      }
      className="
        group
        cursor-pointer
        overflow-hidden
        rounded-[24px]
        border
        border-gray-100
        bg-white
        shadow-[0_8px_28px_rgba(15,23,42,0.06)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-sky-100
        hover:shadow-[0_18px_45px_rgba(14,165,233,0.12)]
      "
    >
      {/* =====================================================
          IMAGE
      ====================================================== */}

      <div className="relative h-[220px] overflow-hidden bg-gray-100 sm:h-[230px]">
        <img
          src={getImage()}
          alt={
            item.title ||
            "Property"
          }
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.045]
          "
        />

        {/* IMAGE OVERLAY */}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />

        {/* STATUS */}

        <div className="absolute left-3 top-3">
          <span
            className={`
              inline-flex
              items-center
              gap-1.5
              rounded-full
              border
              px-3
              py-1.5
              text-[10px]
              font-bold
              uppercase
              tracking-wide
              shadow-md
              backdrop-blur-md
              ${
                statusStyles[
                  item.status
                ] ||
                "bg-gray-700/90 text-white border-white/20"
              }
            `}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/90" />

            {statusLabel}
          </span>
        </div>

        {/* WISHLIST */}

        <button
          type="button"
          aria-label={
            isWished(propertyId)
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          onClick={(e) => {
            e.stopPropagation();
            handleWishlistClick();
          }}
          className="
            absolute
            right-3
            top-3
            z-10
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/60
            bg-white/90
            text-gray-500
            shadow-lg
            backdrop-blur-md
            transition-all
            duration-300
            hover:scale-105
            hover:bg-white
          "
        >
          {isWished(propertyId) ? (
            <FaHeart className="text-red-500" size={15} />
          ) : (
            <FaRegHeart
              className="text-gray-500"
              size={15}
            />
          )}
        </button>

        {/* PROPERTY TYPE */}

        {item.property_type?.name && (
          <div className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wide text-white backdrop-blur-md">
            {item.property_type.name}
          </div>
        )}

        {/* QUICK ARROW */}

        <div
          className="
            absolute
            bottom-3
            right-3
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
            shadow-md
            backdrop-blur-md
            transition-all
            duration-300
            group-hover:bg-sky-500
            group-hover:text-white
          "
        >
          <FiArrowUpRight
            size={16}
          />
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="p-4 sm:p-5">

        {/* TITLE */}

        <div className="flex items-start justify-between gap-3">
          <h3
            className="
              line-clamp-1
              text-base
              font-bold
              leading-6
              tracking-tight
              text-gray-900
              transition-colors
              duration-200
              group-hover:text-sky-600
              sm:text-[17px]
            "
          >
            {item.title ||
              "Beautiful Property"}
          </h3>
        </div>

        {/* LOCATION */}

        <div className="mt-2 flex items-center gap-1.5">
          <FiMapPin
            size={13}
            className="shrink-0 text-sky-500"
          />

          <p className="truncate text-xs font-medium text-gray-500">
            {item.location ||
              "Location not available"}
          </p>
        </div>

        {/* ZIP CODE */}

        {item.zip_code && (
          <div className="mt-2">
            <span
              className="
                inline-flex
                rounded-lg
                border
                border-sky-100
                bg-sky-50
                px-2.5
                py-1
                text-[10px]
                font-semibold
                text-sky-600
              "
            >
              {item.zip_code}
            </span>
          </div>
        )}

        {/* DIVIDER */}

        <div className="my-4 border-t border-gray-100" />

        {/* FOOTER */}

        <div className="flex items-end justify-between gap-3">

          {/* PRICE */}

          <div className="min-w-0">
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-gray-400">
              Price
            </p>

            {price ? (
              <p className="mt-1 truncate text-lg font-extrabold tracking-tight text-gray-900">
                ₹
                {Number(
                  price
                ).toLocaleString(
                  "en-IN"
                )}
              </p>
            ) : (
              <p className="mt-1 text-sm font-bold text-gray-500">
                Price on request
              </p>
            )}
          </div>

          {/* VIEW BUTTON */}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();

              navigate(
                `/property/${propertyId}`
              );
            }}
            className="
              inline-flex
              shrink-0
              items-center
              gap-1.5
              rounded-xl
              bg-sky-50
              px-4
              py-2.5
              text-[11px]
              font-bold
              text-sky-600
              ring-1
              ring-sky-100
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-sky-500
              hover:text-white
              hover:ring-sky-500
              sm:text-xs
            "
          >
            View Details

            <FiArrowUpRight
              size={13}
            />
          </button>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;