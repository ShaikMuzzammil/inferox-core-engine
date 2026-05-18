import { NextResponse } from 'next/server';
import { z } from 'zod';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';
import { signSession } from '@/lib/auth';
import { sendOwnerNotification } from '@/lib/email';

const schema = z.object({ email: z.string().email(), name: z.string().optional() });

export async function POST(req: Request) {
  try {
    const { email, name } = schema.parse(await req.json());
    const user = await prisma.user.upsert({
      where:{ email },
      update:{ lastLogin:new Date(), name: name||undefined },
      create:{ email, name: name||email.split('@')[0] }
    });
    const token = await signSession({ email:user.email, name:user.name||undefined });
    cookies().set('inferox_session', token, { httpOnly:true, secure:true, sameSite:'lax', path:'/', maxAge:60*60*24*7 });
    await sendOwnerNotification('✅ Login Confirmed', `<p>User <b>${email}</b> logged in successfully.</p>`);
    return NextResponse.json({ ok:true, step:3, message:'Login confirmed', user:{ email:user.email, name:user.name } });
  } catch (e:any) {
    return NextResponse.json({ ok:false, error: e.message }, { status:400 });
  }
}