import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// ===============================
// GET /api/composting/machines
// ADMIN → See all machines
// CLIENT → See their own machines only
// ===============================
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { user } = session;
    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get("clientId");

    let whereClause: any = {};

    if (user.role === "CLIENT") {
      // client can only view their own machines
      whereClause.clientId = user.id;
    } else if (clientId && user.role === "ADMIN") {
      // admin can filter by clientId
      whereClause.clientId = clientId;
    }

    const machines = await prisma.compostingMachine.findMany({
      where: whereClause,
      include: {
        client: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(machines);
  } catch (error) {
    console.error("GET /composting/machines error:", error);
    return NextResponse.json({ error: "Failed to fetch machines" }, { status: 500 });
  }
}

// ===============================
// POST /api/composting/machines
// Only ADMIN can create new machine
// ===============================
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { name, location, status, clientId } = body;

    if (!name || !location || !clientId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const machine = await prisma.compostingMachine.create({
      data: {
        name,
        location,
        status: status || "RUNNING",
        clientId,
      },
    });

    return NextResponse.json(machine, { status: 201 });
  } catch (error) {
    console.error("POST /composting/machines error:", error);
    return NextResponse.json({ error: "Failed to create machine" }, { status: 500 });
  }
}
