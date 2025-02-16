"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function Feed() {
  const { data: session } = useSession();
  const [postText, setPostText] = useState("");

  const handlePost = () => {
    if (postText.trim() !== "") {
      console.log("Posted:", postText);
      setPostText(""); // Clear input after post
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
      </div>
    </div>
  );
}
