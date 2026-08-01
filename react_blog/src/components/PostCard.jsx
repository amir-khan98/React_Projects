import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import appwriteService from "../appwrite/configuration";

function stripHtml(html) {
  return html
    ?.replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function PostCard({ $id, title, featuredimage, content }) {
  const excerpt = stripHtml(content);

  return (
    <Link to={`/post/${$id}`} className="group block h-full">
      <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/50 bg-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/80 hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px `bg-gradient-to-r` from-transparent via-white to-transparent" />
        <div className="h-48 w-full overflow-hidden bg-gray-100">
          <img
            src={appwriteService.getFilePreview(featuredimage)}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <h2 className="text-start line-clamp-2 text-lg font-bold text-gray-800">
            {title}
          </h2>
          {excerpt && (
            <p className="text-start line-clamp-2 flex-1 text-sm font-light text-gray-600">
              {excerpt}
            </p>
          )}
          <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 group-hover:text-blue-500">
            Read more
            <FaArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
