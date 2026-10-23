import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Layers,
  Sun,
  GitBranch,
  Plug,
  ShieldCheck,
  ArrowDownToLine,
  BatteryCharging,
  Shield,
  Home as HomeIcon,
  Activity,
} from 'lucide-react';
import { WRAP, SYSTEM_CHAIN } from '../Pages/NeoUI';

const icons = [Layers, Sun, GitBranch, Plug, ShieldCheck, ArrowDownToLine, BatteryCharging, Shield, HomeIcon, Activity];
const stages = ['Assessment', 'System design', 'Sizing', 'Supply', 'Installation', 'Commissioning', 'Support'];

/* ---------- orbit geometry (viewBox 1000 x 620) ---------- */
const N = SYSTEM_CHAIN.length;
const LEN = stages.length;
const CX = 500;
const CY = 310;
const RX = 310;
const RY = 235;

const pos = (i) => {
  const a = ((-90 + (360 / N) * i) * Math.PI) / 180;
  return { x: CX + RX * Math.cos(a), y: CY + RY * Math.sin(a), c: Math.cos(a), s: Math.sin(a) };
};
const sideOf = ({ c, s }) => (c > 0.25 ? 'r' : c < -0.25 ? 'l' : s < 0 ? 't' : 'b');
const labelPos = {
  r: 'left-full top-1/2 ml-3 -translate-y-1/2 text-left',
  l: 'right-full top-1/2 mr-3 -translate-y-1/2 text-right',
  t: 'bottom-full left-1/2 mb-3 -translate-x-1/2 text-center',
  b: 'top-full left-1/2 mt-3 -translate-x-1/2 text-center',
};

/* ---------- Unique Reveal Variants ---------- */

// 1. Magnetic Character Drop (Per-letter spring drop)
const charDrop = {
  hidden: { y: -40, opacity: 0, scale: 1.4, filter: 'blur(8px)' },
  show: (i) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 24,
      delay: i * 0.02,
    },
  }),
};

