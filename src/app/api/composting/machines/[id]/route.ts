import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// ===============================
// GET /api/composting/machines/[id]
// ADMIN → Any machine
// CLIENT → Only their own machine
// ===============================
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { user } = session;

    const machine = await prisma.compostingMachine.findUnique({
      where: { id: params.id },
      include: {
        client: { select: { id: true, name: true, email: true } },
        processes: true,
        sales: true,
        trainings: true,
        alerts: true,
      },
    });

    if (!machine) {
      return NextResponse.json({ error: "Machine not found" }, { status: 404 });
    }

    // check client access
    if (user.role === "CLIENT" && machine.clientId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(machine);
  } catch (error) {
    console.error("GET /composting/machines/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch machine" }, { status: 500 });
  }
}

// ===============================
// PUT /api/composting/machines/[id]
// Only ADMIN can update
// ===============================
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { name, location, status } = body;

    const updated = await prisma.compostingMachine.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(location && { location }),
        ...(status && { status }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /composting/machines/[id] error:", error);
    return NextResponse.json({ error: "Failed to update machine" }, { status: 500 });
  }
}

// ===============================
// DELETE /api/composting/machines/[id]
// Only ADMIN can delete
// ===============================
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const deleted = await prisma.compostingMachine.update({
      where: { id: params.id },
      data: { deletedAt: new Date() }, // soft delete
    });

    return NextResponse.json({ message: "Machine deleted", deleted });
  } catch (error) {
    console.error("DELETE /composting/machines/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete machine" }, { status: 500 });
  }
}
