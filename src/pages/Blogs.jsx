import React, { useEffect, useState, useRef } from "react";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const blogRef = useRef(null);
  const totalBlogs = blogs.length;
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const currentBlogs = blogs.slice(startIndex, endIndex);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    blogRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8001/api/blogs");
      const data = await res.json();

      const filtered = (data.data || []).filter((item) => item.type === "blog");

      setBlogs(filtered);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={blogRef} className="max-w-[1200px] mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Latest Blogs</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : currentBlogs.length > 0 ? (
          currentBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <p className="text-gray-500">No Blogs Found</p>
        )}
      </div>

      {!loading && blogs.length > 0 && (
        <div className="flex justify-between items-center mt-10 text-sm text-gray-500">

          {/* Showing text */}
          <p>
            Showing{" "}
            <span className="font-medium text-gray-700">
              {startIndex + 1}
            </span>{" "} - {" "}
            <span className="font-medium text-gray-700">
              {Math.min(endIndex, totalBlogs)}
            </span>{" "} of {" "}
            <span className="font-medium text-gray-700">
              {totalBlogs}
            </span>
          </p>

          {/* Buttons */}
          <div className="flex gap-2">

            {/* PREV */}
            <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}
              className="w-10 h-10 rounded-full border hover:bg-sky-500 hover:text-white transition disabled:opacity-40">
              ←
            </button>

            {/* NEXT */}
            <button disabled={endIndex >= totalBlogs} onClick={() => setCurrentPage((p) => p + 1)}
              className="w-10 h-10 rounded-full border hover:bg-sky-500 hover:text-white transition disabled:opacity-40">
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
