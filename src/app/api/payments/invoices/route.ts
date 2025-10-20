import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    // 1️⃣ Authenticate
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Get user with role
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, role: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 3️⃣ Query payments (invoices = succeeded payments)
    const whereClause =
      user.role === "ADMIN"
        ? { status: "SUCCEEDED" }
        : { status: "SUCCEEDED", userId: user.id };

    const invoices = await prisma.payment.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        amount: true,
        currency: true,
        entityType: true,
        status: true,
        createdAt: true,
        transactionId: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // 4️⃣ Return results
    return NextResponse.json({
      message: "Invoices fetched successfully",
      count: invoices.length,
      invoices,
    });

  } catch (error: any) {
    console.error("[INVOICES_ROUTE_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
