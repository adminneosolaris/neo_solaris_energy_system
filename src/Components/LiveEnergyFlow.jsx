import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from 'framer-motion';
import { Sun, Zap, BatteryCharging, Home as HomeIcon, PlugZap, ShieldCheck } from 'lucide-react';
import { SectionHead, WRAP } from '../Pages/NeoUI';

const ease = [0.22, 1, 0.36, 1];
const AUTO_MS = 6000;

const MODES = [
  {
    id: 'gen',
    label: 'Solar Generation',
    icon: Sun,
    flows: { sb: 'f', bl: 'f' },
    text: 'Solar panels generate power. The PuREPower BESS manages it and the essential loads run on it.',
  },
  {
    id: 'charge',
    label: 'Battery Charging',
    icon: BatteryCharging,
    flows: { sb: 'f', bt: 'f', bl: 'f' },
    text: 'Available solar power supplies the loads, and the surplus is stored in the battery.',
  },
  {
    id: 'normal',
    label: 'Normal Operation',
    icon: Zap,
    flows: { sb: 'f', gb: 'f', bl: 'f' },
    text: 'Grid and solar work together through the BESS, which manages the power supplied to the loads.',
  },
  {
    id: 'backup',
    label: 'Power Failure / Backup',
    icon: ShieldCheck,
    gridDown: true,
    flows: { bt: 'r', bl: 'f' },
    text: 'When grid supply is unavailable, the battery supplies the essential loads through the BESS.',
  },
];

/* ---------- path sampling (comets travel along each edge) ---------- */
const bez = (p0, p1, p2, p3, n = 14) =>
  Array.from({ length: n + 1 }, (_, k) => {
    const t = k / n;
    const u = 1 - t;
    return [
      u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
      u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
    ];
  });

const line = (a, b, n = 14) =>
  Array.from({ length: n + 1 }, (_, k) => {
    const t = k / n;
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  });

const EDGES = {
  sb: {
    d: 'M20 14 C32 14 32 28 39 28',
    tone: 'stroke-[#159447]',
    dot: 'fill-[#159447]',
    halo: 'fill-[#159447]/25',
    pts: bez([20, 14], [32, 14], [32, 28], [39, 28]),
  },
  gb: {
    d: 'M20 42 C32 42 32 28 39 28',
    tone: 'stroke-[#F5B800]',
    dot: 'fill-[#F5B800]',
    halo: 'fill-[#F5B800]/25',
    pts: bez([20, 42], [32, 42], [32, 28], [39, 28]),
  },
  bl: {
    d: 'M61 28 L80 28',
    tone: 'stroke-[#159447]',
    dot: 'fill-[#159447]',
    halo: 'fill-[#159447]/25',
    pts: line([61, 28], [80, 28]),
  },
  bt: {
    d: 'M50 34 L50 48',
    tone: 'stroke-[#159447]',
    dot: 'fill-[#159447]',
    halo: 'fill-[#159447]/25',
    pts: line([50, 34], [50, 48]),
  },
};

/* comet: head + fading tail */
const TAIL = [
  { r: 0.9, o: 1, lag: 0 },
  { r: 0.7, o: 0.6, lag: 0.09 },
  { r: 0.55, o: 0.35, lag: 0.18 },
  { r: 0.4, o: 0.18, lag: 0.27 },
];

/* decorative PCB traces (static, behind the flows) */
const TRACES = [
  'M0 6 H12 L16 10 H30',
  'M100 6 H86 L82 10 H70',
  'M0 54 H22 L26 58 H38',
  'M100 54 H84 L80 50 H66',
  'M0 32 H6',
  'M100 32 H94',
];
const VIAS = [
  [30, 10],
  [70, 10],
  [38, 58],
  [66, 50],
  [16, 10],
  [82, 10],
];

