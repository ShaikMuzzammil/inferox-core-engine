// lib/auth.ts
import { SignJWT, jwtVerify } from 'jose';
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-change-me');

export async function signSession(payload:{email:string;name?:string}) {
  return new SignJWT(payload).setProtectedHeader({alg:'HS256'})
    .setIssuedAt().setExpirationTime('7d').sign(SECRET);
}
export async function verifySession(token:string) {
  try { const { payload } = await jwtVerify(token, SECRET); return payload as any; }
  catch { return null; }
}