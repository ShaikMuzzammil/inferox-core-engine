'use client';
import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, KeyRound, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import HomeButton from '@/components/HomeButton';

function LoginPageContent() {
  const [step,setStep] = useState(1);
  const [email,setEmail] = useState('');
  const [name,setName] = useState('');
  const [code,setCode] = useState('');
  const [loading,setLoading] = useState(false);
  const router = useRouter();
  const sp = useSearchParams();

  async function step1() {
    setLoading(true);
    const r = await fetch('/api/auth/send-otp',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,name})});
    const d = await r.json(); setLoading(false);
    if (!d.ok) return toast.error(d.error);
    toast.success('📨 Code sent to ' + email); setStep(2);
  }
  async function step2() {
    setLoading(true);
    const r = await fetch('/api/auth/verify-otp',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,code})});
    const d = await r.json(); setLoading(false);
    if (!d.ok) return toast.error(d.error);
    toast.success('✅ Code verified'); setStep(3);
  }
  async function step3() {
    setLoading(true);
    const r = await fetch('/api/auth/confirm',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,name})});
    const d = await r.json(); setLoading(false);
    if (!d.ok) return toast.error(d.error);
    toast.success('🚀 Welcome to Inferox');
    router.push(sp.get('next') || '/dashboard');
  }

  const Step = ({n,active,done,label,icon:Icon}:{n:number;active:boolean;done:boolean;label:string;icon:any}) => (
    <div className="flex items-center gap-3 flex-1">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${done?'bg-emerald-500':active?'bg-gradient-to-br from-cyan-500 to-violet-500':'bg-white/10'}`}>
        {done ? <CheckCircle2 className="w-5 h-5"/> : <span>{n}</span>}
      </div>
      <div className="hidden sm:block">
        <div className="text-xs text-slate-400">Step {n}</div>
        <div className="text-sm font-medium">{label}</div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen flex items-center justify-center px-6 grid-bg">
      <HomeButton />
      <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className="w-full max-w-xl glass-strong rounded-3xl p-8 glow-border">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text">Launch Inferox</h1>
          <p className="text-slate-400 text-sm mt-2">3-step secure authentication via your Gmail</p>
        </div>
        <div className="flex items-center gap-2 mb-8">
          <Step n={1} active={step===1} done={step>1} label="Email" icon={Mail}/>
          <div className="h-px flex-1 bg-white/10"/>
          <Step n={2} active={step===2} done={step>2} label="Verify Code" icon={KeyRound}/>
          <div className="h-px flex-1 bg-white/10"/>
          <Step n={3} active={step===3} done={false} label="Confirm" icon={ShieldCheck}/>
        </div>

        <AnimatePresence mode="wait">
          {step===1 && (
            <motion.div key="1" initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} className="space-y-4">
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"/>
              <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@gmail.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"/>
              <button onClick={step1} disabled={loading||!email} className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 font-semibold disabled:opacity-50 flex items-center justify-center gap-2">
                {loading?'Sending...':<>Send Code <ArrowRight className="w-4 h-4"/></>}
              </button>
            </motion.div>
          )}
          {step===2 && (
            <motion.div key="2" initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} className="space-y-4">
              <p className="text-sm text-slate-400 text-center">Enter the 6-digit code we just emailed to <b className="text-cyan-300">{email}</b></p>
              <input value={code} onChange={e=>setCode(e.target.value.replace(/\D/g,'').slice(0,6))} placeholder="••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-cyan-400 text-center text-3xl tracking-[1em] font-mono"/>
              <button onClick={step2} disabled={loading||code.length!==6} className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 font-semibold disabled:opacity-50">
                {loading?'Verifying...':'Confirm Code'}
              </button>
              <button onClick={step1} className="w-full text-xs text-slate-400 hover:text-cyan-400">Resend code</button>
            </motion.div>
          )}
          {step===3 && (
            <motion.div key="3" initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} className="space-y-4 text-center">
              <ShieldCheck className="w-16 h-16 text-emerald-400 mx-auto"/>
              <h2 className="text-xl font-bold">Final Confirmation</h2>
              <p className="text-sm text-slate-400">Click below to finalize your secure session. A confirmation will be sent to your inbox and the owner.</p>
              <button onClick={step3} disabled={loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 font-semibold disabled:opacity-50">
                {loading?'Confirming...':'🚀 Enter Inferox'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center px-6 grid-bg">
        <div className="text-slate-400 text-sm">Loading secure gateway...</div>
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  );
}