// app/dashboard/networking/page.tsx
'use client';
import { Wifi } from 'lucide-react';
import { useState } from 'react';
export default function P(){const [algo,setAlgo]=useState('BBR');return(<div className="space-y-8"><h1 className="text-3xl font-bold flex items-center gap-3"><Wifi className="text-emerald-400"/>Networking</h1>
<div className="glass rounded-2xl p-6"><h2 className="font-bold mb-4">Congestion Control Duel</h2>
<div className="flex gap-2 mb-4">{['Reno','Cubic','BBR'].map(a=><button key={a} onClick={()=>setAlgo(a)} className={`px-4 py-2 rounded ${algo===a?'bg-cyan-500':'bg-white/5'}`}>{a}</button>)}</div>
<svg viewBox="0 0 400 150" className="w-full"><polyline fill="none" stroke="#22d3ee" strokeWidth="2" points={Array.from({length:40}).map((_,i)=>`${i*10},${75-Math.sin(i*0.3)*40-(algo==='BBR'?20:0)}`).join(' ')}/></svg></div>
<div className="glass rounded-2xl p-6"><h2 className="font-bold mb-4">HTTP/2 Stream Multiplexer</h2><div className="space-y-2">{[1,2,3,4].map(s=><div key={s} className="flex items-center gap-2"><span className="text-xs w-20">Stream {s}</span><div className="flex-1 h-3 bg-white/5 rounded"><div className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded" style={{width:`${Math.random()*100}%`}}/></div></div>)}</div></div></div>);}