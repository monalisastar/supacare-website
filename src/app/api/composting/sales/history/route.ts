import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let sales;
    if (session.user.role === UserRole.ADMIN) {
      sales = await prisma.compostSale.findMany({ orderBy: { date: "desc" } });
    } else {
      sales = await prisma.compostSale.findMany({
        where: { clientId: session.user.id },
        orderBy: { date: "desc" },
      });
    }

    return NextResponse.json(sales);
  } catch (error) {
    console.error("GET /sales/history error:", error);
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}
