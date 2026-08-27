import {
  GoogleMap,
  Marker,
  OverlayView,
  Polygon,
} from "@react-google-maps/api";

import {
  useEffect,
  useState,
  useRef,
} from "react";

import { useNavigate } from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629,
};

const MapView = ({
  properties,
  location,
  onBoundsChange,
}) => {
  const navigate = useNavigate();

  const [markers, setMarkers] =
    useState([]);

  const [activeMarker, setActiveMarker] =
    useState(null);

  const idleTimeout = useRef(null);
  const mapRef = useRef(null);
  const hoverTimeout = useRef(null);
  const leaveTimeout = useRef(null);

  /* =========================================
     AREA POLYGON
  ========================================= */

  const [areaPolygon, setAreaPolygon] =
    useState([]);

  useEffect(() => {
    if (
      !location ||
      !mapRef.current
    ) {
      return;
    }

    const fetchBoundary =
      async () => {
        try {
          const res =
            await fetch(
              `https://nominatim.openstreetmap.org/search?format=jsonv2&polygon_geojson=1&q=${encodeURIComponent(
                location
              )}`
            );

          const data =
            await res.json();

          if (!data.length) {
            return;
          }

          const geojson =
            data[0].geojson;

          if (
            geojson.type ===
            "Polygon"
          ) {
            const coords =
              geojson.coordinates[0].map(
                (coord) => ({
                  lng: coord[0],
                  lat: coord[1],
                })
              );

            setAreaPolygon(
              coords
            );

            const bounds =
              new window.google.maps.LatLngBounds();

            coords.forEach((p) =>
              bounds.extend(p)
            );

            mapRef.current.fitBounds(
              bounds
            );
          }
        } catch (err) {
          console.error(err);
        }
      };

    fetchBoundary();
  }, [location]);

  /* =========================================
     MAP INSTANCE
  ========================================= */

  const onLoad = (map) => {
    mapRef.current = map;

    const isMobile =
      window.innerWidth < 768;

    map.setZoom(
      isMobile ? 5 : 6
    );
  };

  useEffect(() => {
    if (
      !mapRef.current ||
      !markers.length
    ) {
      return;
    }

    const bounds =
      new window.google.maps.LatLngBounds();

    markers.forEach((m) => {
      bounds.extend({
        lat: m.lat,
        lng: m.lng,
      });
    });

    mapRef.current.fitBounds(
      bounds
    );
  }, [markers]);

  /* =========================================
     LOCATION → MAP
  ========================================= */

  useEffect(() => {
    if (
      !location ||
      !mapRef.current
    ) {
      return;
    }

    const geocoder =
      new window.google.maps.Geocoder();

    geocoder.geocode(
      {
        address: location,
      },
      (results, status) => {
        if (
          status === "OK" &&
          results[0]
        ) {
          const pos =
            results[0]
              .geometry.location;

          mapRef.current.panTo({
            lat: pos.lat(),
            lng: pos.lng(),
          });

          mapRef.current.setZoom(
            8
          );
        }
      }
    );
  }, [location]);

  /* =========================================
     MARKERS LOAD
  ========================================= */

  useEffect(() => {
    if (!properties?.length) {
      setMarkers([]);
      return;
    }

    const validMarkers =
      properties
        .filter(
          (p) =>
            p.latitude &&
            p.longitude
        )
        .map((p) => {
          return {
            id:
              p._id ||
              p.id,

            propertyId:
              p._id ||
              p.id,

            title:
              p.title,

            price:
              p.monthly_rent,

            image:
              p.image,

            location:
              p.location,

            lat:
              parseFloat(
                p.latitude
              ),

            lng:
              parseFloat(
                p.longitude
              ),
          };
        });

    setMarkers(
      validMarkers
    );
  }, [properties]);

  /* =========================================
     CLEANUP
  ========================================= */

  useEffect(() => {
    return () => {
      clearTimeout(
        hoverTimeout.current
      );

      clearTimeout(
        leaveTimeout.current
      );

      clearTimeout(
        idleTimeout.current
      );
    };
  }, []);

  /* =========================================
     IMAGE
  ========================================= */

  const getImage = () => {
    const fallback =
      "https://thumbs.dreamstime.com/b/dummy-neighbor-chat-23372551.jpg";

    if (
      !activeMarker
    ) {
      return fallback;
    }

    let images =
      activeMarker.image;

    if (
      typeof images ===
      "string"
    ) {
      try {
        images =
          JSON.parse(images);
      } catch (e) {
        return fallback;
      }
    }

    if (
      !Array.isArray(images) ||
      images.length === 0
    ) {
      return fallback;
    }

    const firstImage =
      images[0];

    if (
      typeof firstImage ===
        "object" &&
      firstImage.path
    ) {
      return `https://lightblue-moose-690494.hostingersite.com/public/${firstImage.path}`;
    }

    if (
      typeof firstImage ===
      "string"
    ) {
      return `https://lightblue-moose-690494.hostingersite.com/public/${firstImage}`;
    }

    return fallback;
  };

  /* =========================================
     OPEN PROPERTY
  ========================================= */

  const openProperty = () => {
    if (
      !activeMarker?.propertyId
    ) {
      return;
    }

    setActiveMarker(null);

    navigate(
      `/property/${activeMarker.propertyId}`
    );
  };

  return (
    <GoogleMap
      mapContainerStyle={
        containerStyle
      }
      center={defaultCenter}
      zoom={6}
      onLoad={onLoad}
      options={{
        gestureHandling:
          "greedy",
        zoomControl: true,
        streetViewControl:
          false,
        mapTypeControl: false,
        fullscreenControl:
          false,
      }}
      onIdle={() => {
        if (
          !mapRef.current
        ) {
          return;
        }

        clearTimeout(
          idleTimeout.current
        );

        idleTimeout.current =
          setTimeout(() => {
            const bounds =
              mapRef.current.getBounds();

            if (!bounds) {
              return;
            }

            const filtered =
              properties.filter(
                (p) => {
                  if (
                    !p.latitude ||
                    !p.longitude
                  ) {
                    return false;
                  }

                  const lat =
                    parseFloat(
                      p.latitude
                    );

                  const lng =
                    parseFloat(
                      p.longitude
                    );

                  return bounds.contains(
                    new window.google.maps.LatLng(
                      lat,
                      lng
                    )
                  );
                }
              );

            onBoundsChange(
              filtered
            );
          }, 300);
      }}
    >
      {/* =========================================
          AREA POLYGON
      ========================================= */}

      {areaPolygon.length >
        0 && (
        <Polygon
          paths={
            areaPolygon
          }
          options={{
            strokeColor:
              "#ff0000",
            strokeOpacity: 1,
            strokeWeight: 5,
            fillOpacity: 0,
          }}
        />
      )}

      {/* =========================================
          MARKERS
      ========================================= */}

      {markers.map(
        (item) => (
          <Marker
            key={item.id}
            position={{
              lat: item.lat,
              lng: item.lng,
            }}
            onClick={() => {
              setActiveMarker(
                item
              );

              if (
                mapRef.current
              ) {
                mapRef.current.panTo(
                  {
                    lat:
                      item.lat,
                    lng:
                      item.lng,
                  }
                );

                if (
                  window.innerWidth <
                  768
                ) {
                  mapRef.current.setZoom(
                    13
                  );
                } else {
                  mapRef.current.setZoom(
                    10
                  );
                }
              }
            }}
            onMouseOver={() => {
              if (
                window.innerWidth <
                768
              ) {
                return;
              }

              clearTimeout(
                leaveTimeout.current
              );

              hoverTimeout.current =
                setTimeout(() => {
                  setActiveMarker(
                    item
                  );
                }, 1000);
            }}
            onMouseOut={() => {
              if (
                window.innerWidth <
                768
              ) {
                return;
              }

              clearTimeout(
                hoverTimeout.current
              );

              leaveTimeout.current =
                setTimeout(() => {
                  setActiveMarker(
                    null
                  );
                }, 1000);
            }}
          />
        )
      )}

      {/* =========================================
          PROPERTY OVERLAY
      ========================================= */}

      {activeMarker && (
        <OverlayView
          position={{
            lat:
              activeMarker.lat,
            lng:
              activeMarker.lng,
          }}
          mapPaneName={
            OverlayView.OVERLAY_MOUSE_TARGET
          }
        >
          <div
            onMouseEnter={() =>
              clearTimeout(
                leaveTimeout.current
              )
            }
            onMouseLeave={() => {
              leaveTimeout.current =
                setTimeout(() => {
                  setActiveMarker(
                    null
                  );
                }, 1000);
            }}
            style={{
              width:
                window.innerWidth <
                640
                  ? "220px"
                  : "280px",

              maxWidth:
                "90vw",

              background:
                "#fff",

              borderRadius:
                "16px",

              overflow:
                "hidden",

              boxShadow:
                "0 14px 35px rgba(0,0,0,0.22)",

              fontFamily:
                "Arial, sans-serif",

              transform:
                window.innerWidth <
                640
                  ? "translate(-50%, -120%)"
                  : "translate(-50%, -110%)",

              border:
                "1px solid rgba(0,0,0,0.08)",
            }}
          >
            {/* IMAGE */}

            <div
              style={{
                position:
                  "relative",
              }}
            >
              <img
                src={getImage()}
                alt={
                  activeMarker.title ||
                  "Property"
                }
                style={{
                  width:
                    "100%",
                  height:
                    window.innerWidth <
                    640
                      ? "115px"
                      : "140px",
                  objectFit:
                    "cover",
                  display:
                    "block",
                }}
              />

              {/* FEATURED BADGE */}

              <div
                style={{
                  position:
                    "absolute",
                  top:
                    "10px",
                  left:
                    "10px",
                  background:
                    "rgba(14,165,233,0.95)",
                  color:
                    "#fff",
                  padding:
                    "5px 9px",
                  borderRadius:
                    "999px",
                  fontSize:
                    "9px",
                  fontWeight:
                    "700",
                  textTransform:
                    "uppercase",
                  letterSpacing:
                    "0.08em",
                }}
              >
                Property
              </div>
            </div>

            {/* CONTENT */}

            <div
              style={{
                padding:
                  "14px 16px 16px",
              }}
            >
              <div
                style={{
                  fontSize:
                    "15px",
                  fontWeight:
                    "700",
                  marginBottom:
                    "5px",
                  color:
                    "#111827",
                  lineHeight:
                    "1.35",
                }}
              >
                {activeMarker.title ||
                  "Property"}
              </div>

              <div
                style={{
                  fontSize:
                    "12px",
                  color:
                    "#6b7280",
                  marginBottom:
                    "12px",
                  whiteSpace:
                    "nowrap",
                  overflow:
                    "hidden",
                  textOverflow:
                    "ellipsis",
                }}
              >
                📍{" "}
                {activeMarker.location ||
                  "Location not available"}
              </div>

              {/* CLICKABLE PROPERTY LINK */}

              <button
                type="button"
                onClick={
                  openProperty
                }
                style={{
                  width:
                    "100%",
                  border:
                    "none",
                  borderRadius:
                    "10px",
                  padding:
                    "10px 12px",
                  background:
                    "#0ea5e9",
                  color:
                    "#fff",
                  fontSize:
                    "12px",
                  fontWeight:
                    "700",
                  cursor:
                    "pointer",
                  transition:
                    "all 0.2s ease",
                }}
                onMouseEnter={(
                  e
                ) => {
                  e.currentTarget.style.background =
                    "#0284c7";
                }}
                onMouseLeave={(
                  e
                ) => {
                  e.currentTarget.style.background =
                    "#0ea5e9";
                }}
              >
                View Property →
              </button>
            </div>
          </div>
        </OverlayView>
      )}
    </GoogleMap>
  );
};

export default MapView;