// 2. Clockwise Laser Beam Ignition (Orbit Nodes)
const radarNodeIgnition = {
  hidden: { scale: 0, opacity: 0, filter: 'brightness(3) blur(6px)' },
  show: (i) => ({
    scale: 1,
    opacity: 1,
    filter: 'brightness(1) blur(0px)',
    transition: {
      duration: 0.6,
      delay: 0.3 + i * 0.06,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// 3. Card reveal - Direct scale & opacity
const cardReveal = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.98,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// 4. Chevron 3D Isometric Drop
const isometricDrop = {
  hidden: { y: 25, opacity: 0, scale: 0.95 },
  show: (i) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 20,
      delay: 0.15 + i * 0.06,
    },
  }),
};

/* ---------- centre hub showing active node ---------- */
const Hub = ({ i, className, reduce }) => {
  const Icon = icons[i];
  const label = SYSTEM_CHAIN[i];
  const bess = label?.includes('BESS');

  return (
    <div className={`relative ${className}`}>
      <motion.span
        aria-hidden
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#159447,#F5B800,#073B73,#159447)]"
      />
      <div className="absolute inset-[3px] flex items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_0_90px_-10px_rgba(21,148,71,0.45)]">
        <div aria-hidden className="absolute inset-3 rounded-full bg-[radial-gradient(circle,rgba(245,184,0,0.18),transparent_70%)]" />
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ scale: 0.5, rotateY: 90, opacity: 0 }}
            animate={{ scale: 1, rotateY: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotateY: -90, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="relative flex flex-col items-center px-8 text-center"
          >
            <span className="text-xs font-black tracking-widest text-[#159447]">{String(i + 1).padStart(2, '0')}</span>
            <span
              className={`mt-2 flex h-20 w-20 items-center justify-center rounded-full shadow-lg ${
                bess
                  ? 'bg-gradient-to-br from-[#FFE27A] to-[#F5B800] text-[#073B73]'
                  : 'bg-gradient-to-br from-[#1DB35A] to-[#0C6B33] text-white'
              }`}
            >
              <Icon className="h-10 w-10" strokeWidth={1.9} />
            </span>
            <p className="mt-3 text-lg font-extrabold leading-snug text-[#073B73]">{label}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const CompleteSystemApproach = () => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [orbitPaused, setOrbitPaused] = useState(false);
  const [phase, setPhase] = useState(reduce ? LEN : 0);

  useEffect(() => {
    if (reduce || orbitPaused) return undefined;
    const id = setInterval(() => setActive((a) => (a + 1) % N), 1700);
    return () => clearInterval(id);
  }, [reduce, orbitPaused]);

  useEffect(() => {
    if (reduce) return undefined;
    const id = setInterval(() => setPhase((p) => (p + 1) % (LEN + 2)), 1000);
    return () => clearInterval(id);
  }, [reduce]);

  const p = pos(active);
  const p0 = pos(0);

  const titleText = "From solar generation to energy utilisation";
  const subText = "Every stage of the system is planned together, based on the customer's actual energy requirement.";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F4FAF7] to-white py-14 sm:py-28 [perspective:1400px]">
      {/* background: sun rays + aurora blobs + fine grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(7,59,115,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(7,59,115,0.05)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />

        <motion.div
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="absolute -right-44 -top-44 h-[600px] w-[600px] rounded-full opacity-70 [background:repeating-conic-gradient(from_0deg,rgba(245,184,0,0.18)_0deg_6deg,transparent_6deg_18deg)] [mask-image:radial-gradient(circle,black_0%,transparent_68%)] [-webkit-mask-image:radial-gradient(circle,black_0%,transparent_68%)]"
        />
      </div>

      <div className={`${WRAP} relative`}>
        {/* ===== Magnetic Terminal HUD Reveal Header (Re-triggers on scroll up & down) ===== */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-[#159447]/20 bg-[#159447]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#159447]"
          >
            <span className="h-2 w-2 rounded-full bg-[#159447] shadow-[0_0_8px_#159447]" />
            Complete system approach
          </motion.div>

          <h2 className="mt-4 flex flex-wrap justify-center text-3xl font-black tracking-tight text-[#073B73] sm:text-4xl md:text-5xl">
            {titleText.split(" ").map((word, wIdx) => (
              <span key={wIdx} className="inline-flex mr-2.5">
                {word.split("").map((char, cIdx) => (
                  <motion.span
                    key={cIdx}
                    custom={wIdx * 5 + cIdx}
                    variants={charDrop}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.2 }}
                    className="inline-block transform-gpu"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.08em', y: 15 }}
            whileInView={{ opacity: 1, letterSpacing: 'normal', y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-sm font-semibold text-[#4C5B73] sm:text-base"
          >
            {subText}
          </motion.p>
        </div>

        {/* ===== Desktop: Orbit Geometry (Re-triggers on scroll up & down) ===== */}
        <div
          onMouseEnter={() => setOrbitPaused(true)}
          onMouseLeave={() => setOrbitPaused(false)}
          className="relative mx-auto mt-16 hidden aspect-[1000/620] w-full max-w-[1120px] lg:block transform-gpu"
        >
          <svg viewBox="0 0 1000 620" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
            <motion.ellipse
              cx={CX}
              cy={CY}
              rx={RX}
              ry={RY}
              stroke="#073B73"
              strokeOpacity="0.12"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
            <motion.ellipse
              cx={CX}
              cy={CY}
              rx={RX}
              ry={RY}
              stroke="#159447"
              strokeOpacity="0.6"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="3 12"
              animate={reduce ? undefined : { strokeDashoffset: [0, -150] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            />
            <motion.ellipse
              cx={CX}
              cy={CY}
              rx={RX * 0.72}
              ry={RY * 0.7}
              stroke="#F5B800"
              strokeOpacity="0.45"
              strokeWidth="1.5"
              strokeDasharray="2 8"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.15 }}
            />
            <motion.line
              x1={CX}
              y1={CY}
              initial={{ x2: p0.x, y2: p0.y }}
              animate={{
                x2: p.x,
                y2: p.y,
                strokeDashoffset: reduce ? 0 : [0, -150],
              }}
              transition={{
                x2: { duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] },
                y2: { duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] },
                strokeDashoffset: { duration: 5, repeat: Infinity, ease: 'linear' },
              }}
              stroke="#159447"
              strokeOpacity="0.55"
              strokeWidth="2"
              strokeDasharray="6 8"
            />
          </svg>

          {/* Travelling Spark */}
          <motion.span
            aria-hidden
            initial={{ left: `${p0.x / 10}%`, top: `${p0.y / 6.2}%` }}
            animate={{ left: `${p.x / 10}%`, top: `${p.y / 6.2}%` }}
            transition={{ duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-[5] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5B800] shadow-[0_0_0_8px_rgba(245,184,0,0.25),0_0_30px_10px_rgba(245,184,0,0.55)]"
          />

          {/* Centre Hub */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
            className="absolute left-1/2 top-1/2 z-[6] -translate-x-1/2 -translate-y-1/2"
          >
            <Hub i={active} className="h-[290px] w-[290px]" reduce={reduce} />
          </motion.div>

          {/* Orbit Nodes */}
          {SYSTEM_CHAIN.map((label, i) => {
            const Icon = icons[i];
            const q = pos(i);
            const on = active === i;
            const isBess = label.includes('BESS');

            return (
              <div
                key={label}
                className="absolute z-10 h-16 w-16 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${q.x / 10}%`, top: `${q.y / 6.2}%` }}
              >
                <motion.div
                  custom={i}
                  variants={radarNodeIgnition}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, amount: 0.2 }}
                  className="h-full w-full"
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group relative block h-full w-full rounded-full outline-none focus-visible:ring-4 focus-visible:ring-[#F5B800]/60"
                  >
                    {on && !reduce && (
                      <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#159447]/30" />
                    )}
                    <span
                      className={`relative flex h-full w-full items-center justify-center rounded-full transition-all duration-500 ${
                        on
                          ? 'scale-125 bg-gradient-to-br from-[#1DB35A] to-[#0C6B33] text-white shadow-[0_18px_36px_-10px_rgba(21,148,71,0.85)] ring-4 ring-[#159447]/20'
                          : isBess
                          ? 'bg-gradient-to-br from-[#FFE27A] to-[#F5B800] text-[#073B73] shadow-[0_14px_30px_-12px_rgba(245,184,0,0.9)] group-hover:scale-110'
                          : 'bg-white text-[#159447] shadow-[0_12px_28px_-14px_rgba(7,59,115,0.5)] ring-1 ring-[#073B73]/10 group-hover:scale-110 group-hover:ring-[#159447]/50'
                      }`}
                    >
                      <Icon className="h-7 w-7" strokeWidth={2} />
                    </span>
                    <span
                      className={`absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-[10px] font-extrabold transition-colors duration-500 ${
                        on ? 'bg-[#F5B800] text-[#073B73]' : 'bg-[#073B73] text-white'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`absolute w-32 text-sm font-bold leading-snug transition-colors duration-500 xl:w-36 ${
                        labelPos[sideOf(q)]
                      } ${on ? 'text-[#159447]' : 'text-[#073B73]'}`}
                    >
                      {label}
                    </span>
                  </button>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* ===== Mobile / Tablet Alternative (Re-triggers on scroll) ===== */}
        <div className="mt-12 lg:hidden">
          <div className="mx-auto w-fit">
            <Hub i={active} className="h-64 w-64 sm:h-72 sm:w-72" reduce={reduce} />
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {SYSTEM_CHAIN.map((label, i) => {
              const Icon = icons[i];
              const on = active === i;
              const isBess = label.includes('BESS');
              return (
                <motion.li
                  key={label}
                  custom={i}
                  variants={radarNodeIgnition}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, amount: 0.2 }}
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={`flex h-full w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-500 ${
                      on
                        ? 'border-transparent bg-gradient-to-br from-[#1DB35A] to-[#0C6B33] text-white shadow-[0_18px_34px_-16px_rgba(21,148,71,0.8)]'
                        : isBess
                        ? 'border-[#F5B800]/70 bg-[#FFF9E5] text-[#073B73]'
                        : 'border-[#073B73]/10 bg-white/90 text-[#073B73]'
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        on ? 'bg-white/20' : isBess ? 'bg-[#F5B800]/30' : 'bg-[#159447]/10'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${on ? 'text-white' : isBess ? 'text-[#C58F00]' : 'text-[#159447]'}`} />
                    </span>
                    <span className="text-xs font-bold leading-snug sm:text-sm">{label}</span>
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* ===== Delivery Stages ("How we handle it") Card (Re-triggers on scroll) ===== */}
        <motion.div
          variants={cardReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.15 }}
          className="relative mt-20 rounded-[2rem] border border-[#073B73]/10 bg-white/80 p-6 shadow-[0_40px_80px_-40px_rgba(7,59,115,0.35)] backdrop-blur sm:p-10 transform-gpu"
        >
          <div className="flex flex-col items-start justify-between sm:flex-row sm:items-end">
            <div>
              <p className="text-xl font-extrabold text-[#073B73] sm:text-2xl">How we handle it</p>
              <motion.span
                animate={reduce ? undefined : { backgroundPosition: ['0% 50%', '200% 50%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                className="mt-3 block h-1.5 w-24 rounded-full bg-[linear-gradient(90deg,#159447,#F5B800,#159447)] [background-size:200%_100%]"
              />
            </div>
            <p className="mt-2 text-sm font-semibold text-[#4C5B73]">Based on your requirement, we take care of every stage.</p>
          </div>

          <ol className="mt-10 flex flex-col gap-2 lg:flex-row lg:gap-0">
            {stages.map((s, i) => {
              const filled = i < phase;
              const cur = i === phase - 1;

              return (
                <motion.li
                  key={s}
                  custom={i}
                  variants={isometricDrop}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, amount: 0.2 }}
                  onMouseEnter={() => setPhase(i + 1)}
                  className={`relative lg:flex-1 ${i > 0 ? 'lg:-ml-5' : ''} [filter:drop-shadow(0_10px_12px_rgba(7,59,115,0.14))] transform-gpu`}
                >
                  <div
                    className={`relative flex h-16 items-center overflow-hidden bg-white lg:h-24 rounded-[14px] lg:rounded-none ${
                      i === 0
                        ? 'lg:[clip-path:polygon(0_0,calc(100%-26px)_0,100%_50%,calc(100%-26px)_100%,0_100%)]'
                        : 'lg:[clip-path:polygon(0_0,calc(100%-26px)_0,100%_50%,calc(100%-26px)_100%,0_100%,26px_50%)]'
                    }`}
                  >
                    <motion.span
                      aria-hidden
                      initial={false}
                      animate={{ scaleX: filled ? 1 : 0 }}
                      transition={{ duration: reduce ? 0 : filled ? 0.9 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 origin-left bg-gradient-to-r from-[#159447] to-[#1DB35A]"
                    />
                    {cur && !reduce && (
                      <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                        <motion.span
                          initial={{ x: '-130%' }}
                          animate={{ x: '520%' }}
                          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                          className="absolute inset-y-0 -left-1/3 w-1/4 -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/45 to-transparent"
                        />
                      </span>
                    )}
                    <div className={`relative z-10 flex items-center gap-3 px-5 lg:flex-col lg:items-start lg:justify-center lg:gap-1 lg:pr-8 ${i === 0 ? 'lg:pl-6' : 'lg:pl-9'}`}>
                      <span
                        className={`text-[11px] font-extrabold transition-colors duration-500 ${
                          filled ? (cur ? 'text-[#FFE27A]' : 'text-white/80') : 'text-[#159447]'
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`text-sm font-bold leading-tight transition-colors duration-500 delay-300 ${
                          filled ? 'text-white' : 'text-[#073B73]'
                        }`}
                      >
                        {s}
                      </span>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </motion.div>
      </div>
    </section>
  );
};

export default CompleteSystemApproach;