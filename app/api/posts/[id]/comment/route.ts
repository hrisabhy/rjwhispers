import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function POST(req: NextRequest) {
  try {
    const { confessionId, text } = await req.json();
    if (!confessionId || !text) {
      return NextResponse.json({ message: "Confession ID and Text are required" }, { status: 400 });
    }
    const comment = await prisma.comment.create({
      data: { confessionId, text },
    });
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}