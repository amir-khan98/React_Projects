import React, { useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/configuration";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userid === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredimage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="relative mb-8 w-full overflow-hidden rounded-2xl border border-white/40 bg-gray-100 shadow-sm shadow-black/5">
          <img
            src={appwriteService.getFilePreview(post.featuredimage)}
            alt={post.title}
            className="h-80 w-full object-cover sm:h-96 `md:h-[550px]`"
          />

          {isAuthor && (
            <div className="absolute right-4 top-4 flex gap-2">
              <Link
                to={`/edit-post/${post.$id}`}
                aria-label="Edit post"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white shadow-md transition-colors duration-200 hover:bg-green-600"
              >
                <FaPen className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={deletePost}
                aria-label="Delete post"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition-colors duration-200 hover:bg-red-600"
              >
                <FaTrash className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        <div className="rounded-2xl border border-white/40 bg-white/60 p-6 shadow-sm shadow-black/5 backdrop-blur-xl sm:p-10">
          <h1 className="mb-6 text-3xl font-bold text-gray-800">
            {post.title}
          </h1>
          <div className="browser-css">{parse(post.content)}</div>
        </div>
      </Container>
    </div>
  ) : null;
}
