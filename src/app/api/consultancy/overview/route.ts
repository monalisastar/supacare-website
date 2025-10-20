import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Role-based filters
    let projectWhere: Record<string, any> = {};
    if (user.role === "CLIENT") projectWhere.clientId = user.id;
    else if (user.role === "CONSULTANT") projectWhere.consultantId = user.id;

    // Counts
    const [active, completed, pending] = await Promise.all([
      prisma.project.count({ where: { ...projectWhere, status: "ACTIVE" } }),
      prisma.project.count({ where: { ...projectWhere, status: "COMPLETED" } }),
      prisma.project.count({ where: { ...projectWhere, status: "NEW" } }),
    ]);

    // Optional: CO₂ offset and auditsPending placeholders
    const co2Offset = 0;
    const auditsPending = 0;

    return NextResponse.json({
      active,
      pending,
      completed,
      co2Offset,
      auditsPending,
    });
  } catch (error) {
    console.error("Consultancy Overview API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch consultancy overview" },
      { status: 500 }
    );
  }
}
