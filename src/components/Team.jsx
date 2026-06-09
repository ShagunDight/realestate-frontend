import { useEffect, useState } from "react";

export default function Team() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetch("https://lightblue-moose-690494.hostingersite.com/api/team")
      .then((res) => res.json())
      .then((data) => setTeam(data.data || []));
  }, []);

  return (
    <div className="mt-20 md:mt-28 mb-10 max-w-6xl mx-auto px-4 sm:px-6">

      {/* Heading */}
      <div className="mb-10 md:mb-12 text-center md:text-left">
        <p className="text-sky-500 text-sm mb-2">
          ✦ ✦ ✦
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
          Meet the Team
        </h2>

        <p className="text-gray-500 max-w-xl mx-auto md:mx-0 text-sm sm:text-base">
          Get to know the people behind our success.
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">

        {team.map((member, i) => (
          <div key={i} className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden transition duration-300 hover:-translate-y-2
            hover:shadow-[0_20px_60px_rgba(59,130,246,0.20),0_10px_30px_rgba(168,85,247,0.10)]">

            {/* TOP LINE */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-sky-400 via-purple-400 to-transparent"></div>

            {/* IMAGE */}
            <div className="w-full h-48 sm:h-52 md:h-56 overflow-hidden bg-gray-50 flex items-center justify-center">
              <img src={`https://lightblue-moose-690494.hostingersite.com/public${member.photo}`} alt={member.name}
                className="w-full h-full object-contain transition duration-300 group-hover:scale-105"/>
            </div>

            {/* CONTENT */}
            <div className="p-4 sm:p-5 text-center">
              <div className="flex justify-center -mt-8 sm:-mt-10 mb-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-sky-400 flex items-center justify-center text-sky-500 shadow-md text-sm">
                  ★
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                {member.name}
              </h3>

              <p className="text-xs sm:text-sm text-gray-500">
                {member.profession}
              </p>
            </div>
            
          </div>
        ))}

      </div>
    </div>
  );
}