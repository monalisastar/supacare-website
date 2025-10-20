import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserRole } from "@prisma/client";

// ===============================
// GET /api/composting/processes/[id]
// ADMIN → any process
// CLIENT → only their own
// ===============================
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const role = session.user.role;
    const clientId = session.user.id;

    const process = await prisma.compostingProcess.findUnique({
      where: { id: params.id },
      include: {
        machine: { select: { id: true, name: true, location: true } },
      },
    });

    if (!process) return NextResponse.json({ error: "Process not found" }, { status: 404 });
    if (role === UserRole.CLIENT && process.clientId !== clientId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(process);
  } catch (error) {
    console.error("GET /composting/processes/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch process" }, { status: 500 });
  }
}

// ===============================
// PUT /api/composting/processes/[id]
// ADMIN only
// ===============================
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { description, startDate, endDate, status, outputQuantityKg } = body;

    const updated = await prisma.compostingProcess.update({
      where: { id: params.id },
      data: {
        ...(description && { description }),
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate && { endDate: new Date(endDate) }),
        ...(status && { status }),
        ...(outputQuantityKg && { outputQuantityKg }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /composting/processes/[id] error:", error);
    return NextResponse.json({ error: "Failed to update process" }, { status: 500 });
  }
}

// ===============================
// DELETE /api/composting/processes/[id]
// ADMIN only (soft delete optional)
// ===============================
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.compostingProcess.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Process deleted" });
  } catch (error) {
    console.error("DELETE /composting/processes/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete process" }, { status: 500 });
  }
}
