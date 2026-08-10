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

  const [
    properties,
    setProperties
  ] = useState([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    locationStatus,
    setLocationStatus
  ] = useState(
    "Finding properties near you..."
  );

  const [
    showAll,
    setShowAll
  ] = useState(false);


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

      setLocationStatus("Finding properties near you...");

      /*
      |--------------------------------------------------------------------------
      | Get ALL properties
      |--------------------------------------------------------------------------
      */

      const allProperties =
        await fetchProperties();


      if (!allProperties.length) {

        setProperties([]);

        setLocationStatus(
          "No Properties Available"
        );

        return;
      }


      /*
      |--------------------------------------------------------------------------
      | Browser location unavailable
      |--------------------------------------------------------------------------
      */

      if (!navigator.geolocation) {

        setProperties(
          allProperties
        );

        setLocationStatus(
          "Featured Properties"
        );

        return;
      }


      /*
      |--------------------------------------------------------------------------
      | Get current location
      |--------------------------------------------------------------------------
      */

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

            /*
            |--------------------------------------------------------------------------
            | Get city/state/country
            |--------------------------------------------------------------------------
            */

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
            |
            | State optional hai.
            |
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


        /*
        |--------------------------------------------------------------------------
        | Location denied
        |--------------------------------------------------------------------------
        */

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

      <div
        className="
          min-w-[285px]
          max-w-[285px]
          overflow-hidden
          rounded-2xl
          border
          border-gray-100
          bg-white
          shadow-[0_8px_25px_rgba(0,0,0,0.07)]
        "
      >

        {/* IMAGE */}

        <div className="relative h-[175px] w-full">

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
            "
          />


          {/* STATUS */}

          {property?.status && (

            <span
              className="
                absolute
                right-3
                top-3
                rounded-full
                bg-white/90
                px-3
                py-1
                text-[10px]
                font-semibold
                capitalize
                text-gray-700
                backdrop-blur
              "
            >
              {property.status}
            </span>

          )}

        </div>


        {/* CONTENT */}

        <div className="p-4">

          <h3
            className="
              truncate
              text-base
              font-bold
              text-gray-900
            "
          >
            {property?.title ||
              "Beautiful Property"}
          </h3>


          <p
            className="
              mt-1
              truncate
              text-xs
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

            <p
              className="
                mt-1
                text-[11px]
                font-medium
                text-sky-500
              "
            >
              📍{" "}
              {property.distance.toFixed(
                1
              )}{" "}
              km away
            </p>

          )}


          {/* FOOTER */}

          <div
            className="
              mt-4
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-[10px]
                  text-gray-400
                "
              >
                Price
              </p>

              <p
                className="
                  text-sm
                  font-bold
                  text-sky-500
                "
              >
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
                rounded-lg
                bg-sky-500
                px-3
                py-2
                text-xs
                font-semibold
                text-white
                transition
                hover:bg-sky-600
              "
            >
              View
            </button>

          </div>

        </div>

      </div>

    );

  };


  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (

    <section className="px-4 py-7">

      {/* HEADER */}

      <div
        className="
          mb-4
          flex
          items-center
          justify-between
        "
      >

        <div>

          <p
            className="
              text-xs
              font-medium
              text-sky-500
            "
          >
            Discover
          </p>


          <h2
            className="
              mt-1
              text-xl
              font-bold
              text-gray-900
            "
          >
            {locationStatus}
          </h2>

        </div>


        <button
          type="button"
          onClick={handleViewAll}
          className="
            text-xs
            font-semibold
            text-sky-500
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
            flex
            items-center
            justify-center
            py-10
          "
        >

          <div
            className="
              h-7
              w-7
              animate-spin
              rounded-full
              border-2
              border-gray-200
              border-t-sky-500
            "
          />

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
              pb-3
              scrollbar-hide
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
              rounded-2xl
              border
              border-gray-100
              bg-gray-50
              px-5
              py-8
              text-center
            "
          >

            <div className="text-3xl">
              🏠
            </div>


            <h3
              className="
                mt-3
                text-sm
                font-bold
                text-gray-800
              "
            >
              No properties found
            </h3>


            <p
              className="
                mt-1
                text-xs
                leading-5
                text-gray-500
              "
            >
              No properties are currently
              available.
            </p>

          </div>

        )}

    </section>

  );

};

export default MobileNearbyProperties;
