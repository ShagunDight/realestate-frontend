import React, {
  useEffect,
  useState,
  useRef,
} from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 6;

  const blogRef = useRef(null);

  const totalBlogs = blogs.length;

  const startIndex =
    (currentPage - 1) *
    blogsPerPage;

  const endIndex =
    startIndex +
    blogsPerPage;

  const currentBlogs =
    blogs.slice(
      startIndex,
      endIndex
    );

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    blogRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [currentPage]);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(
        "https://lightblue-moose-690494.hostingersite.com/api/blogs"
      );

      const data =
        await res.json();

      const filtered = (
        data.data || []
      ).filter(
        (item) =>
          item.type === "blog"
      );

      setBlogs(filtered);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(
    totalBlogs /
      blogsPerPage
  );

  return (
    <section
      ref={blogRef}
      className="
        relative
        overflow-hidden
        bg-white
        px-4
        py-12
        sm:px-6
        sm:py-14
        lg:px-8
        lg:py-16
      "
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-sky-50 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-blue-50 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px]">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-9 flex flex-col gap-4 sm:mb-10 md:flex-row md:items-end md:justify-between">

          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />

              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-500 sm:text-xs">
                Property Insights
              </p>
            </div>

            <h1 className="text-3xl font-extrabold tracking-[-0.03em] text-gray-900 sm:text-4xl lg:text-[42px]">
              Latest Blogs
            </h1>

            <p className="mt-3 max-w-xl text-xs leading-6 text-gray-500 sm:text-sm sm:leading-7">
              Explore the latest property insights,
              real-estate trends and useful ideas from
              Estatein.
            </p>
          </div>

          {blogs.length > 0 && (
            <div className="hidden items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-2.5 text-xs font-semibold text-sky-600 sm:flex">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              {totalBlogs} Articles
            </div>
          )}
        </div>

        {/* =====================================================
            LOADING
        ====================================================== */}

        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3, 4, 5, 6].map(
              (item) => (
                <div
                  key={item}
                  className="
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-gray-100
                    bg-white
                    shadow-sm
                  "
                >
                  <div className="h-52 animate-pulse bg-gray-100" />

                  <div className="space-y-3 p-5">
                    <div className="h-3 w-24 animate-pulse rounded-full bg-gray-100" />

                    <div className="h-5 w-4/5 animate-pulse rounded bg-gray-100" />

                    <div className="h-3 w-full animate-pulse rounded bg-gray-100" />

                    <div className="h-3 w-2/3 animate-pulse rounded bg-gray-100" />
                  </div>
                </div>
              )
            )}

          </div>
        ) : currentBlogs.length > 0 ? (
          <>
            {/* =================================================
                BLOG GRID
            ================================================== */}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">

              {currentBlogs.map(
                (blog) => (
                  <div
                    key={
                      blog.id ||
                      blog._id
                    }
                    className="
                      group
                      h-full
                      rounded-[24px]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                    "
                  >
                    <BlogCard
                      blog={blog}
                    />
                  </div>
                )
              )}

            </div>

            {/* =================================================
                PAGINATION
            ================================================== */}

            {blogs.length > 0 && (
              <div
                className="
                  mt-9
                  flex
                  flex-col
                  gap-4
                  border-t
                  border-gray-100
                  pt-6
                  sm:mt-10
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >

                {/* SHOWING TEXT */}

                <p className="text-center text-xs font-medium text-gray-400 sm:text-left">
                  Showing{" "}
                  <span className="font-bold text-gray-800">
                    {startIndex + 1}
                  </span>{" "}
                  -{" "}
                  <span className="font-bold text-gray-800">
                    {Math.min(
                      endIndex,
                      totalBlogs
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-gray-800">
                    {totalBlogs}
                  </span>
                </p>

                {/* CONTROLS */}

                <div className="flex items-center justify-center gap-2">

                  <button
                    type="button"
                    disabled={
                      currentPage === 1
                    }
                    onClick={() =>
                      setCurrentPage(
                        (p) =>
                          Math.max(
                            p - 1,
                            1
                          )
                      )
                    }
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      text-gray-500
                      shadow-sm
                      transition-all
                      duration-300
                      hover:border-sky-200
                      hover:bg-sky-50
                      hover:text-sky-500
                      active:scale-95
                      disabled:cursor-not-allowed
                      disabled:opacity-30
                    "
                    aria-label="Previous page"
                  >
                    <FiArrowLeft size={16} />
                  </button>

                  {/* PAGE NUMBER */}

                  <div className="flex h-10 min-w-[72px] items-center justify-center rounded-xl border border-sky-100 bg-sky-50 px-4 text-xs font-bold text-sky-600">
                    {String(
                      currentPage
                    ).padStart(2, "0")}{" "}
                    /{" "}
                    {String(
                      totalPages
                    ).padStart(2, "0")}
                  </div>

                  <button
                    type="button"
                    disabled={
                      endIndex >=
                      totalBlogs
                    }
                    onClick={() =>
                      setCurrentPage(
                        (p) =>
                          p + 1
                      )
                    }
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      text-gray-500
                      shadow-sm
                      transition-all
                      duration-300
                      hover:border-sky-200
                      hover:bg-sky-50
                      hover:text-sky-500
                      active:scale-95
                      disabled:cursor-not-allowed
                      disabled:opacity-30
                    "
                    aria-label="Next page"
                  >
                    <FiArrowRight size={16} />
                  </button>

                </div>
              </div>
            )}
          </>
        ) : (
          /* =================================================
             EMPTY STATE
          ================================================== */

          <div
            className="
              rounded-[26px]
              border
              border-gray-100
              bg-white
              px-6
              py-14
              text-center
              shadow-sm
            "
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-500">
              <span className="text-xl">
                B
              </span>
            </div>

            <h3 className="mt-4 text-base font-bold text-gray-800">
              No Blogs Found
            </h3>

            <p className="mt-1 text-xs text-gray-400">
              There are currently no blog articles available.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default Blogs;