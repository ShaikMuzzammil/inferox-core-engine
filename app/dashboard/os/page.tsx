// app/dashboard/os/page.tsx
'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Cpu, Activity, HardDrive, Gauge } from 'lucide-react';

export default function OSDashboard() {
  const [procs,setProcs] = useState<any[]>([]);
  useEffect(()=>{
    const id = setInterval(()=>{
      setProcs(Array.from({length:8},(_,i)=>({
        pid: 1000+i, name:['inferox-worker','gpu-scheduler','model-loader','cgroup-mgr','redis','postgres','nginx','celery'][i],
        cpu:(Math.random()*100).toFixed(1), mem:(Math.random()*16).toFixed(2), state:['R','S','R','S'][i%4]
      })));
    },1500); return ()=>clearInterval(id);
  },[]);
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold flex items-center gap-3"><Cpu className="text-cyan-400"/>Operating Systems</h1>
        <p className="text-slate-400">Process isolation · cgroups · GPU memory · scheduling</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="glass rounded-2xl p-6">
          <h2 className="font-bold mb-4 flex items-center gap-2"><Activity className="w-4 h-4 text-cyan-400"/>Live Process Monitor (strace)</h2>
          <div className="font-mono text-xs overflow-auto max-h-80">
            <table className="w-full">
              <thead><tr className="text-slate-500"><th className="text-left p-2">PID</th><th className="text-left">NAME</th><th>CPU%</th><th>MEM(GB)</th><th>STATE</th></tr></thead>
              <tbody>{procs.map(p=>(<tr key={p.pid} className="hover:bg-white/5"><td className="p-2 text-cyan-400">{p.pid}</td><td>{p.name}</td><td className="text-center text-violet-400">{p.cpu}</td><td className="text-center text-emerald-400">{p.mem}</td><td className="text-center"><span className={`px-2 py-0.5 rounded text-[10px] ${p.state==='R'?'bg-emerald-500/20 text-emerald-300':'bg-slate-500/20'}`}>{p.state}</span></td></tr>))}</tbody>
            </table>
          </div>
        </motion.div>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="glass rounded-2xl p-6">
          <h2 className="font-bold mb-4 flex items-center gap-2"><HardDrive className="w-4 h-4 text-violet-400"/>GPU Memory Heatmap</h2>
          <div className="grid grid-cols-16 gap-0.5">
            {Array.from({length:128}).map((_,i)=>{const v=Math.random();return(<div key={i} className="aspect-square rounded-sm" style={{background:`rgba(34,211,238,${v})`}} title={`Block ${i}: ${(v*100).toFixed(0)}%`}/>);})}
          </div>
          <button className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/40 hover:bg-cyan-500/30 transition">🔄 Trigger Defragmentation</button>
        </motion.div>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="glass rounded-2xl p-6 lg:col-span-2">
          <h2 className="font-bold mb-4 flex items-center gap-2"><Gauge className="w-4 h-4 text-pink-400"/>Scheduler Gantt (Priority Inversion Detector)</h2>
          <div className="space-y-2">
            {['High Priority','Medium Priority','Low Priority'].map((p,i)=>(
              <div key={p} className="flex items-center gap-3"><span className="w-32 text-xs text-slate-400">{p}</span>
                <div className="flex-1 h-6 bg-white/5 rounded-md overflow-hidden flex">
                  {Array.from({length:20}).map((_,j)=>(<div key={j} className="flex-1" style={{background:Math.random()>0.4?`linear-gradient(90deg,#22d3ee,#8b5cf6)`:''}}/>))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-amber-400">⚠ Priority inversion detected at t=12s — resolution via priority inheritance applied.</p>
        </motion.div>
      </div>
    </div>
  );
}