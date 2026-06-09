import { NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const authUser = await getUserFromToken();

  if (!authUser) {
    return NextResponse.json(
      { user: null },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: authUser.userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return NextResponse.json({ user });
}