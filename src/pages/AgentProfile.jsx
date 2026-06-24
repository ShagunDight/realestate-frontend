import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaStar, FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube } from "react-icons/fa";

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
  const paginated = properties.slice((page - 1) * limit, page * limit);

  const detail = agent.agent_detail || {};
  const teams = agent.teams || [];

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 text-center lg:sticky lg:top-6">
            <div className="relative inline-block">
              <img className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-sky-500 shadow-lg"
                src={
                  agent.img
                    ? `https://lightblue-moose-690494.hostingersite.com/public${agent.img}`
                    : "https://img.magnific.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg"
                }
              />
              {/* <span className="absolute bottom-2 right-0 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></span> */}
            </div>

            <h2 className="text-2xl font-bold mt-4 text-gray-800">
              {agent.name}
            </h2>

            <p className="text-sky-600 font-medium">
              {detail.designation || "Real Estate Agent"}
            </p>

            <div className="mt-5 space-y-2 text-sm text-gray-600">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-500">Email</span>
                <span>{agent.email}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-500">Phone</span>
                <span>{agent.phone}</span>
              </div>
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium text-gray-500">City</span>
                  <span>{detail.city || "N/A"}</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium text-gray-500">State</span>
                  <span>{detail.state || "N/A"}</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium text-gray-500">Country</span>
                  <span>{detail.country || "N/A"}</span>
                </div>
              </div>
            </div>

            {/* SOCIAL */}
            <div className="flex justify-center gap-4 mt-5 text-xl">
              {detail.facebook && (
                <a href={detail.facebook} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-sky-500 hover:text-white transition-all duration-300">
                  <FaFacebook />
                </a>
              )}

              {detail.instagram && (
                <a href={detail.instagram} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-sky-500 hover:text-white transition-all duration-300">
                  <FaInstagram />
                </a>
              )}

              {detail.linkedin && (
                <a href={detail.linkedin} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-sky-500 hover:text-white transition-all duration-300">
                  <FaLinkedin />
                </a>
              )}

              {detail.youtube && (
                <a href={detail.youtube} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-sky-500 hover:text-white transition-all duration-300">
                  <FaYoutube />
                </a>
              )}
            </div>
          </div> 

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
              <div className="pb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  About Agent
                </h3>
                <hr />
                
                <p className="text-gray-600 leading-7 mb-6">
                  {detail.bio || "Experienced real estate professional helping clients find their dream properties."}
                </p>

                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  {[
                    ["Experience", detail.experience],
                    ["Specialization", detail.specialization],
                    ["Agency", detail.agency],
                    ["License", detail.license],
                    ["Tax Number", detail.tax_number],
                    ["Service Area", detail.service_area],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-gray-50 rounded-xl p-4 border">
                      <p className="text-xs uppercase text-gray-500">
                        {label}
                      </p>

                      <p className="font-semibold mt-1">
                        {value || "N/A"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6 pb-6">
                <a href={`tel:${agent.phone}`} className="flex items-center justify-center gap-2 py-3 border-2 border-sky-500 rounded-2xl text-sky-600 
                  font-semibold bg-sky-50 hover:bg-sky-500 hover:text-white transition-all duration-300">
                  <FaPhone />
                  Call Now
                </a>

                <a href={`https://wa.me/${detail.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-3 border-2 border-green-500
                  rounded-2xl text-green-600 font-semibold bg-green-50 hover:bg-green-500 hover:text-white transition-all duration-300">
                  <FaWhatsapp />
                  WhatsApp
                </a>
              </div>
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">
                  <div className="bg-gradient-to-br from-sky-50 to-white border rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
                    <p className="text-gray-500 text-sm">Total Listings</p>
                    <h3 className="text-3xl font-bold text-sky-600">
                      {properties.length}
                    </h3>
                  </div>

                  <div className="bg-gradient-to-br from-sky-50 to-white border rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
                    <p className="text-gray-500 text-sm">Properties Sold</p>
                    <h3 className="text-3xl font-bold text-sky-600">
                      {properties.filter((item) => item.status === "sold").length}
                    </h3>
                  </div>

                  <div className="bg-gradient-to-br from-sky-50 to-white border rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
                    <p className="text-gray-500 text-sm">Properties Pending</p>
                    <h3 className="text-3xl font-bold text-sky-600">
                      {properties.filter((item) => item.status === "pending").length}
                    </h3>
                  </div>

                  <div className="bg-gradient-to-br from-sky-50 to-white border rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
                    <p className="text-gray-500 text-sm">Active Listings</p>
                    <h3 className="text-3xl font-bold text-sky-600">
                      {properties.filter((item) => item.status === "active").length}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {teams.length > 0 && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Our Teams</h2>

            {teams.map((team) => (
              <div
                key={team.id}
                className="bg-white rounded-3xl shadow-md border overflow-hidden"
              >
                {/* Team Cover */}
                <div className="relative h-72">
                  <img
                    src={`https://lightblue-moose-690494.hostingersite.com/public${team.photo}`}
                    alt={team.name}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <div className="absolute bottom-8 left-8 text-white">
                      <h2 className="text-4xl font-bold">
                        {team.name}
                      </h2>

                      <p className="text-gray-200 mt-2">
                        Professional Real Estate Team
                      </p>

                      <div className="mt-3 inline-flex px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                        {team.team_members?.length} Members
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Members */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-6">
                    Team Members
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {team.team_members?.map((member) => (
                      <div key={member.id}
                        className="bg-white rounded-2xl border border-gray-100 p-5 text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
                      >
                        <img
                          src={`https://lightblue-moose-690494.hostingersite.com/public${member.photo}`}
                          alt={member.name}
                          className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-sky-500 shadow-md"
                        />

                        <h4 className="mt-4 text-lg font-semibold text-gray-800">
                          {member.name}
                        </h4>

                        <span className="inline-block mt-2 px-3 py-1 bg-sky-100 text-sky-700 text-xs rounded-full">
                          {member.profession}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-gray-50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">
              Active Listings
            </h2>

            <span className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm">
              {properties.length} Properties
            </span>
          </div>

          {paginated.length === 0 ? (
            <p className="text-gray-500">No properties found</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {paginated.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <img className="h-52 w-full object-cover"
                    src={
                      item.image?.length ? `https://lightblue-moose-690494.hostingersite.com/public/${item.image[0]?.path}` : "https://thumbs.dreamstime.com/b/dummy-neighbor-chat-23372551.jpg"
                    }
                  />

                  <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
                    <h3 className="font-semibold line-clamp-1">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      📍 {item.location}
                    </p>

                    <div className="flex justify-between items-center mt-3">
                      <p className="text-xl font-bold text-sky-600">
                        ₹ {item.sale_price || item.monthly_rent}
                      </p>

                      <button onClick={() => navigate(`/property/${item.id}`)} className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-sm font-medium">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {[...Array(totalPages)].map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} className={`px-4 py-2 rounded-lg ${page === i + 1 ? "bg-sky-500 text-white" : "bg-gray-100"}`}>
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AgentProfile;