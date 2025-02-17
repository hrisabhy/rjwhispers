import { NextResponse } from "next/server";
import prisma from "@/db";
export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const { comment } = await req.json();
    if (!comment || typeof comment !== "string") {
      return NextResponse.json({ error: "Invalid comment" }, { status: 400 });
    }
    // Create a new comment linked to the confession
    const newComment = await prisma.comment.create({
      data: {
        confessionId: id,
        text: comment,
      },
    });
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add comment" }, { status: 500 });
  }
}