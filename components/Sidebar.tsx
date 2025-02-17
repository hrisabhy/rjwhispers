"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button - Outside Sidebar when Closed */}
      {!isOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 p-2 rounded-full text-white"
          onClick={() => setIsOpen(true)}
        >
          <FiMenu size={24} />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-black-400 text-white p-5 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:block z-50`}
      >
        {/* Close Button - Moves Inside Sidebar */}
        {isOpen && (
          <button
            className="md:hidden absolute top-4 right-4 bg-gray-800 p-2 rounded-full text-white"
            onClick={() => setIsOpen(false)}
          >
            <FiX size={24} />
          </button>
        )}
        <h2 className="text-3xl font-bold text-white mb-6 tracking-wide">
          RJ<span className="text-pink-500">Whispers</span>
        </h2>
   
        <nav className="space-y-4">
          <Link
            href="/feed"
            className="block px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600"
          >
            Home
          </Link>
          <Link href="/trending" className="block px-4 py-2 bg-pink-500 rounded-md hover:bg-purple-600">
          🔥 Trending
        </Link>
          <button
            onClick={() => signOut()}
            className="w-full text-left px-4 py-2 bg-red-500 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Overlay (For closing menu on mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
