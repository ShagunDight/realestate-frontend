import React, { useEffect, useState, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import FilterModal from "./FilterModal";
import SpaceUseDropdown from "./SpaceUseDropdown";
import { useNavigate, useLocation } from "react-router-dom";

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
*/

const PROPERTY_TYPES_API =
  "https://lightblue-moose-690494.hostingersite.com/api/property-types";

const SPACE_USES_API =
  "https://lightblue-moose-690494.hostingersite.com/api/space-uses";

/*
|--------------------------------------------------------------------------
| Shared request cache
|
| Important:
| Home renders two SearchBar instances (mobile/tablet + desktop).
| Both components can mount even though one is hidden with CSS.
| These cached promises prevent duplicate network requests.
|--------------------------------------------------------------------------
*/

let propertyTypesPromise = null;

const spaceUsesPromiseCache = new Map();

/*
|--------------------------------------------------------------------------
| Fetch Property Types
|--------------------------------------------------------------------------
*/

const fetchPropertyTypes = async () => {
  if (!propertyTypesPromise) {
    propertyTypesPromise = fetch(PROPERTY_TYPES_API)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unable to fetch property types");
        }

        return res.json();
      })
      .then((data) => data?.data || [])
      .catch((error) => {
        propertyTypesPromise = null;
        throw error;
      });
  }

  return propertyTypesPromise;
};

/*
|--------------------------------------------------------------------------
| Fetch Space Uses
|--------------------------------------------------------------------------
*/

