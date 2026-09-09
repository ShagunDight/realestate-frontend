import React, { useEffect, useState } from "react";

const API_BASE_URL = "https://lightblue-moose-690494.hostingersite.com/api";

const FilterModal = ({
  filters = {},
  setFilters = () => {},
  onClose = () => {},
  onSearch = () => {},
}) => {
  const [activeTab] = useState("sale");

  const [types, setTypes] = useState([]);
  const [openGroups, setOpenGroups] = useState({});
  const [spaceUses, setSpaceUses] = useState([]);
  const [locations, setLocations] = useState([]);
  const [additionalFilters, setAdditionalFilters] = useState([]);
  const [columns, setColumns] = useState([]);

  // =========================
  // BUILD TREE
  // =========================
  const buildTree = (data) => {
    const map = {};
    const roots = [];

    data.forEach((item) => {
      const id = item._id || item.id;

      map[id] = {
        ...item,
        id,
        children: [],
      };
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
  // INITIAL FETCH
  // =========================
  useEffect(() => {
    let cancelled = false;

    const initializeFilters = async () => {
      try {
        // =========================
        // FETCH PROPERTY TYPES
        // =========================
        const typesRes = await fetch(`${API_BASE_URL}/property-types`);

        if (!typesRes.ok) {
          throw new Error("Failed to fetch property types");
        }

        const typesData = await typesRes.json();
        const propertyTypes = typesData.data || [];

        if (cancelled) return;

        setTypes(propertyTypes);

        const firstTypeId = propertyTypes[0]?.id || "";

        // =========================
        // SET DEFAULT PROPERTY TYPE
        // =========================
        setFilters({
          ...filters,
          type: firstTypeId,
          space_use_id: [],
        });

        // =========================
        // FETCH DEFAULT SPACE USES
        // =========================
        if (firstTypeId) {
          const spaceRes = await fetch(
            `${API_BASE_URL}/space-uses?type_id=${firstTypeId}`,
          );

          if (!spaceRes.ok) {
            throw new Error("Failed to fetch space uses");
          }

          const spaceData = await spaceRes.json();

          if (!cancelled) {
            const tree = buildTree(spaceData.data || []);
            setSpaceUses(tree);
          }
        }

        // =========================
        // FETCH LOCATIONS
        // =========================
        const locationsRes = await fetch(`${API_BASE_URL}/locations`);

        if (!locationsRes.ok) {
          throw new Error("Failed to fetch locations");
        }

        const locationsData = await locationsRes.json();

        if (!cancelled) {
          setLocations(locationsData.data || []);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Filter initialization error:", err);
        }
      }
    };

    initializeFilters();

    return () => {
      cancelled = true;
    };
  }, []);

  // =========================
  // FETCH PROPERTY COLUMNS
  // =========================
  useEffect(() => {
    let cancelled = false;

    const fetchPropertyColumns = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/property-columns`);

        if (!res.ok) {
          throw new Error("Failed to fetch property columns");
        }

        const data = await res.json();

        if (!cancelled && data.status) {
          setColumns(data.data || []);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Property columns error:", err);
        }
      }
    };

    fetchPropertyColumns();

    return () => {
      cancelled = true;
    };
  }, []);

  // =========================
  // FETCH SPACE USES
  // =========================
  const fetchSpaceUses = async (typeId) => {
    if (!typeId) {
      setSpaceUses([]);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/space-uses?type_id=${typeId}`);

      if (!res.ok) {
        throw new Error("Failed to fetch space uses");
      }

      const data = await res.json();

      const tree = buildTree(data.data || []);

      setSpaceUses(tree);
    } catch (err) {
      console.error("Space uses error:", err);
      setSpaceUses([]);
    }
  };

  // =========================
  // FETCH ADDITIONAL FILTERS
  // =========================
  const fetchAdditionalFilters = async (typeId, spaceUseIds) => {
    if (!typeId || !spaceUseIds) {
      setAdditionalFilters([]);
      return;
    }

    try {
      const res = await fetch(
        `${API_BASE_URL}/filters?type_id=${typeId}&space_use_id=${spaceUseIds}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch additional filters");
      }

      const data = await res.json();

      setAdditionalFilters(data.data || []);
    } catch (err) {
      console.error("Additional filters error:", err);
      setAdditionalFilters([]);
    }
  };

  // =========================
  // GET ALL CHILD IDS
  // =========================
  const getAllChildIds = (item) => {
    let ids = [];

    item.children?.forEach((child) => {
      ids.push(child.id);

      if (child.children?.length) {
        ids = ids.concat(getAllChildIds(child));
      }
    });

    return ids;
  };

  // =========================
  // TOGGLE NODE
  // =========================
  const toggleNode = (node, checked) => {
    let parentIds = Array.isArray(filters.space_use)
      ? [...filters.space_use]
      : [];

    let childIds = Array.isArray(filters.space_use_id)
      ? [...filters.space_use_id]
      : [];

    const hasChildren = node.children && node.children.length > 0;

    if (hasChildren) {
      const allChildIds = getAllChildIds(node);

      if (checked) {
        if (!parentIds.includes(node.id)) {
          parentIds.push(node.id);
        }

        allChildIds.forEach((id) => {
          if (!childIds.includes(id)) {
            childIds.push(id);
          }
        });
      } else {
        parentIds = parentIds.filter((id) => id !== node.id);

        childIds = childIds.filter((id) => !allChildIds.includes(id));
      }
    } else {
      if (checked) {
        if (!parentIds.includes(node.id)) {
          parentIds.push(node.id);
        }
      } else {
        parentIds = parentIds.filter((id) => id !== node.id);
      }
    }

    const updatedFilters = {
      ...filters,
      space_use: parentIds,
      space_use_id: childIds,
    };

    setFilters(updatedFilters);

    // Fetch additional filters whenever child filters change
    if (childIds.length > 0) {
      fetchAdditionalFilters(updatedFilters.type, childIds.join(","));
    } else {
      setAdditionalFilters([]);
    }
  };

  // =========================
  // RENDER TREE
  // =========================
  const renderTree = (items) => {
    return items.map((item) => {
      const id = item.id;
      const hasChildren = item.children && item.children.length > 0;

      const isOpen = !!openGroups[id];

      return (
        <div key={id} className="border-b border-gray-200 last:border-b-0">
          {/* PARENT */}
          <div className="flex items-center justify-between py-2.5">
            <label className="flex items-center gap-2.5 cursor-pointer min-w-0">
              <input
                type="checkbox"
                checked={(filters.space_use || []).includes(id)}
                onChange={(e) => toggleNode(item, e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-sky-500 focus:ring-sky-500"
              />

              <span className="text-sm font-medium text-gray-700 truncate">
                {item.name}
              </span>
            </label>

            {hasChildren && (
              <button
                type="button"
                onClick={() =>
                  setOpenGroups((prev) => ({
                    ...prev,
                    [id]: !prev[id],
                  }))
                }
                className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition"
                aria-label={
                  isOpen ? `Collapse ${item.name}` : `Expand ${item.name}`
                }
              >
                {isOpen ? "▲" : "▼"}
              </button>
            )}
          </div>

          {/* CHILDREN */}
          {isOpen && hasChildren && (
            <div className="ml-5 pb-2 border-l border-gray-200 pl-3">
              {item.children.map((child) => (
                <label
                  key={child.id}
                  className="flex items-center gap-2.5 py-1.5 text-sm text-gray-600 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={(filters.space_use_id || []).includes(child.id)}
                    onChange={(e) => toggleNode(child, e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-sky-500 focus:ring-sky-500"
                  />

                  <span>{child.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      );
    });
  };

  // =========================
  // PROPERTY TYPE CHANGE
  // =========================
  const handleTypeChange = (id) => {
    setFilters({
      ...filters,
      type: id,
      space_use: [],
      space_use_id: [],
    });

    setAdditionalFilters([]);
    setOpenGroups({});

    fetchSpaceUses(id);
  };

  // =========================
  // SPACE USE CHANGE
  // =========================
  const handleSpaceUse = (id) => {
    const currentSelected = Array.isArray(filters.space_use_id)
      ? filters.space_use_id
      : [];

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

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // =========================
  // CLEAR
  // =========================
  const handleClear = () => {
    setFilters({});
    setAdditionalFilters([]);
    setOpenGroups({});
    onSearch({});
  };

  // =========================
  // SEARCH
  // =========================
  const handleSearch = () => {
    onSearch({
      ...filters,
      listing_type: activeTab,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
      <div className="flex h-[80vh] w-full max-w-7xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-xl sm:h-auto sm:max-h-[90vh] sm:rounded-2xl">
        {/* HEADER */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-white p-4">
          <h2 className="text-xl font-bold text-gray-900">All Filters</h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
            aria-label="Close filters"
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* PROPERTY TYPES */}
          <div className="mb-6">
            <div className="mb-3 text-sm font-semibold text-gray-700">
              Property Type
            </div>

            <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2">
              {types.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => handleTypeChange(item.id)}
                  className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition ${
                    filters.type == item.id
                      ? "bg-sky-500 text-white shadow-sm"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* LEFT SIDE */}
            <div className="space-y-5 lg:col-span-1">
              {/* SPACE USES */}
              <div className="max-h-[250px] overflow-y-auto rounded-xl bg-gray-50 p-4 sm:max-h-[350px]">
                <h4 className="mb-3 font-semibold text-gray-900">Space Uses</h4>

                {spaceUses.length === 0 ? (
                  <p className="text-sm text-gray-500">No Space Uses</p>
                ) : (
                  renderTree(spaceUses)
                )}
              </div>

              {/* LOCATION */}
              <div className="rounded-xl bg-gray-50 p-4">
                <h4 className="mb-2 font-semibold text-gray-900">Location</h4>

                <select
                  value={filters.location || ""}
                  className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  onChange={(e) => handleChange("location", e.target.value)}
                >
                  <option value="">Select</option>

                  {locations.map((loc, i) => (
                    <option key={i} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* ADDITIONAL FILTERS */}
              <div className="rounded-xl p-4">
                <div className="mb-4 font-semibold text-gray-900">
                  Additional Filters
                </div>

                {additionalFilters.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    Select a space use to see additional filters.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {additionalFilters.map((item) => (
                      <div key={item.id}>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          {item.name}
                        </label>

                        {/* TEXT */}
                        {item.field_type === "text" && (
                          <input
                            type="text"
                            value={filters[item.name] || ""}
                            className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                            onChange={(e) =>
                              handleChange(item.name, e.target.value)
                            }
                          />
                        )}

                        {/* SELECT */}
                        {(item.field_type === "select" ||
                          item.field_type === "single_select") && (
                          <select
                            value={filters[item.name] || ""}
                            className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                            onChange={(e) =>
                              handleChange(item.name, e.target.value)
                            }
                          >
                            <option value="">Select</option>

                            {item.options?.map((opt, i) => (
                              <option key={i} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        )}

                        {/* MULTI SELECT */}
                        {item.field_type === "multi_select" && (
                          <div className="flex flex-wrap gap-2">
                            {item.options?.map((opt, i) => (
                              <label
                                key={i}
                                className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-600"
                              >
                                <input
                                  type="checkbox"
                                  value={opt}
                                  checked={(filters[item.name] || []).includes(
                                    opt,
                                  )}
                                  onChange={(e) => {
                                    let updated = filters[item.name] || [];

                                    if (e.target.checked) {
                                      updated = [...updated, opt];
                                    } else {
                                      updated = updated.filter(
                                        (v) => v !== opt,
                                      );
                                    }

                                    handleChange(item.name, updated);
                                  }}
                                  className="h-4 w-4 rounded border-gray-300 text-sky-500 focus:ring-sky-500"
                                />

                                {opt}
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT SIDE PROPERTY FILTERS */}
            <div className="rounded-xl bg-gray-50 p-4 lg:col-span-2">
              <h4 className="mb-4 font-semibold text-gray-900">
                Property Filters
              </h4>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {Object.entries(columns).map(([key, item]) => (
                  <div key={key}>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      {item.label || item}
                    </label>

                    {/* TEXT */}
                    {(!item.type || item.type === "text") && (
                      <input
                        type="text"
                        value={filters[key] || ""}
                        className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                        onChange={(e) => handleChange(key, e.target.value)}
                      />
                    )}

                    {/* NUMBER */}
                    {item.type === "number" && (
                      <input
                        type="number"
                        value={filters[key] || ""}
                        className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                        onChange={(e) => handleChange(key, e.target.value)}
                      />
                    )}

                    {/* RADIO */}
                    {item.type === "radio" && (
                      <div className="flex flex-wrap gap-4">
                        {item.options?.map((opt, i) => {
                          const value = opt.value || opt;
                          const label = opt.label || opt;

                          return (
                            <label
                              key={i}
                              className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                            >
                              <input
                                type="radio"
                                name={key}
                                value={value}
                                checked={filters[key] == value}
                                onChange={(e) =>
                                  handleChange(key, e.target.value)
                                }
                                className="h-4 w-4 border-gray-300 text-sky-500 focus:ring-sky-500"
                              />

                              {label}
                            </label>
                          );
                        })}
                      </div>
                    )}

                    {/* SELECT */}
                    {item.type === "select" && (
                      <select
                        value={filters[key] || ""}
                        className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                        onChange={(e) => handleChange(key, e.target.value)}
                      >
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

                    {/* CHECKBOX */}
                    {item.type === "checkbox" && (
                      <div className="flex flex-wrap gap-3">
                        {item.options?.map((opt, i) => {
                          const value = opt.value || opt;
                          const label = opt.label || opt;

                          return (
                            <label
                              key={i}
                              className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                            >
                              <input
                                type="checkbox"
                                value={value}
                                checked={(filters[key] || []).includes(value)}
                                onChange={(e) => {
                                  let updated = filters[key] || [];

                                  if (e.target.checked) {
                                    updated = [...updated, value];
                                  } else {
                                    updated = updated.filter(
                                      (v) => v !== value,
                                    );
                                  }

                                  handleChange(key, updated);
                                }}
                                className="h-4 w-4 rounded border-gray-300 text-sky-500 focus:ring-sky-500"
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
        </div>

        {/* FOOTER */}
        <div className="sticky bottom-0 flex flex-col justify-end gap-3 border-t bg-white p-4 sm:flex-row">
          <button
            type="button"
            onClick={handleClear}
            className="w-full rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:w-auto"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={handleSearch}
            className="w-full rounded-lg bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-600 sm:w-auto"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
