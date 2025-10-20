// /app/api/messages/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  const url = new URL(request.url);
  // Accept both "userId" and "user" for flexibility
  const userEmail = url.searchParams.get("userId") || url.searchParams.get("user");

  if (!userEmail) {
    return NextResponse.json({ error: "User email required" }, { status: 400 });
  }

  const messages = await prisma.message.findMany({
    where: {
      OR: [{ fromUser: userEmail }, { toUser: userEmail }],
    },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const senderEmail = session?.user?.email;

  const body = await request.json();
  const { text, toUser, fileUrl, fileType, senderOverride } = body;

  // Allow AI or system messages using senderOverride (optional)
  const finalSender = senderOverride || senderEmail;

  if (!finalSender) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!toUser) {
    return NextResponse.json({ error: "Recipient required" }, { status: 400 });
  }

  if (!text && !fileUrl) {
    return NextResponse.json({ error: "Either text or file is required" }, { status: 400 });
  }

  const message = await prisma.message.create({
    data: {
      text: text || "",
      fromUser: finalSender,
      toUser,
      read: false,
      fileUrl: fileUrl || null,
      fileType: fileType || null,
    },
  });

  return NextResponse.json(message);
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { fromUser } = body;

  if (!fromUser) {
    return NextResponse.json({ error: "Sender required" }, { status: 400 });
  }

  const updated = await prisma.message.updateMany({
    where: { fromUser, toUser: session.user.email, read: false },
    data: { read: true },
  });

  return NextResponse.json({ updatedCount: updated.count });
}
