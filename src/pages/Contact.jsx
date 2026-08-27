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
  FaArrowRight,
  FaBuilding,
  FaCheckCircle,
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
    location: "",
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
      const res = await fetch(
        "https://lightblue-moose-690494.hostingersite.com/api/information"
      );

      const data = await res.json();
      setOffices(data);
    } catch (err) {
      console.log(err);
    }
  };

  const officeImages =
    offices
      ?.filter((o) => o?.images?.length > 0)
      .map((o) => o.images[0]) || [];

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

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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

  // =========================
  // SOCIAL ICON
  // =========================
  const getSocialIcon = (key) => {
    switch (key.toLowerCase()) {
      case "instagram":
        return FaInstagram;
      case "facebook":
        return FaFacebookF;
      case "linkedin":
        return FaLinkedinIn;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="bg-white text-gray-800 overflow-hidden">
        {/* =========================================================
            HERO SECTION
        ========================================================= */}
        <section className="relative bg-sky-50 border-b border-sky-100">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-sky-100/50 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 md:py-20">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-white border border-sky-100 rounded-full px-4 py-2 mb-5 shadow-sm">
                <span className="flex gap-1 text-sky-500 text-xs">
                  <span>✦</span>
                  <span>✦</span>
                  <span>✦</span>
                </span>

                <span className="text-xs font-medium text-sky-600">
                  Contact Estatein
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-sky-600 leading-[1.08] mb-6">
                Let's Find Your
                <span className="block text-gray-900 mt-2">
                  Perfect Property Together
                </span>
              </h1>

              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-7 max-w-3xl">
                Welcome to Estatein's Contact Us page. Whether you're looking
                to buy or sell a property, explore investment opportunities,
                or simply want to connect, our team is here to help you every
                step of the way.
              </p>

              {/* QUICK INFO */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-9 max-w-3xl">
                <div className="bg-white/80 backdrop-blur border border-sky-100 rounded-xl px-4 py-4 shadow-sm">
                  <div className="text-sky-500 text-xl mb-2">
                    <FaBuilding />
                  </div>
                  <p className="text-xs text-gray-500">Professional</p>
                  <p className="text-sm font-semibold text-gray-800 mt-1">
                    Real Estate Team
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur border border-sky-100 rounded-xl px-4 py-4 shadow-sm">
                  <div className="text-sky-500 text-xl mb-2">
                    <FaPhone />
                  </div>
                  <p className="text-xs text-gray-500">Support</p>
                  <p className="text-sm font-semibold text-gray-800 mt-1">
                    Ready to Help
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur border border-sky-100 rounded-xl px-4 py-4 shadow-sm">
                  <div className="text-sky-500 text-xl mb-2">
                    <FaEnvelope />
                  </div>
                  <p className="text-xs text-gray-500">Response</p>
                  <p className="text-sm font-semibold text-gray-800 mt-1">
                    Quick & Reliable
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            OFFICE LOCATIONS
        ========================================================= */}
        <section className="py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            {/* SECTION HEADER */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
              <div>
                <div className="flex items-center gap-2 text-sky-500 text-xs mb-3">
                  <span>✦</span>
                  <span>✦</span>
                  <span>✦</span>
                  <span className="text-gray-400 ml-1">
                    OUR LOCATIONS
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Discover Our{" "}
                  <span className="text-sky-600">Office Locations</span>
                </h2>
              </div>

              <p className="text-sm text-gray-500 max-w-md leading-6 md:text-right">
                Visit one of our offices and connect directly with our
                experienced real estate professionals.
              </p>
            </div>

            {/* OFFICE CARDS */}
            <div className="space-y-6">
              {offices.length > 0 ? (
                offices.map((item, i) => {
                  const socialLinks = Object.entries(
                    item.social_links || {}
                  ).filter(([, url]) => url?.trim());

                  const mapQuery = encodeURIComponent(
                    item.location || item.address || ""
                  );

                  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

                  return (
                    <div
                      key={i}
                      className="group relative bg-white border border-sky-100 rounded-3xl p-5 sm:p-7 md:p-8 hover:border-sky-200 hover:shadow-[0_20px_50px_rgba(14,165,233,0.10)] transition-all duration-300"
                    >
                      {/* TOP */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 shrink-0 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center">
                            <FaBuilding className="text-sky-500 text-lg" />
                          </div>

                          <div>
                            <span className="inline-flex bg-sky-50 text-sky-600 border border-sky-100 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide">
                              {item.location_type || "Office"}
                            </span>

                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-3">
                              {item.address || "Estatein Office"}
                            </h3>
                          </div>
                        </div>

                        {/* SOCIAL */}
                        {socialLinks.length > 0 && (
                          <div className="flex items-center gap-2">
                            {socialLinks.map(([key, url], idx) => {
                              const Icon = getSocialIcon(key);

                              if (!Icon) return null;

                              return (
                                <a
                                  key={idx}
                                  href={
                                    url.startsWith("http")
                                      ? url
                                      : `https://${url}`
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={key}
                                  className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center hover:bg-sky-500 hover:border-sky-500 transition-all duration-300 group/social"
                                >
                                  <Icon className="text-sky-600 group-hover/social:text-white transition-colors" />
                                </a>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* DESCRIPTION */}
                      <p className="text-sm text-gray-500 leading-6 max-w-4xl mt-5">
                        {item.short_description ||
                          "Our team is available to assist you with your real estate requirements and answer any questions you may have."}
                      </p>

                      {/* CONTACT DETAILS */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-7">
                        <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                          <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0">
                            <FaEnvelope className="text-sky-500 text-sm" />
                          </div>

                          <div className="min-w-0">
                            <p className="text-[10px] uppercase tracking-wide text-gray-400">
                              Email
                            </p>
                            <p className="text-sm text-gray-700 truncate mt-0.5">
                              {item.email || "Not available"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                          <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0">
                            <FaPhone className="text-sky-500 text-sm" />
                          </div>

                          <div>
                            <p className="text-[10px] uppercase tracking-wide text-gray-400">
                              Phone
                            </p>
                            <p className="text-sm text-gray-700 mt-0.5">
                              {item.phone || "Not available"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 sm:col-span-2 lg:col-span-1">
                          <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0">
                            <FaMapMarkerAlt className="text-sky-500 text-sm" />
                          </div>

                          <div className="min-w-0">
                            <p className="text-[10px] uppercase tracking-wide text-gray-400">
                              Location
                            </p>
                            <p className="text-sm text-gray-700 truncate mt-0.5">
                              {item.location || item.address || "Not available"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* ACTION */}
                      <div className="flex justify-start sm:justify-end mt-6">
                        <a
                          href={mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-sm hover:shadow-lg hover:shadow-sky-200 transition-all duration-300"
                        >
                          Get Directions
                          <FaArrowRight className="text-xs" />
                        </a>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="border border-sky-100 rounded-3xl py-14 text-center bg-sky-50/40">
                  <FaBuilding className="mx-auto text-3xl text-sky-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Office information unavailable
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Please check back shortly for our office locations.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =========================================================
            CONNECT / FORM
        ========================================================= */}
        <section className="py-6 md:py-10">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="relative overflow-hidden border border-sky-100 rounded-3xl bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              {/* DECORATION */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-100/60 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-sky-50 rounded-full blur-3xl pointer-events-none" />

              <div className="relative p-5 sm:p-8 md:p-12">
                {/* HEADER */}
                <div className="max-w-3xl mb-9">
                  <div className="flex items-center gap-2 text-sky-500 text-xs mb-3">
                    <span>✦</span>
                    <span>✦</span>
                    <span>✦</span>
                    <span className="text-gray-400 ml-1">
                      SEND AN INQUIRY
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Let&apos;s{" "}
                    <span className="text-sky-600">Connect</span>
                  </h2>

                  <p className="text-sm md:text-base text-gray-500 leading-6 mt-3">
                    Tell us what you're looking for and our team will help you
                    find the right real estate opportunity.
                  </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* FIRST NAME */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-2">
                        First Name
                      </label>

                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="Enter First Name"
                        required
                        className="w-full h-12 border border-gray-200 bg-gray-50/60 rounded-xl px-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-400 focus:bg-white transition-all"
                      />
                    </div>

                    {/* LAST NAME */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-2">
                        Last Name
                      </label>

                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="Enter Last Name"
                        required
                        className="w-full h-12 border border-gray-200 bg-gray-50/60 rounded-xl px-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-400 focus:bg-white transition-all"
                      />
                    </div>

                    {/* EMAIL */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-2">
                        Email Address
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your Email"
                        required
                        className="w-full h-12 border border-gray-200 bg-gray-50/60 rounded-xl px-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-400 focus:bg-white transition-all"
                      />
                    </div>

                    {/* PHONE */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-2">
                        Phone Number
                      </label>

                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter Phone Number"
                        required
                        className="w-full h-12 border border-gray-200 bg-gray-50/60 rounded-xl px-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-400 focus:bg-white transition-all"
                      />
                    </div>

                    {/* LOCATION */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-2">
                        Preferred Location
                      </label>

                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Enter Location"
                        className="w-full h-12 border border-gray-200 bg-gray-50/60 rounded-xl px-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-400 focus:bg-white transition-all"
                      />
                    </div>

                    {/* PROPERTY TYPE */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-2">
                        Property Type
                      </label>

                      <select
                        name="property_type_id"
                        value={formData.property_type_id}
                        onChange={handleChange}
                        required
                        className="w-full h-12 border border-gray-200 bg-gray-50/60 rounded-xl px-4 text-sm text-gray-700 focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-400 focus:bg-white transition-all"
                      >
                        <option value="">Select Property Type</option>

                        {propertyTypes.map((type) => (
                          <option
                            key={type._id || type.id}
                            value={type._id || type.id}
                          >
                            {type.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* BUDGET */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-2">
                        Budget Range
                      </label>

                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                        className="w-full h-12 border border-gray-200 bg-gray-50/60 rounded-xl px-4 text-sm text-gray-700 focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-400 focus:bg-white transition-all"
                      >
                        <option value="">Select Budget</option>
                        <option value="0-500000">Below ₹5 Lac</option>
                        <option value="500000-1000000">
                          ₹5 Lac - ₹10 Lac
                        </option>
                        <option value="1000000-5000000">
                          ₹10 Lac - ₹50 Lac
                        </option>
                        <option value="5000000-10000000">
                          ₹50 Lac - ₹1 Cr
                        </option>
                        <option value="10000000+">Above ₹1 Cr</option>
                      </select>
                    </div>

                    {/* INQUIRY */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-2">
                        Inquiry Type
                      </label>

                      <select
                        name="inquiry_type"
                        value={formData.inquiry_type}
                        onChange={handleChange}
                        required
                        className="w-full h-12 border border-gray-200 bg-gray-50/60 rounded-xl px-4 text-sm text-gray-700 focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-400 focus:bg-white transition-all"
                      >
                        <option value="">Select Inquiry Type</option>
                        <option value="buy">Buy Property</option>
                        <option value="rent">Rent Property</option>
                        <option value="investment">Investment</option>
                        <option value="commercial">
                          Commercial Inquiry
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* MESSAGE */}
                  <div className="mt-5">
                    <label className="block text-xs font-semibold text-gray-600 mb-2">
                      Message
                    </label>

                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about what you're looking for..."
                      rows="6"
                      required
                      className="w-full border border-gray-200 bg-gray-50/60 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-400 focus:bg-white transition-all"
                    />
                  </div>

                  {/* FORM FOOTER */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mt-6 pt-6 border-t border-gray-100">
                    <label className="flex items-start gap-3 text-xs text-gray-500 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agree"
                        checked={formData.agree}
                        onChange={handleChange}
                        className="mt-0.5 w-4 h-4 accent-sky-500 cursor-pointer"
                      />

                      <span className="leading-5">
                        I agree with the Terms of Use and Privacy Policy
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full lg:w-auto inline-flex items-center justify-center gap-3 bg-sky-500 hover:bg-sky-600 text-white px-7 py-3.5 rounded-xl text-sm font-semibold shadow-lg shadow-sky-100 hover:shadow-sky-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Sending..." : "Send Your Message"}

                      {!loading && <FaArrowRight className="text-xs" />}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            OFFICE GALLERY
        ========================================================= */}
        <section className="py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="border border-sky-100 rounded-3xl p-5 sm:p-7 md:p-10 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
              {/* HEADER */}
              <div className="text-center max-w-2xl mx-auto mb-9">
                <div className="flex justify-center items-center gap-2 text-sky-500 text-xs mb-3">
                  <span>✦</span>
                  <span>✦</span>
                  <span>✦</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Explore Estatein&apos;s{" "}
                  <span className="text-sky-600">World</span>
                </h3>

                <p className="text-gray-500 text-sm md:text-base leading-6 mt-3">
                  Step inside the world of Estatein, where professionalism
                  meets warmth and expertise meets passion.
                </p>
              </div>

              {/* GALLERY GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* MAIN IMAGE */}
                <div className="lg:col-span-2 relative w-full h-[280px] sm:h-[360px] md:h-[430px] rounded-3xl overflow-hidden bg-gray-100 shadow-xl group">
                  <img
                    src={
                      officeImages.length
                        ? officeImages[currentOfficeImage]
                        : "https://thumbs.dreamstime.com/b/dummy-neighbor-chat-23372551.jpg"
                    }
                    alt="Estatein Office"
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  {/* GRADIENT */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

                  {/* LABEL */}
                  <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md border border-white/40 px-4 py-2 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                    Office Gallery
                  </div>

                  {/* COUNTER */}
                  {officeImages.length > 1 && (
                    <div className="absolute top-5 right-5 bg-black/45 backdrop-blur-md text-white text-xs font-semibold px-3 py-2 rounded-full">
                      {currentOfficeImage + 1} / {officeImages.length}
                    </div>
                  )}

                  {/* LEFT ARROW */}
                  {officeImages.length > 1 && (
                    <button
                      type="button"
                      aria-label="Previous office image"
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 hover:bg-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                      onClick={() =>
                        setCurrentOfficeImage(
                          currentOfficeImage === 0
                            ? officeImages.length - 1
                            : currentOfficeImage - 1
                        )
                      }
                    >
                      <IoIosArrowBack size={20} />
                    </button>
                  )}

                  {/* RIGHT ARROW */}
                  {officeImages.length > 1 && (
                    <button
                      type="button"
                      aria-label="Next office image"
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 hover:bg-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                      onClick={() =>
                        setCurrentOfficeImage(
                          currentOfficeImage === officeImages.length - 1
                            ? 0
                            : currentOfficeImage + 1
                        )
                      }
                    >
                      <IoIosArrowForward size={20} />
                    </button>
                  )}

                  {/* THUMBNAILS */}
                  {officeImages.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-[90%] overflow-x-auto">
                      <div className="flex gap-2 bg-black/35 backdrop-blur-md p-2 rounded-2xl">
                        {officeImages.map((img, idx) => (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => setCurrentOfficeImage(idx)}
                            className={`shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                              idx === currentOfficeImage
                                ? "border-white scale-105"
                                : "border-transparent opacity-65 hover:opacity-100"
                            }`}
                          >
                            <img
                              src={img}
                              alt={`Office ${idx + 1}`}
                              className="w-12 h-12 sm:w-14 sm:h-14 object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT CONTENT */}
                <div className="bg-sky-50 border border-sky-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-center">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                    <FaBuilding className="text-sky-500 text-xl" />
                  </div>

                  <h4 className="text-xl font-bold text-gray-900">
                    Our Workspace & Team
                  </h4>

                  <p className="text-sm text-gray-600 leading-6 mt-4">
                    Explore our professional environment where creativity and
                    expertise come together to deliver an exceptional real
                    estate experience.
                  </p>

                  {/* HIGHLIGHTS */}
                  <div className="space-y-4 mt-7">
                    <div className="flex items-center gap-3">
                      <FaCheckCircle className="text-sky-500 shrink-0" />
                      <span className="text-sm text-gray-700">
                        Modern Office Setup
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <FaCheckCircle className="text-sky-500 shrink-0" />
                      <span className="text-sm text-gray-700">
                        Professional Team
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <FaCheckCircle className="text-sky-500 shrink-0" />
                      <span className="text-sm text-gray-700">
                        Client-Friendly Environment
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <FaCheckCircle className="text-sky-500 shrink-0" />
                      <span className="text-sm text-gray-700">
                        Trusted Real Estate Guidance
                      </span>
                    </div>
                  </div>

                  {/* SMALL CTA */}
                  <div className="mt-8 pt-6 border-t border-sky-200">
                    <p className="text-xs text-gray-500 leading-5">
                      Have a property requirement? Our team is ready to turn
                      your vision into reality.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default ContactUs;