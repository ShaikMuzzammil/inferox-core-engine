// app/dashboard/languages/page.tsx
'use client';
import { Terminal } from 'lucide-react';
import { useState } from 'react';
export default function P(){const [code,setCode]=useState('pipe |> map(scale) |> filter(confidence > 0.8) |> reduce(avg)');return(<div className="space-y-8"><h1 className="text-3xl font-bold flex items-center gap-3"><Terminal className="text-indigo-400"/>Programming Languages</h1>
<div className="glass rounded-2xl p-6"><h2 className="font-bold mb-4">DSL Playground</h2>
<textarea value={code} onChange={e=>setCode(e.target.value)} rows={4} className="w-full bg-black/40 p-3 rounded font-mono text-sm text-cyan-300 outline-none"/>
<div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded text-xs font-mono text-emerald-300">✓ Type-check passed: Tensor[N,3] → Tensor[N,1] → Scalar</div></div>
<div className="glass rounded-2xl p-6"><h2 className="font-bold mb-4">AST Visualizer</h2><pre className="text-xs font-mono text-slate-300">{`Pipeline
├── Map(scale: Tensor → Tensor)
├── Filter(λ x. confidence(x) > 0.8)
└── Reduce(avg: List[Tensor] → Scalar)`}</pre></div></div>);}