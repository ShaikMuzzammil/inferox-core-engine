// app/dashboard/page.tsx — Overview
import Link from 'next/link';
export default function Overview(){
  const stats = [
    {l:'Active Models',v:'24',c:'cyan'},
    {l:'Requests/sec',v:'12.4k',c:'violet'},
    {l:'p99 Latency',v:'8ms',c:'emerald'},
    {l:'Uptime',v:'99.99%',c:'pink'}
  ];
  return (<div className="space-y-8">
    <div><h1 className="text-3xl font-bold gradient-text">Welcome back 👋</h1><p className="text-slate-400 mt-1">Your inference platform at a glance.</p></div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(s=>(<div key={s.l} className="glass rounded-xl p-5"><div className="text-xs text-slate-400">{s.l}</div><div className={`text-3xl font-bold text-${s.c}-400 mt-2`}>{s.v}</div></div>))}
    </div>
    <div className="glass rounded-xl p-6"><h2 className="font-bold mb-3">Quick Links</h2>
      <div className="grid md:grid-cols-3 gap-3">
        {['os','distributed','database','networking','compilers','languages','algorithms','security','verification','performance'].map(d=>(
          <Link key={d} href={`/dashboard/${d}`} className="p-4 rounded-lg bg-white/5 hover:bg-cyan-500/10 border border-white/10 capitalize">{d}</Link>
        ))}
      </div>
    </div>
  </div>);
}