import { NextResponse } from 'next/server';
import prisma from "@/db";

const prisma = new PrismaClient();

export async function POST(
  request: Request, // First argument: the request object
  { params }: { params: { id: string } } // Second argument: the context object with params
) {
  try {
    const { id } = params; // Extract the post ID from the URL params
    const { text, userId } = await request.json(); // Parse the request body

    // Create a new comment
    const newComment = await prisma.comment.create({
      data: {
        text,
        userId: parseInt(userId), // Ensure userId is a number
        postId: parseInt(id), // Ensure postId is a number
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}