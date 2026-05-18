// app/playground/page.tsx, app/docs/page.tsx, app/pricing/page.tsx
// (Simple polished pages — full code in zip)
'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeButton from '@/components/HomeButton';
export default function Page(){return(<><Navbar/><HomeButton/><main className="min-h-screen pt-24 px-6 max-w-5xl mx-auto"><h1 className="text-5xl font-bold gradient-text">Playground</h1><p className="mt-4 text-slate-400">Interactive demo — no login required.</p><div className="glass rounded-2xl p-8 mt-8"><pre className="text-cyan-300 font-mono text-sm">$ inferox deploy model.pth --gpu A100
✓ Loading weights... 234MB
✓ Compiling kernels... 2.1s
✓ Endpoint live: https://api.inferox.io/v1/m/k3j2h9
✓ p99: 8.4ms · throughput: 12.4k req/s</pre></div></main><Footer/></>);}