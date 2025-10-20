import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserRole } from "@prisma/client";

// =============================
// GET all farm supplies
// =============================
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role === UserRole.ADMIN) {
      const supplies = await prisma.farmSupply.findMany({ orderBy: { deliveryDate: "asc" } });
      return NextResponse.json(supplies);
    }

    // Clients: only see their own
    const supplies = await prisma.farmSupply.findMany({
      where: { clientId: session.user.id },
      orderBy: { deliveryDate: "asc" },
    });
    return NextResponse.json(supplies);
  } catch (error) {
    console.error("GET /agriculture error:", error);
    return NextResponse.json({ error: "Failed to fetch supplies" }, { status: 500 });
  }
}

// =============================
// POST new farm supply (ADMIN only)
// =============================
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { farmName, clientId, quantity, deliveryDate, status, notes } = body;

    if (!farmName || !quantity || !deliveryDate) {
      return NextResponse.json({ error: "farmName, quantity, and deliveryDate are required" }, { status: 400 });
    }

    const newSupply = await prisma.farmSupply.create({
      data: {
        farmName,
        clientId,
        quantity,
        deliveryDate: new Date(deliveryDate),
        status: status || "pending",
        notes,
      },
    });

    return NextResponse.json(newSupply, { status: 201 });
  } catch (error) {
    console.error("POST /agriculture error:", error);
    return NextResponse.json({ error: "Failed to create farm supply" }, { status: 500 });
  }
}
