import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useMotionTemplate, useMotionValue, useSpring, useTransform, } from 'framer-motion';
import { Zap, Sliders, ShieldCheck, Sparkles, BatteryCharging } from 'lucide-react';
import { Btn, ease } from '../Pages/NeoUI';

import product1 from '../assets/Architectural BESS/Cozy Family Living Room with PURE Unit.png'
import product2 from '../assets/Architectural BESS/PURE Technicians Servicing Power Cabinet.png'
import product3 from '../assets/Architectural BESS/PURE Energy in a Warm Modern Interior.png'
import product4 from '../assets/Architectural BESS/PURE Equipment in Modern Utility Room.png'


const MODELS = [
  {
    id: 'm1',
    name: 'PuREPower Home Essential',
    highlight: 'High Efficiency',
    sub: 'Ultra-low thermal dissipation',
    icon: Zap,
    theme: {
      accent: '#F5B800',
      badgeGradient: 'from-[#F5B800] via-[#FFD043] to-[#F5B800]',
      badgeText: 'text-slate-950',
      glowRgb: '245, 184, 0',
    },
    image: product1,
  },
  {
    id: 'm2',
    name: 'PuREPower Max Residential',
    highlight: 'Pure Sine Wave',
    sub: 'THD < 2% Studio Pure AC',
    isWave: true,
    theme: {
      accent: '#00D0DE',
      badgeGradient: 'from-[#00D0DE] via-[#48E5F0] to-[#00D0DE]',
      badgeText: 'text-slate-950',
      glowRgb: '0, 208, 222',
    },
    image: product2,
  },
  {
    id: 'm3',
    name: 'PuREPower Pro Smart Hybrid',
    highlight: 'Dry Contacts for Load Control',
    sub: 'Automated peak shaving logic',
    icon: Sliders,
    theme: {
      accent: '#FF5C00',
      badgeGradient: 'from-[#FF5C00] via-[#FF7A29] to-[#FF5C00]',
      badgeText: 'text-white',
      glowRgb: '255, 92, 0',
    },
    image: product3,
  },
  {
    id: 'm4',
    name: 'PuREPower Enterprise BESS',
    highlight: 'Overload Protection',
    sub: 'Continuous 110% surge tolerance',
    icon: ShieldCheck,
    isOverload: true,
    theme: {
      accent: '#34D399',
      badgeGradient: 'from-slate-900/90 via-slate-800/90 to-slate-900/90',
      badgeText: 'text-white',
      glowRgb: '52, 211, 153',
    },
    image: product4,
  },
];

/* ---------- reveal variants (driven by parent `animate`, replay on every scroll) ---------- */
const fadeUp = (delay = 0, y = 18) => ({
  hidden: { opacity: 0, y, filter: 'blur(6px)', transition: { duration: 0.25 } },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, delay, ease } },
});

/* heading word: slides up out of a mask */
const MaskWord = ({ children, delay }) => (
  <span className="mr-[0.25em] inline-block overflow-hidden pb-1 align-bottom">
    <motion.span
      variants={{
        hidden: { y: '115%', rotate: 4, transition: { duration: 0.2 } },
        show: { y: '0%', rotate: 0, transition: { duration: 0.85, delay, ease } },
      }}
      className="inline-block origin-bottom-left"
    >
      {children}
    </motion.span>
  </span>
);

