import { NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyOtp } from '@/lib/otp';

const schema = z.object({ email: z.string().email(), code: z.string().length(6) });

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    const res = await verifyOtp(body.email, body.code);
    if (!res.ok) return NextResponse.json({ ok:false, error: res.reason }, { status:401 });
    return NextResponse.json({ ok:true, step:2, message:'Code verified. Awaiting final confirmation.' });
  } catch (e:any) {
    return NextResponse.json({ ok:false, error: e.message }, { status:400 });
  }
}