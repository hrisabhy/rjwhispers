import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      {/* Hero Section */}
      <h1 className="text-4xl md:text-6xl font-bold text-center leading-tight">
        Welcome to <span className="text-pink-500">RJWhispers</span>
      </h1>
      <p className="text-lg text-gray-300 text-center mt-4 max-w-lg">
        Join the conversation, share your thoughts.
      </p>

      {/* Call to Action */}
      <Link href="/login">
        <button className="mt-6 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all">
          Get Started
        </button>
      </Link>
    </div>
  );
}
