import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    // Parse the multipart form data from the request
    const formData = await request.formData();

    // Extract text fields
    const name = formData.get('name')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const subject = formData.get('subject')?.toString() || 'New Contact Form Message';
    const message = formData.get('message')?.toString() || '';

    // Extract the file (optional)
    const file = formData.get('file') as File | null;

    // Prepare nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true if 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Prepare mail options
    const mailOptions: any = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_TO,
      subject,
      text: `
You have a new message from your contact form:

Name: ${name}
Email: ${email}
Message: ${message}
      `,
    };

    // If file uploaded, attach it to email
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      mailOptions.attachments = [
        {
          filename: file.name,
          content: buffer,
          contentType: file.type,
        },
      ];
    }

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}
