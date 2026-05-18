// app/dashboard/database/page.tsx
'use client';
import { Database } from 'lucide-react';
export default function P(){return(<div className="space-y-8"><h1 className="text-3xl font-bold flex items-center gap-3"><Database className="text-pink-400"/>Database Systems</h1>
<div className="glass rounded-2xl p-6"><h2 className="font-bold mb-4">B+Tree Visualizer</h2>
<div className="text-center font-mono text-sm space-y-3"><div className="inline-block px-4 py-2 bg-cyan-500/20 border border-cyan-500/40 rounded">[50]</div><div className="flex gap-4 justify-center">{['[20,35]','[60,80]'].map(n=><div key={n} className="px-4 py-2 bg-violet-500/20 border border-violet-500/40 rounded">{n}</div>)}</div><div className="flex gap-2 justify-center">{['10|15','22|30','40|45','55|58','65|75','85|90'].map(l=><div key={l} className="px-2 py-1 bg-pink-500/20 border border-pink-500/40 rounded text-xs">{l}</div>)}</div></div></div>
<div className="glass rounded-2xl p-6"><h2 className="font-bold mb-4">WAL Replayer</h2><pre className="bg-black/40 p-4 rounded-lg text-xs font-mono text-emerald-400">[LSN 1024] BEGIN TXN 42
[LSN 1025] UPDATE models SET v=2 WHERE id=7
[LSN 1026] COMMIT TXN 42
[LSN 1027] CHECKPOINT</pre><button className="mt-3 px-4 py-2 rounded-lg bg-pink-500/20 border border-pink-500/40">💥 Simulate Crash & Recover</button></div></div>);}