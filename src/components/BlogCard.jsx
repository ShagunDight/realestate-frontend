import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition duration-300">
      <img
        src={`https://lightblue-moose-690494.hostingersite.com/public${blog.image}`}
        alt={blog.title}
        className="w-full h-[200px] object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {blog.title?.replace(/[\r\n]+/g, "").trim()}
        </h2>

        <p className="text-gray-500 text-sm mb-3">
          {blog.content ? blog.content.replace(/<[^>]+>/g, "").slice(0, 100) + "..." : ""}
        </p>

        <Link to={`/blog/${blog.slug}`} className="text-sky-500 font-medium hover:underline">
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
