import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const body = await req.json();

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: process.env.EMAIL_PORT === "465",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const userMailOptions = {
    from: process.env.EMAIL_FROM,
    to: body.email,
    subject: "Thank You for Your Distributor Application",
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
            <h1 style="color: #4a5568; text-align: center;">Thank You for Your Application</h1>
            <p>Dear ${body.name},</p>
            <p>We have received your application to become a distributor for our premium protein products. Thank you for your interest in partnering with us!</p>
            <p>Our team will review your application and get back to you shortly with more information about the next steps.</p>
            <p>If you have any questions in the meantime, please don't hesitate to contact us.</p>
            <p>Best regards,<br>The BEN Team</p>
          </div>
        </body>
      </html>
    `,
  };

  const adminMailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.ADMIN_EMAIL,
    subject: "New Distributor Application Received",
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
            <h1 style="color: #4a5568; text-align: center;">New Distributor Application</h1>
            <p>A new distributor application has been submitted with the following details:</p>
            <ul>
              <li><strong>Name:</strong> ${body.name}</li>
              <li><strong>Pin Code:</strong> ${body.pinCode}</li>
              <li><strong>Service:</strong> ${body.service}</li>
              <li><strong>Contact Number:</strong> ${body.contactNumber}</li>
              <li><strong>Email:</strong> ${body.email}</li>
              <li><strong>Annual Turnover:</strong> ${body.annualTurnover}</li>
              <li><strong>City:</strong> ${body.city}</li>
              <li><strong>State:</strong> ${body.state}</li>
            </ul>
            <p>Please review this application and take appropriate action.</p>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);

    return NextResponse.json(
      { message: "Emails sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to send emails:", error);
    return NextResponse.json(
      { message: "Failed to send emails" },
      { status: 500 }
    );
  }
}
