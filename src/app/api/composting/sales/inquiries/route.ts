import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserRole } from "@prisma/client";

// GET all inquiries (ADMIN only)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const inquiries = await prisma.compostSaleInquiry.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(inquiries);
  } catch (error) {
    console.error("GET /sales/inquiries error:", error);
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

// POST new inquiry (CLIENT)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { clientName, clientEmail, volumeKg, message } = body;
    if (!clientName || !clientEmail || !message) return NextResponse.json({ error: "Required fields missing" }, { status: 400 });

    const inquiry = await prisma.compostSaleInquiry.create({ data: { clientName, clientEmail, volumeKg, message, status: "pending" } });
    return NextResponse.json(inquiry, { status: 201 });
  } catch (error) {
    console.error("POST /sales/inquiries error:", error);
    return NextResponse.json({ error: "Failed to create inquiry" }, { status: 500 });
  }
}

// DELETE inquiry (ADMIN only)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== UserRole.ADMIN) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    await prisma.compostSaleInquiry.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE /sales/inquiries/:id error:", error);
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
  }
}
