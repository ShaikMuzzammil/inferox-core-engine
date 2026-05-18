import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { sendContactEmails } from '@/lib/email';

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  label: z.string().max(60).optional(),
  subject: z.string().max(200).optional(),
  message: z.string().min(1) // no upper limit per spec
});

export async function POST(req: Request) {
  try {
    const data = schema.parse(await req.json());
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    await prisma.contact.create({ data: { ...data, ip } });
    await sendContactEmails(data);
    return NextResponse.json({ ok:true, message:'Message sent. Confirmation emailed.' });
  } catch (e:any) {
    return NextResponse.json({ ok:false, error: e.message }, { status:400 });
  }
}