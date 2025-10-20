import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    // 1️⃣ Authenticate
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 3️⃣ Parse request
    const body = await req.json();
    const { amount, currency }: { amount: number; currency: string } = body;

    if (!amount || amount <= 0 || !currency) {
      return NextResponse.json(
        { error: "Invalid amount or currency" },
        { status: 400 }
      );
    }

    // 4️⃣ Create funding payment record
    const fundingTx = await prisma.payment.create({
      data: {
        userId: user.id,
        entityType: "FUNDING",
        entityId: "WALLET",
        amount,
        currency,
        status: "PENDING",
      },
    });

    // 5️⃣ Return funding transaction
    return NextResponse.json({
      message: "Funding transaction created successfully",
      fundingId: fundingTx.id,
      status: fundingTx.status,
    });

  } catch (error: any) {
    console.error("[FUNDING_ROUTE_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
