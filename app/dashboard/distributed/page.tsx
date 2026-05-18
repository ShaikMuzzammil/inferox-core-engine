// app/dashboard/distributed/page.tsx
'use client';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';
export default function P(){const N=8;return(<div className="space-y-8"><h1 className="text-3xl font-bold flex items-center gap-3"><Network className="text-violet-400"/>Distributed Systems</h1>
<div className="glass rounded-2xl p-6"><h2 className="font-bold mb-4">Consistent Hashing Ring (8 nodes)</h2>
<svg viewBox="-150 -150 300 300" className="w-full max-w-md mx-auto">{Array.from({length:N}).map((_,i)=>{const a=(i/N)*Math.PI*2,x=Math.cos(a)*100,y=Math.sin(a)*100;return(<g key={i}><circle cx={x} cy={y} r="14" fill="url(#g)"/><text x={x} y={y+4} textAnchor="middle" fontSize="10" fill="white">N{i}</text></g>);})}<defs><linearGradient id="g"><stop stopColor="#22d3ee"/><stop offset="1" stopColor="#8b5cf6"/></linearGradient></defs></svg>
<button className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500">Simulate Node Failure</button></div>
<div className="glass rounded-2xl p-6"><h2 className="font-bold mb-4">Vector Clock Tracker</h2><div className="font-mono text-xs space-y-1">{['[1,0,0,0]','[1,1,0,0]','[2,1,0,1]','[2,2,1,1]'].map((v,i)=><div key={i} className="text-cyan-300">t={i}: {v}</div>)}</div></div></div>);}