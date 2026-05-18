'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Points, PointMaterial } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function Core() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_,d)=>{ ref.current.rotation.x+=d*0.2; ref.current.rotation.y+=d*0.3; });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.4,2]} />
      <meshStandardMaterial wireframe color="#22d3ee" emissive="#8b5cf6" emissiveIntensity={0.5} />
    </mesh>
  );
}
function Stars() {
  const pts = useMemo(()=>{ const a=new Float32Array(3000); for(let i=0;i<3000;i++)a[i]=(Math.random()-0.5)*10; return a; },[]);
  return <Points positions={pts} stride={3}><PointMaterial transparent color="#8b5cf6" size={0.02} sizeAttenuation depthWrite={false} /></Points>;
}
export default function HeroCanvas() {
  return (
    <Canvas camera={{position:[0,0,4]}} className="absolute inset-0">
      <ambientLight intensity={0.5}/>
      <pointLight position={[10,10,10]} color="#22d3ee" intensity={1.5}/>
      <pointLight position={[-10,-10,-10]} color="#ec4899" intensity={1}/>
      <Core/>
      <Stars/>
    </Canvas>
  );
}