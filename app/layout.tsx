// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Inferox-Core Engine — Production ML Inference Platform',
  description: '10-domain advanced systems platform for ML model serving with deep CS visualizations.',
  openGraph: { title:'Inferox-Core Engine', description:'The Production-Grade ML Inference Platform' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#03060d] text-slate-100 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}