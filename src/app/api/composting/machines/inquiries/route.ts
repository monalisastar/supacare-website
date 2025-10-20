import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserRole } from "@prisma/client";

// =============================
// GET all inquiries (ADMIN only)
// =============================
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const inquiries = await prisma.machineInquiry.findMany({
      orderBy: { createdAt: "desc" },
      include: { machine: true },
    });

    return NextResponse.json(inquiries);
  } catch (error) {
    console.error("GET /machines/inquiries error:", error);
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

// =============================
// POST new inquiry (CLIENT)
// =============================
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { clientName, clientEmail, machineId, message } = body;

    if (!clientName || !clientEmail || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    const inquiry = await prisma.machineInquiry.create({
      data: {
        clientName,
        clientEmail,
        machineId,
        message,
        status: "pending",
      },
    });

    return NextResponse.json(inquiry, { status: 201 });
  } catch (error) {
    console.error("POST /machines/inquiries error:", error);
    return NextResponse.json({ error: "Failed to create inquiry" }, { status: 500 });
  }
}
