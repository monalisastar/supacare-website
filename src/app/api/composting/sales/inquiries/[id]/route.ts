import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserRole } from "@prisma/client";

interface Params {
  params: { id: string };
}

// =============================
// GET single inquiry (ADMIN only)
// =============================
export async function GET(req: Request, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const inquiry = await prisma.compostSaleInquiry.findUnique({
      where: { id: params.id },
    });

    if (!inquiry) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(inquiry);
  } catch (error) {
    console.error("GET /sales/inquiries/:id error:", error);
    return NextResponse.json({ error: "Failed to fetch inquiry" }, { status: 500 });
  }
}

// =============================
// PUT update inquiry status (ADMIN only)
// =============================
export async function PUT(req: Request, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const updated = await prisma.compostSaleInquiry.update({
      where: { id: params.id },
      data: {
        status: body.status, // e.g., pending, responded, closed
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /sales/inquiries/:id error:", error);
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 });
  }
}

// =============================
// DELETE inquiry (ADMIN only)
// =============================
export async function DELETE(req: Request, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.compostSaleInquiry.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE /sales/inquiries/:id error:", error);
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
  }
}
