import { NextResponse } from "next/server";
import prisma from "@/db";

export async function GET() {
    try {
        const trendingPosts = await prisma.confession.findMany({
          select: {
            id: true,
            text: true,
            likes: true,
            comments: true,
          },
          take: 10,
        });

        const test_data = await prisma.confession.findMany({
            orderBy: [
              {
                likes: 'desc',
              }
            ]})
        console.log(test_data)
      
        if (!trendingPosts || trendingPosts.length === 0) {
          return NextResponse.json({ error: "No trending posts found" }, { status: 404 });
        }
      
        return NextResponse.json(trendingPosts, { status: 200 });
      } catch (error) {
        console.error("Error fetching trending posts:", error);
        return NextResponse.json(
          { error: "Failed to fetch trending posts", details: error.message || "Unknown error" }, // Ensure the payload is an object
          { status: 500 }
        );
      }
}
