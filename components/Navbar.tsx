'use client';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bell, Menu, Zap, Home as HomeIcon } from 'lucide-react';
import { useState } from 'react';
import NotificationCenter from './NotificationCenter';

const NAV = [
  { href:'/', label:'Home' },
  { href:'/dashboard', label:'Dashboard' },
  { href:'/playground', label:'Playground' },
  { href:'/docs', label:'Docs' },
  { href:'/pricing', label:'Pricing' },
  { href:'/contact', label:'Contact' }
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0,200], ['rgba(3,6,13,0)','rgba(3,6,13,0.85)']);
  const [open,setOpen] = useState(false);
  const [notifOpen,setNotifOpen] = useState(false);
  return (
    <motion.nav style={{ background:bg }} className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-mono tracking-widest">
          <Zap className="w-6 h-6 text-cyan-400" />
          <span className="gradient-text text-xl font-bold">INFEROX</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {NAV.map(n => (
            <Link key={n.href} href={n.href} className="text-sm text-slate-300 hover:text-cyan-400 transition relative group">
              {n.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500 group-hover:w-full transition-all" />
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={()=>setNotifOpen(v=>!v)} className="relative p-2 rounded-lg hover:bg-white/5">
            <Bell className="w-5 h-5 text-slate-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
          </button>
          <Link href="/login" className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition">
            Launch App
          </Link>
          <button onClick={()=>setOpen(v=>!v)} className="md:hidden p-2"><Menu className="w-5 h-5"/></button>
        </div>
      </div>
      {open && (
        <div className="md:hidden glass-strong px-6 py-4 space-y-3">
          {NAV.map(n=>(<Link key={n.href} href={n.href} onClick={()=>setOpen(false)} className="block text-slate-300">{n.label}</Link>))}
          <Link href="/login" className="block text-cyan-400">Launch App →</Link>
        </div>
      )}
      <NotificationCenter open={notifOpen} onClose={()=>setNotifOpen(false)} />
    </motion.nav>
  );
}