import { GoogleMap, Marker, OverlayView } from "@react-google-maps/api";
import { useEffect, useState, useRef } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629,
};

const MapView = ({ properties, location, onBoundsChange }) => {
  const [markers, setMarkers] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const idleTimeout = useRef(null);
  const mapRef = useRef(null);
  const hoverTimeout = useRef(null);
  const leaveTimeout = useRef(null);

  // -------------------------
  // MAP INSTANCE STORE
  // -------------------------
  const onLoad = (map) => {
    mapRef.current = map;

    const isMobile = window.innerWidth < 768;

    map.setZoom(isMobile ? 5 : 6);
  };

  useEffect(() => {
    if (!mapRef.current || !markers.length) return;

    const bounds = new window.google.maps.LatLngBounds();

    markers.forEach((m) => {
      bounds.extend({ lat: m.lat, lng: m.lng });
    });

    mapRef.current.fitBounds(bounds);
  }, [markers]);

  // -------------------------
  // LOCATION → MOVE MAP
  // -------------------------
  useEffect(() => {
    if (!location || !mapRef.current) return;

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address: location }, (results, status) => {
      if (status === "OK" && results[0]) {
        const pos = results[0].geometry.location;

        mapRef.current.panTo({
          lat: pos.lat(),
          lng: pos.lng(),
        });

        mapRef.current.setZoom(12);
      }
    });
  }, [location]);

  // -------------------------
  // MARKERS LOAD
  // -------------------------
  useEffect(() => {
    if (!properties?.length) return;

    const validMarkers = properties.filter((p) => p.latitude && p.longitude).map((p) => {
        return {
          id: p.id,
          title: p.title,
          price: p.monthly_rent,
          image: p.image,
          lat: parseFloat(p.latitude),
          lng: parseFloat(p.longitude),
        };
      });

    setMarkers(validMarkers);
  }, [properties]);

  // -------------------------
  // CLEANUP ON UNMOUNT
  // -------------------------
  useEffect(() => {
    return () => {
      clearTimeout(hoverTimeout.current);
      clearTimeout(leaveTimeout.current);
    };
  }, []);

  const getImage = () => {
    const fallback = "https://thumbs.dreamstime.com/b/dummy-neighbor-chat-23372551.jpg";

    let images = activeMarker.image;

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
    <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={6} onLoad={onLoad} 
      options={{
        gestureHandling: "greedy",
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}

      onIdle={() => {
        if (!mapRef.current) return;

        clearTimeout(idleTimeout.current);

        idleTimeout.current = setTimeout(() => {
          const bounds = mapRef.current.getBounds();
          if (!bounds) return;

          const filtered = properties.filter((p) => {
            if (!p.latitude || !p.longitude) return false;

            const lat = parseFloat(p.latitude);
            const lng = parseFloat(p.longitude);

            return bounds.contains(
              new window.google.maps.LatLng(lat, lng)
            );
          });

          onBoundsChange(filtered);
        }, 300);
      }}>
      
      {/* MARKERS */}
      {markers.map((item) => (
        <Marker key={item.id} position={{ lat: item.lat, lng: item.lng }} 
          onClick={() => {
            setActiveMarker(item);

            if (mapRef.current) {
              mapRef.current.panTo({ lat: item.lat, lng: item.lng });

              if (window.innerWidth < 768) {
                mapRef.current.setZoom(13);
              } else {
                mapRef.current.setZoom(14);
              }
            }
          }}

          onMouseOver={() => {
            if (window.innerWidth < 768) return;

            clearTimeout(leaveTimeout.current);

            hoverTimeout.current = setTimeout(() => {
              setActiveMarker(item);
            }, 1000);
          }}

          onMouseOut={() => {
            if (window.innerWidth < 768) return;

            clearTimeout(hoverTimeout.current);

            leaveTimeout.current = setTimeout(() => {
              setActiveMarker(null);
            }, 1000);
          }}
        />
      ))}

      {/* OVERLAY */}
      {activeMarker && (
        <OverlayView position={{ lat: activeMarker.lat, lng: activeMarker.lng }} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
          <div onMouseEnter={() => clearTimeout(leaveTimeout.current) }
            onMouseLeave={() => {
              leaveTimeout.current = setTimeout(() => {
                setActiveMarker(null);
              }, 1000);
            }}

            style={{
              width: window.innerWidth < 640 ? "220px" : "280px",
              maxWidth: "90vw",
              background: "#fff",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
              fontFamily: "Arial",
              transform: window.innerWidth < 640 ? "translate(-50%, -120%)" : "translate(-50%, -110%)",
            }}>
            
            {/* IMAGE */}
            <div style={{ position: "relative" }}>
              <img src={getImage()} style={{ width: "100%", height: "140px", objectFit: "cover", }}/>
            </div>

            {/* CONTENT */}
            <div style={{ padding: "15px 20px" }}>
              <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "4px", color: "#222", }}>
                {activeMarker.title}
              </div>

              <div style={{ fontSize: "12px", color: "#777", marginBottom: "6px", }}>
                {activeMarker.location || ""}
              </div>
            </div>
          </div>
        </OverlayView>
      )}
    </GoogleMap>
  );
};

export default MapView;