const fetchSpaceUsesCached = async (typeId) => {
  if (!typeId) {
    return [];
  }

  if (!spaceUsesPromiseCache.has(typeId)) {
    const request = fetch(
      `${SPACE_USES_API}?type_id=${typeId}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unable to fetch space uses");
        }

        return res.json();
      })
      .then((data) => data?.data || [])
      .catch((error) => {
        spaceUsesPromiseCache.delete(typeId);
        throw error;
      });

    spaceUsesPromiseCache.set(typeId, request);
  }

  return spaceUsesPromiseCache.get(typeId);
};

const SearchBar = ({
  filters,
  setFilters,
  onSearch,
  hideAdvancedFilters = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [types, setTypes] = useState([]);
  const [spaceUses, setSpaceUses] = useState([]);

  const [showPrice, setShowPrice] = useState(false);
  const [showSize, setShowSize] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [openGroups, setOpenGroups] = useState({});

  const autoRef = useRef(null);

  /*
  |--------------------------------------------------------------------------
  | Selected Space IDs
  |--------------------------------------------------------------------------
  */

  const selectedParentIds = Array.isArray(
    filters.space_use
  )
    ? filters.space_use
    : [];

  const selectedChildIds = Array.isArray(
    filters.space_use_id
  )
    ? filters.space_use_id
    : [];

  /*
  |--------------------------------------------------------------------------
  | Load Property Types
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let mounted = true;

    const loadTypes = async () => {
      try {
        const data =
          await fetchPropertyTypes();

        if (mounted) {
          setTypes(data);
        }
      } catch (error) {
        console.error(
          "Property types error:",
          error
        );
      }
    };

    loadTypes();

    return () => {
      mounted = false;
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Auto-select first property type
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (
      types.length > 0 &&
      !filters.type
    ) {
      const firstType = types[0];

      const firstId =
        firstType._id ||
        firstType.id;

      const updated = {
        ...filters,
        customer_email:
          localStorage.getItem(
            "customer_email"
          ) || null,
        type: firstId,
        type_name:
          firstType?.name || "",
      };

      setFilters(updated);

      loadSpaceUses(firstId);
    }
  }, [types]);

  /*
  |--------------------------------------------------------------------------
  | Load Space Uses
  |--------------------------------------------------------------------------
  */

  const loadSpaceUses = async (typeId) => {
    if (!typeId) {
      setSpaceUses([]);
      return;
    }

    try {
      const rawData =
        await fetchSpaceUsesCached(
          typeId
        );

      const tree =
        buildTree(rawData);

      setSpaceUses(tree);
    } catch (error) {
      console.error(
        "Space uses error:",
        error
      );

      setSpaceUses([]);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Toggle Space Use Node
  |--------------------------------------------------------------------------
  */

  const toggleNode = (
    node,
    checked
  ) => {
    let parentIds =
      Array.isArray(
        filters.space_use
      )
        ? [...filters.space_use]
        : [];

    let childIds =
      Array.isArray(
        filters.space_use_id
      )
        ? [...filters.space_use_id]
        : [];

    const hasChildren =
      node.children &&
      node.children.length > 0;

    const getAllChildIds = (
      item
    ) => {
      let ids = [];

      item.children?.forEach(
        (c) => {
          ids.push(c.id);

          if (
            c.children?.length
          ) {
            ids = ids.concat(
              getAllChildIds(c)
            );
          }
        }
      );

      return ids;
    };

    if (hasChildren) {
      const allChildIds =
        getAllChildIds(node);

      if (checked) {
        if (
          !parentIds.includes(
            node.id
          )
        ) {
          parentIds.push(
            node.id
          );
        }

        allChildIds.forEach(
          (id) => {
            if (
              !childIds.includes(id)
            ) {
              childIds.push(id);
            }
          }
        );
      } else {
        parentIds =
          parentIds.filter(
            (id) =>
              id !== node.id
          );

        childIds =
          childIds.filter(
            (id) =>
              !allChildIds.includes(
                id
              )
          );
      }
    } else {
      if (checked) {
        if (
          !parentIds.includes(
            node.id
          )
        ) {
          parentIds.push(
            node.id
          );
        }
      } else {
        parentIds =
          parentIds.filter(
            (id) =>
              id !== node.id
          );
      }
    }

    const newFilters = {
      ...filters,
      space_use: parentIds,
      space_use_id: childIds,
    };

    setFilters(
      newFilters
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Build Tree
  |--------------------------------------------------------------------------
  */

  const buildTree = (
    data
  ) => {
    const map = {};
    const roots = [];

    data.forEach(
      (item) => {
        const id =
          item._id ||
          item.id;

        map[id] = {
          ...item,
          id,
          children: [],
        };
      }
    );

    data.forEach(
      (item) => {
        const id =
          item._id ||
          item.id;

        const parent =
          item.parent_id;

        if (
          parent &&
          map[parent]
        ) {
          map[
            parent
          ].children.push(
            map[id]
          );
        } else {
          roots.push(
            map[id]
          );
        }
      }
    );

    return roots;
  };

  /*
  |--------------------------------------------------------------------------
  | Selected Space Label
  |--------------------------------------------------------------------------
  */

  const getSelectedLabel =
    () => {
      if (
        selectedParentIds.length ===
        0
      ) {
        return "Property Types";
      }

      if (
        selectedParentIds.length >
        1
      ) {
        return "Multiple Types";
      }

      const selected =
        spaceUses.find(
          (item) =>
            selectedParentIds.includes(
              item.id
            )
        );

      return (
        selected?.name ||
        "Property Types"
      );
    };

  /*
  |--------------------------------------------------------------------------
  | Render Space Tree
  |--------------------------------------------------------------------------
  */

  const renderTree = (
    items
  ) => {
    return items.map(
      (item) => {
        const id = item.id;

        const isOpen =
          !!openGroups[id];

        const hasChildren =
          item.children &&
          item.children.length >
            0;

        const isParentChecked =
          selectedParentIds.includes(
            id
          );

        return (
          <div
            key={id}
            className="border-b border-slate-100 last:border-0"
          >
            <div
              className="
                flex
                items-center
                justify-between
                rounded-xl
                px-3
                py-2.5
                transition-all
                duration-200
                hover:bg-sky-50
              "
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={
                    isParentChecked
                  }
                  onChange={(e) =>
                    toggleNode(
                      item,
                      e.target.checked
                    )
                  }
                  className="
                    h-4
                    w-4
                    cursor-pointer
                    accent-sky-600
                  "
                />

                <span className="text-sm font-medium text-slate-700">
                  {item.name}
                </span>
              </div>

              {hasChildren && (
                <button
                  type="button"
                  onClick={() =>
                    setOpenGroups(
                      (prev) => ({
                        ...prev,
                        [id]:
                          !prev[id],
                      })
                    )
                  }
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    bg-slate-100
                    text-[10px]
                    text-slate-500
                    transition-all
                    duration-200
                    hover:bg-sky-100
                    hover:text-sky-600
                  "
                >
                  {isOpen
                    ? "▲"
                    : "▼"}
                </button>
              )}
            </div>

            {isOpen &&
              hasChildren && (
                <div className="mx-2 mb-2 rounded-xl bg-slate-50 p-2">
                  {item.children.map(
                    (child) => {
                      const cid =
                        child.id;

                      return (
                        <label
                          key={cid}
                          className="
                            flex
                            cursor-pointer
                            items-center
                            gap-3
                            rounded-lg
                            px-3
                            py-2
                            text-sm
                            text-slate-600
                            transition-all
                            duration-200
                            hover:bg-white
                            hover:text-sky-600
                          "
                        >
                          <input
                            type="checkbox"
                            checked={selectedChildIds.includes(
                              cid
                            )}
                            onChange={(
                              e
                            ) =>
                              toggleNode(
                                child,
                                e
                                  .target
                                  .checked
                              )
                            }
                            className="
                              h-4
                              w-4
                              accent-sky-600
                            "
                          />

                          {child.name}
                        </label>
                      );
                    }
                  )}
                </div>
              )}
          </div>
        );
      }
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Common Field Style
  |--------------------------------------------------------------------------
  */

  const fieldClass = `
    h-[58px]
    w-full
    rounded-2xl
    border
    border-slate-200
    bg-slate-50/70
    text-sm
    text-slate-700
    outline-none
    transition-all
    duration-300
    hover:border-slate-300
    hover:bg-white
    focus:border-sky-500
    focus:bg-white
    focus:ring-4
    focus:ring-sky-100
  `;

  return (
    <div className="w-full px-0 sm:px-0">

      {/* =====================================================
          OUTER SEARCH CARD
      ====================================================== */}
      <div
        className="
          relative
          overflow-visible
          rounded-[28px]
          border
          border-white
          bg-white
          p-1.5
          shadow-[0_20px_60px_rgba(15,23,42,0.10)]
          sm:p-2
        "
      >

        {/* INNER CARD */}
        <div
          className="
            rounded-[22px]
            border
            border-slate-100
            bg-white
          "
        >

          {/* =================================================
              HEADER
          ================================================== */}
          <div
            className="
              flex
              flex-col
              gap-3
              px-4
              pt-4
              sm:px-6
              sm:pt-5
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            <div>
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-sky-100
                    text-sky-600
                    shadow-sm
                  "
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d="M21 10.5C21 16.5 12 22 12 22S3 16.5 3 10.5a9 9 0 1118 0z"
                    />

                    <circle
                      cx="12"
                      cy="10"
                      r="2.8"
                      strokeWidth="1.8"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="text-[15px] font-bold tracking-tight text-slate-900 sm:text-lg">
                    Find Your Perfect Property
                  </h3>

                  <p className="mt-0.5 text-[11px] text-slate-400 sm:text-sm">
                    Search properties that match your needs
                  </p>
                </div>
              </div>
            </div>

            {/* SMART SEARCH BADGE */}
            <div
              className="
                hidden
                items-center
                gap-2
                rounded-full
                border
                border-sky-100
                bg-sky-50
                px-4
                py-2
                text-xs
                font-semibold
                text-sky-600
                lg:flex
              "
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-60" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500" />
              </span>

              Smart Property Search
            </div>
          </div>

          {/* =================================================
              SEARCH AREA
          ================================================== */}
          <div className="p-3 sm:p-5 lg:p-6">

            <div
              className={`grid grid-cols-1 gap-3 ${
                hideAdvancedFilters
                  ? "lg:grid-cols-[1.7fr_1fr_1fr_auto]"
                  : "lg:grid-cols-[1.55fr_1fr_1fr_1fr_1fr]"
              }`}
            >

              {/* =================================================
                  LOCATION
              ================================================== */}
              <div className="group relative">
                <div
                  className="
                    pointer-events-none
                    absolute
                    left-3.5
                    top-1/2
                    z-10
                    flex
                    h-8
                    w-8
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-lg
                    bg-sky-100
                    text-sky-600
                    transition-all
                    duration-300
                    group-focus-within:bg-sky-600
                    group-focus-within:text-white
                  "
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 21a2 2 0 01-2.828 0l-4.243-4.343a8 8 0 1111.314 0z"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>

                <Autocomplete
                  onLoad={(ref) =>
                    (autoRef.current =
                      ref)
                  }
                  onPlaceChanged={() => {
                    const place =
                      autoRef.current?.getPlace();

                    if (
                      place?.formatted_address
                    ) {
                      setFilters(
                        (prev) => ({
                          ...prev,
                          location:
                            place.formatted_address,
                          latitude:
                            place
                              .geometry
                              .location.lat(),
                          longitude:
                            place
                              .geometry
                              .location.lng(),
                          location_selected: true,
                        })
                      );
                    }
                  }}
                >
                  <input
                    type="text"
                    placeholder="Search location"
                    className={`${fieldClass} pl-14 pr-4 pt-4 sm:pl-16`}
                    value={
                      filters.location ||
                      ""
                    }
                    onChange={(e) =>
                      setFilters(
                        (prev) => ({
                          ...prev,
                          location:
                            e.target
                              .value,
                          location_selected:
                            false,
                        })
                      )
                    }
                  />
                </Autocomplete>

                <span
                  className="
                    pointer-events-none
                    absolute
                    left-14
                    top-2
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-slate-400
                    sm:left-16
                    sm:text-[9px]
                  "
                >
                  Location
                </span>
              </div>

              {/* =================================================
                  PROPERTY TYPE
              ================================================== */}
              <div className="group relative">
                <div
                  className="
                    pointer-events-none
                    absolute
                    left-3.5
                    top-1/2
                    z-10
                    flex
                    h-8
                    w-8
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-lg
                    bg-sky-100
                    text-sky-600
                  "
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-5h6v5M9 10h.01M15 10h.01"
                    />
                  </svg>
                </div>

                <select
                  name="type"
                  id="type"
                  className={`${fieldClass} cursor-pointer appearance-none pl-14 pr-10 pt-4 sm:pl-16`}
                  value={
                    filters.type ||
                    ""
                  }
                  onChange={async (e) => {
                    const value =
                      e.target.value;

                    const selectedType =
                      types.find(
                        (t) =>
                          (t._id ||
                            t.id) ===
                          value
                      );

                    const updated =
                      {
                        ...filters,
                        type: value,
                        type_name:
                          selectedType?.name ||
                          "",
                        section_id:
                          [],
                      };

                    setFilters(
                      updated
                    );

                    await loadSpaceUses(
                      value
                    );
                  }}
                >
                  <option value="">
                    Property
                  </option>

                  {types.map(
                    (t) => (
                      <option
                        key={
                          t._id ||
                          t.id
                        }
                        value={
                          t._id ||
                          t.id
                        }
                      >
                        {t.name}
                      </option>
                    )
                  )}
                </select>

                <span
                  className="
                    pointer-events-none
                    absolute
                    left-14
                    top-2
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-slate-400
                    sm:left-16
                    sm:text-[9px]
                  "
                >
                  Property Type
                </span>

                <svg
                  className="
                    pointer-events-none
                    absolute
                    right-4
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-slate-400
                  "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* =================================================
                  SPACE USE
              ================================================== */}
              <div className="relative">
                <SpaceUseDropdown
                  spaceUses={
                    spaceUses
                  }
                  renderTree={
                    renderTree
                  }
                  buttonLabel={
                    getSelectedLabel()
                  }
                />
              </div>

              {/* =================================================
                  PRICE
              ================================================== */}
              {!hideAdvancedFilters &&
                filters.type_name && (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPrice(
                          !showPrice
                        );
                        setShowSize(
                          false
                        );
                      }}
                      className={`${fieldClass} flex items-center justify-between px-3.5 text-left sm:px-4`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8c-2.21 0-4 1.12-4 2.5S9.79 13 12 13s4 1.12 4 2.5S14.21 18 12 18m0-12v12m-4-9H7m10 0h-1"
                            />
                          </svg>
                        </div>

                        <div className="min-w-0">
                          <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">
                            Budget
                          </span>

                          <span
                            className={`block max-w-[130px] truncate text-sm font-semibold ${
                              filters.min_price ||
                              filters.max_price
                                ? "text-slate-800"
                                : "text-slate-500"
                            }`}
                          >
                            {filters.min_price ||
                            filters.max_price
                              ? `${filters.min_price || 0} - ${
                                  filters.max_price || 0
                                }`
                              : filters.type_name
                                  ?.toLowerCase()
                                  .includes(
                                    "sale"
                                  )
                              ? "Price"
                              : "Rent"}
                          </span>
                        </div>
                      </div>

                      <svg
                        className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 ${
                          showPrice
                            ? "rotate-180"
                            : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {showPrice && (
                      <div
                        className="
                          absolute
                          left-0
                          right-0
                          top-[64px]
                          z-[100]
                          rounded-2xl
                          border
                          border-slate-100
                          bg-white
                          p-4
                          shadow-[0_20px_50px_rgba(15,23,42,0.18)]
                        "
                      >
                        <div className="mb-4">
                          <h4 className="text-sm font-bold text-slate-800">
                            Price Range
                          </h4>

                          <p className="mt-0.5 text-xs text-slate-400">
                            Choose your preferred budget
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <input
                            placeholder="Min"
                            className="
                              h-11
                              rounded-xl
                              border
                              border-slate-200
                              bg-slate-50
                              px-3
                              text-sm
                              outline-none
                              transition-all
                              focus:border-sky-500
                              focus:bg-white
                              focus:ring-4
                              focus:ring-sky-100
                            "
                            value={
                              filters.min_price ||
                              ""
                            }
                            onChange={(e) =>
                              setFilters(
                                {
                                  ...filters,
                                  min_price:
                                    e.target
                                      .value,
                                }
                              )
                            }
                          />

                          <input
                            placeholder="Max"
                            className="
                              h-11
                              rounded-xl
                              border
                              border-slate-200
                              bg-slate-50
                              px-3
                              text-sm
                              outline-none
                              transition-all
                              focus:border-sky-500
                              focus:bg-white
                              focus:ring-4
                              focus:ring-sky-100
                            "
                            value={
                              filters.max_price ||
                              ""
                            }
                            onChange={(e) =>
                              setFilters(
                                {
                                  ...filters,
                                  max_price:
                                    e.target
                                      .value,
                                }
                              )
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

              {/* =================================================
                  SIZE
              ================================================== */}
              {!hideAdvancedFilters && (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setShowSize(
                        !showSize
                      );
                      setShowPrice(
                        false
                      );
                    }}
                    className={`${fieldClass} flex items-center justify-between px-3.5 text-left sm:px-4`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                            d="M4 4h16v16H4zM8 4v4M12 4v3M16 4v4M4 8h4M4 12h3M4 16h4"
                          />
                        </svg>
                      </div>

                      <div className="min-w-0">
                        <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">
                          Area
                        </span>

                        <span
                          className={`block max-w-[130px] truncate text-sm font-semibold ${
                            filters.building_min_size ||
                            filters.building_max_size
                              ? "text-slate-800"
                              : "text-slate-500"
                          }`}
                        >
                          {filters.building_min_size ||
                          filters.building_max_size
                            ? `${
                                filters.building_min_size ||
                                0
                              } - ${
                                filters.building_max_size ||
                                0
                              } sqft`
                            : "Building Size"}
                        </span>
                      </div>
                    </div>

                    <svg
                      className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 ${
                        showSize
                          ? "rotate-180"
                          : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {showSize && (
                    <div
                      className="
                        absolute
                        left-0
                        right-0
                        top-[64px]
                        z-[100]
                        rounded-2xl
                        border
                        border-slate-100
                        bg-white
                        p-4
                        shadow-[0_20px_50px_rgba(15,23,42,0.18)]
                      "
                    >
                      <div className="mb-4">
                        <h4 className="text-sm font-bold text-slate-800">
                          Building Size
                        </h4>

                        <p className="mt-0.5 text-xs text-slate-400">
                          Select your preferred area
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          placeholder="Min SF"
                          className="
                            h-11
                            rounded-xl
                            border
                            border-slate-200
                            bg-slate-50
                            px-3
                            text-sm
                            outline-none
                            transition-all
                            focus:border-sky-500
                            focus:bg-white
                            focus:ring-4
                            focus:ring-sky-100
                          "
                          value={
                            filters.building_min_size ||
                            ""
                          }
                          onChange={(e) =>
                            setFilters(
                              {
                                ...filters,
                                building_min_size:
                                  e.target
                                    .value,
                              }
                            )
                          }
                        />

                        <input
                          placeholder="Max SF"
                          className="
                            h-11
                            rounded-xl
                            border
                            border-slate-200
                            bg-slate-50
                            px-3
                            text-sm
                            outline-none
                            transition-all
                            focus:border-sky-500
                            focus:bg-white
                            focus:ring-4
                            focus:ring-sky-100
                          "
                          value={
                            filters.building_max_size ||
                            ""
                          }
                          onChange={(e) =>
                            setFilters(
                              {
                                ...filters,
                                building_max_size:
                                  e.target
                                    .value,
                              }
                            )
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* =================================================
                BOTTOM ACTION BAR
            ================================================== */}
            <div className="mt-3 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">

              {/* INFO */}
              <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
                <svg
                  className="h-4 w-4 text-slate-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-8h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>

                Refine your search using advanced filters
              </div>

              {/* BUTTONS */}
              <div className="flex w-full gap-2 sm:w-auto">

                {/* ALL FILTERS */}
                {!hideAdvancedFilters && (
                  <button
                    type="button"
                    onClick={() =>
                      setShowModal(
                        true
                      )
                    }
                    className="
                      flex
                      h-12
                      flex-1
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-4
                      text-sm
                      font-semibold
                      text-slate-700
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:border-sky-300
                      hover:bg-sky-50
                      hover:text-sky-600
                      sm:flex-none
                    "
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5h18M6 12h12M10 19h4"
                      />
                    </svg>

                    <span>
                      All Filters
                    </span>
                  </button>
                )}

                {/* CLEAR */}
                {!hideAdvancedFilters && (
                  <button
                    type="button"
                    onClick={() => {
                      const resetFilters =
                        {
                          location:
                            "",
                          type:
                            "",
                          type_name:
                            "",
                          space_use:
                            [],
                          space_use_id:
                            [],
                          listing_type:
                            "",
                          min_price:
                            "",
                          max_price:
                            "",
                          land_size_min:
                            "",
                          land_size_max:
                            "",
                          building_size_min:
                            "",
                          building_size_max:
                            "",
                          year_built_min:
                            "",
                          year_built_max:
                            "",
                        };

                      setFilters(
                        resetFilters
                      );

                      setSpaceUses(
                        []
                      );

                      setShowPrice(
                        false
                      );

                      setShowSize(
                        false
                      );
                    }}
                    className="
                      flex
                      h-12
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      px-4
                      text-sm
                      font-semibold
                      text-slate-500
                      transition-all
                      duration-300
                      hover:bg-slate-100
                      hover:text-slate-700
                      active:scale-95
                    "
                  >
                    Clear
                  </button>
                )}

                {/* SEARCH */}
                <button
                  type="button"
                  onClick={() => {
                    navigate(
                      "/properties",
                      {
                        state: {
                          filters,
                        },
                      }
                    );
                  }}
                  className="
                    group
                    flex
                    h-12
                    flex-1
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-sky-600
                    px-5
                    text-sm
                    font-bold
                    text-white
                    shadow-[0_8px_20px_rgba(2,132,199,0.22)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-sky-700
                    hover:shadow-[0_12px_28px_rgba(2,132,199,0.30)]
                    active:translate-y-0
                    sm:flex-none
                    sm:px-6
                  "
                >
                  <svg
                    className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-4.35-4.35m2.35-5.65a8 8 0 11-16 0 8 8 0 0116 0z"
                    />
                  </svg>

                  Search Properties
                </button>
              </div>
            </div>
          </div>

          {/* MOBILE FOOTER */}
          <div className="flex items-center justify-center gap-1.5 px-2 pb-3 text-center text-[10px] text-slate-400 sm:hidden">
            <span>⌕</span>

            <span>
              Search homes, offices, land & more
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          FILTER MODAL
      ====================================================== */}
      {showModal && (
        <FilterModal
          filters={filters}
          setFilters={setFilters}
          onClose={() =>
            setShowModal(false)
          }
          onSearch={onSearch}
        />
      )}
    </div>
  );
};

export default SearchBar;