import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL =
  "https://lightblue-moose-690494.hostingersite.com/api/properties";

const NEARBY_RADIUS_KM = 25;

/*
|--------------------------------------------------------------------------
| Calculate distance between two coordinates
|--------------------------------------------------------------------------
*/

const calculateDistance = (
  userLat,
  userLng,
  propertyLat,
  propertyLng
) => {
  const R = 6371;

  const dLat =
    ((propertyLat - userLat) * Math.PI) / 180;

  const dLng =
    ((propertyLng - userLng) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((userLat * Math.PI) / 180) *
      Math.cos((propertyLat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return R * c;
};

/*
|--------------------------------------------------------------------------
| Fetch all properties
|--------------------------------------------------------------------------
*/

const fetchProperties = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Unable to fetch properties");
  }

  const data = await response.json();

  return (
    data?.data ||
    data?.properties ||
    data ||
    []
  );
};

/*
|--------------------------------------------------------------------------
| Reverse Geocoding
|--------------------------------------------------------------------------
*/

const getLocationDetails = async (
  latitude,
  longitude
) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      return {
        city: "",
        state: "",
        country: "",
      };
    }

    const data = await response.json();

    const address =
      data?.address || {};

    return {
      city:
        address.city ||
        address.town ||
        address.village ||
        address.municipality ||
        "",

      state:
        address.state ||
        "",

      country:
        address.country ||
        "",
    };
  } catch (error) {
    console.error(
      "Reverse geocoding error:",
      error
    );

    return {
      city: "",
      state: "",
      country: "",
    };
  }
};

/*
|--------------------------------------------------------------------------
| Normalize value
|--------------------------------------------------------------------------
*/

const normalize = (value) => {
  return String(value || "")
    .trim()
    .toLowerCase();
};

/*
|--------------------------------------------------------------------------
| Mobile Nearby Properties
|--------------------------------------------------------------------------
*/

