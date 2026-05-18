// app/providers.tsx
'use client';
import { Toaster } from 'sonner';
import { useEffect } from 'react';
import Lenis from 'lenis';

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ duration:1.2, smoothWheel:true });
    function raf(t:number){ lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
  return (<>
    <Toaster theme="dark" position="top-right" richColors closeButton />
    {children}
  </>);
}