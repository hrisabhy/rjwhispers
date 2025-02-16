import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

//const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { confessionId } = await req.json();

    if (!confessionId) {
      return NextResponse.json({ message: "Confession ID is required" }, { status: 400 });
    }

    const confession = await prisma.confession.update({
      where: { id: confessionId },
      data: { likes: { increment: 1 } },
    });

    return NextResponse.json(confession, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
