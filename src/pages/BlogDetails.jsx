import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../components/Footer";

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    fetch(`https://lightblue-moose-690494.hostingersite.com/api/blogs/${slug}`)
      .then((res) => res.json())
      .then((data) => setBlog(data.data));
  }, [slug]);

  useEffect(() => {
    fetch(`https://lightblue-moose-690494.hostingersite.com/api/blogs`)
      .then((res) => res.json())
      .then((data) => setAllBlogs(data.data || []));
  }, []);

  if (!blog)
    return (
      <div className="p-10 text-center text-gray-500">Loading...</div>
    );

  const filteredBlogs = allBlogs.filter(
    (item) => item.slug !== slug && item.type === "market_news"
  );

  const relatedBlogs = allBlogs.filter(
    (item) => item.slug !== slug && item.type === "blog"
  );

  return (
    <>
      {/* HERO */}
      <div className="relative w-full h-[350px] md:h-[420px] bg-gray-900">
        <img
          src={`https://lightblue-moose-690494.hostingersite.com/public${blog.image}`}
          className="w-full h-full object-cover opacity-60"
        />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-5xl mx-auto px-6 pb-10 text-white">
            <p className="text-sky-300 text-sm mb-2">Blog Article</p>
            <h1 className="text-2xl md:text-4xl font-bold leading-snug">
              {blog.title?.replace(/[\r\n]+/g, "").trim()}
            </h1>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2">
            
            {/* CONTENT CARD */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              
              <div
                className="prose max-w-none prose-sky prose-headings:text-gray-800 prose-p:text-gray-600"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

            {/* RELATED BLOGS */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Related Blogs
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedBlogs.slice(0, 4).map((item) => (
                  <Link
                    key={item.id}
                    to={`/blog/${item.slug}`}
                    className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition"
                  >
                    <img
                      src={`https://lightblue-moose-690494.hostingersite.com/public${item.image}`}
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-4">
                      <p className="text-sm font-medium text-gray-800 line-clamp-2">
                        {item.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            
            {/* RECENT NEWS */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 sticky top-32 shadow-sm">
              <h3 className="text-lg font-semibold text-sky-600 mb-4">
                Recent News
              </h3>

              <div className="space-y-4">
                {filteredBlogs.slice(0, 5).map((item) => (
                  <Link
                    key={item.id}
                    to={`/blog/${item.slug}`}
                    className="flex gap-3 items-center hover:bg-gray-50 p-2 rounded-lg transition"
                  >
                    <img
                      src={`https://lightblue-moose-690494.hostingersite.com/public${item.image}`}
                      className="w-16 h-16 rounded-lg object-cover"
                    />

                    <div>
                      <p className="text-sm font-medium text-gray-800 line-clamp-2">
                        {item.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* INFO BOX */}
            <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5">
              <h4 className="text-sky-700 font-semibold mb-2">
                Real Estate Insights
              </h4>
              <p className="text-sm text-gray-600">
                Get latest updates about commercial property, valuation methods and investment strategies.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BlogDetails;