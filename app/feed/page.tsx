"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";

export default function Feed() {
  const { data: session } = useSession();
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/confessions");
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const handlePost = async () => {
    if (postText.trim() !== "") {
      const res = await fetch("/api/confessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: postText, user: session?.user?.email }),
      });
      if (res.ok) {
        const newPost = await res.json();
        setPosts([newPost, ...posts]);
        setPostText("");
      }
    }
  };

  const handleLike = async (id) => {
    await fetch(`/api/posts/${id}/like`, { method: "POST" });
    setPosts(posts.map(post => post.id === id ? { ...post, likes: post.likes + 1 } : post));
  };

  const handleComment = async (id, commentText) => {
    if (commentText.trim() !== "") {
      await fetch(`/api/posts/${id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: commentText }),
      });
      setPosts(posts.map(post => post.id === id ? { ...post, comments: [...post.comments, commentText] } : post));
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 flex-1 flex flex-col items-center pt-10 bg-black min-h-screen">
        <div className="w-full max-w-lg bg-white text-black p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-6 tracking-wide">Create a Post</h2>
          <textarea
            className="w-full p-3 border rounded-lg focus:outline-none resize-none"
            rows={3}
            placeholder="What's on your mind? Let it go!"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <button
            onClick={handlePost}
            className="w-full py-3 text-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Post
          </button>
        </div>

        {/* Posts List */}
        <div className="w-full max-w-lg mt-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white text-black p-4 rounded-xl shadow-md mb-4">
              <p className="mb-2">{post.text}</p>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <button onClick={() => handleLike(post.id)} className="text-blue-500">👍 {post.likes}</button>
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full p-2 border rounded-lg focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleComment(post.id, e.target.value);
                  }}
                />
                <div className="mt-2">
                {(post.comments ?? []).map((comment, index) => (
  <p key={index} className="text-sm text-gray-700">💬 {comment}</p>
))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