/* ---------- chip node ---------- */
const Node = ({ pos, w, icon: Icon, label, status, active, warn }) => (
  <div className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 ${pos} ${w}`}>
    <motion.div
      animate={{ scale: active ? 1.06 : 1, opacity: active || warn ? 1 : 0.7 }}
      whileHover={{ y: -5, scale: 1.09 }}
      transition={{ duration: 0.4, ease }}
      className="relative"
    >
      {/* chip pins */}
      {['-top-1', '-bottom-1'].map((p) => (
        <span key={p} className={`pointer-events-none absolute inset-x-2 flex justify-between sm:inset-x-3 ${p}`}>
          {[0, 1, 2, 3].map((k) => (
            <span
              key={k}
              className={`h-1 w-0.5 rounded-full transition-colors duration-500 sm:h-1.5 ${
                warn ? 'bg-rose-300' : active ? 'bg-[#159447]/60' : 'bg-[#073B73]/20'
              }`}
            />
          ))}
        </span>
      ))}

      {/* pulse ring */}
      {(active || warn) && (
        <motion.span
          animate={{ scale: [1, 1.2], opacity: [0.4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          className={`pointer-events-none absolute inset-0 rounded-xl border-2 sm:rounded-2xl ${
            warn ? 'border-rose-400' : 'border-[#159447]'
          }`}
        />
      )}

      <div
        className={`relative rounded-xl border bg-white px-1.5 py-2 text-center shadow-[0_10px_25px_-10px_rgba(0,0,0,0.06)] sm:rounded-2xl sm:px-3 sm:py-3 ${
          warn
            ? 'border-rose-300'
            : active
            ? 'border-[#159447]/70'
            : 'border-slate-200'
        }`}
      >
        {/* shine (clipped) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
          {active && !warn && (
            <motion.span
              initial={{ x: '-160%' }}
              animate={{ x: '300%' }}
              transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 2.4, ease }}
              className="absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-slate-100 to-transparent"
            />
          )}
        </div>

        <span
          className={`relative mx-auto flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-500 sm:h-10 sm:w-10 sm:rounded-xl ${
            warn
              ? 'bg-rose-50 text-rose-500'
              : active
              ? 'bg-gradient-to-br from-[#3fd17a] via-[#159447] to-[#0d7a38] text-white shadow-sm'
              : 'bg-slate-100 text-slate-500'
          }`}
        >
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
        <p className="relative mt-1 text-[9px] font-bold leading-tight text-[#073B73] sm:mt-1.5 sm:text-sm">{label}</p>

        <div className="relative flex items-center justify-center gap-1">
          {/* status LED */}
          <span className="relative flex h-1.5 w-1.5 items-center justify-center">
            {(active || warn) && (
              <motion.span
                animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                className={`absolute h-1.5 w-1.5 rounded-full ${warn ? 'bg-rose-500' : 'bg-[#159447]'}`}
              />
            )}
            <span
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                warn ? 'bg-rose-500' : active ? 'bg-[#159447]' : 'bg-slate-300'
              }`}
            />
          </span>
          <AnimatePresence mode="wait">
            <motion.p
              key={status}
              initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
              transition={{ duration: 0.25 }}
              className={`text-[8px] font-medium sm:text-xs ${warn ? 'text-rose-500' : 'text-[#4C5B73]'}`}
            >
              {status}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  </div>
);

/* ---------- HUD corner ---------- */
const Corner = ({ cls }) => (
  <span className={`pointer-events-none absolute h-4 w-4 border-slate-300 sm:h-5 sm:w-5 ${cls}`} />
);

/* ---------- word reveal ---------- */
const wordsParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03, delayChildren: 0.1 } },
};
const wordItem = {
  hidden: { opacity: 0, y: 10, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease } },
};

