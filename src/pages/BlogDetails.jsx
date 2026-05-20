import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../components/Footer";

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);

  // Current Blog
  useEffect(() => {
    fetch(`https://lightblue-moose-690494.hostingersite.com/api/blogs/${slug}`)
      .then((res) => res.json())
      .then((data) => setBlog(data.data));
  }, [slug]);

  // All Blogs
  useEffect(() => {
    fetch(`https://lightblue-moose-690494.hostingersite.com/api/blogs`)
      .then((res) => res.json())
      .then((data) => setAllBlogs(data.data || []));
  }, []);

  if (!blog) return <p className="p-6">Loading...</p>;

  const filteredBlogs = allBlogs.filter(
    (item) => item.slug !== slug && item.type === "market_news",
  );

  return (
    <>
      <div className="w-full px-6 md:px-16 py-10">
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT → BLOG CONTENT */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4"> {blog.title?.replace(/[\r\n]+/g, "").trim()} </h1>

            <img src={`https://lightblue-moose-690494.hostingersite.com/public${blog.image}`} className="w-full h-[350px] object-cover rounded-lg mb-6" />

            <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content }} ></div>
          </div>

          {/* RIGHT → SIDEBAR */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <h3 className="text-xl font-semibold mb-4 text-sky-500">
                Recent News
              </h3>

              <div className="flex flex-col gap-4">
                {filteredBlogs.slice(0, 5).map((item) => (
                    <Link key={item.id} to={`/blog/${item.slug}`} className="bg-white border border-sky-100 rounded-xl p-3 hover:shadow-md transition flex gap-3">
                      <img src={`https://lightblue-moose-690494.hostingersite.com/public${item.image}`} className="w-20 h-20 object-cover rounded-md" />

                      <p className="text-sm font-semibold text-gray-800 line-clamp-2">
                        {item.title}
                      </p>
                    </Link>
                  ))
                }
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allBlogs
              .filter((item) => item.slug !== slug && item.type === "blog")
              .map((item) => (
                <Link key={item.id} to={`/blog/${item.slug}`} className="bg-white border border-sky-100 rounded-xl overflow-hidden hover:shadow-lg transition">
                  <img src={`https://lightblue-moose-690494.hostingersite.com/public${item.image}`} className="w-full h-40 object-cover" />

                  <div className="p-4">
                    <p className="text-sm font-semibold text-gray-800 line-clamp-2">
                      {item.title}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BlogDetails;