const MobileNearbyProperties = () => {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [locationStatus, setLocationStatus] = useState(
    "Finding properties near you..."
  );

  const [showAll, setShowAll] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Load properties
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    loadProperties();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Main location property logic
  |--------------------------------------------------------------------------
  */

  const loadProperties = async () => {
    try {
      setLoading(true);

      setLocationStatus(
        "Finding properties near you..."
      );

      const allProperties =
        await fetchProperties();

      if (!allProperties.length) {
        setProperties([]);

        setLocationStatus(
          "No Properties Available"
        );

        return;
      }

      if (!navigator.geolocation) {
        setProperties(allProperties);

        setLocationStatus(
          "Featured Properties"
        );

        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const userLat =
              position.coords.latitude;

            const userLng =
              position.coords.longitude;

            console.log(
              "USER GPS:",
              userLat,
              userLng
            );

            const location =
              await getLocationDetails(
                userLat,
                userLng
              );

            console.log(
              "USER LOCATION:",
              location
            );

            /*
            |--------------------------------------------------------------------------
            | 1. NEARBY PROPERTIES
            |--------------------------------------------------------------------------
            */

            const nearbyProperties =
              allProperties
                .map((property) => {
                  const propertyLat =
                    parseFloat(
                      property?.latitude
                    );

                  const propertyLng =
                    parseFloat(
                      property?.longitude
                    );

                  if (
                    Number.isNaN(propertyLat) ||
                    Number.isNaN(propertyLng)
                  ) {
                    return null;
                  }

                  const distance =
                    calculateDistance(
                      userLat,
                      userLng,
                      propertyLat,
                      propertyLng
                    );

                  return {
                    ...property,
                    distance,
                  };
                })
                .filter(
                  (property) =>
                    property &&
                    property.distance <=
                      NEARBY_RADIUS_KM
                )
                .sort(
                  (a, b) =>
                    a.distance -
                    b.distance
                );

            if (
              nearbyProperties.length > 0
            ) {
              setProperties(
                nearbyProperties
              );

              setLocationStatus(
                "Properties Near You"
              );

              return;
            }

            /*
            |--------------------------------------------------------------------------
            | 2. CITY
            |--------------------------------------------------------------------------
            */

            if (location.city) {
              const city =
                normalize(location.city);

              const cityProperties =
                allProperties.filter(
                  (property) =>
                    normalize(
                      property?.city
                    ) === city
                );

              if (
                cityProperties.length > 0
              ) {
                setProperties(
                  cityProperties
                );

                setLocationStatus(
                  `Properties in ${location.city}`
                );

                return;
              }
            }

            /*
            |--------------------------------------------------------------------------
            | 3. STATE
            |--------------------------------------------------------------------------
            */

            if (location.state) {
              const state =
                normalize(location.state);

              const stateProperties =
                allProperties.filter(
                  (property) =>
                    normalize(
                      property?.state
                    ) === state
                );

              if (
                stateProperties.length > 0
              ) {
                setProperties(
                  stateProperties
                );

                setLocationStatus(
                  `Properties in ${location.state}`
                );

                return;
              }
            }

            /*
            |--------------------------------------------------------------------------
            | 4. COUNTRY
            |--------------------------------------------------------------------------
            */

            if (location.country) {
              const country =
                normalize(
                  location.country
                );

              const countryProperties =
                allProperties.filter(
                  (property) =>
                    normalize(
                      property?.country
                    ) === country
                );

              if (
                countryProperties.length > 0
              ) {
                setProperties(
                  countryProperties
                );

                setLocationStatus(
                  `Properties in ${location.country}`
                );

                return;
              }
            }

            /*
            |--------------------------------------------------------------------------
            | 5. ALL PROPERTIES
            |--------------------------------------------------------------------------
            */

            setProperties(
              allProperties
            );

            setLocationStatus(
              "Featured Properties"
            );
          } catch (error) {
            console.error(
              "Location processing error:",
              error
            );

            setProperties(
              allProperties
            );

            setLocationStatus(
              "Featured Properties"
            );
          } finally {
            setLoading(false);
          }
        },

        () => {
          setProperties(
            allProperties
          );

          setLocationStatus(
            "Featured Properties"
          );

          setLoading(false);
        },

        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        }
      );
    } catch (error) {
      console.error(
        "Mobile properties error:",
        error
      );

      setProperties([]);

      setLocationStatus(
        "No Properties Available"
      );
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | View All
  |--------------------------------------------------------------------------
  */

  const handleViewAll = async () => {
    if (showAll) {
      loadProperties();
      setShowAll(false);

      return;
    }

    try {
      setLoading(true);

      const allProperties =
        await fetchProperties();

      setProperties(
        allProperties
      );

      setLocationStatus(
        "All Properties"
      );

      setShowAll(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Property Card
  |--------------------------------------------------------------------------
  */

  const MobilePropertyCard = ({
    property,
  }) => {
    const image =
      property?.image?.[0]?.path
        ? `https://lightblue-moose-690494.hostingersite.com/public/${property.image[0].path}`
        : property?.image?.[0]
        ? `https://lightblue-moose-690494.hostingersite.com/public/${property.image[0]}`
        : "https://images.unsplash.com/photo-1564013799919-ab600027ffc6";

    const propertyId =
      property?._id ||
      property?.id;

    const price =
      property?.property_type?.name
        ?.toLowerCase() === "for lease"
        ? property?.monthly_rent
        : property?.sale_price;

    return (
      <article
        className="
          group
          min-w-[292px]
          max-w-[292px]
          overflow-hidden
          rounded-[22px]
          border
          border-gray-100
          bg-white
          shadow-[0_10px_30px_rgba(0,0,0,0.07)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-sky-100
          hover:shadow-[0_18px_40px_rgba(14,165,233,0.12)]
        "
      >
        {/* IMAGE */}
        <div className="relative h-[185px] overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={
              property?.title ||
              "Property"
            }
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-[1.04]
            "
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-80" />

          {/* STATUS */}
          {property?.status && (
            <span
              className="
                absolute
                right-3
                top-3
                rounded-full
                border
                border-white/70
                bg-white/90
                px-3
                py-1.5
                text-[9px]
                font-bold
                uppercase
                tracking-wide
                text-gray-700
                shadow-sm
                backdrop-blur-md
              "
            >
              {property.status}
            </span>
          )}

          {/* PROPERTY TYPE */}
          {property?.property_type?.name && (
            <span
              className="
                absolute
                bottom-3
                left-3
                rounded-full
                bg-sky-500/95
                px-3
                py-1.5
                text-[9px]
                font-semibold
                text-white
                shadow-md
              "
            >
              {property.property_type.name}
            </span>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-4">
          <h3
            className="
              truncate
              text-[15px]
              font-bold
              tracking-tight
              text-gray-900
            "
          >
            {property?.title ||
              "Beautiful Property"}
          </h3>

          <p
            className="
              mt-1.5
              truncate
              text-[11px]
              font-medium
              text-gray-500
            "
          >
            📍{" "}
            {property?.city ||
              property?.location ||
              "Location not available"}
          </p>

          {/* DISTANCE */}
          {property?.distance !==
            undefined && (
            <div className="mt-2 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />

              <p className="text-[10px] font-semibold text-sky-500">
                {property.distance.toFixed(1)} km away
              </p>
            </div>
          )}

          {/* DIVIDER */}
          <div className="my-4 border-t border-gray-100" />

          {/* FOOTER */}
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[9px] font-medium uppercase tracking-wider text-gray-400">
                Price
              </p>

              <p className="mt-0.5 truncate text-sm font-bold text-sky-500">
                {price
                  ? `₹${Number(price).toLocaleString("en-IN")}`
                  : "Price on request"}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/property/${propertyId}`
                )
              }
              className="
                shrink-0
                rounded-xl
                bg-sky-500
                px-4
                py-2.5
                text-[11px]
                font-bold
                text-white
                shadow-[0_7px_18px_rgba(14,165,233,0.20)]
                transition-all
                duration-300
                hover:bg-sky-600
                hover:shadow-[0_9px_22px_rgba(14,165,233,0.28)]
                active:scale-95
              "
            >
              View Property
            </button>
          </div>
        </div>
      </article>
    );
  };

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <section className="px-0 py-7 sm:py-8">

      {/* HEADER */}
      <div
        className="
          mb-5
          flex
          items-end
          justify-between
          gap-4
        "
      >
        <div className="min-w-0">
          <div className="mb-1.5 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />

            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-sky-500">
              Discover
            </p>
          </div>

          <h2
            className="
              truncate
              text-xl
              font-extrabold
              tracking-tight
              text-gray-900
              sm:text-2xl
            "
          >
            {locationStatus}
          </h2>

          <p className="mt-1 text-[11px] leading-5 text-gray-400">
            Handpicked properties based on your location
          </p>
        </div>

        <button
          type="button"
          onClick={handleViewAll}
          className="
            shrink-0
            rounded-xl
            border
            border-sky-100
            bg-sky-50
            px-3.5
            py-2
            text-[10px]
            font-bold
            text-sky-500
            transition-all
            duration-300
            hover:border-sky-200
            hover:bg-sky-100
            active:scale-95
            sm:px-4
            sm:text-xs
          "
        >
          {showAll
            ? "Nearby"
            : "View All"}
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div
          className="
            rounded-[22px]
            border
            border-gray-100
            bg-gray-50/70
            px-5
            py-10
          "
        >
          <div className="flex flex-col items-center justify-center">
            <div
              className="
                h-9
                w-9
                animate-spin
                rounded-full
                border-[3px]
                border-gray-200
                border-t-sky-500
              "
            />

            <p className="mt-3 text-[11px] font-medium text-gray-400">
              Finding properties near you...
            </p>
          </div>
        </div>
      )}

      {/* PROPERTIES */}
      {!loading &&
        properties.length > 0 && (
          <div
            className="
              -mx-4
              flex
              gap-4
              overflow-x-auto
              px-4
              pb-4
              pt-1
              scrollbar-hide
              sm:-mx-6
              sm:px-6
              md:-mx-8
              md:px-8
            "
          >
            {properties.map(
              (property, index) => (
                <MobilePropertyCard
                  key={
                    property?._id ||
                    property?.id ||
                    index
                  }
                  property={
                    property
                  }
                />
              )
            )}
          </div>
        )}

      {/* NO PROPERTIES */}
      {!loading &&
        properties.length === 0 && (
          <div
            className="
              rounded-[22px]
              border
              border-gray-100
              bg-gradient-to-b
              from-gray-50
              to-white
              px-5
              py-10
              text-center
              shadow-sm
            "
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-2xl">
              🏠
            </div>

            <h3 className="mt-4 text-sm font-bold text-gray-800">
              No properties found
            </h3>

            <p className="mx-auto mt-1 max-w-xs text-[11px] leading-5 text-gray-500">
              No properties are currently
              available in your area.
            </p>
          </div>
        )}
    </section>
  );
};

export default MobileNearbyProperties;