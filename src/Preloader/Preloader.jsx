import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * NEO SOLARIS – Cinematic Sunrise Preloader
 * ─────────────────────────────────────────────────────────────
 * • A sun literally RISES over a glowing horizon as the page loads
 * • Giant outlined counter that FILLS with energy (gold → green) as it climbs
 * • Wordmark with blur-to-sharp reveal + travelling light sweep
 * • Editorial HUD: corner brackets, top progress hairline, live status
 * • Waits for real window "load" (min duration so it never flashes)
 * • Exit: gold seam flash → screen splits open like a shutter
 * • Once per browser session by default · respects prefers-reduced-motion
 *
 * Props
 *   minDuration    ms the loader stays at least (default 3000)
 *   oncePerSession boolean (default true)
 *   onReveal       called the moment the shutter starts opening
 *                  (also called immediately if the loader is skipped)
 */

const EASE = [0.22, 1, 0.36, 1];
const SEAM_EASE = [0.76, 0, 0.24, 1];
const STORAGE_KEY = 'neo-solaris-preloader-seen';

const STATUS = [
  { upto: 25, text: 'Initialising systems' },
  { upto: 55, text: 'Syncing solar array' },
  { upto: 85, text: 'Charging BESS' },
  { upto: 101, text: 'Going live' },
];

const readSeen = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
};
const writeSeen = () => {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1');
  } catch {
    /* storage can be blocked – ignore */
  }
};

const Corner = ({ className = '' }) => (
  <span aria-hidden="true" className={`pointer-events-none absolute h-6 w-6 border-white/30 ${className}`} />
);

