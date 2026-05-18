import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { cookies } from 'next/headers';
import { verifySession } from '@/lib/auth';

export async function GET() {
  const token = cookies().get('inferox_session')?.value;
  const s = token ? await verifySession(token) : null;
  if (!s) return NextResponse.json({ items: [] });
  const items = await prisma.notification.findMany({ where:{ email:s.email }, orderBy:{createdAt:'desc'}, take:20 });
  return NextResponse.json({ items });
}