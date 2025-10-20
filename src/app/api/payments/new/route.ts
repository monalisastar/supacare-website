import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { PaymentEntityType, PaymentStatus } from "@prisma/client";

interface PaymentRequestBody {
  entityType: PaymentEntityType;
  entityId: string;
  amount: number;
  currency: string;
}

export async function POST(req: Request) {
  try {
    // 1️⃣ Authenticate user
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Parse request body
    const body: PaymentRequestBody = await req.json();

    const { entityType, entityId, amount, currency } = body;

    if (!entityType || !entityId || !amount || !currency) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 3️⃣ Validate entityType enum
    if (!Object.values(PaymentEntityType).includes(entityType)) {
      return NextResponse.json({ error: "Invalid entityType" }, { status: 400 });
    }

    // 4️⃣ Get authenticated user from DB
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 5️⃣ Verify entity exists
    let entityExists = false;
    switch (entityType) {
      case PaymentEntityType.MILESTONE:
        entityExists = !!(await prisma.milestone.findUnique({ where: { id: entityId } }));
        break;
      case PaymentEntityType.PROJECT:
        entityExists = !!(await prisma.project.findUnique({ where: { id: entityId } }));
        break;
      case PaymentEntityType.COMPOST_SALE:
        entityExists = !!(await prisma.compostSale.findUnique({ where: { id: entityId } }));
        break;
      case PaymentEntityType.SMART_AUDIT:
        entityExists = !!(await prisma.smartAuditRequest.findUnique({ where: { id: entityId } }));
        break;
    }

    if (!entityExists) {
      return NextResponse.json(
        { error: `Entity ${entityType} not found` },
        { status: 404 }
      );
    }

    // 6️⃣ Prepare payment data
    const paymentData: any = {
      userId: user.id,
      entityType,
      entityId,
      amount,
      currency,
      status: PaymentStatus.PENDING,
    };

    // Set milestoneId if entityType is MILESTONE
    if (entityType === PaymentEntityType.MILESTONE) {
      paymentData.milestoneId = entityId;
    }

    // 7️⃣ Create payment record
    const payment = await prisma.payment.create({ data: paymentData });

    // 8️⃣ Return success
    return NextResponse.json({
      message: "Payment record created successfully",
      paymentId: payment.id,
      status: payment.status,
    });

  } catch (error: any) {
    console.error("[PAYMENT_NEW_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
