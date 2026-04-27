import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const { name, email, subject, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // If SMTP not configured, just return success (dev mode)
        if (!process.env.SMTP_HOST) {
            console.log("Contact form submission (no SMTP configured):", { name, email, subject });
            return NextResponse.json({ success: true });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT ?? "587"),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: process.env.CONTACT_TO_EMAIL ?? "konaaravind4@gmail.com",
            subject: `Portfolio Contact: ${subject}`,
            html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px;">
          <h2 style="color: #00f5ff;">New Message from Portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #0a0f1e; padding: 16px; border-radius: 8px; color: #cbd5e1;">${message}</p>
        </div>
      `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact API error:", error);
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}
