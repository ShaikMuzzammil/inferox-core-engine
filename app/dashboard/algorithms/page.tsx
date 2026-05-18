// app/dashboard/algorithms/page.tsx
'use client';
import { GitBranch } from 'lucide-react';
export default function P(){return(<div className="space-y-8"><h1 className="text-3xl font-bold flex items-center gap-3"><GitBranch className="text-red-400"/>Algorithms</h1>
<div className="glass rounded-2xl p-6"><h2 className="font-bold mb-4">Cache Replacement Arena</h2>
<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">{['LRU','LFU','ARC','Belady (Optimal)'].map((a,i)=>(<div key={a} className="p-4 rounded-lg bg-white/5 border border-white/10"><div className="text-xs text-slate-400">{a}</div><div className="text-2xl font-bold text-cyan-400 mt-1">{(72+i*4)}%</div><div className="text-xs text-slate-500">hit rate</div></div>))}</div></div>
<div className="glass rounded-2xl p-6"><h2 className="font-bold mb-4">Dynamic Batching Simulator</h2>
<input type="range" min="1" max="100" defaultValue="20" className="w-full"/>
<div className="mt-4 flex gap-2 flex-wrap">{Array.from({length:16}).map((_,i)=><div key={i} className="h-8 rounded bg-gradient-to-r from-cyan-500 to-violet-500" style={{width:`${20+Math.random()*60}px`}}/>)}</div></div></div>);}