// components/HomeButton.tsx — floating home button shown on every non-home page
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomeButton() {
  const path = usePathname();
  if (path === '/') return null;
  return (
    <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay:0.5}} className="fixed bottom-6 right-6 z-40">
      <Link href="/" className="flex items-center gap-2 px-4 py-3 rounded-full glass-strong hover:scale-105 transition shadow-2xl shadow-cyan-500/20">
        <Home className="w-5 h-5 text-cyan-400" />
        <span className="font-medium text-sm">Home</span>
      </Link>
    </motion.div>
  );
}