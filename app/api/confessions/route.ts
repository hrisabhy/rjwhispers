import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    console.log(text)

    if (!text) {
      return NextResponse.json({ message: "Text is required" }, { status: 400 });
    }

    const confession = await prisma.confession.create({
      data: { text },
    });

    return NextResponse.json(confession, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const confessions = await prisma.confession.findMany({
      include: { comments: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(confessions, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
