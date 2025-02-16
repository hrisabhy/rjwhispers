import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const postId = params.id;

    if (!postId) {
      return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { likes: { increment: 1 } },
    });

    return NextResponse.json({ message: "Post liked successfully", post: updatedPost }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}
