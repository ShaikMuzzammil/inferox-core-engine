'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroCanvas from '@/components/HeroCanvas';
import { Cpu, Network, Database, Wifi, Code2, Terminal, GitBranch, Shield, CheckCircle2, Gauge, ArrowRight, Sparkles } from 'lucide-react';

const DOMAINS = [
  { slug:'os', name:'Operating Systems', icon:Cpu, color:'from-cyan-500 to-blue-600', desc:'Process isolation, cgroups, GPU memory, schedulers.' },
  { slug:'distributed', name:'Distributed Systems', icon:Network, color:'from-violet-500 to-fuchsia-600', desc:'Consistent hashing, Raft, gossip, vector clocks.' },
  { slug:'database', name:'Database Systems', icon:Database, color:'from-pink-500 to-rose-600', desc:'B-Trees, WAL, MVCC, transaction isolation.' },
  { slug:'networking', name:'Networking', icon:Wifi, color:'from-emerald-500 to-teal-600', desc:'HTTP/2, gRPC, congestion control, load balancing.' },
  { slug:'compilers', name:'Compilers', icon:Code2, color:'from-amber-500 to-orange-600', desc:'JIT, operator fusion, register allocation, CUDA.' },
  { slug:'languages', name:'Programming Languages', icon:Terminal, color:'from-indigo-500 to-purple-600', desc:'DSL playground, type systems, effect handlers.' },
  { slug:'algorithms', name:'Algorithms', icon:GitBranch, color:'from-red-500 to-pink-600', desc:'Dynamic batching, caching, Hungarian, online algos.' },
  { slug:'security', name:'Security', icon:Shield, color:'from-lime-500 to-green-600', desc:'SGX enclaves, adversarial filters, audit logs.' },
  { slug:'verification', name:'Verification', icon:CheckCircle2, color:'from-sky-500 to-cyan-600', desc:'SLO validators, fairness tests, model checkers.' },
  { slug:'performance', name:'Performance', icon:Gauge, color:'from-fuchsia-500 to-pink-600', desc:'Flame graphs, roofline, cache analysis.' }
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        {/* HERO */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
          <HeroCanvas />
          <div className="relative z-10 text-center px-6 max-w-5xl">
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono tracking-widest text-cyan-300">INFEROX-CORE ENGINE v1.0</span>
            </motion.div>
            <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="text-5xl md:text-7xl font-extrabold leading-tight">
              The <span className="gradient-text">Production-Grade</span><br/>ML Inference Platform
            </motion.h1>
            <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}} className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">
              10 advanced computer science domains. Live visualizations. Real algorithms. Production deployment.
            </motion.p>
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.5}} className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link href="/login" className="group px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 font-semibold hover:shadow-2xl hover:shadow-cyan-500/40 transition flex items-center gap-2">
                Launch Platform <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition"/>
              </Link>
              <Link href="/playground" className="px-8 py-4 rounded-xl glass-strong font-semibold hover:bg-white/10 transition">Try Playground</Link>
            </motion.div>
          </div>
        </section>

        {/* DOMAINS GRID */}
        <section className="py-32 px-6 max-w-7xl mx-auto" id="domains">
          <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">10 Domains. <span className="gradient-text">Infinite Depth.</span></h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">Every dashboard is a deep-dive into a CSE pillar with live interactive simulations.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOMAINS.map((d,i)=>(
              <motion.div key={d.slug} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.05}} whileHover={{y:-8}} className="glass rounded-2xl p-6 group cursor-pointer relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${d.color} opacity-0 group-hover:opacity-10 transition`} />
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${d.color} flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                  <d.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{d.name}</h3>
                <p className="text-sm text-slate-400 mb-4">{d.desc}</p>
                <Link href={`/dashboard/${d.slug}`} className="inline-flex items-center gap-1 text-sm text-cyan-400 hover:gap-2 transition-all">Open dashboard <ArrowRight className="w-3 h-3"/></Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6 text-center">
          <h2 className="text-4xl font-bold">Ready to deploy <span className="gradient-text">production ML</span>?</h2>
          <div className="mt-8 flex gap-4 justify-center">
            <Link href="/login" className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 font-semibold">Get Started Free</Link>
            <Link href="/contact" className="px-8 py-4 rounded-xl glass-strong font-semibold">Contact Sales</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}