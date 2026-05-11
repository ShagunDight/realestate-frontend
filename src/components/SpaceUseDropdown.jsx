import React, { useState, useRef, useEffect } from "react";

export default function SpaceUseDropdown({ spaceUses, renderTree, buttonLabel }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-[250px]" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button onClick={() => setOpen(!open)}
        className="w-full border rounded-lg bg-white p-2 text-left font-semibold flex justify-between items-center h-[50px]">
        {buttonLabel}
      </button>

      {/* Dropdown Content */}
      {open && (
        <div className="absolute left-0 mt-1 w-full border rounded-lg bg-white max-h-[350px] overflow-y-auto shadow-lg z-50">
          {renderTree(spaceUses)}
        </div>
      )}
    </div>
  );
}