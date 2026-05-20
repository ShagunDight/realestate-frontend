import React from "react";

const SearchBar = ({ filters, setFilters }) => {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-5 flex flex-wrap gap-4 items-center mt-6">
      {/* LOCATION */}
      <input type="text" placeholder="Location"
        className="border border-gray-200 px-4 py-2 rounded-lg text-sm w-[180px] focus:outline-none focus:ring-2 focus:ring-sky-400"
        value={filters.location || ""} onChange={(e) => setFilters({ ...filters, location: e.target.value })} />

      {/* PROPERTY TYPE */}
      <select className="border border-gray-200 px-4 py-2 rounded-lg text-sm w-[160px] focus:outline-none focus:ring-2 focus:ring-sky-400"
        value={filters.type || ""} onChange={(e) => setFilters({ ...filters, type: e.target.value })} >
        <option value="">Property Type</option>
        <option value="house">House</option>
        <option value="apartment">Apartment</option>
        <option value="villa">Villa</option>
      </select>

      {/* MIN PRICE */}
      <input type="number" placeholder="Min Price" value={filters.min_price || ""} onChange={(e) => setFilters({ ...filters, min_price: e.target.value })}
        className="border border-gray-200 px-4 py-2 rounded-lg text-sm w-[140px] focus:outline-none focus:ring-2 focus:ring-sky-400"/>

      {/* MAX PRICE */}
      <input type="number" placeholder="Max Price" value={filters.max_price || ""} onChange={(e) => setFilters({ ...filters, max_price: e.target.value })}
        className="border border-gray-200 px-4 py-2 rounded-lg text-sm w-[140px] focus:outline-none focus:ring-2 focus:ring-sky-400"/>

      {/* SEARCH BUTTON */}
      <button onClick={() => setFilters({ ...filters })} className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition shadow-md">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
