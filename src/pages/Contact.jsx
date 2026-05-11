import { useEffect, useState } from "react";
import Footer from "../components/Footer";

const ContactUs = () => {
  const [offices, setOffices] = useState([]);

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const res = await fetch("https://lightblue-moose-690494.hostingersite.com/api/information");
        const data = await res.json();
        setOffices(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOffices();
  }, []);

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
                    {Object.keys(item.social_links || {}).map((key, idx) => {
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
                    })}
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
              ✦ ✦ ✦ Discover Our Office Locations✦ ✦ ✦
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
        <div className=" border border-sky-100 rounded-xl p-6 hover:shadow-lg transition w-full md:w-[1250px] mx-auto">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-sky-500 mb-2 text-sm">✦ ✦ ✦ </p>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-sky-600 ">
              Let’s Connect
            </h2>

            <p className="text-gray-500 max-w-3xl mb-10 text-sm">
              We’re excited to connect with you and learn more about your real
              estate goals. Use the form below to get in touch with Estatein.
            </p>

            <div className="bg-white border border-sky-100 rounded-xl p-6 md:p-10">
              <div className="grid md:grid-cols-3 gap-6">
                <input type="text" placeholder="Enter First Name"
                  className="border border-sky-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-sky-500" />

                <input type="text" placeholder="Enter Last Name"
                  className="border border-sky-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-sky-500" />

                <input type="email" placeholder="Enter your Email"
                  className="border border-sky-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-sky-500" />

                <input type="text" placeholder="Enter Phone Number"
                  className="border border-sky-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-sky-500" />

                <select className="border border-sky-200 rounded-md px-4 py-3 text-sm text-gray-400">
                  <option>Select Inquiry Type</option>
                </select>

                <select className="border border-sky-200 rounded-md px-4 py-3 text-sm text-gray-400">
                  <option>Select</option>
                </select>
              </div>

              <textarea placeholder="Enter your Message here..." rows="4"
                className="w-full mt-6 border border-sky-200 rounded-md px-4 py-3 text-sm" ></textarea>

              <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4">
                <label className="flex items-center gap-2 text-xs text-gray-500">
                  <input type="checkbox" className="accent-sky-500" />I agree with Terms of Use and Privacy Policy
                </label>

                <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-md text-sm">
                  Send Your Message
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* ================= IMAGE GALLERY SECTION ================= */}
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
