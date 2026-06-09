import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Footer from "../components/Footer";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";

const ContactUs = () => {

  const [offices, setOffices] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [currentOfficeImage, setCurrentOfficeImage] = useState(0);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    property_type_id: "",
    budget: "",
    inquiry_type: "",
    message: "",
    agree: false,
  });

  // =========================
  // FETCH DATA
  // =========================
  useEffect(() => {

    fetchOffices();
    fetchPropertyTypes();

  }, []);

  // =========================
  // OFFICES
  // =========================
  const fetchOffices = async () => {
    try {
      const res = await fetch("https://lightblue-moose-690494.hostingersite.com/api/information");
      const data = await res.json();

      setOffices(data);
    } catch (err) {
      console.log(err);
    }
  };

  const officeImages = offices ?.filter((o) => o?.images?.length > 0).map((o) => o.images[0]) || [];

  // =========================
  // PROPERTY TYPES
  // =========================
  const fetchPropertyTypes = async () => {
    try {
      const res = await fetch(
        "https://lightblue-moose-690494.hostingersite.com/api/property-types"
      );

      const data = await res.json();
      setPropertyTypes(data.data || data);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({...prev, [name]: type === "checkbox" ? checked : value,}));
  };

  // =========================
  // SUBMIT FORM
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("Please accept Terms & Privacy Policy");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "https://lightblue-moose-690494.hostingersite.com/api/contact-inquiry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Inquiry submitted successfully!");
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          location: "",
          property_type_id: "",
          budget: "",
          inquiry_type: "",
          message: "",
          agree: false,
        });
      } else {
        alert(data.message || "Something went wrong");
      }

    } catch (err) {
      console.log(err);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white">
        {/* ================= HEADER ================= */}
        <div className="w-full bg-sky-50  py-10 mb-8">
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <div className="max-w-4xl">
              <p className="text-sky-500 mb-2 text-sm">✦ ✦ ✦ </p>
              <h1 className="text-3xl md:text-5xl font-bold text-sky-500 mb-6 leading-tight">
                Get in Touch with Estatein
              </h1>
              <p className="text-gray-600 text-sm md:text-base mb-8">
                Welcome to Estatein's Contact Us page. We're here to assist you with
                any inquiries, requests, or feedback you may have. Whether you're
                looking to buy or sell a property, explore investment opportunities,
                or simply want to connect, we're just a message away. Reach out to
                us, and let's start a conversation.
              </p>
            </div>
          </div>
        </div>

        {/* ================= OFFICE LOCATIONS ================= */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            {/* TITLE */}
            <h2 className="text-2xl md:text-3xl font-semibold text-sky-600 mb-3">
              ✦ ✦ ✦ Discover Our Office Locations ✦ ✦ ✦
            </h2>

            <p className="text-gray-500 max-w-3xl mx-auto mb-10 text-sm">
              Explore our office locations and connect with our team. We are
              here to assist you.
            </p>

            {/* CARDS */}
            <div className="flex flex-wrap justify-center gap-6">
              {offices.map((item, i) => {

                const socialLinks = Object.entries(item.social_links || {}).filter(
                  ([, url]) => url?.trim()
                );

                // Google Maps link (auto)
                const mapQuery = encodeURIComponent(item.location || item.address || "");
                const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

                return (
                  <div key={i}
                    className="w-full md:w-[1100px] bg-white border border-sky-100 rounded-2xl p-6 md:p-8 hover:shadow-xl transition duration-300 text-left">

                    {/* TOP BADGE */}
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs bg-sky-50 text-sky-600 px-3 py-1 rounded-full">
                        {item.location_type || "Office"}
                      </span>

                      {/* SOCIAL */}
                      {socialLinks.length > 0 && (
                        <div className="flex gap-3">
                          {socialLinks.map(([key, url], idx) => {
                            let Icon = null;

                            switch (key.toLowerCase()) {
                              case "instagram":
                                Icon = FaInstagram;
                                break;
                              case "facebook":
                                Icon = FaFacebookF;
                                break;
                              case "linkedin":
                                Icon = FaLinkedinIn;
                                break;
                              default:
                                return null;
                            }

                            return (
                              <a key={idx} href={url.startsWith("http") ? url : `https://${url}`} target="_blank" rel="noopener noreferrer"
                                className="bg-sky-50 hover:bg-sky-100 p-2 rounded-full transition">
                                <Icon className="text-sky-600 text-lg" />
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* ADDRESS */}
                    <h3 className="text-lg md:text-xl font-semibold text-sky-600 mb-1">
                      {item.address}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="text-sm text-gray-500 mb-5">
                      {item.short_description || "No description available"}
                    </p>

                    {/* CONTACT ROW */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">

                      {/* EMAIL */}
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-sky-500" />
                        <span className="truncate">{item.email}</span>
                      </div>

                      {/* PHONE */}
                      <div className="flex items-center gap-2">
                        <FaPhone className="text-sky-500" />
                        <span>{item.phone}</span>
                      </div>

                      {/* LOCATION */}
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-sky-500" />
                        <span className="truncate">
                          {item.location || item.address}
                        </span>
                      </div>

                    </div>

                    {/* BUTTON */}
                    <div className="mt-6 flex justify-end">
                      <a href={mapUrl} target="_blank" rel="noopener noreferrer"
                        className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg text-sm transition">
                        Get Direction
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= LET'S CONNECT ================= */}
        <div className="border border-sky-100 rounded-xl p-6 hover:shadow-lg transition w-full md:w-[1250px] mx-auto">
          <div className="max-w-7xl mx-auto px-3">
            <p className="text-sky-500 mb-2 text-sm">✦ ✦ ✦</p>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-sky-600">
              Let’s Connect
            </h2>

            <p className="text-gray-500 max-w-3xl mb-10 text-sm">
              We’re excited to connect with you and learn more about your real
              estate goals.
            </p>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="bg-white border border-sky-100 rounded-xl p-4 md:p-10">
              <div className="grid md:grid-cols-3 gap-6">

                {/* FIRST NAME */}
                <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Enter First Name" required
                  className="border border-sky-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-sky-500"/>

                {/* LAST NAME */}
                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Enter Last Name" required
                  className="border border-sky-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-sky-500"/>

                {/* EMAIL */}
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your Email" required
                  className="border border-sky-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-sky-500"/>

                {/* PHONE */}
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter Phone Number" required
                  className="border border-sky-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-sky-500" />
                
                {/* FIRST NAME */}
                <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Enter Location"
                  className="border border-sky-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-sky-500"/>

                {/* PROPERTY TYPE */}
                <select name="property_type_id" value={formData.property_type_id} onChange={handleChange} required
                  className="border border-sky-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-sky-500">

                  <option value="">Select Property Type</option>
                  {propertyTypes.map((type) => (
                    <option key={type._id || type.id} value={type._id || type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>

                {/* BUDGET */}
                <select name="budget" value={formData.budget} onChange={handleChange} required
                  className="border border-sky-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-sky-500">
                  <option value="">Select Budget</option>
                  <option value="0-500000">Below ₹5 Lac</option>
                  <option value="500000-1000000">₹5 Lac - ₹10 Lac</option>
                  <option value="1000000-5000000">₹10 Lac - ₹50 Lac</option>
                  <option value="5000000-10000000">₹50 Lac - ₹1 Cr</option>
                  <option value="10000000+">Above ₹1 Cr</option>
                </select>

                {/* INQUIRY TYPE */}
                <select name="inquiry_type" value={formData.inquiry_type} onChange={handleChange} required
                  className="border border-sky-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-sky-500">
                  <option value="">Select Inquiry Type</option>
                  <option value="buy">Buy Property</option>
                  <option value="rent">Rent Property</option>
                  <option value="investment">Investment</option>
                  <option value="commercial">Commercial Inquiry</option>
                </select>

              </div>

              {/* MESSAGE */}
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Enter your Message here..." rows="5" required
                className="w-full mt-6 border border-sky-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-sky-500"/>

              {/* FOOTER */}
              <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4">
                <label className="flex items-center gap-2 text-xs text-gray-500">
                  <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} className="accent-sky-500" />
                  I agree with Terms of Use and Privacy Policy
                </label>

                <button type="submit" disabled={loading} className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-md text-sm disabled:opacity-50">
                  {loading ? "Sending..." : "Send Your Message"}
                </button>
              </div>

            </form>
          </div>
        </div>

        <div className="border border-sky-100 rounded-2xl p-6 md:p-10 hover:shadow-xl transition w-full max-w-7xl mx-auto mt-16 mb-16 bg-white">
          <div className="max-w-6xl mx-auto space-y-8">

            {/* TITLE */}
            <div className="text-center">
              <p className="text-sky-500 text-xs mb-2">✦ ✦ ✦</p>
              <h3 className="text-sky-600 text-2xl md:text-3xl font-semibold mb-2">
                Explore Estatein's World
              </h3>
              <p className="text-gray-500 text-sm max-w-2xl mx-auto">
                Step inside the world of Estatein, where professionalism meets warmth and expertise meets passion.
              </p>
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* LEFT BIG IMAGE */}
              <div className="lg:col-span-2 relative w-full h-[240px] sm:h-[320px] md:h-[380px] rounded-3xl overflow-hidden shadow-2xl group bg-gray-100">

                {/* MAIN IMAGE */}
                <img alt="Office" className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                  src={
                    officeImages.length
                      ? officeImages[currentOfficeImage]
                      : "https://thumbs.dreamstime.com/b/dummy-neighbor-chat-23372551.jpg"
                  }
                />

                {/* SOFT DARK GRADIENT */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* TOP LABEL */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                  Office Gallery
                </div>

                {/* IMAGE COUNTER */}
                {officeImages.length > 1 && (
                  <div className="absolute top-4 right-4 bg-black/40 text-white text-xs px-3 py-1 rounded-full backdrop-blur">
                    {currentOfficeImage + 1} / {officeImages.length}
                  </div>
                )}

                {/* LEFT BUTTON */}
                {officeImages.length > 1 && (
                  <button className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition hover:scale-110"
                    onClick={() =>
                      setCurrentOfficeImage(
                        currentOfficeImage === 0
                          ? officeImages.length - 1
                          : currentOfficeImage - 1
                      )
                    }
                  >
                    <IoIosArrowBack size={18} />
                  </button>
                )}

                {/* RIGHT BUTTON */}
                {officeImages.length > 1 && (
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition hover:scale-110"
                    onClick={() =>
                      setCurrentOfficeImage(
                        currentOfficeImage === officeImages.length - 1
                          ? 0
                          : currentOfficeImage + 1
                      )
                    }
                  >
                    <IoIosArrowForward size={18} />
                  </button>
                )}

                {/* THUMBNAILS STRIP */}
                {officeImages.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 backdrop-blur px-2 py-1 rounded-xl">
                    {officeImages.map((img, idx) => (
                      <img key={idx} src={img} onClick={() => setCurrentOfficeImage(idx)}
                        className={`w-10 h-10 object-cover rounded-md cursor-pointer border-2 transition ${
                          idx === currentOfficeImage
                            ? "border-white scale-110"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT CONTENT */}
              <div className="w-26 bg-sky-50 rounded-xl p-6 flex flex-col justify-center">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-sky-700">
                    Our Workspace & Team
                  </h4>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    Explore our professional environment where creativity and expertise come together to deliver the best real estate experience.
                  </p>

                  {/* HIGHLIGHTS */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>✔ Modern Office Setup</p>
                    <p>✔ Professional Team</p>
                    <p>✔ Client-Friendly Environment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;