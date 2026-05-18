// components/NotificationCenter.tsx
'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export default function NotificationCenter({open,onClose}:{open:boolean;onClose:()=>void}) {
  const [items,setItems] = useState<any[]>([]);
  useEffect(()=>{ if(open) fetch('/api/notify').then(r=>r.json()).then(d=>setItems(d.items||[])); },[open]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} className="fixed top-16 right-4 w-96 max-h-[70vh] overflow-auto glass-strong rounded-xl p-4 shadow-2xl z-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">🔔 Notifications</h3>
            <button onClick={onClose}><X className="w-4 h-4"/></button>
          </div>
          {items.length===0 && <p className="text-sm text-slate-400">No notifications yet.</p>}
          <div className="space-y-2">
            {items.map(n=>(
              <div key={n.id} className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-sm font-semibold text-cyan-300">{n.title}</div>
                <div className="text-xs text-slate-400">{n.body}</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}