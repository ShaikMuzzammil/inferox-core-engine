// lib/otp.ts
import bcrypt from 'bcryptjs';
import { prisma } from './db';

export function generateOtp(): string {
  return Math.floor(100000 + Math.random()*900000).toString();
}
export async function storeOtp(email: string, code: string) {
  const hash = await bcrypt.hash(code, 10);
  const ttl = parseInt(process.env.OTP_TTL_SECONDS||'600',10);
  await prisma.otp.create({
    data: { email, codeHash: hash, expiresAt: new Date(Date.now()+ttl*1000) }
  });
}
export async function verifyOtp(email: string, code: string) {
  const otp = await prisma.otp.findFirst({
    where:{ email, consumed:false, expiresAt:{ gt:new Date() } },
    orderBy:{ createdAt:'desc' }
  });
  if (!otp) return { ok:false, reason:'No active code. Request a new one.' };
  if (otp.attempts >= 5) return { ok:false, reason:'Too many attempts.' };
  const match = await bcrypt.compare(code, otp.codeHash);
  await prisma.otp.update({ where:{id:otp.id}, data:{ attempts:{increment:1}, consumed: match } });
  return match ? { ok:true } : { ok:false, reason:'Invalid code.' };
}