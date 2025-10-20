import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserRole } from "@prisma/client";

// ==========================
// GET all sales (Admin: all, Client: only their own)
// ==========================
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = (session.user as any).role;
    const userId = (session.user as any).id;

    let sales;
    if (userRole === UserRole.ADMIN) {
      sales = await prisma.compostSale.findMany({
        include: { client: true, machine: true },
        orderBy: { date: "desc" },
      });
    } else if (userRole === UserRole.CLIENT) {
      sales = await prisma.compostSale.findMany({
        where: { clientId: userId },
        include: { client: true, machine: true },
        orderBy: { date: "desc" },
      });
    } else {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(sales);
  } catch (error) {
    console.error("GET /api/composting/sales error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ==========================
// POST new sale (Admin only)
// ==========================
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { buyerName, volumeKg, price, clientId, machineId } = body;

    if (!buyerName || !volumeKg || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const sale = await prisma.compostSale.create({
      data: {
        buyerName,
        volumeKg,
        price,
        clientId,
        machineId,
      },
    });

    return NextResponse.json(sale, { status: 201 });
  } catch (error) {
    console.error("POST /api/composting/sales error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
