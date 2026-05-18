'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeButton from '@/components/HomeButton';
import { Send, Mail, Tag, MessageSquare, User } from 'lucide-react';

const schema = z.object({
  name: z.string().min(1,'Required'),
  email: z.string().email('Invalid email'),
  label: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(1,'Required')
});
type FormT = z.infer<typeof schema>;

export default function ContactPage() {
  const { register, handleSubmit, reset, formState:{ errors, isSubmitting } } = useForm<FormT>({ resolver: zodResolver(schema) });
  async function onSubmit(d: FormT) {
    const r = await fetch('/api/contact',{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(d) });
    const j = await r.json();
    if (!j.ok) return toast.error(j.error||'Failed');
    toast.success('✅ Message sent! Check your email for confirmation.');
    reset();
  }
  return (
    <>
      <Navbar/><HomeButton/>
      <main className="min-h-screen pt-24 pb-20 px-6 grid-bg">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-center mb-12">
            <h1 className="text-5xl font-bold gradient-text">Get in Touch</h1>
            <p className="mt-3 text-slate-400">Full reply on email · No character limit · Encrypted at rest</p>
          </motion.div>
          <motion.form initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} onSubmit={handleSubmit(onSubmit)} className="glass-strong rounded-3xl p-8 space-y-5 glow-border">
            <div className="grid md:grid-cols-2 gap-5">
              <Field icon={User} label="Full Name *" error={errors.name?.message}>
                <input {...register('name')} className="input"/>
              </Field>
              <Field icon={Mail} label="Email for Reply *" error={errors.email?.message}>
                <input type="email" {...register('email')} className="input"/>
              </Field>
              <Field icon={Tag} label="Label (Category)">
                <select {...register('label')} className="input">
                  <option value="">— Select —</option>
                  <option>General Inquiry</option><option>Bug Report</option><option>Feature Request</option>
                  <option>Sales</option><option>Partnership</option><option>Security Disclosure</option>
                </select>
              </Field>
              <Field icon={MessageSquare} label="Subject">
                <input {...register('subject')} className="input"/>
              </Field>
            </div>
            <Field icon={MessageSquare} label="Message * (no limit)" error={errors.message?.message}>
              <textarea {...register('message')} rows={10} className="input resize-y" placeholder="Type as much as you need..."/>
            </Field>
            <button disabled={isSubmitting} className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 font-semibold disabled:opacity-50 flex items-center justify-center gap-2">
              {isSubmitting?'Sending...':<><Send className="w-4 h-4"/>Send Message</>}
            </button>
            <p className="text-xs text-slate-500 text-center">Delivered via Resend → your Gmail. Auto-confirmation sent to your address.</p>
          </motion.form>
        </div>
      </main>
      <Footer/>
      <style jsx>{`.input{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:12px 16px;outline:none;color:white}.input:focus{border-color:#22d3ee}`}</style>
    </>
  );
}
function Field({icon:Icon,label,error,children}:any){return(<div><label className="text-sm text-slate-300 flex items-center gap-2 mb-2"><Icon className="w-4 h-4 text-cyan-400"/>{label}</label>{children}{error&&<p className="text-xs text-pink-400 mt-1">{error}</p>}</div>);}