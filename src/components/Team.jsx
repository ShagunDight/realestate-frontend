import { useEffect, useState } from "react";

export default function Team() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetch("https://lightblue-moose-690494.hostingersite.com/api/team")
      .then((res) => res.json())
      .then((data) => setTeam(data.data));
  }, []);

  return (
    <div className="mt-28 mb-4 max-w-6xl mx-auto">
      {/* Heading */}
      <div className="mb-12">
        <p className="text-sky-500 text-sm mb-2">✦ ✦ ✦</p>

        <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet the Team</h2>

        <p className="text-gray-500 max-w-xl">
          Get to know the people behind our success.
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        {team.map((member, i) => (
          <div key={i} className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden transition duration-300 hover:-translate-y-2 
            hover:shadow-[0_20px_60px_rgba(59,130,246,0.25),0_10px_30px_rgba(168,85,247,0.15)]">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-sky-400 via-purple-400 to-transparent"></div>

            {/* Image */}
            <div className="w-full h-56 overflow-hidden bg-gray-50 flex items-center justify-center">
              <img src={`https://lightblue-moose-690494.hostingersite.com/public${member.photo}`} alt={member.name} className="w-full h-full object-contain transition duration-300 group-hover:scale-105"/>
            </div>

            {/* Content */}
            <div className="p-5 text-center">
              <div className="flex justify-center -mt-10 mb-3">
                <div className="w-10 h-10 rounded-full bg-white border border-sky-400 flex items-center justify-center text-sky-500 shadow-md">
                  ★
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                {member.name}
              </h3>

              <p className="text-sm text-gray-500">{member.profession}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
