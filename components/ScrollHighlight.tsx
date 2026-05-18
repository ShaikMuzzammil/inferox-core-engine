// components/ScrollHighlight.tsx — sticks domain highlight as user scrolls
'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ScrollHighlight({ ids }: { ids: string[] }) {
  const [active,setActive] = useState(ids[0]);
  useEffect(()=>{
    const obs = new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting && setActive(e.target.id)),
      { rootMargin:'-40% 0px -55% 0px' });
    ids.forEach(id=>{ const el=document.getElementById(id); if(el) obs.observe(el); });
    return ()=>obs.disconnect();
  },[ids]);
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 z-30">
      {ids.map(id=>(
        <a key={id} href={`#${id}`} className="group flex items-center gap-2">
          <motion.div animate={{scale:active===id?1.5:1, backgroundColor:active===id?'#22d3ee':'#475569'}} className="w-2 h-2 rounded-full" />
          <span className={`text-xs uppercase tracking-wider transition-opacity ${active===id?'opacity-100 text-cyan-300':'opacity-0 group-hover:opacity-60'}`}>{id}</span>
        </a>
      ))}
    </div>
  );
}