import { useEffect, useState } from "react";
import Footer from "../components/Footer";

const ContactUs = () => {

  const [offices, setOffices] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);

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

      const res = await fetch("http://127.0.0.1:8001/api/information");
      const data = await res.json();

      setOffices(data);

    } catch (err) {

      console.log(err);
    }
  };

  // =========================
  // PROPERTY TYPES
  // =========================
  const fetchPropertyTypes = async () => {

    try {

      const res = await fetch(
        "http://127.0.0.1:8001/api/property-types"
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
        "http://127.0.0.1:8001/api/contact-inquiry",
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

        {/* ================= CONTACT CARDS ================= */}
        <div className="px-6 md:px-20 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {offices.map((item, i) => (
              <div key={i} className="contents">
                {/* EMAIL */}
                <div className="bg-white border border-sky-100 rounded-xl p-6 text-center hover:shadow-lg">
                  <a href={`mailto:${item.email}`} className="block">
                    <img src={item.icons?.email} className="w-8 h-8 mx-auto mb-3" />
                    <p className="text-sm text-gray-600">{item.email}</p>
                  </a>
                </div>

                {/* PHONE */}
                <div className="bg-white border border-sky-100 rounded-xl p-6 text-center hover:shadow-lg">
                  <img src={item.icons?.phone} className="w-8 h-8 mx-auto mb-3" />
                  <p className="text-sm text-gray-600">{item.phone}</p>
                </div>

                {/* ADDRESS */}
                <div className="bg-white border border-sky-100 rounded-xl p-6 text-center hover:shadow-lg">
                  <img src={item.icons?.address} className="w-8 h-8 mx-auto mb-3" />
                  <p className="text-sm text-gray-600">{item.address}</p>
                </div>

                {/* SOCIAL */}
                <div className="bg-white border border-sky-100 rounded-xl p-6 text-center hover:shadow-lg">
                  <div className="flex justify-center gap-8">
                    {
                      Object.keys(item.social_links || {}).map((key, idx) => {
                        const url = item.social_links[key]?.trim();

                        return (
                          <a key={idx} href={ url && url.startsWith("http") ? url : `https://${url}` }
                            target="_blank" rel="noopener noreferrer" className="flex flex-col items-center" >
                            <img src={item.icons?.[key]} className="w-6 h-6 mb-2" />
                            <span className="text-xs text-gray-600 capitalize">
                              {key}
                            </span>
                          </a>
                        );
                      })
                    }
                  </div>
                </div>
              </div>
            ))}
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
              {offices.map((item, i) => (
                <div key={i} className=" border border-sky-100 rounded-xl p-6 hover:shadow-lg transition w-full md:w-[1250px] text-left" >

                  {/* LOCATION TYPE */}
                  <p className="text-xs text-gray-400 mb-1"> {item.location_type || "Office"} </p>

                  {/* ADDRESS */}
                  <h3 className="text-lg font-semibold text-sky-500 mb-2"> {item.address} </h3>

                  {/* DESCRIPTION */}
                  <p className="text-sm text-gray-500 mb-4"> {item.short_description || "No description available"} </p>

                  {/* CONTACT INFO  */}
                  <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 text-sm text-gray-600 mt-4">
                    {/* EMAIL */}
                    <div className="flex items-center gap-2 min-w-[150px]">
                      <img src={item.icons?.email} className="w-4 h-4" />
                      <span className="truncate">{item.email}</span>
                    </div>

                    {/* PHONE */}
                    <div className="flex items-center gap-2 min-w-[130px]">
                      <img src={item.icons?.phone} className="w-4 h-4" />
                      <span>{item.phone}</span>
                    </div>

                    {/* LOCATION */}
                    <div className="flex items-center gap-2 min-w-[180px]">
                      <img src={item.icons?.address} className="w-4 h-4" />
                      <span className="truncate"> {item.location || item.address} </span>
                    </div>
                  </div>

                  {/* BUTTON */}
                  <button className="mt-6 bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-md text-sm">
                    Get Direction
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= LET'S CONNECT ================= */}
        <div className="border border-sky-100 rounded-xl p-6 hover:shadow-lg transition w-full md:w-[1250px] mx-auto">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-sky-500 mb-2 text-sm">✦ ✦ ✦</p>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-sky-600">
              Let’s Connect
            </h2>

            <p className="text-gray-500 max-w-3xl mb-10 text-sm">
              We’re excited to connect with you and learn more about your real
              estate goals.
            </p>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="bg-white border border-sky-100 rounded-xl p-6 md:p-10">
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

        <div className=" border border-sky-100 rounded-xl p-6 hover:shadow-lg transition w-full max-w-7xl mx-auto mt-16 mb-16">
          <div className="max-w-6xl mx-auto px-4">
            {/* ROW  */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
              {[0, 1, 4, 5].map((i) =>
                offices[0]?.images?.[i] ? (
                  <div key={i} className="bg-white rounded-xl p-3 flex items-center justify-center" >
                    <img src={offices[0].images[i]} className="w-full h-40 object-contain" />
                  </div>
                ) : null,
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
              {/* IMAGE LEFT */}
              {offices[0]?.images?.[4] && (
                <div className="bg-white rounded-xl p-3 flex items-center justify-center">
                  <img src={offices[0].images[2]} className="w-full h-56 object-contain" />
                  <img src={offices[0].images[5]} className="w-full h-56 object-contain" />
                </div>
              )}

              {/* CONTENT RIGHT */}
              <div className="bg-white border border-sky-100 rounded-xl p-6 flex flex-col justify-center h-full">
                <p className="text-sky-500 text-xs mb-2">✦ ✦ ✦</p>
                <h3 className="text-sky-600 text-xl md:text-2xl font-semibold mb-3">
                  Explore Estatein's World
                </h3>

                <p className="text-gray-500 text-sm">
                  Step inside the world of Estatein, where professionalism meets
                  warmth and expertise meets passion. Our gallery offers a
                  glimpse into our team and workspaces.
                </p>
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