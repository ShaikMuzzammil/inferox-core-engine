import { NextResponse } from 'next/server';
import { z } from 'zod';
import { generateOtp, storeOtp } from '@/lib/otp';
import { sendOtpEmail, sendOwnerNotification } from '@/lib/email';

const schema = z.object({ email: z.string().email(), name: z.string().min(1).max(80).optional() });

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    const code = generateOtp();
    await storeOtp(body.email, code);
    await sendOtpEmail(body.email, code);
    await sendOwnerNotification('🔑 OTP Requested', `<p>OTP requested for <b>${body.email}</b></p>`);
    return NextResponse.json({ ok:true, step:1, message:'Code sent to email' });
  } catch (e:any) {
    return NextResponse.json({ ok:false, error: e.message }, { status:400 });
  }
}