import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserRole } from "@prisma/client";

// =============================
// GET single supply
// =============================
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const supply = await prisma.farmSupply.findUnique({ where: { id: params.id } });
    if (!supply) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (session.user.role === UserRole.ADMIN || supply.clientId === session.user.id) {
      return NextResponse.json(supply);
    }

    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  } catch (error) {
    console.error("GET /agriculture/:id error:", error);
    return NextResponse.json({ error: "Failed to fetch supply" }, { status: 500 });
  }
}

// =============================
// PUT update supply (ADMIN only)
// =============================
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const updated = await prisma.farmSupply.update({
      where: { id: params.id },
      data: {
        farmName: body.farmName,
        clientId: body.clientId,
        quantity: body.quantity,
        deliveryDate: body.deliveryDate ? new Date(body.deliveryDate) : undefined,
        status: body.status,
        notes: body.notes,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /agriculture/:id error:", error);
    return NextResponse.json({ error: "Failed to update supply" }, { status: 500 });
  }
}

// =============================
// DELETE supply (ADMIN only)
// =============================
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.farmSupply.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE /agriculture/:id error:", error);
    return NextResponse.json({ error: "Failed to delete supply" }, { status: 500 });
  }
}
