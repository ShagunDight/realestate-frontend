import React, { useEffect, useState } from "react";

const FilterModal = ({ filters, setFilters, onClose, onSearch }) => {
  const [activeTab] = useState("sale");
  const [types, setTypes] = useState([]);
  const [openGroups, setOpenGroups] = useState({});
  const [spaceUses, setSpaceUses] = useState([]);
  const [locations, setLocations] = useState([]);
  const [additionalFilters, setAdditionalFilters] = useState([]);
  const [columns, setColumns] = useState([]);

  // FETCH PROPERTY TYPES
  const fetchTypes = async () => {
    const res = await fetch("https://lightblue-moose-690494.hostingersite.com/api/property-types");
    const data = await res.json();
    setTypes(data.data || []);
    setFilters({
      ...filters,
      type: data.data[0]?.id || "",
      space_use_id: [],
    });
  };

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
    if (!typeId) return;

    const res = await fetch(
      `https://lightblue-moose-690494.hostingersite.com/api/space-uses?type_id=${typeId}`
    );

    const data = await res.json();
    const tree = buildTree(data.data || []);
    setSpaceUses(tree);
  };

  // =========================
  // TOGGLE NODE (SAME LOGIC)
  // =========================
  const toggleNode = (node, checked) => {
    let parentIds = Array.isArray(filters.space_use)
      ? [...filters.space_use]
      : [];

    let childIds = Array.isArray(filters.space_use_id)
      ? [...filters.space_use_id]
      : [];

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
        if (!parentIds.includes(node.id)) parentIds.push(node.id);

        allChildIds.forEach((id) => {
          if (!childIds.includes(id)) childIds.push(id);
        });
      } else {
        parentIds = parentIds.filter((id) => id !== node.id);
        childIds = childIds.filter((id) => !allChildIds.includes(id));
      }
    } else {
      if (checked) {
        if (!parentIds.includes(node.id)) parentIds.push(node.id);
      } else {
        parentIds = parentIds.filter((id) => id !== node.id);
      }
    }

    setFilters({
      ...filters,
      space_use: parentIds,
      space_use_id: childIds,
    });
  };


  // =========================
  // RENDER TREE UI
  // =========================
  const renderTree = (items) => {
    return items.map((item) => {
      const id = item.id;
      const hasChildren = item.children && item.children.length > 0;
      const isOpen = !!openGroups[id];

      return (
        <div key={id} className="border-b">

          {/* PARENT */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={(filters.space_use || []).includes(id)} onChange={(e) => toggleNode(item, e.target.checked)}/>
              <span className="text-sm font-medium">{item.name}</span>
            </div>

            {hasChildren && (
              <button onClick={() => setOpenGroups((prev) => ({ ...prev, [id]: !prev[id], })) }>
                {isOpen ? "▲" : "▼"}
              </button>
            )}
          </div>

          {/* CHILDREN */}
          {isOpen && hasChildren && (
            <div className="pl-5 pb-2">
              {item.children.map((child) => (
                <label key={child.id} className="flex gap-2 py-1 text-sm">
                  <input type="checkbox" checked={(filters.space_use_id || []).includes(child.id)} onChange={(e) => toggleNode(child, e.target.checked)} />
                  {child.name}
                </label>
              ))}
            </div>
          )}
        </div>
      );
    });
  };

  // FETCH LOCATIONS
  const fetchLocations = async () => {
    const res = await fetch("https://lightblue-moose-690494.hostingersite.com/api/locations");
    const data = await res.json();
    setLocations(data.data || []);
  };

  // FETCH ADDITIONAL FILTERS
  const fetchAdditionalFilters = async (typeId, spaceUseIds) => {
    if (!typeId || !spaceUseIds) return;

    const res = await fetch(
      `https://lightblue-moose-690494.hostingersite.com/api/filters?type_id=${typeId}&space_use_id=${spaceUseIds}`,
    );
    // FETCH PROPERTY COLUMNS
    const data = await res.json();
    setAdditionalFilters(data.data || []);
  };

  useEffect(() => {
    fetchTypes();
    fetchLocations();
  }, []);

  useEffect(() => {
    fetch("https://lightblue-moose-690494.hostingersite.com/api/property-columns")
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setColumns(data.data);
        }
      });
  }, []);

  // PROPERTY TYPE CHANGE
  const handleTypeChange = (id) => {
    setFilters({
      ...filters,
      type: id,
      space_use_id: [],
    });

    setAdditionalFilters([]);
    fetchSpaceUses(id);
  };

  const handleSpaceUse = (id) => {
    const currentSelected = filters.space_use_id || [];

    let updatedSelected;

    if (currentSelected.includes(id)) {
      updatedSelected = currentSelected.filter((x) => x !== id);
    } else {
      updatedSelected = [...currentSelected, id];
    }

    const updatedFilters = {
      ...filters,
      space_use_id: updatedSelected,
    };

    setFilters(updatedFilters);

    if (updatedSelected.length > 0) {
      fetchAdditionalFilters(updatedFilters.type, updatedSelected.join(","));
    } else {
      setAdditionalFilters([]);
    }
  };
  // INPUT CHANGE
  const handleChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // CLEAR
  const handleClear = () => {
    setFilters({});
    setAdditionalFilters([]);
    onSearch({});
  };

  // SEARCH
  const handleSearch = () => {
    onSearch({ ...filters, listing_type: activeTab });
    onClose();
  };

  useEffect(() => {
    if (types.length > 0) {
      handleTypeChange(types[0].id);
    }
  }, [types]);
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-6xl p-6 rounded-2xl shadow-xl">
        {/* HEADER */}
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">All Filters</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* PROPERTY TYPES */}
        <div className="flex gap-3 flex-wrap mb-6">
          {types.map((item) => (
            <button key={item.id} onClick={() => handleTypeChange(item.id)}
              className={`px-4 py-2 rounded ${ filters.type == item.id ? "bg-sky-500 text-white" : "bg-gray-200" }`}>
              {item.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* LEFT SIDE */}
          <div className="space-y-5">
            {/* SPACE USES */}
            <div className="bg-gray-50 p-4 rounded-xl max-h-[300px] overflow-y-auto">
              <h4 className="font-semibold mb-3">Space Uses</h4>

              {spaceUses.length === 0 ? (
                <p>No Space Uses</p>
              ) : (
                renderTree(spaceUses)
              )}
            </div>

            {/* LOCATION */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h4 className="mb-2 font-semibold">Location</h4>

              <select className="w-full border p-2 rounded" onChange={(e) => handleChange("location", e.target.value)}>
                <option value="">Select</option>

                {locations.map((loc, i) => (
                  <option key={i} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* ADDITIONAL FILTERS */}
            <div className="p-4 rounded-xl">
              <div className="grid grid-cols-2 gap-4">
                {additionalFilters.map((item) => {
                  return (
                    <div key={item.id}>
                      <label className="block text-sm mb-1">{item.name}</label>

                      {/* TEXT */}
                      {item.field_type === "text" && (
                        <input type="text" value={filters[item.name] || ""} className="w-full border p-2 rounded"
                          onChange={(e) => handleChange(item.name, e.target.value) }/>
                      )}

                      {/* SELECT / SINGLE SELECT */}
                      {(item.field_type === "select" || item.field_type === "single_select") && (
                        <select value={filters[item.name] || ""} className="w-full border p-2 rounded"
                          onChange={(e) => handleChange(item.name, e.target.value) }>
                          <option value="">Select</option>

                          {item.options?.map((opt, i) => (
                            <option key={i} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      )}

                      {/* MULTI SELECT (CHECKBOX) */}
                      {item.field_type === "multi_select" && (
                        <div className="flex flex-wrap gap-2">
                          {item.options?.map((opt, i) => (
                            <label key={i} className="flex items-center gap-1">
                              <input type="checkbox" value={opt} checked={(filters[item.name] || []).includes( opt, )}
                                onChange={(e) => {
                                  let updated = filters[item.name] || [];

                                  if (e.target.checked) {
                                    updated = [...updated, opt];
                                  } else {
                                    updated = updated.filter((v) => v !== opt);
                                  }

                                  handleChange(item.name, updated);
                                }}/>
                              {opt}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE PROPERTY FILTERS */}
          <div className="col-span-2 p-4 rounded-xl">
            <h4 className="font-semibold mb-3">Property Filters</h4>

            <div className="grid grid-cols-2 gap-4">
              {Object.entries(columns).map(([key, item]) => (
                <div key={key}>
                  <label className="block text-sm mb-1">{item.label || item}</label>

                  {/* TEXT  */}
                  {(!item.type || item.type === "text") && (
                    <input type="text" value={filters[key] || ""} className="w-full border p-2 rounded" onChange={(e) => handleChange(key, e.target.value)}/>
                  )}

                  {/*  NUMBER */}
                  {item.type === "number" && (
                    <input type="number" value={filters[key] || ""} className="w-full border p-2 rounded" onChange={(e) => handleChange(key, e.target.value)}/>
                  )}

                  {/* RADIO */}
                  {item.type === "radio" && (
                    <div className="flex gap-4 flex-wrap">
                      {item.options?.map((opt, i) => {
                        const value = opt.value || opt;
                        const label = opt.label || opt;

                        return (
                          <label key={i} className="flex items-center gap-2">
                            <input type="radio" name={key} value={value} checked={filters[key] == value} onChange={(e) => handleChange(key, e.target.value)}/>
                            {label}
                          </label>
                        );
                      })}
                    </div>
                  )}

                  {/* SELECT */}
                  {item.type === "select" && (
                    <select value={filters[key] || ""} className="w-full border p-2 rounded" onChange={(e) => handleChange(key, e.target.value)}>
                      <option value="">Select</option>
                      {item.options?.map((opt, i) => {
                        const value = opt.value || opt;
                        const label = opt.label || opt;

                        return (
                          <option key={i} value={value}>
                            {label}
                          </option>
                        );
                      })}
                    </select>
                  )}

                  {/*  CHECKBOX */}
                  {item.type === "checkbox" && (
                    <div className="flex flex-wrap gap-3">
                      {item.options?.map((opt, i) => {
                        const value = opt.value || opt;
                        const label = opt.label || opt;

                        return (
                          <label key={i} className="flex items-center gap-2">
                            <input type="checkbox" value={value} checked={filters[key]?.includes(value)}
                              onChange={(e) => {
                                let updated = filters[key] || [];

                                if (e.target.checked) {
                                  updated = [...updated, value];
                                } else {
                                  updated = updated.filter((v) => v !== value);
                                }

                                handleChange(key, updated);
                              }}
                            />
                            {label}
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER BUTTONS */}
        <div className="flex justify-end gap-4 mt-6">
          <button onClick={handleClear} className="px-4 py-2 border rounded">
            Clear
          </button>

          <button onClick={handleSearch} className="bg-sky-500 text-white px-6 py-2 rounded">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
