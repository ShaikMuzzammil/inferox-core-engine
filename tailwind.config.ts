import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: { 50:'#e8fbff',100:'#c5f5ff',300:'#5be1ff',500:'#06b6d4',700:'#0e7490',900:'#083344' },
        neon: { violet:'#8b5cf6', pink:'#ec4899', cyan:'#22d3ee', green:'#10b981' }
      },
      fontFamily: { sans:['Inter','system-ui'], mono:['JetBrains Mono','monospace'] },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite'
      },
      keyframes: {
        gradient: { '0%,100%':{backgroundPosition:'0% 50%'},'50%':{backgroundPosition:'100% 50%'} },
        float: { '0%,100%':{transform:'translateY(0)'},'50%':{transform:'translateY(-20px)'} },
        glow: { from:{boxShadow:'0 0 20px #06b6d4'},to:{boxShadow:'0 0 40px #8b5cf6'} }
      }
    }
  },
  plugins: []
};
export default config;