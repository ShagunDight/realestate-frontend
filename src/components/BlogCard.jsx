import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden h-[220px]">
        <img
          src={`https://lightblue-moose-690494.hostingersite.com/public${blog.image}`}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 leading-snug mb-3 line-clamp-2 group-hover:text-sky-600 transition-colors duration-300">
          {blog.title?.replace(/[\r\n]+/g, "").trim()}
        </h2>

        <p className="text-gray-500 text-sm leading-6 mb-5 line-clamp-3">
          {blog.content
            ? blog.content.replace(/<[^>]+>/g, "").slice(0, 100) + "..."
            : ""}
        </p>

        {/* Read More */}
        <div className="mt-auto pt-2">
          <Link
            to={`/blog/${blog.slug}`}
            className="inline-flex items-center gap-2 text-sky-600 font-semibold text-sm hover:gap-3 transition-all duration-300"
          >
            Read More
            <span className="text-base">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
