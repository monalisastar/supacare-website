import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserRole } from "@prisma/client";

// Explicit type for route params
interface RouteParams {
  id: string;
}

// ----------------------------
// Helper: Require admin session
// ----------------------------
async function requireAdmin(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== UserRole.ADMIN) return null;
  return session;
}

// ----------------------------
// GET /training/:id
// ----------------------------
export async function GET(
  req: NextRequest,
  { params }: { params: RouteParams }
): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const training = await prisma.trainingSession.findUnique({
      where: { id: params.id },
    });

    if (!training) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (session.user.role === UserRole.ADMIN) return NextResponse.json(training);

    if (training.clientId !== session.user.id)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    return NextResponse.json(training);
  } catch (err) {
    console.error("GET /training/:id error:", err);
    return NextResponse.json({ error: "Failed to fetch training" }, { status: 500 });
  }
}

// ----------------------------
// PUT /training/:id (ADMIN only)
// ----------------------------
export async function PUT(
  req: NextRequest,
  { params }: { params: RouteParams }
): Promise<NextResponse> {
  try {
    const session = await requireAdmin(req);
    if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const body: {
      topic?: string;
      description?: string;
      date?: string;
      trainerName?: string;
      status?: string;
    } = await req.json();

    const updated = await prisma.trainingSession.update({
      where: { id: params.id },
      data: {
        topic: body.topic,
        description: body.description,
        date: body.date ? new Date(body.date) : undefined,
        trainerName: body.trainerName,
        status: body.status,
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT /training/:id error:", err);
    return NextResponse.json({ error: "Failed to update training" }, { status: 500 });
  }
}

// ----------------------------
// DELETE /training/:id (ADMIN only)
// ----------------------------
export async function DELETE(
  req: NextRequest,
  { params }: { params: RouteParams }
): Promise<NextResponse> {
  try {
    const session = await requireAdmin(req);
    if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    await prisma.trainingSession.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("DELETE /training/:id error:", err);
    return NextResponse.json({ error: "Failed to delete training" }, { status: 500 });
  }
}
