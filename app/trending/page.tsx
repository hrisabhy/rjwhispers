"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";


export default function Trending() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      const res = await fetch("/api/trending");
      const data = await res.json();

      // Sort posts in descending order based on likes and comments
      const sortedPosts = data.sort((a, b) => {
        const likesDiff = b.likes - a.likes;
        if (likesDiff !== 0) return likesDiff;
        return b.comments.length - a.comments.length; // Sort by comments if likes are equal
      });

      setPosts(sortedPosts);
    };

    fetchTrendingPosts();
  }, []);

  return (
    <div className="flex">
      <Sidebar className="w-1/4"/>
      <div className="flex flex-col md:flex-row items-center pt-10 bg-black min-h-screen text-white w-3/4 mx-auto">
     

     
      <div className="w-full text-center">
      <h1 className="text-2xl font-bold mb-7">🔥 Trending</h1>
        {posts.map((post) => (
          <div key={post.id} className="bg-white text-black p-4 rounded-xl shadow-md mb-4">
            <p className="mb-2">{post.text}</p>
            <div className="flex justify-between text-sm text-gray-600">
              <span>👍 {post.likes}</span>
              <span>💬 {post.comments?.length || 0}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