/* ---------- scrubber slider ---------- */
const Scrubber = ({ modeId, setModeId, paused }) => {
  const idx = MODES.findIndex((m) => m.id === modeId);
  const pct = (idx / (MODES.length - 1)) * 100;
  const Active = MODES[idx].icon;

  return (
    <div className="relative mx-auto mt-8 w-full">
      {/* track */}
      <div className="pointer-events-none absolute inset-x-10 top-[22px] h-1.5 -translate-y-1/2 rounded-full bg-slate-200 sm:inset-x-16">
        <motion.div
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease }}
          className="h-full rounded-full bg-[#159447]"
        />

        {/* thumb */}
        <motion.div
          animate={{ left: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 160, damping: 20 }}
          className="absolute top-1/2 z-20 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        >
          {/* autoplay ring */}
          <svg viewBox="0 0 56 56" className="absolute inset-0 h-full w-full -rotate-90">
            <circle cx="28" cy="28" r="26" fill="none" strokeWidth="2" className="stroke-slate-200" />
            <motion.circle
              key={`${modeId}-${paused}`}
              cx="28"
              cy="28"
              r="26"
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
              className="stroke-[#159447]"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: paused ? 0 : 1 }}
              transition={{ duration: paused ? 0.3 : AUTO_MS / 1000, ease: 'linear' }}
            />
          </svg>
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#159447] text-white shadow-md">
            <AnimatePresence mode="wait">
              <motion.span
                key={modeId}
                initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex"
              >
                <Active className="h-5 w-5" />
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>
      </div>

      {/* stops */}
      <div className="relative flex justify-between">
        {MODES.map((m, i) => {
          const isActive = modeId === m.id;
          const passed = i <= idx;
          return (
            <motion.button
              key={m.id}
              type="button"
              aria-label={m.label}
              onClick={() => setModeId(m.id)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.94 }}
              className="group flex w-20 cursor-pointer flex-col items-center outline-none sm:w-32"
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full border-2 bg-white transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-[#159447] ${
                  passed ? 'border-[#159447]' : 'border-slate-300 group-hover:border-slate-400'
                }`}
              >
                <m.icon
                  className={`h-4 w-4 transition-colors duration-300 ${
                    passed ? 'text-[#159447]' : 'text-slate-400'
                  }`}
                />
              </span>
              <span
                className={`mt-3 text-center text-[10px] font-bold leading-tight transition-colors duration-300 sm:text-sm ${
                  isActive ? 'text-[#073B73]' : 'text-slate-500 group-hover:text-[#073B73]'
                }`}
              >
                {m.label}
              </span>
              <span
                className={`mt-1 text-[10px] font-black tabular-nums transition-colors duration-300 ${
                  isActive ? 'text-[#159447]' : 'text-slate-400'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

/* ---------- main panel ---------- */
export const EnergyFlowPanel = ({ show = true }) => {
  const [modeId, setModeId] = useState('gen');
  const [paused, setPaused] = useState(false);
  const mode = MODES.find((m) => m.id === modeId);
  const f = mode.flows;

  /* autoplay */
  useEffect(() => {
    if (paused) return undefined;
    const t = setTimeout(() => {
      const i = MODES.findIndex((m) => m.id === modeId);
      setModeId(MODES[(i + 1) % MODES.length].id);
    }, AUTO_MS);
    return () => clearTimeout(t);
  }, [modeId, paused]);

  /* tilt */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 120, damping: 18 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
    setPaused(false);
  };

  const solarStatus = f.sb ? 'Generating' : 'Idle';
  const gridStatus = mode.gridDown ? 'Unavailable' : f.gb ? 'Supplying' : 'Standby';
  const batteryStatus = f.bt === 'f' ? 'Charging' : f.bt === 'r' ? 'Discharging' : 'Standby';

  return (
    <div
      onMouseMove={onMove}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={onLeave}
      className="relative overflow-hidden rounded-[36px] border border-slate-200 bg-white p-2 shadow-lg sm:p-4"
    >
      <div className="relative overflow-hidden rounded-[32px] bg-white p-4 sm:p-8">
        {/* ---------- STAGE ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
          animate={show ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 28, filter: 'blur(8px)' }}
          transition={{ duration: 0.8, delay: show ? 0.35 : 0, ease }}
          className="relative [perspective:1400px]"
        >
          <motion.div
            style={{ rotateX, rotateY }}
            className="relative mx-auto aspect-[5/3] w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-[28px]"
          >
            {/* blueprint grid */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(7,59,115,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(7,59,115,0.03)_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(7,59,115,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(7,59,115,0.06)_1px,transparent_1px)] [background-size:80px_80px]" />

            <Corner cls="left-2 top-2 border-l-2 border-t-2 rounded-tl-lg" />
            <Corner cls="right-2 top-2 border-r-2 border-t-2 rounded-tr-lg" />
            <Corner cls="bottom-2 left-2 border-b-2 border-l-2 rounded-bl-lg" />
            <Corner cls="bottom-2 right-2 border-b-2 border-r-2 rounded-br-lg" />

            {/* status dot */}
            <span className="pointer-events-none absolute right-6 top-5 flex h-2.5 w-2.5 items-center justify-center sm:right-8 sm:top-7">
              <span className="h-2 w-2 rounded-full bg-[#159447]" />
            </span>

            <svg viewBox="0 0 100 60" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
              {/* decorative PCB traces */}
              {TRACES.map((d) => (
                <path key={d} d={d} className="stroke-slate-200" strokeWidth="0.3" strokeLinecap="round" />
              ))}
              {VIAS.map(([cx, cy]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.8" className="stroke-slate-300" strokeWidth="0.25" />
              ))}

              {/* base rails */}
              {Object.entries(EDGES).map(([id, e]) => (
                <g key={`base-${id}`}>
                  <path d={e.d} className="stroke-slate-200" strokeWidth="0.9" strokeLinecap="round" />
                  <path d={e.d} className="stroke-slate-300" strokeWidth="0.3" strokeLinecap="round" />
                </g>
              ))}

              {/* active flows */}
              {Object.entries(f).map(([id, dir]) => {
                const e = EDGES[id];
                const pts = dir === 'f' ? e.pts : [...e.pts].reverse();
                return (
                  <g key={`${modeId}-${id}`}>
                    <motion.path
                      d={e.d}
                      className={e.tone}
                      strokeWidth="0.6"
                      strokeLinecap="round"
                      strokeDasharray="1.5 2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, strokeDashoffset: dir === 'f' ? [0, -4.4] : [0, 4.4] }}
                      transition={{
                        opacity: { duration: 0.3 },
                        strokeDashoffset: { duration: 0.7, repeat: Infinity, ease: 'linear' },
                      }}
                    />

                    {/* comets */}
                    {[0, 1].map((c) => (
                      <g key={c}>
                        {TAIL.map((t, k) => (
                          <motion.circle
                            key={k}
                            r={t.r}
                            className={e.dot}
                            initial={{ opacity: 0 }}
                            animate={{
                              cx: pts.map((p) => p[0]),
                              cy: pts.map((p) => p[1]),
                              opacity: [0, t.o, t.o, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'linear',
                              delay: c * 1 + t.lag,
                              opacity: {
                                duration: 2,
                                repeat: Infinity,
                                delay: c * 1 + t.lag,
                                times: [0, 0.1, 0.9, 1],
                              },
                            }}
                          />
                        ))}
                      </g>
                    ))}
                  </g>
                );
              })}
            </svg>

            <Node pos="left-[13%] top-[23.3%]" w="w-[20%]" icon={Sun} label="Solar" status={solarStatus} active={!!f.sb} />
            <Node
              pos="left-[13%] top-[70%]"
              w="w-[20%]"
              icon={PlugZap}
              label="Grid"
              status={gridStatus}
              active={!!f.gb}
              warn={mode.gridDown}
            />
            <Node pos="left-[50%] top-[46.7%]" w="w-[22%]" icon={Zap} label="PuREPower BESS" status="Managing" active />
            <Node pos="left-[87%] top-[46.7%]" w="w-[20%]" icon={HomeIcon} label="Load" status={f.bl ? 'Powered' : 'Idle'} active={!!f.bl} />
            <Node pos="left-[50%] top-[90%]" w="w-[22%]" icon={BatteryCharging} label="Battery" status={batteryStatus} active={!!f.bt} />
          </motion.div>
        </motion.div>

        {/* ---------- SCRUBBER ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
          animate={show ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 28, filter: 'blur(8px)' }}
          transition={{ duration: 0.8, delay: show ? 0.55 : 0, ease }}
        >
          <Scrubber modeId={modeId} setModeId={setModeId} paused={paused} />
        </motion.div>

        {/* ---------- EXPLANATION ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
          animate={show ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 28, filter: 'blur(8px)' }}
          transition={{ duration: 0.8, delay: show ? 0.75 : 0, ease }}
          className="relative mx-auto mt-8 max-w-4xl"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={modeId}
              initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
              transition={{ duration: 0.4, ease }}
              className="relative flex items-start gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
            >
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#159447] text-white shadow-sm">
                <mode.icon className="h-5 w-5" />
              </span>

              <motion.p
                variants={wordsParent}
                initial="hidden"
                animate="show"
                className="relative text-[15px] leading-relaxed text-[#073B73]"
              >
                <motion.span variants={wordItem} className="mr-1 inline-block font-bold">
                  {mode.label}:
                </motion.span>
                {mode.text.split(' ').map((w, i) => (
                  <motion.span key={`${w}-${i}`} variants={wordItem} className="mr-[0.28em] inline-block">
                    {w}
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <p className="mt-3 text-xs text-[#4C5B73]">
            Illustrative diagram. Actual energy flow can be seen on the live monitoring screen at our Experience Centre.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

/* ---------- section ---------- */
const LiveEnergyFlow = () => {
  /* observers sit on UNCLIPPED wrappers; once: false allows re-triggering upon scrolling up and down */
  const headRef = useRef(null);
  const panelRef = useRef(null);
  const headIn = useInView(headRef, { once: false, amount: 0.3 });
  const panelIn = useInView(panelRef, { once: false, amount: 0.15 });

  return (
    <section className="relative overflow-clip bg-white py-16 sm:py-24">
      <div className={`${WRAP} relative`}>
        {/* ---------- HEADING: curtain wipe + scan line (re-triggers on scroll up/down) ---------- */}
        <div ref={headRef} className="relative">
          <motion.div
            initial={{ clipPath: 'inset(0% 100% 0% 0%)', y: 24, filter: 'blur(10px)' }}
            animate={
              headIn
                ? { clipPath: 'inset(0% -2% 0% 0%)', y: 0, filter: 'blur(0px)' }
                : { clipPath: 'inset(0% 100% 0% 0%)', y: 24, filter: 'blur(10px)' }
            }
            transition={{ duration: 1.1, ease }}
          >
            <SectionHead
              tag="Live energy flow"
              title="Follow the energy, step by step"
              text="Select an operating condition to see how power moves between solar, the PuREPower BESS, the battery, the grid and your loads."
            />
          </motion.div>

          {/* scan line */}
          <motion.span
            initial={{ left: '0%', opacity: 0 }}
            animate={headIn ? { left: '100%', opacity: [0, 1, 1, 0] } : { left: '0%', opacity: 0 }}
            transition={{ duration: 1.1, ease, opacity: { duration: 1.1, times: [0, 0.1, 0.85, 1] } }}
            className="pointer-events-none absolute top-0 h-full w-0.5 rounded-full bg-[#159447] shadow-[0_0_18px_4px_rgba(21,148,71,0.45)]"
          />
        </div>

        {/* ---------- PANEL: slit "power-on" reveal (re-triggers on scroll up/down) ---------- */}
        <div ref={panelRef} className="relative mt-10">
          <motion.div
            initial={{
              clipPath: 'inset(49% 6% 49% 6% round 36px)',
              opacity: 0,
              scale: 0.96,
              filter: 'blur(10px)',
            }}
            animate={
              panelIn
                ? {
                    clipPath: 'inset(-5% -5% -5% -5% round 36px)',
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)',
                  }
                : {
                    clipPath: 'inset(49% 6% 49% 6% round 36px)',
                    opacity: 0,
                    scale: 0.96,
                    filter: 'blur(10px)',
                  }
            }
            transition={{
              duration: 1.2,
              delay: 0.35,
              ease,
              opacity: { duration: 0.4, delay: 0.35 },
            }}
            className="relative"
          >
            <EnergyFlowPanel show={panelIn} />
          </motion.div>

          {/* glowing slit line */}
          <motion.span
            initial={{ opacity: 0, scaleX: 0.2 }}
            animate={panelIn ? { opacity: [0, 1, 0], scaleX: [0.2, 1, 1] } : { opacity: 0, scaleX: 0.2 }}
            transition={{ duration: 0.9, delay: 0.3, ease, times: [0, 0.5, 1] }}
            className="pointer-events-none absolute left-[6%] right-[6%] top-1/2 z-30 h-0.5 -translate-y-1/2 rounded-full bg-[#159447] shadow-[0_0_24px_6px_rgba(21,148,71,0.5)]"
          />
        </div>
      </div>
    </section>
  );
};

export default LiveEnergyFlow;