"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FeedPage() {
  const router = useRouter();
  const [confessions, setConfessions] = useState([]);

  useEffect(() => {
    fetch("/api/confessions")
      .then((res) => res.json())
      .then((data) => setConfessions(data))
  }, []);

  return (
    <div className="container">
      <h1>Recent Confessions</h1>
      <ul>
        {confessions.map((confession: any) => (
          <li key={confession.id}>{confession.text}</li>
        ))}
      </ul>
    </div>
  );
}
