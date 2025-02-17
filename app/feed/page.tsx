"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";

export default function Feed() {
  const { data: session } = useSession();
  const [postText, setPostText] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});

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

  const handleLike = async (id: string) => {
    await fetch(`/api/posts/${id}/like`, { method: "POST" });
    setPosts(posts.map(post => post.id === id ? { ...post, likes: post.likes + 1 } : post));
  };

  const handleComment = async (id: string) => {
    const commentText = commentInputs[id]?.trim();
    if (commentText) {
      const res = await fetch(`/api/posts/${id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: commentText }),
      });
      if (res.ok) {
        const newComment = await res.json();
        setPosts(posts.map(post => 
          post.id === id ? { ...post, comments: [...(post.comments || []), newComment] } : post
        ));
        setCommentInputs({ ...commentInputs, [id]: "" });
      }
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar className="w-3/4"/>

      {/* Main Content */}
      <div className="flex flex-col items-center w-full md:ml-64 min-h-screen pt-10 bg-black">
        <div className="w-full max-w-lg bg-white text-black p-6 rounded-xl shadow-md mt-4 sm:px-8">
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
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full p-2 border rounded-lg focus:outline-none"
                    value={commentInputs[post.id] || ""}
                    onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleComment(post.id);
                    }}
                  />
                  {/* Comment Button (Visible only on mobile) */}
                  <button
                    onClick={() => handleComment(post.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg sm:hidden"
                  >
                    Comment
                  </button>
                </div>
                <div className="mt-2">
                  {(post.comments ?? []).map((comment) => (
                    <p key={comment.id} className="text-sm text-gray-700">💬 {comment.text}</p>
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
