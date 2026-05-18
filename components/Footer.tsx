// components/Footer.tsx
import Link from 'next/link';
import { Github, Twitter, Mail } from 'lucide-react';
export default function Footer(){return(
  <footer className="border-t border-cyan-500/10 mt-20 py-12 px-6">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
      <div><h3 className="font-mono gradient-text text-xl font-bold">INFEROX</h3><p className="text-xs text-slate-400 mt-2">Production ML inference, distilled.</p></div>
      <div><h4 className="font-semibold mb-2">Platform</h4><ul className="text-sm text-slate-400 space-y-1"><li><Link href="/dashboard">Dashboard</Link></li><li><Link href="/playground">Playground</Link></li><li><Link href="/docs">Docs</Link></li></ul></div>
      <div><h4 className="font-semibold mb-2">Company</h4><ul className="text-sm text-slate-400 space-y-1"><li><Link href="/pricing">Pricing</Link></li><li><Link href="/contact">Contact</Link></li></ul></div>
      <div><h4 className="font-semibold mb-2">Connect</h4><div className="flex gap-3"><Github className="w-4 h-4"/><Twitter className="w-4 h-4"/><Mail className="w-4 h-4"/></div></div>
    </div>
    <p className="text-center text-xs text-slate-500 mt-8">© 2025 Inferox-Core Engine · All rights reserved</p>
  </footer>
);}