/* 3D Tilt Luxury Interactive Card Component */
const LuxuryProductCard = ({ m }) => {
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseFromLeft = e.clientX - rect.left;
    const mouseFromTop = e.clientY - rect.top;

    x.set(mouseFromLeft / width - 0.5);
    y.set(mouseFromTop / height - 0.5);

    mouseX.set(mouseFromLeft);
    mouseY.set(mouseFromTop);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${mouseX}px ${mouseY}px, rgba(${m.theme.glowRgb}, 0.25), transparent 80%)`;

  return (
    <motion.div
      /* card "develops" upward from the bottom edge, like a shutter lifting */
      variants={{
        hidden: {
          opacity: 0,
          y: 60,
          clipPath: 'inset(100% 0% 0% 0% round 20px)',
          transition: { duration: 0.3 },
        },
        show: {
          opacity: 1,
          y: 0,
          clipPath: 'inset(-20% -20% -20% -20% round 20px)',
          transition: { duration: 1, ease },
        },
      }}
      className="group relative w-full [perspective:1400px]"
    >
      {/* Background Soft Aura Underglow */}
      <div
        className="pointer-events-none absolute -inset-2 rounded-[46px] opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-50"
        style={{ background: `radial-gradient(circle, rgba(${m.theme.glowRgb}, 0.45) 0%, transparent 70%)` }}
      />

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative h-[500px] w-full cursor-pointer rounded-[20px] border border-slate-200/90 bg-slate-950 p-[1.5px] shadow-[0_15px_35px_-15px_rgba(0,0,0,0.1)] transition-shadow duration-500 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]"
      >
        <Link to="/productShowcase" className="block h-full w-full overflow-hidden rounded-[20px] relative">
          {/* Dynamic Follow-me Interactive Spotlight */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: spotlight }}
          />

          {/* Background Image: settles from a zoomed-in state while the card opens */}
          <motion.div
            variants={{
              hidden: { scale: 1.35, transition: { duration: 0.3 } },
              show: { scale: 1, transition: { duration: 1.4, ease } },
            }}
            className="absolute inset-0"
          >
            <img
              src={m.image}
              alt={m.name}
              className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-108"
            />
          </motion.div>\]098754eww

          {/* Gradient Scrim Layers */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-black/35" />

          {/* Dynamic Diagonal Light Reflection Ray */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />

          {/* Intro light sweep (plays once each time the card reveals) */}
          <motion.div
            variants={{
              hidden: { x: '-120%', opacity: 0, transition: { duration: 0 } },
              show: { x: '220%', opacity: [0, 1, 1, 0], transition: { duration: 1.2, delay: 0.5, ease } },
            }}
            className="pointer-events-none absolute inset-y-0 left-0 z-30 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
          />

          {/* Center Info Text Layer with Parallax Depth */}
          <div className="absolute inset-x-5 bottom-28 z-20 sm:inset-x-6 [transform:translateZ(25px)]">
            <motion.div variants={fadeUp(0.7)}>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-md">
                <BatteryCharging className="h-3 w-3" />
                PuREPower Architecture
              </div>
            </motion.div>
            <motion.div variants={fadeUp(0.8)}>
              <h3 className="mt-2 text-xl font-black leading-tight text-white drop-shadow-md transition-colors group-hover:text-emerald-100 sm:text-2xl">
                {m.name}
              </h3>
            </motion.div>
            <motion.div variants={fadeUp(0.9)}>
              <p className="mt-1 text-xs font-medium text-slate-300 drop-shadow line-clamp-1">
                {m.sub}
              </p>
            </motion.div>
          </div>

          {/* Bottom Showcase Feature Badge */}
          <div className="absolute inset-x-3.5 bottom-3.5 z-20 [transform:translateZ(35px)]">
            <motion.div variants={fadeUp(1, 24)}>
              <div
                className={`flex items-center justify-between gap-2.5 rounded-[24px] bg-gradient-to-r ${m.theme.badgeGradient} ${m.theme.badgeText} px-4 py-3.5 font-bold shadow-xl transition-all duration-300 group-hover:scale-[1.02]`}
                style={{ boxShadow: `0 14px 30px -8px rgba(${m.theme.glowRgb}, 0.5)` }}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {m.isWave ? (
                    <span className="flex h-7 w-9 shrink-0 items-center justify-center rounded-xl bg-black/10">
                      <svg viewBox="0 0 40 20" className="h-3.5 w-6 stroke-current" fill="none" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M2 10 Q10 0 20 10 T38 10" />
                      </svg>
                    </span>
                  ) : m.icon ? (
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-black/10">
                      <m.icon className="h-4 w-4" />
                    </span>
                  ) : null}

                  <span className="truncate text-xs font-black uppercase tracking-tight sm:text-[13px]">
                    {m.highlight}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

const ArchitecturalBESS = ({
  id = 'range',
  tag = 'Architectural BESS',
  title = 'PuREPower BESS by capacity',
  text = 'Products are the equipment we supply. Complete systems are designed for you under Solutions.',
  className = 'bg-[#FAFCFA]',
}) => {
  /* observers sit on unclipped wrappers; once:false => replays every time you scroll back */
  const headRef = useRef(null);
  const gridRef = useRef(null);
  const headIn = useInView(headRef, { once: false, amount: 0.4 });
  const gridIn = useInView(gridRef, { once: false, amount: 0.12 });

  const words = title.split(' ');

  return (
    <section id={id} className={`relative scroll-mt-28 overflow-hidden py-16 sm:py-24 ${className}`}>
      {/* Subtle Luxury Mesh Ambient Aura */}
      <div className="pointer-events-none absolute -left-48 top-1/4 h-[600px] w-[600px] rounded-full bg-emerald-500/5 blur-[160px]" />
      <div className="pointer-events-none absolute -right-48 bottom-1/4 h-[600px] w-[600px] rounded-full bg-amber-500/5 blur-[160px]" />

      {/* Full Screen Width Fluid Wrapper */}
      <div className="relative w-full px-4 sm:px-8">
        {/* ---------- HEADER: words rise out of a mask, rule draws underneath ---------- */}
        <motion.div
          ref={headRef}
          initial="hidden"
          animate={headIn ? 'show' : 'hidden'}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          className="flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.6, filter: 'blur(6px)', transition: { duration: 0.2 } },
                show: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease } },
              }}
              className="inline-flex origin-left items-center gap-2 rounded-full border border-[#159447]/20 bg-[#EAF5EE] px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-[#159447]"
            >
              <Sparkles className="h-3 w-3" />
              {tag}
            </motion.div>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#073B73] sm:text-4xl lg:text-5xl">
              {words.map((w, i) => (
                <MaskWord key={`${w}-${i}`} delay={0.15 + i * 0.07}>
                  {w}
                </MaskWord>
              ))}
            </h2>

            {/* drawing rule */}
            <motion.span
              variants={{
                hidden: { scaleX: 0, transition: { duration: 0.2 } },
                show: { scaleX: 1, transition: { duration: 1, delay: 0.5, ease } },
              }}
              className="mt-3 block h-[3px] w-24 origin-left rounded-full bg-gradient-to-r from-[#159447] to-[#F5B800]"
            />

            <motion.p
              variants={fadeUp(0.6)}
              className="mt-3 max-w-3xl text-sm leading-relaxed text-[#4C5B73] sm:text-base"
            >
              {text}
            </motion.p>
          </div>

          <motion.div variants={fadeUp(0.8)} className="hidden sm:block">
            <Btn to="/productShowcase" variant="outline" className="inline-flex">
              View all products
            </Btn>
          </motion.div>
        </motion.div>

        {/* ---------- GRID: cards open one after another, replay on every scroll ---------- */}
        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridIn ? 'show' : 'hidden'}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } } }}
          className="mt-12 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {MODELS.map((m) => (
            <LuxuryProductCard key={m.id} m={m} />
          ))}
        </motion.div>

        {/* Mobile view all button */}
        <div className="mt-10 text-center sm:hidden">
          <Btn to="/productShowcase" variant="outline" className="w-full">
            View all products
          </Btn>
        </div>
      </div>
    </section>
  );
};

export default ArchitecturalBESS;