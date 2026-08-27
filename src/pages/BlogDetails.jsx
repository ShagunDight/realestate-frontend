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

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-4 border-4 border-sky-100 border-t-sky-500 rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading article...</p>
        </div>
      </div>
    );
  }

  const filteredBlogs = allBlogs.filter(
    (item) => item.slug !== slug && item.type === "market_news"
  );

  const relatedBlogs = allBlogs.filter(
    (item) => item.slug !== slug && item.type === "blog"
  );

  return (
    <>
      {/* HERO */}
      <section className="relative w-full h-[360px] sm:h-[400px] md:h-[470px] overflow-hidden bg-gray-900">
        <img
          src={`https://lightblue-moose-690494.hostingersite.com/public${blog.image}`}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover scale-[1.01]"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

        {/* Hero Content */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex items-end">
          <div className="w-full max-w-4xl pb-9 sm:pb-12 md:pb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-sky-300" />
              <p className="text-sky-300 text-xs sm:text-sm font-semibold uppercase tracking-[0.15em]">
                Blog Article
              </p>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white tracking-tight">
              {blog.title?.replace(/[\r\n]+/g, "").trim()}
            </h1>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="bg-gray-50/70">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            
            {/* LEFT CONTENT */}
            <div className="lg:col-span-2 min-w-0">
              
              {/* CONTENT CARD */}
              <article className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 sm:p-7 md:p-9 lg:p-10">
                  <div
                    className="
                      prose prose-sky max-w-none
                      prose-headings:text-gray-900
                      prose-headings:font-bold
                      prose-h2:text-2xl
                      prose-h3:text-xl
                      prose-p:text-gray-600
                      prose-p:leading-7
                      prose-a:text-sky-600
                      prose-strong:text-gray-800
                      prose-img:rounded-2xl
                      prose-img:w-full
                      prose-blockquote:border-sky-400
                      prose-blockquote:text-gray-600
                      prose-li:text-gray-600
                    "
                    dangerouslySetInnerHTML={{
                      __html: blog.content,
                    }}
                  />
                </div>
              </article>

              {/* RELATED BLOGS */}
              {relatedBlogs.length > 0 && (
                <section className="mt-10 sm:mt-12">
                  <div className="flex items-end justify-between gap-4 mb-5">
                    <div>
                      <p className="text-sky-500 text-xs font-semibold uppercase tracking-widest mb-1">
                        Explore More
                      </p>

                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Related Blogs
                      </h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {relatedBlogs.slice(0, 4).map((item) => (
                      <Link
                        key={item.id}
                        to={`/blog/${item.slug}`}
                        className="
                          group bg-white border border-gray-100
                          rounded-2xl overflow-hidden
                          shadow-sm hover:shadow-lg
                          transition-all duration-300
                        "
                      >
                        <div className="relative h-40 sm:h-44 overflow-hidden">
                          <img
                            src={`https://lightblue-moose-690494.hostingersite.com/public${item.image}`}
                            alt={item.title}
                            className="
                              w-full h-full object-cover
                              transition-transform duration-500
                              group-hover:scale-105
                            "
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>

                        <div className="p-4 sm:p-5">
                          <p className="text-sm sm:text-base font-semibold text-gray-800 leading-6 line-clamp-2 group-hover:text-sky-600 transition-colors duration-300">
                            {item.title}
                          </p>

                          <div className="mt-3 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-sky-600">
                            Read Article
                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                              →
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="lg:col-span-1">
              <div className="space-y-6 lg:sticky lg:top-28">
                
                {/* RECENT NEWS */}
                <div className="bg-white border border-gray-100 rounded-2xl md:rounded-3xl p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-1 h-6 bg-sky-500 rounded-full" />

                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                        Latest Updates
                      </p>

                      <h3 className="text-lg font-bold text-gray-900">
                        Recent News
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {filteredBlogs.slice(0, 5).map((item) => (
                      <Link
                        key={item.id}
                        to={`/blog/${item.slug}`}
                        className="
                          group flex gap-3 items-center
                          p-2.5 -mx-1 rounded-xl
                          hover:bg-gray-50
                          transition-colors duration-200
                        "
                      >
                        <div className="relative flex-shrink-0 overflow-hidden rounded-xl">
                          <img
                            src={`https://lightblue-moose-690494.hostingersite.com/public${item.image}`}
                            alt={item.title}
                            className="
                              w-[68px] h-[68px]
                              sm:w-[72px] sm:h-[72px]
                              object-cover
                              transition-transform duration-300
                              group-hover:scale-105
                            "
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800 leading-5 line-clamp-3 group-hover:text-sky-600 transition-colors duration-200">
                            {item.title}
                          </p>

                          <span className="inline-block mt-1 text-xs text-gray-400">
                            Read more →
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* INFO BOX */}
                <div className="relative overflow-hidden bg-sky-50 border border-sky-100 rounded-2xl md:rounded-3xl p-5 sm:p-6">
                  <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-sky-100/70" />
                  <div className="absolute -right-3 -bottom-10 w-20 h-20 rounded-full bg-sky-100/50" />

                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm mb-4">
                      <span className="text-sky-600 text-lg">i</span>
                    </div>

                    <h4 className="text-sky-700 font-bold text-base sm:text-lg mb-2">
                      Real Estate Insights
                    </h4>

                    <p className="text-sm text-gray-600 leading-6">
                      Get latest updates about commercial property,
                      valuation methods and investment strategies.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default BlogDetails;