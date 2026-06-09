import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getUserFromToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const savedSchema = z.object({
  collegeId: z.string().min(1),
});

export async function GET() {
  const authUser = await getUserFromToken();

  if (!authUser) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const saved = await prisma.savedCollege.findMany({
    where: {
      userId: authUser.userId,
    },
    include: {
      college: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({ items: saved });
}

export async function POST(request: NextRequest) {
  const authUser = await getUserFromToken();

  if (!authUser) {
    return NextResponse.json(
      { error: "Please login first" },
      { status: 401 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = savedSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid college id" },
      { status: 400 }
    );
  }

  const college = await prisma.college.findUnique({
    where: {
      id: parsed.data.collegeId,
    },
  });

  if (!college) {
    return NextResponse.json(
      { error: "College not found" },
      { status: 404 }
    );
  }

  const saved = await prisma.savedCollege.upsert({
    where: {
      userId_collegeId: {
        userId: authUser.userId,
        collegeId: parsed.data.collegeId,
      },
    },
    update: {},
    create: {
      userId: authUser.userId,
      collegeId: parsed.data.collegeId,
    },
  });

  return NextResponse.json({ saved });
}

export async function DELETE(request: NextRequest) {
  const authUser = await getUserFromToken();

  if (!authUser) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const collegeId = searchParams.get("collegeId");

  if (!collegeId) {
    return NextResponse.json(
      { error: "College id is required" },
      { status: 400 }
    );
  }

  await prisma.savedCollege.deleteMany({
    where: {
      userId: authUser.userId,
      collegeId,
    },
  });

  return NextResponse.json({
    message: "College removed from saved list",
  });
}