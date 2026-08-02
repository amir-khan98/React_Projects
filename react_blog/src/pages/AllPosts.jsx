import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Query } from "appwrite";
import appwriteService from "../appwrite/configuration";
import { Container, PostCard } from "../components";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (!authStatus || !userData) {
      setPosts([]);
      return;
    }
    appwriteService
      .getPosts([Query.equal("userid", userData.$id)])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      });
  }, [authStatus, userData?.$id]);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;