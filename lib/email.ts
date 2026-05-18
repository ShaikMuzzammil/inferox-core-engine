import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM = process.env.RESEND_FROM_EMAIL || 'Inferox <onboarding@resend.dev>';
const OWNER = process.env.OWNER_EMAIL!;

export async function sendOtpEmail(to: string, code: string) {
  return resend.emails.send({
    from: FROM, to,
    subject: `🔐 Inferox Verification Code: ${code}`,
    html: `<div style="font-family:Inter,sans-serif;background:#03060d;color:#e6f1ff;padding:40px;border-radius:12px;max-width:520px;margin:auto">
      <h1 style="background:linear-gradient(90deg,#22d3ee,#8b5cf6);-webkit-background-clip:text;color:transparent;font-size:28px">INFEROX-CORE ENGINE</h1>
      <p>Your one-time verification code:</p>
      <div style="font-size:42px;font-weight:bold;letter-spacing:12px;text-align:center;background:#0f172a;padding:24px;border-radius:12px;border:1px solid #22d3ee;color:#22d3ee;font-family:monospace">${code}</div>
      <p style="color:#94a3b8;margin-top:20px">Expires in 10 minutes. If you didn't request this, ignore this email.</p>
    </div>`
  });
}

export async function sendOwnerNotification(subject: string, html: string) {
  if (!OWNER) return;
  return resend.emails.send({ from: FROM, to: OWNER, subject: `[Inferox] ${subject}`, html });
}

export async function sendContactEmails(data:{name:string;email:string;label?:string;subject?:string;message:string}) {
  const ownerHtml = `<div style="font-family:Inter,sans-serif"><h2>📩 New Contact Message</h2>
    <p><b>Name:</b> ${data.name}</p><p><b>Email:</b> ${data.email}</p>
    <p><b>Label:</b> ${data.label||'-'}</p><p><b>Subject:</b> ${data.subject||'-'}</p>
    <hr/><pre style="white-space:pre-wrap;background:#f1f5f9;padding:16px;border-radius:8px">${data.message}</pre></div>`;
  const userHtml = `<div style="font-family:Inter,sans-serif"><h2>✅ Message Received — Inferox</h2>
    <p>Hi ${data.name}, we got your message and will reply to <b>${data.email}</b> shortly.</p>
    <blockquote style="border-left:3px solid #22d3ee;padding:12px;color:#475569">${data.message}</blockquote></div>`;
  await Promise.all([
    resend.emails.send({ from: FROM, to: OWNER, subject:`Contact: ${data.subject||data.name}`, html: ownerHtml, reply_to: data.email }),
    resend.emails.send({ from: FROM, to: data.email, subject:'We received your message — Inferox', html: userHtml })
  ]);
}