// app/dashboard/compilers/page.tsx
'use client';
import { Code2 } from 'lucide-react';

export default function CompilersPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold flex items-center gap-3">
        <Code2 className="text-amber-400" /> Compilers
      </h1>
      
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <h2 className="font-bold mb-3">Before Fusion</h2>
          <pre className="text-xs font-mono bg-black/40 p-3 rounded text-slate-300">
            {`Conv2D → BatchNorm → ReLU\n(3 kernels, 3 memory passes)`}
          </pre>
        </div>
        
        <div className="glass rounded-2xl p-6">
          <h2 className="font-bold mb-3">After Fusion ⚡</h2>
          <pre className="text-xs font-mono bg-black/40 p-3 rounded text-emerald-300">
            {`FusedConvBNReLU\n(1 kernel, 1 memory pass)\nSpeedup: 2.8x`}
          </pre>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="font-bold mb-4">Generated PTX Assembly</h2>
        <pre className="text-xs font-mono bg-black/40 p-4 rounded text-cyan-300 overflow-auto">
          {`.visible .entry fused_conv_bn_relu(...) {
  ld.global.f32 %f1, [%rd1];
  mad.f32 %f2, %f1, %f3, %f4;   // fused multiply-add
  max.f32 %f5, %f2, 0f00000000; // ReLU
  st.global.f32 [%rd2], %f5;
}`}
        </pre>
      </div>
    </div>
  );
}