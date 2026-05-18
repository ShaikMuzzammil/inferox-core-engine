// app/dashboard/security/page.tsx
'use client';
import { Shield, Lock } from 'lucide-react';
export default function P(){return(<div className="space-y-8"><h1 className="text-3xl font-bold flex items-center gap-3"><Shield className="text-lime-400"/>Security</h1>
<div className="grid lg:grid-cols-2 gap-6">
<div className="glass rounded-2xl p-6"><h2 className="font-bold mb-4 flex items-center gap-2"><Lock className="w-4 h-4 text-lime-400"/>SGX Enclave Monitor</h2><div className="aspect-square max-w-xs mx-auto rounded-2xl border-2 border-lime-400/50 bg-lime-500/5 flex items-center justify-center"><div className="text-center"><Lock className="w-12 h-12 mx-auto text-lime-400"/><div className="mt-2 text-xs font-mono text-lime-300">ATTESTED ✓</div></div></div></div>
<div className="glass rounded-2xl p-6"><h2 className="font-bold mb-4">Adversarial Filter</h2><div className="aspect-video bg-white/5 rounded-lg flex items-center justify-center"><div className="text-center"><div className="text-xs text-slate-400">FGSM Detection Confidence</div><div className="text-4xl font-bold text-pink-400 mt-2">98.4%</div></div></div></div></div>
<div className="glass rounded-2xl p-6"><h2 className="font-bold mb-4">Audit Log (Tamper-Detected)</h2><pre className="text-xs font-mono bg-black/40 p-4 rounded text-emerald-300">✓ hash:a3f2... | user@gmail.com | inference req | sig verified
✓ hash:b8c1... | admin@inferox | model deploy | sig verified
✓ hash:d4e9... | user@gmail.com | api key rotate | sig verified</pre></div></div>);}