"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-black-400 text-white fixed top-0 left-0 p-5">
      <h2 className="text-3xl font-bold text-white mb-6 tracking-wide">
          RJ<span className="text-pink-500">Whispers</span>
        </h2>
      <nav className="space-y-4">
        <Link href="/feed" className="block px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600">
          Home
        </Link>
        <button
          onClick={() => signOut()}
          className="w-full text-left px-4 py-2 bg-red-500 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
