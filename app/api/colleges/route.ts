import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const q = searchParams.get("q")?.trim() || "";
    const city = searchParams.get("city")?.trim() || "";
    const maxFees = Number(searchParams.get("maxFees") || "0");
    const minRating = Number(searchParams.get("minRating") || "0");
    const sort = searchParams.get("sort") || "rating-desc";

    const page = Math.max(Number(searchParams.get("page") || "1"), 1);
    const limit = Math.min(Math.max(Number(searchParams.get("limit") || "6"), 1), 20);
    const skip = (page - 1) * limit;

    const andFilters: Prisma.CollegeWhereInput[] = [];

    if (q) {
      andFilters.push({
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { city: { contains: q, mode: "insensitive" } },
          { state: { contains: q, mode: "insensitive" } },
        ],
      });
    }

    if (city) {
      andFilters.push({
        city: { equals: city, mode: "insensitive" },
      });
    }

    if (maxFees > 0) {
      andFilters.push({
        fees: { lte: maxFees },
      });
    }

    if (minRating > 0) {
      andFilters.push({
        rating: { gte: minRating },
      });
    }

    const where: Prisma.CollegeWhereInput =
      andFilters.length > 0 ? { AND: andFilters } : {};

    let orderBy: Prisma.CollegeOrderByWithRelationInput = {
      rating: "desc",
    };

    if (sort === "fees-asc") {
      orderBy = { fees: "asc" };
    } else if (sort === "fees-desc") {
      orderBy = { fees: "desc" };
    } else if (sort === "placement-desc") {
      orderBy = { placementAvg: "desc" };
    }

    const [items, total] = await prisma.$transaction([
      prisma.college.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          _count: {
            select: {
              reviews: true,
            },
          },
        },
      }),
      prisma.college.count({ where }),
    ]);

    return NextResponse.json({
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch colleges" },
      { status: 500 }
    );
  }
}