import { NextResponse } from "next/server";
import prisma from "@/db";

export async function POST(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    const { comment } = await req.json();

    if (!comment || typeof comment !== "string") {
      return NextResponse.json({ error: "Invalid comment" }, { status: 400 });
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        comments: {
          push: comment, // Adds the comment to the array
        },
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add comment" }, { status: 500 });
  }
}
