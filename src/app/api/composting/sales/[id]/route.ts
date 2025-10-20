import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserRole } from "@prisma/client";

// ==========================
// GET single sale (Admin: any, Client: only their own)
// ==========================
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = (session.user as any).role;
    const userId = (session.user as any).id;

    const sale = await prisma.compostSale.findUnique({
      where: { id: params.id },
      include: { client: true, machine: true },
    });

    if (!sale) {
      return NextResponse.json({ error: "Sale not found" }, { status: 404 });
    }

    if (userRole === UserRole.CLIENT && sale.clientId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(sale);
  } catch (error) {
    console.error("GET /api/composting/sales/[id] error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ==========================
// PUT update sale (Admin only)
// ==========================
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { buyerName, volumeKg, price, clientId, machineId } = body;

    const updated = await prisma.compostSale.update({
      where: { id: params.id },
      data: { buyerName, volumeKg, price, clientId, machineId },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/composting/sales/[id] error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ==========================
// DELETE sale (Admin only)
// ==========================
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.compostSale.delete({ where: { id: params.id } });

    return NextResponse.json({ message: "Sale deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/composting/sales/[id] error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
