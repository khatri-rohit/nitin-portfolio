import { getUserIP } from "@/app/actions/utils";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 10,
  duration: 60,
});

export async function POST(req: Request) {
  try {
    const ip = await getUserIP();
    console.log(ip);
    await rateLimiter.consume(ip, 2);
  } catch {
    console.error("Too many requests");
    return NextResponse.json(
      { error: "Failed to send emails" },
      { status: 500 }
    );
  }

  try {
    const { name, email, service, through, message } = await req.json();

    if (!name || !email || !service) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // -----------------------------
    // 1. MAIL TO MAIN RECEIVER
    // -----------------------------
    const adminMail = {
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: "rohitkhatri111112@gmail.com",
      subject: `New Contact Inquiry from ${name}`,
      text: `
New Inquiry Received:

Name: ${name}
Email: ${email}
Service Interested: ${service}
Found Through: ${through}

Message:
${message || "No additional message"}

      `,
    };

    // -----------------------------
    // 2. AUTO-REPLY TO USER
    // -----------------------------
    const userMail = {
      from: `"Nitin Studio" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "We received your message — Thank you!",
      text: `
Hi ${name},

Thank you for reaching out. Your message has been received.

Our team will respond within the next **48 hours**.

Regards,
Nitin Studio
      `,
    };

    // Send both mails in parallel
    await Promise.all([
      transporter.sendMail(adminMail),
      transporter.sendMail(userMail),
    ]);

    return NextResponse.json({
      success: true,
      message: "Emails sent successfully",
    });
  } catch (error) {
    console.error("CONTACT FORM ERROR:", error);
    return NextResponse.json(
      { error: "Failed to send emails" },
      { status: 500 }
    );
  }
}
