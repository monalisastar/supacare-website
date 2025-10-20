import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserRole } from "@prisma/client";

// ===============================
// GET /api/composting/processes
// ADMIN → view all
// CLIENT → view only their processes
// ===============================
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const role = session.user.role;
    const clientId = session.user.id;

    const processes = await prisma.compostingProcess.findMany({
      where: role === UserRole.CLIENT ? { clientId } : {},
      include: {
        machine: { select: { id: true, name: true, location: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(processes);
  } catch (error) {
    console.error("GET /composting/processes error:", error);
    return NextResponse.json({ error: "Failed to fetch processes" }, { status: 500 });
  }
}

// ===============================
// POST /api/composting/processes
// ADMIN only
// ===============================
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { machineId, description, startDate, endDate, status, outputQuantityKg, clientId } = body;

    if (!machineId || !description || !clientId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const process = await prisma.compostingProcess.create({
      data: {
        machineId,
        description,
        startDate: startDate ? new Date(startDate) : new Date(),
        endDate: endDate ? new Date(endDate) : null,
        status: status || "ONGOING",
        outputQuantityKg: outputQuantityKg || null,
        clientId,
      },
    });

    return NextResponse.json(process, { status: 201 });
  } catch (error) {
    console.error("POST /composting/processes error:", error);
    return NextResponse.json({ error: "Failed to create process" }, { status: 500 });
  }
}
