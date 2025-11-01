import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    // Always respond the same to prevent user enumeration
    const genericResponse = {
      message: "If that email exists, a reset link has been sent.",
    };

    if (!user) {
      return NextResponse.json(genericResponse);
    }

    // 🪄 Generate secure token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour expiry

    // ✅ Store token in DB (email required by schema)
    await prisma.passwordResetToken.create({
      data: {
        token,
        email: user.email,
        userId: user.id,
        expiresAt: expires,
      },
    });

    // 🔗 Build reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;

    // ✉️ Setup mail transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST!,
      port: Number(process.env.EMAIL_SERVER_PORT!),
      secure: false,
      auth: {
        user: process.env.EMAIL_SERVER_USER!,
        pass: process.env.EMAIL_SERVER_PASSWORD!,
      },
    });

    // 📨 Send email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: "Reset your password",
      html: `
        <p>Hello ${user.name || "there"},</p>
        <p>You requested to reset your password. Click below to set a new one:</p>
        <p><a href="${resetUrl}" target="_blank">${resetUrl}</a></p>
        <p>If you didn’t request this, please ignore this email.</p>
      `,
    });

    return NextResponse.json(genericResponse);
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
