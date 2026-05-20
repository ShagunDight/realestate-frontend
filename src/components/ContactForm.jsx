import React, { useEffect, useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactForm = () => {
  const [types, setTypes] = useState([]);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    location: "",
    type: "",
    budget: "",
    message: "",
  });

  useEffect(() => {
    fetch("https://lightblue-moose-690494.hostingersite.com/api/property-types")
      .then((res) => res.json())
      .then((data) => setTypes(data.data || []));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    o;
  };

  return (
    <section className="bg-sky-50 py-16 px-6">
      <div className="max-w-[1100px] mx-auto bg-white rounded-2xl shadow-xl p-8">
        {/* HEADING */}
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Let’s Make It Happen
        </h2>
        <p className="text-gray-500 mb-8">
          Fill the form and our team will contact you soon.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* ROW 1 */}
          <div className="grid md:grid-cols-4 gap-4">
            <input name="first_name" placeholder="First Name" className="border p-3 rounded-lg focus:ring-2 focus:ring-sky-400" onChange={handleChange}/>
            <input name="last_name" placeholder="Last Name" className="border p-3 rounded-lg focus:ring-2 focus:ring-sky-400" onChange={handleChange}/>
            <input name="email" placeholder="Email" className="border p-3 rounded-lg focus:ring-2 focus:ring-sky-400" onChange={handleChange}/>
            <input name="phone" placeholder="Phone" className="border p-3 rounded-lg focus:ring-2 focus:ring-sky-400" onChange={handleChange}/>
          </div>

          {/* ROW 2 */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-sky-500" />
              <input name="location" placeholder="Location" className="border p-3 pl-10 rounded-lg w-full focus:ring-2 focus:ring-sky-400" onChange={handleChange}/>
            </div>

            <select name="type" className="border p-3 rounded-lg focus:ring-2 focus:ring-sky-400" onChange={handleChange}>
              <option value="">Property Type</option>
              {types.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* CONTACT METHOD */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2 border p-3 rounded-lg w-full">
              <FaPhoneAlt className="text-sky-500" />
              <input placeholder="Enter Phone" className="outline-none w-full"/>
            </div>

            <div className="flex items-center gap-2 border p-3 rounded-lg w-full">
              <FaEnvelope className="text-sky-500" />
              <input placeholder="Enter Email" className="outline-none w-full"/>
            </div>
          </div>

          {/* MESSAGE */}
          <textarea name="message" placeholder="Your Message" className="border p-3 rounded-lg w-full h-28 focus:ring-2 focus:ring-sky-400" onChange={handleChange}/>

          {/* BUTTON */}
          <div className="flex justify-end">
            <button className="bg-sky-500 text-white px-6 py-3 rounded-lg hover:bg-sky-600 transition shadow-lg">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
