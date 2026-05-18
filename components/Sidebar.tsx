// components/Sidebar.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Cpu,Network,Database,Wifi,Code2,Terminal,GitBranch,Shield,CheckCircle2,Gauge,LayoutDashboard } from 'lucide-react';
const ITEMS = [
  {h:'/dashboard',l:'Overview',i:LayoutDashboard},
  {h:'/dashboard/os',l:'Operating Systems',i:Cpu},
  {h:'/dashboard/distributed',l:'Distributed',i:Network},
  {h:'/dashboard/database',l:'Database',i:Database},
  {h:'/dashboard/networking',l:'Networking',i:Wifi},
  {h:'/dashboard/compilers',l:'Compilers',i:Code2},
  {h:'/dashboard/languages',l:'Languages',i:Terminal},
  {h:'/dashboard/algorithms',l:'Algorithms',i:GitBranch},
  {h:'/dashboard/security',l:'Security',i:Shield},
  {h:'/dashboard/verification',l:'Verification',i:CheckCircle2},
  {h:'/dashboard/performance',l:'Performance',i:Gauge}
];
export default function Sidebar(){const p=usePathname();return(
  <aside className="fixed top-0 left-0 h-screen w-64 glass-strong border-r border-cyan-500/10 hidden lg:flex flex-col pt-20 px-3 z-30">
    <div className="space-y-1 overflow-y-auto">
      {ITEMS.map(it=>{const A=p===it.h;return(
        <Link key={it.h} href={it.h} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition ${A?'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-300 border border-cyan-500/30':'text-slate-400 hover:bg-white/5'}`}>
          <it.i className="w-4 h-4"/>{it.l}
        </Link>
      );})}
    </div>
  </aside>
);}