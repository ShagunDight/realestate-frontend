import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

const AgentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [agent, setAgent] = useState(null);
  const [page, setPage] = useState(1);

  const limit = 12;

  useEffect(() => {
    fetch(`https://lightblue-moose-690494.hostingersite.com/api/agent/profile/${id}`)
      .then((res) => res.json())
      .then((data) => setAgent(data.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!agent) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading agent profile...
      </p>
    );
  }

  const properties = agent.properties || [];
  const totalPages = Math.ceil(properties.length / limit);

  const paginated = properties.slice(
    (page - 1) * limit,
    page * limit
  );

  const detail = agent.agent_detail || {};

  return (
    <>
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-10">

      {/* ================= TOP PROFILE ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT PROFILE */}
        <div className="bg-white p-8 rounded-3xl shadow border text-center">

          <img
            src={
              agent.img
                ? `https://lightblue-moose-690494.hostingersite.com/public${agent.img}`
                : "https://via.placeholder.com/150"
            }
            className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-sky-500"
          />

          <h2 className="text-2xl font-bold mt-4">{agent.name}</h2>
          <p className="text-gray-500">{detail.designation}</p>

          <div className="mt-4 flex flex-col items-center gap-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-200">
              <span className="text-sky-600 text-sm font-semibold">
                Experience
              </span>

              <span className="text-gray-800 font-bold">
                {detail.experience || "N/A"}
              </span>
            </div>

            {/* Optional highlight line */}
            <p className="text-xs text-gray-400">
              Real Estate Professional
            </p>

          </div>
        </div>

        {/* RIGHT INFO */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow border space-y-5">

          <h3 className="text-xl font-bold">Contact Information</h3>

          <div className="grid md:grid-cols-2 gap-5 text-gray-700">

            <p className="flex items-center gap-2">
              <FaPhone className="text-sky-500" /> {agent.phone}
            </p>

            <p className="flex items-center gap-2">
              <FaEnvelope className="text-sky-500" /> {agent.email}
            </p>

            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-sky-500" /> {detail.city}, {detail.country}
            </p>

            <p className="flex items-center gap-2">
              <FaWhatsapp className="text-green-500" /> {detail.whatsapp}
            </p>

          </div>

          {/* SOCIAL */}
          <div className="flex gap-4 pt-4">

            {detail.facebook && (
              <a href={detail.facebook} target="_blank">
                <FaFacebook className="text-blue-600 text-xl" />
              </a>
            )}

            {detail.instagram && (
              <a href={detail.instagram} target="_blank">
                <FaInstagram className="text-pink-500 text-xl" />
              </a>
            )}

            {detail.linkedin && (
              <a href={detail.linkedin} target="_blank">
                <FaLinkedin className="text-blue-700 text-xl" />
              </a>
            )}

            {detail.youtube && (
              <a href={detail.youtube} target="_blank">
                <FaYoutube className="text-red-600 text-xl" />
              </a>
            )}

          </div>

          {/* BIO */}
          <p className="text-gray-600 pt-3 border-t">
            {detail.bio}
          </p>

        </div>
      </div>

      {/* ================= PROPERTIES ================= */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          Properties by Agent
        </h2>

        {paginated.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {paginated.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border shadow hover:shadow-xl transition overflow-hidden"
              >

                {/* IMAGE */}
                <img
                  src={
                    item.image?.length
                      ? `https://lightblue-moose-690494.hostingersite.com/public/${item.image[0]?.path}`
                      : "https://thumbs.dreamstime.com/b/dummy-neighbor-chat-23372551.jpg"
                  }
                  className="h-48 w-full object-cover"
                />

                {/* CONTENT */}
                <div className="p-4">

                  <h3 className="font-semibold line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    📍 {item.location}
                  </p>

                  <div className="flex justify-between items-center mt-3">

                    <p className="font-bold text-gray-800">
                      ₹ {item.sale_price || item.monthly_rent}
                    </p>

                    <button
                      onClick={() =>
                        navigate(`/property/${item.id}`)
                      }
                      className="px-3 py-1 bg-sky-500 text-white rounded-lg text-xs"
                    >
                      View
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

        {/* ================= PAGINATION ================= */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-8">

            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded-lg"
            >
              Prev
            </button>

            <span className="px-4 py-2">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 border rounded-lg"
            >
              Next
            </button>

          </div>
        )}
      </div>

      </div>
      <Footer />
      </>
  );
};

export default AgentProfile;