const Preloader = ({ minDuration = 3000, oncePerSession = true, onReveal }) => {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState(() => (oncePerSession && readSeen() ? 'gone' : 'loading'));
  const [count, setCount] = useState(0);
  const revealRef = useRef(onReveal);
  revealRef.current = onReveal;

  // skipped loader → tell parent straight away
  useEffect(() => {
    if (phase === 'gone') revealRef.current?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // lock scroll while the loader is on screen
  useEffect(() => {
    if (phase === 'gone') return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  // progress driver (real load + minimum time)
  useEffect(() => {
    if (phase !== 'loading') return undefined;

    const duration = reduceMotion ? 900 : minDuration;
    let loaded = document.readyState === 'complete';
    const onLoad = () => {
      loaded = true;
    };
    window.addEventListener('load', onLoad);
    const hardStop = setTimeout(() => {
      loaded = true;
    }, 8000);

    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      let value = eased * 100;
      if (!loaded) value = Math.min(value, 92); // hold at 92% until the page is truly ready
      setCount((prev) => Math.max(prev, Math.floor(value)));

      if (t >= 1 && loaded) {
        setCount(100);
        setPhase('leaving');
        revealRef.current?.();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hardStop);
      window.removeEventListener('load', onLoad);
    };
  }, [phase, minDuration, reduceMotion]);

  // exit sequence timer
  useEffect(() => {
    if (phase !== 'leaving') return undefined;
    const id = setTimeout(() => {
      writeSeen();
      setPhase('gone');
    }, reduceMotion ? 400 : 1750);
    return () => clearTimeout(id);
  }, [phase, reduceMotion]);

  if (phase === 'gone') return null;

  const leaving = phase === 'leaving';
  const status = STATUS.find((s) => count < s.upto)?.text ?? 'Going live';
  const rise = count * 1.06; // px the sun climbs (0 → 106)
  const panelT = {
    duration: reduceMotion ? 0.3 : 0.95,
    ease: SEAM_EASE,
    delay: leaving && !reduceMotion ? 0.5 : 0,
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading Neo Solaris"
      className={`fixed inset-0 z-[9999] ${leaving ? 'pointer-events-none' : ''}`}
    >
      {/* ── SHUTTER PANELS ── */}
      <motion.div
        initial={false}
        animate={{ y: leaving ? '-100%' : '0%' }}
        transition={panelT}
        className="absolute inset-x-0 top-0 h-1/2 bg-[#020F24]"
      />
      <motion.div
        initial={false}
        animate={{ y: leaving ? '100%' : '0%' }}
        transition={panelT}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#020F24]"
      />

      {/* ── ATMOSPHERE ── */}
      <motion.div
        initial={false}
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ duration: 0.45 }}
        className="absolute inset-0 overflow-hidden"
      >
        {/* sky glow that strengthens as the sun climbs */}
        <div
          className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-[40%] rounded-full blur-[140px]"
          style={{
            background: 'radial-gradient(circle, rgba(245,184,0,0.35), rgba(21,148,71,0.18) 55%, transparent 72%)',
            opacity: 0.25 + count / 140,
            transition: 'opacity 0.2s linear',
          }}
        />
        {/* faint grid, masked to the centre */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse at 50% 55%, black 15%, transparent 68%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 55%, black 15%, transparent 68%)',
          }}
        />
      </motion.div>

      {/* ── GIANT FILL COUNTER + HUD ── */}
      <motion.div
        initial={false}
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0"
      >
        {/* top progress hairline */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-[#159447] via-[#4ADE80] to-[#F5B800]"
            style={{ width: `${count}%`, transition: 'width 0.15s linear', boxShadow: '0 0 16px rgba(74,222,128,0.9)' }}
          />
        </div>

        {/* counter that fills from the bottom */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[0.1em] right-4 select-none text-[38vw] font-black leading-none tabular-nums tracking-tighter sm:right-8 sm:text-[22vw]"
          style={{
            backgroundImage: `linear-gradient(to top, #F5B800 0%, #4ADE80 ${count}%, rgba(255,255,255,0.05) ${count}%)`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.22)',
            opacity: 0.9,
          }}
        >
          {String(count).padStart(2, '0')}
        </span>

        {/* corner brackets */}
        <Corner className="left-4 top-4 border-l border-t sm:left-6 sm:top-6" />
        <Corner className="right-4 top-4 border-r border-t sm:right-6 sm:top-6" />
        <Corner className="bottom-4 left-4 border-b border-l sm:bottom-6 sm:left-6" />
        <Corner className="bottom-4 right-4 border-b border-r sm:bottom-6 sm:right-6" />

        {/* HUD text */}
        <p className="absolute left-9 top-8 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70 sm:left-12 sm:top-11 sm:text-[11px]">
          Neo Solaris Energy Systems
        </p>
        <p className="absolute right-9 top-8 hidden text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50 sm:right-12 sm:top-11 sm:block sm:text-[11px]">
          Madurai · India
        </p>
        <div className="absolute bottom-9 left-9 flex items-center gap-2.5 sm:bottom-12 sm:left-12">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ADE80] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ADE80]" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#4ADE80] sm:text-[11px]">
            {status}
          </span>
        </div>
      </motion.div>

      {/* ── CENTRE: SUNRISE + WORDMARK ── */}
      <motion.div
        initial={false}
        animate={leaving ? { opacity: 0, scale: 1.08 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-10"
      >
        <svg
          viewBox="0 0 300 170"
          className="h-auto w-[290px] overflow-visible sm:w-[400px]"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="nsSun" cx="50%" cy="38%" r="70%">
              <stop offset="0%" stopColor="#FFF0B3" />
              <stop offset="55%" stopColor="#F5B800" />
              <stop offset="100%" stopColor="#E08E00" />
            </radialGradient>
            <radialGradient id="nsGlow">
              <stop offset="0%" stopColor="#F5B800" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#F5B800" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="nsHorizon" gradientUnits="userSpaceOnUse" x1="-80" y1="0" x2="380" y2="0">
              <stop offset="0%" stopColor="#F5B800" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFD84D" stopOpacity="1" />
              <stop offset="100%" stopColor="#F5B800" stopOpacity="0" />
            </linearGradient>
            {/* everything of the sun is hidden below the horizon (y = 150) */}
            <clipPath id="nsClip">
              <rect x="-300" y="-400" width="900" height="550" />
            </clipPath>
          </defs>

          {/* rising sun group */}
          <g clipPath="url(#nsClip)">
            <g style={{ transform: `translateY(${-rise}px)`, transition: 'transform 0.15s linear' }}>
              <circle cx="150" cy="196" r="130" fill="url(#nsGlow)" opacity={Math.min(1, 0.2 + count / 80)} />

              <motion.g
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
                style={{ transformBox: 'fill-box', transformOrigin: 'center', opacity: Math.min(1, count / 55) }}
              >
                {Array.from({ length: 24 }).map((_, i) => (
                  <line
                    key={i}
                    x1="150"
                    y1={196 - 58}
                    x2="150"
                    y2={196 - (i % 2 === 0 ? 82 : 70)}
                    stroke="#F5B800"
                    strokeWidth={i % 2 === 0 ? 2.5 : 1.5}
                    strokeLinecap="round"
                    opacity={i % 2 === 0 ? 0.95 : 0.55}
                    transform={`rotate(${i * 15} 150 196)`}
                  />
                ))}
              </motion.g>

              <circle cx="150" cy="196" r="46" fill="url(#nsSun)" style={{ filter: 'drop-shadow(0 0 22px rgba(245,184,0,0.85))' }} />
            </g>
          </g>

          {/* horizon reflection */}
          <ellipse
            cx="150"
            cy="158"
            rx={10 + count * 0.95}
            ry="4"
            fill="#F5B800"
            opacity={0.15 + count / 260}
            style={{ filter: 'blur(5px)', transition: 'all 0.15s linear' }}
          />

          {/* horizon line draws in */}
          <motion.line
            x1="-80"
            y1="150"
            x2="380"
            y2="150"
            stroke="url(#nsHorizon)"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
          />
        </svg>

        {/* Wordmark: blur → sharp, tracking tightens, light sweeps across */}
        <motion.h1
          initial={{ opacity: 0, filter: 'blur(14px)', letterSpacing: '0.5em' }}
          animate={{ opacity: 1, filter: 'blur(0px)', letterSpacing: '0.16em' }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.5 }}
          className="mt-6 text-center text-4xl font-black leading-none sm:mt-8 sm:text-7xl"
        >
          <motion.span
            initial={{ backgroundPosition: '160% 0' }}
            animate={reduceMotion ? { backgroundPosition: '160% 0' } : { backgroundPosition: ['160% 0', '-60% 0'] }}
            transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.6, delay: 2 }}
            className="inline-block pl-[0.16em]"
            style={{
              backgroundImage: 'linear-gradient(110deg, #FFFFFF 38%, #F5B800 50%, #FFFFFF 62%)',
              backgroundSize: '250% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            NEO SOLARIS
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.5 }}
          className="mt-5 text-[10px] font-semibold uppercase tracking-[0.45em] text-slate-300 sm:text-xs"
        >
          Live Energy · Solar + BESS
        </motion.p>
      </motion.div>

      {/* ── GOLD SEAM FLASH (exit) ── */}
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={leaving ? { scaleX: [0, 1, 1], opacity: [0, 1, 0] } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.9, ease: EASE, times: [0, 0.45, 1] }}
        className="pointer-events-none absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#F5B800] to-transparent shadow-[0_0_30px_6px_rgba(245,184,0,0.8)]"
      />
    </div>
  );
};

export default Preloader;