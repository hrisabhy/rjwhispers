import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    //const postId = await params.id;
    const { id } = await params
    const postId = id;

    if (!postId) {
      return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
    }

    const updatedPost = await prisma.confession.update({
      where: { id: postId },
      data: { likes: { increment: 1 } },
    });

    return NextResponse.json({ message: "Post liked successfully", post: updatedPost }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}
