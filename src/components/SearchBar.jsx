import React, { useEffect, useState, useRef } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import FilterModal from "./FilterModal";
import SpaceUseDropdown from "./SpaceUseDropdown";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar = ({ filters, setFilters, onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [types, setTypes] = useState([]);
  const [spaceUses, setSpaceUses] = useState([]);
  const [showPrice, setShowPrice] = useState(true);
  const [showSize, setShowSize] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [openGroups, setOpenGroups] = useState({});
  const autoRef = useRef(null);

  const LIBRARIES = ["places"];

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD-5EHYR_BK19i4x7gASRqFx0qvVW0u28w",
    libraries: LIBRARIES,
  });

  // ✅ SAFE ARRAY
  // const selectedIds = Array.isArray(filters.section_id) ? filters.section_id : [];
  const selectedIds = [
    ...(Array.isArray(filters.space_use) ? filters.space_use : []),
    ...(Array.isArray(filters.space_use_id) ? filters.space_use_id : []),
  ];

  const selectedParentIds = Array.isArray(filters.space_use) ? filters.space_use : [];
  const selectedChildIds = Array.isArray(filters.space_use_id) ? filters.space_use_id : [];

  useEffect(() => {
    fetchTypes();
  }, []);

  useEffect(() => {
    if (types.length > 0 && !filters.type) {
      const firstId = types[0]._id || types[0].id;

      const updated = {
        ...filters,
        type: firstId,
      };

      setFilters(updated);
      // fetchSpaceUses(firstId);
      // onSearch(updated);
    }
  }, [types]);

  const fetchTypes = async () => {
    const res = await fetch("http://127.0.0.1:8001/api/property-types");
    const data = await res.json();
    setTypes(data.data || []);
  };

  // =========================
  // TOGGLE NODE (FIXED)
  // =========================
  const toggleNode = (node, checked) => {
    let parentIds = Array.isArray(filters.space_use) ? [...filters.space_use] : [];
    let childIds = Array.isArray(filters.space_use_id) ? [...filters.space_use_id] : [];

    const hasChildren = node.children && node.children.length > 0;

    const getAllChildIds = (item) => {
      let ids = [];
      item.children?.forEach((c) => {
        ids.push(c.id);
        if (c.children?.length) {
          ids = ids.concat(getAllChildIds(c));
        }
      });
      return ids;
    };

    if (hasChildren) {
      const allChildIds = getAllChildIds(node);

      if (checked) {
        // parent add
        if (!parentIds.includes(node.id)) {
          parentIds.push(node.id);
        }

        // children add
        allChildIds.forEach((id) => {
          if (!childIds.includes(id)) childIds.push(id);
        });

      } else {
        parentIds = parentIds.filter((id) => id !== node.id);
        childIds = childIds.filter((id) => !allChildIds.includes(id));
      }
    } else {
      if (checked) {
        // ✅ treat as parent (IMPORTANT FIX)
        if (!parentIds.includes(node.id)) {
          parentIds.push(node.id);
        }
      } else {
        parentIds = parentIds.filter((id) => id !== node.id);
      }
    }

    const newFilters = { ...filters, space_use: parentIds, space_use_id: childIds };

    setFilters(newFilters);
    // onSearch(newFilters);
  };

  // =========================
  // BUILD TREE
  // =========================
  const buildTree = (data) => {
    const map = {};
    const roots = [];

    data.forEach((item) => {
      const id = item._id || item.id;
      map[id] = { ...item, id, children: [] };
    });

    data.forEach((item) => {
      const id = item._id || item.id;
      const parent = item.parent_id;

      if (parent && map[parent]) {
        map[parent].children.push(map[id]);
      } else {
        roots.push(map[id]);
      }
    });

    return roots;
  };

  // =========================
  // FETCH SPACE USES
  // =========================
  const fetchSpaceUses = async (typeId) => {
    const res = await fetch(`http://127.0.0.1:8001/api/space-uses?type_id=${typeId}`);
    const data = await res.json();
    const tree = buildTree(data.data || []);
    setSpaceUses(tree);
  };

  // =========================
  // BUTTON LABEL (FIXED)
  // =========================
  const getSelectedLabel = () => {
    const parentIds = Array.isArray(filters.space_use) ? filters.space_use : [];

    if (parentIds.length === 0) return "Property Types";
    if (parentIds.length > 1) return "Multiple Types";

    const selected = spaceUses.find((item) =>
      parentIds.includes(item.id)
    );

    return selected?.name || "Property Types";
  };

  // =========================
  // RENDER TREE
  // =========================
  const renderTree = (items) => {
    return items.map((item) => {
      const id = item.id;
      const isOpen = !!openGroups[id];

      const hasChildren = item.children && item.children.length > 0;

      const isParentChecked = selectedParentIds.includes(id);
      const isChildChecked = selectedChildIds.includes(id);

      return (
        <div key={id} className="border-b">

          {/* PARENT */}
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={hasChildren ? isParentChecked : isParentChecked} onChange={(e) => toggleNode(item, e.target.checked)}/>
              <span className="text-sm font-medium">{item.name}</span>
            </div>

            {hasChildren && (
              <button type="button" onClick={() => setOpenGroups((prev) => ({ ...prev, [id]: !prev[id], } )) }>
                {isOpen ? "▲" : "▼"}
              </button>
            )}
          </div>

          {/* CHILDREN */}
          {isOpen && hasChildren && (
            <div className="pl-6 pb-2">
              {item.children.map((child) => {
                const cid = child.id;

                return (
                  <label key={cid} className="flex items-center gap-2 py-1 text-sm">
                    <input type="checkbox" checked={selectedChildIds.includes(cid)} onChange={(e) => toggleNode(child, e.target.checked)} />
                    {child.name}
                  </label>
                );
              })}
            </div>
          )}
        </div>
      );
    });
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="bg-sky-200 shadow-lg rounded-xl p-4 flex flex-wrap items-end gap-4">

      {/* LOCATION */}
      {isLoaded ? (
        <Autocomplete onLoad={(ref) => (autoRef.current = ref)}
          onPlaceChanged={() => {
            const place = autoRef.current.getPlace();
            if (place?.formatted_address) {
              const updated = { ...filters, location: place.formatted_address, };
              setFilters(updated);
              // onSearch(updated);
            }
          }} >
          <input type="text" placeholder="Location" className="border p-3 rounded-lg w-[200px]"
            value={filters.location || ""} onChange={(e) => setFilters({ ...filters, location: e.target.value }) } />
        </Autocomplete>
      ) : (
        <input type="text" placeholder="Location" className="border p-3 rounded-lg w-[200px]" />
      )}

      {/* PROPERTY TYPE */}
      <select className="border p-3 rounded-lg w-[180px]" value={filters.type || ""} onChange={(e) => {
          const value = e.target.value;
          const updated = { ...filters, type: value, section_id: [], };
          setFilters(updated);
          fetchSpaceUses(value);
          // onSearch(updated);
        }
      }
      >
        <option value="">Property</option>
        {types.map((t) => (
          <option key={t._id || t.id} value={t._id || t.id}>
            {t.name}
          </option>
        ))}
      </select>

      {/* SPACE USE */}
      <SpaceUseDropdown spaceUses={spaceUses} renderTree={renderTree} buttonLabel={getSelectedLabel()} />

      {/* PRICE FILTER */}
      {filters.listing_type && (
        <div className="relative price-dropdown w-[180px]">
          <div className="border p-3 rounded-lg bg-white cursor-pointer" onClick={() => setShowPrice(!showPrice)}>
            {filters.min_price || filters.max_price ? `${filters.min_price || 0}-${filters.max_price || 0}` : filters.listing_type === "rent" ? "Rent" : "Price"}
          </div>

          {showPrice && (
            <div className="absolute bg-white border rounded-lg p-3 mt-1 w-full z-50">
              <input placeholder="Min" className="border p-2 w-full mb-2" value={filters.min_price || ""}
                onChange={(e) => { const updated = { ...filters, min_price: e.target.value };
                  setFilters(updated);
                  // onSearch(updated);
                }} />
              <input placeholder="Max" className="border p-2 w-full" value={filters.max_price || ""}
                onChange={(e) => { const updated = { ...filters, max_price: e.target.value };
                  setFilters(updated);
                  // onSearch(updated);
                }} />
            </div>
          )}
        </div>
      )}

      {/* BUILDING SIZE FILTER */}
      <div className="relative size-dropdown w-[180px]">
        <div className="border p-3 rounded-lg bg-white cursor-pointer" onClick={() => setShowSize(!showSize)}>
          {filters.building_min_size || filters.building_max_size ? `${filters.building_min_size || 0}-${filters.building_max_size || 0} sqft` : "Building Size"}
        </div>

        {showSize && (
          <div className="absolute bg-white border rounded-lg p-3 mt-1 w-full z-50">
            <input placeholder="Min SF" className="border p-2 w-full mb-2" value={ filters.building_min_size || "" }
              onChange={(e) => { const value = e.target.value;
                setFilters({ ...filters, building_min_size: value });
                onSearch({ ...filters, building_min_size: value });
              }} />
            <input placeholder="Max SF" className="border p-2 w-full" value={ filters.building_max_size || "" }
              onChange={(e) => { const value = e.target.value;
                setFilters({ ...filters, building_max_size: value });
                onSearch({ ...filters, building_max_size: value });
              }} />
          </div>
        )}
      </div>

      {showModal && (
        <FilterModal filters={filters} setFilters={setFilters} onClose={() => setShowModal(false)} onSearch={onSearch} />
      )}

      <button onClick={() => setShowModal(true)} className="bg-sky-500 text-white px-6 py-3 rounded-lg"> All Filters </button>

      {/* SEARCH BUTTON */}
      <div className="ml-auto flex gap-3">
        
        {/* CLEAR BUTTON */}
        <button onClick={() => {
            const resetFilters = {
              location: "",
              type: "",
              space_use: [],
              space_use_id: [],
              listing_type: "",
              min_price: "",
              max_price: "",
              land_size_min: "",
              land_size_max: "",
              building_size_min: "",
              building_size_max: "",
              year_built_min: "",
              year_built_max: "",
            };

            setFilters(resetFilters);
            setSpaceUses([]);
            setShowPrice(true);
            setShowSize(false);
            // onSearch(resetFilters);
          }} className="bg-gray-200 text-black px-6 py-3 rounded-lg hover:bg-gray-300" >
          Clear
        </button>

        {/* SEARCH BUTTON */}
        <button onClick={() => { const updated = filters;
            navigate("/properties", {
              state: { filters: updated },
            });
          }} className="bg-sky-500 text-white px-6 py-3 rounded-lg" >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;