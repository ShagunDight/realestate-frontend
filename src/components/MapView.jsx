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

const MapView = ({ properties, location }) => {
  const [markers, setMarkers] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);

  const mapRef = useRef(null);
  const hoverTimeout = useRef(null);
  const leaveTimeout = useRef(null);


  // -------------------------
  // MAP INSTANCE STORE
  // -------------------------
  const onLoad = (map) => {
    mapRef.current = map;
  };


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

    const validMarkers = properties
      .filter((p) => p.latitude && p.longitude)
      .map((p) => {
        let img = "";

        try {
          const parsed = JSON.parse(p.image || "[]");
          img = parsed[0]?.path || "";
        } catch (e) {}

        return {
          id: p.id,
          title: p.title,
          price: p.monthly_rent,
          image: img,
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

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={6}
      onLoad={onLoad}
    >
      {/* MARKERS */}
      {markers.map((item) => (
        <Marker
          key={item.id}
          position={{ lat: item.lat, lng: item.lng }}

          onClick={() => setActiveMarker(item)}

          onMouseOver={() => {
            clearTimeout(leaveTimeout.current);

            hoverTimeout.current = setTimeout(() => {
              setActiveMarker(item);
            }, 1000); // 1 sec delay show
          }}

          onMouseOut={() => {
            clearTimeout(hoverTimeout.current);

            leaveTimeout.current = setTimeout(() => {
              setActiveMarker(null);
            }, 1000); // 1 sec delay hide
          }}
        />
      ))}

      {/* OVERLAY */}
      {activeMarker && (
        <OverlayView
          position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div
            onMouseEnter={() => clearTimeout(leaveTimeout.current) }

            onMouseLeave={() => {
              leaveTimeout.current = setTimeout(() => {
                setActiveMarker(null);
              }, 1000);
            }}

            style={{
              width: "280px",
              background: "#fff",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
              fontFamily: "Arial",
              transform: "translate(-50%, -110%)",
            }}
          >
            {/* IMAGE */}
            <div style={{ position: "relative" }}>
              <img
                src={
                  activeMarker.image
                    ? `https://lightblue-moose-690494.hostingersite.com/public/${activeMarker.image}`
                    : "https://thumbs.dreamstime.com/b/dummy-neighbor-chat-23372551.jpg"
                }
                style={{
                  width: "100%",
                  height: "140px",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* CONTENT */}
            <div style={{ padding: "15px 20px" }}>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "4px",
                  color: "#222",
                }}
              >
                {activeMarker.title}
              </div>

              <div
                style={{
                  fontSize: "12px",
                  color: "#777",
                  marginBottom: "6px",
                }}
              >
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