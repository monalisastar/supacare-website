import { NextResponse } from "next/server"
import { prisma } from '@/lib/prisma'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"  // ✅ Correct import

export async function GET() {
  try {
    // 🧠 Authenticate
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // 🧩 Fetch user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, role: true },
    })
    if (!user || user.role !== "CLIENT") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const clientId = user.id

    // =============================================================
    // 🌿 IMPACT METRICS
    // =============================================================
    const impactAgg = await prisma.sustainabilityMetric.aggregate({
      where: { clientId },
      _sum: {
        co2Reduced: true,
        wasteDiverted: true,
        compostProduced: true,
        treesPlanted: true,
      },
    })

    const impact = {
      co2Reduced: impactAgg._sum.co2Reduced || 0,
      wasteDiverted: impactAgg._sum.wasteDiverted || 0,
      compostProduced: impactAgg._sum.compostProduced || 0,
      treesPlanted: impactAgg._sum.treesPlanted || 0,
    }

    // =============================================================
    // ⚙️ OPERATIONS
    // =============================================================
    const [machinesCount, wastePickupsCount, compostSalesCount] =
      await Promise.all([
        prisma.compostMachine.count({ where: { clientId } }),
        prisma.wastePickup.count({ where: { clientId } }),
        prisma.compostSale.count({ where: { clientId } }),
      ])

    const operations = {
      machines: machinesCount,
      pickups: wastePickupsCount,
      sales: compostSalesCount,
    }

    // =============================================================
    // 💼 PROJECTS
    // =============================================================
    const consultancyProjects = await prisma.consultancyProject.groupBy({
      by: ["status"],
      where: { clientId },
      _count: true,
    })

    const carbonProjects = await prisma.carbonProject.groupBy({
      by: ["stage"],
      where: { clientId },
      _count: true,
    })

    const projects = {
      consultancy: consultancyProjects.reduce(
        (acc, p) => ({ ...acc, [p.status]: p._count }),
        {}
      ),
      carbon: carbonProjects.reduce(
        (acc, p) => ({ ...acc, [p.stage]: p._count }),
        {}
      ),
    }

    // =============================================================
    // 💳 BILLING
    // =============================================================
    const payments = await prisma.payment.groupBy({
      by: ["status"],
      where: { userId: clientId },
      _sum: { amount: true },
      _count: true,
    })

    const billing = {
      totalPaid:
        payments
          .filter((p) => p.status === "SUCCEEDED")
          .reduce((sum, p) => sum + (p._sum.amount || 0), 0) || 0,
      pending:
        payments.find((p) => p.status === "PENDING")?._count ?? 0,
      failed:
        payments.find((p) => p.status === "FAILED")?._count ?? 0,
    }

    // =============================================================
    // ✅ RESPONSE
    // =============================================================
    return NextResponse.json({
      impact,
      operations,
      projects,
      billing,
    })
  } catch (err) {
    console.error("Client overview error:", err)
    return NextResponse.json(
      { error: "Failed to load client overview" },
      { status: 500 }
    )
  }
}
