import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, company, industry, email, phone, message } = await request.json();

    if (!name || !company || !industry || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "A.I.R Website <onboarding@resend.dev>",
      to: "taran@airdevconsultancy.co.uk",
      replyTo: email,
      subject: `Discovery Call Request — ${name} at ${company}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #111;">
          <h2 style="margin-bottom: 24px;">New Discovery Call Request</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; width: 130px;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600;">${name}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Company</td><td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600;">${company}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Industry</td><td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600;">${industry}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #8b7d98;">${email}</a></td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${phone || "—"}</td></tr>
            <tr><td style="padding: 10px 0; color: #666; vertical-align: top;">Message</td><td style="padding: 10px 0;">${message || "—"}</td></tr>
          </table>
          <p style="margin-top: 32px; font-size: 12px; color: #aaa;">Sent from airdevconsultancy.co.uk · Reply directly to respond to ${name}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
