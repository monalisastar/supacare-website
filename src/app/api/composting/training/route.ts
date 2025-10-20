import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserRole } from "@prisma/client";

// =============================
// GET all training sessions
// =============================
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role === UserRole.ADMIN) {
      const sessions = await prisma.trainingSession.findMany({
        orderBy: { date: "asc" },
      });
      return NextResponse.json(sessions);
    }

    // Clients: only see their own
    const sessions = await prisma.trainingSession.findMany({
      where: { clientId: session.user.id },
      orderBy: { date: "asc" },
    });
    return NextResponse.json(sessions);
  } catch (error) {
    console.error("GET /training error:", error);
    return NextResponse.json({ error: "Failed to fetch trainings" }, { status: 500 });
  }
}

// =============================
// POST new training session
// =============================
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { topic, description, date } = body;

    if (!topic || !date) {
      return NextResponse.json({ error: "Topic and Date are required" }, { status: 400 });
    }

    // Clients: create session for themselves
    if (session.user.role === UserRole.CLIENT) {
      const newSession = await prisma.trainingSession.create({
        data: {
          clientId: session.user.id,
          topic,
          description,
          date: new Date(date),
          trainerName: "Pending Assignment",
          status: "scheduled",
        },
      });
      return NextResponse.json(newSession, { status: 201 });
    }

    // Admins: can create for any client
    if (session.user.role === UserRole.ADMIN) {
      if (!body.clientId || !body.trainerName) {
        return NextResponse.json({ error: "clientId and trainerName are required for admin booking" }, { status: 400 });
      }

      const newSession = await prisma.trainingSession.create({
        data: {
          clientId: body.clientId,
          topic,
          description,
          date: new Date(date),
          trainerName: body.trainerName,
          status: body.status || "scheduled",
        },
      });
      return NextResponse.json(newSession, { status: 201 });
    }

    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  } catch (error) {
    console.error("POST /training error:", error);
    return NextResponse.json({ error: "Failed to create training session" }, { status: 500 });
  }
}
