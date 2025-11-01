import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // 🔍 Find token and associated user
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!resetToken || !resetToken.user) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }

    if (resetToken.expiresAt < new Date()) {
      // Token expired
      await prisma.passwordResetToken.delete({ where: { token } });
      return NextResponse.json({ message: "Token expired" }, { status: 400 });
    }

    // 🔐 Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // ✅ Safely update user (guarding against null)
    if (resetToken.userId) {
      await prisma.user.update({
        where: { id: resetToken.userId ?? undefined }, // ✅ fixes TS2322
        data: { passwordHash: hashedPassword },
      });
    }

    // 🧹 Delete the token to prevent reuse
    await prisma.passwordResetToken.delete({ where: { token } });

    return NextResponse.json({ message: "Password has been reset successfully." });
  } catch (err) {
    console.error("Reset password error:", err);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
