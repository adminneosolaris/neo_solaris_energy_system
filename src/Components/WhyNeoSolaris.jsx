import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Btn, STRENGTHS, ease } from '../Pages/NeoUI';

const AUTO_MS = 4500;
const STAGE = 600;
const CENTER = STAGE / 2;
const RADIUS = 250;

/* ---------- Unique Reveal Variants ---------- */
const lensFocusWord = {
  hidden: { opacity: 0, scale: 1.18, filter: 'blur(14px)', y: 15 },
  show: (i) => ({
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: 0.75,
      delay: i * 0.045,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const gravitationalSlingshot = {
  hidden: { scale: 0.1, opacity: 0, rotate: -70, filter: 'blur(10px)' },
  show: (i) => ({
    scale: 1,
    opacity: 1,
    rotate: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 17,
      mass: 0.7,
      delay: 0.25 + i * 0.08,
    },
  }),
};

const origamiShutter = {
  hidden: { opacity: 0, rotateY: -35, x: -30, scale: 0.95 },
  show: (i) => ({
    opacity: 1,
    rotateY: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      delay: 0.1 + (i % 2) * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ---------- magnetic button ---------- */
const Magnetic = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15 });
  const sy = useSpring(y, { stiffness: 220, damping: 15 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.95 }}
      className="relative inline-flex rounded-full shadow-[0_18px_40px_-12px_rgba(7,59,115,0.55)]"
    >
      <motion.span
        animate={{ scale: [1, 1.25, 1.25], opacity: [0.5, 0, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
        className="pointer-events-none absolute inset-0 rounded-full bg-[#073B73]"
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
};

/* ---------- position on the orbit ---------- */
const getPos = (i, n) => {
  const a = ((-90 + (360 * i) / n) * Math.PI) / 180;
  return { x: Math.cos(a) * RADIUS, y: Math.sin(a) * RADIUS };
};

/* ---------- center detail card transitions ---------- */
const detailVariants = {
  enter: { opacity: 0, scale: 0.85, rotateX: 25, filter: 'blur(8px)' },
  center: { opacity: 1, scale: 1, rotateX: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease } },
  exit: { opacity: 0, scale: 0.9, rotateX: -25, filter: 'blur(8px)', transition: { duration: 0.3 } },
};

const OrbitDial = ({ active, setActive, setPaused }) => {
  const n = STRENGTHS.length;
  const s = STRENGTHS[active];
  const target = getPos(active, n);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative mx-auto h-[600px] w-[600px] [perspective:1200px]"
    >
      {/* sun glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.45, 0.85, 0.45] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#159447]/25 blur-3xl"
      />

      {/* sun rays */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[repeating-conic-gradient(from_0deg,rgba(21,148,71,0.16)_0deg_4deg,transparent_4deg_12deg)] [mask-image:radial-gradient(circle,transparent_45%,black_47%,black_60%,transparent_72%)]"
      />

      {/* rings */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#073B73]/10" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-[#159447]/25"
      >
        <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#159447] shadow-[0_0_16px_4px_rgba(21,148,71,0.55)]" />
        <span className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#073B73] shadow-[0_0_14px_3px_rgba(7,59,115,0.4)]" />
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#073B73]/15"
      >
        <span className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3fd17a] shadow-[0_0_12px_3px_rgba(63,209,122,0.6)]" />
      </motion.div>

      {/* energy beam */}
      <svg viewBox={`0 0 ${STAGE} ${STAGE}`} className="pointer-events-none absolute inset-0 h-full w-full">
        <motion.line
          key={active}
          x1={CENTER}
          y1={CENTER}
          x2={CENTER + target.x}
          y2={CENTER + target.y}
          strokeWidth="2.5"
          strokeLinecap="round"
          className="stroke-[#159447]"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.55 }}
          transition={{ duration: 0.7, ease }}
        />
      </svg>

      {/* center detail card (Re-triggers on scroll) */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0, filter: 'blur(20px)' }}
        whileInView={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-1/2 h-[290px] w-[320px] -translate-x-1/2 -translate-y-1/2 transform-gpu"
      >
        <div className="relative h-full overflow-hidden rounded-[36px] p-[1.5px] shadow-[0_40px_90px_-35px_rgba(21,148,71,0.6)]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#073B73]/15 via-white to-[#159447]/30" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-[150%] bg-[conic-gradient(from_0deg,transparent_0deg,#159447_50deg,#3fd17a_80deg,transparent_130deg,transparent_210deg,#073B73_260deg,transparent_310deg)]"
          />
          <div className="relative h-full overflow-hidden rounded-[34.5px] bg-gradient-to-br from-white via-white to-[#EAF8EF] p-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                variants={detailVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative flex h-full flex-col"
              >
                <span className="pointer-events-none absolute -right-2 -top-4 select-none text-[100px] font-black leading-none tracking-tighter text-transparent [-webkit-text-stroke:1.5px_rgba(7,59,115,0.15)]">
                  {String(active + 1).padStart(2, '0')}
                </span>

                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#159447] to-[#0d7a38] text-white shadow-[0_18px_36px_-10px_rgba(21,148,71,0.7)]">
                  <s.icon className="h-7 w-7" />
                </span>

                <h3 className="relative mt-5 text-xl font-bold leading-tight text-[#073B73]">{s.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-[#4C5B73]">{s.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Orbit nodes (Re-triggers on scroll) */}
      {STRENGTHS.map((item, i) => {
        const p = getPos(i, n);
        const isActive = i === active;
        return (
          <motion.button
            key={item.title}
            type="button"
            aria-label={item.title}
            onClick={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
            custom={i}
            variants={gravitationalSlingshot}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
            style={{ x: p.x, y: p.y }}
            className="absolute left-1/2 top-1/2 -ml-10 -mt-10 flex h-20 w-20 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#159447] transform-gpu"
          >
            <svg viewBox="0 0 80 80" className="pointer-events-none absolute inset-0 h-full w-full -rotate-90">
              <circle cx="40" cy="40" r="37" fill="none" strokeWidth="2" className="stroke-[#073B73]/10" />
              {isActive && (
                <motion.circle
                  key={`${active}`}
                  cx="40"
                  cy="40"
                  r="37"
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="stroke-[#159447]"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: AUTO_MS / 1000, ease: 'linear' }}
                />
              )}
            </svg>

            {isActive && (
              <motion.span
                animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                className="absolute h-14 w-14 rounded-full bg-[#159447]"
              />
            )}

            <span
              className={`relative flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-br from-[#159447] to-[#0d7a38] text-white shadow-[0_18px_36px_-10px_rgba(21,148,71,0.8)]'
                  : 'bg-white text-[#159447] shadow-lg ring-1 ring-[#159447]/20'
              }`}
            >
              <item.icon className="h-6 w-6" />
            </span>

            <span
              className={`absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black transition-colors duration-300 ${
                isActive ? 'bg-[#073B73] text-white' : 'bg-white text-[#073B73]/50 ring-1 ring-[#073B73]/10'
              }`}
            >
              {i + 1}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

/* ---------- mobile / tablet card ---------- */
const MiniCard = ({ s, i }) => (
  <motion.li
    custom={i}
    variants={origamiShutter}
    initial="hidden"
    whileInView="show"
    viewport={{ once: false, amount: 0.15 }}
    whileHover={{ y: -6 }}
    className="group relative list-none overflow-hidden rounded-[28px] bg-gradient-to-br from-white to-[#EAF8EF] p-6 shadow-[0_20px_50px_-25px_rgba(7,59,115,0.35)] ring-1 ring-[#159447]/15 transition-shadow duration-500 hover:shadow-[0_35px_70px_-25px_rgba(21,148,71,0.5)] transform-gpu"
  >
    <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#159447]/10 blur-3xl transition-all duration-500 group-hover:scale-150 group-hover:bg-[#159447]/25" />
    <span className="pointer-events-none absolute -bottom-4 right-3 select-none text-[90px] font-black leading-none tracking-tighter text-transparent [-webkit-text-stroke:1.5px_rgba(7,59,115,0.14)]">
      {String(i + 1).padStart(2, '0')}
    </span>
    <div className="relative inline-flex">
      <motion.span
        animate={{ scale: [1, 1.6], opacity: [0.35, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: i * 0.2 }}
        className="absolute inset-0 rounded-2xl bg-[#159447]"
      />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#159447] to-[#0d7a38] text-white shadow-lg">
        <s.icon className="h-7 w-7" />
      </span>
    </div>
    <h3 className="relative mt-5 text-lg font-bold leading-snug text-[#073B73]">{s.title}</h3>
    <p className="relative mt-2 text-sm leading-relaxed text-[#4C5B73]">{s.text}</p>
  </motion.li>
);

/* ---------- section ---------- */
const WhyNeoSolaris = () => {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const blobY1 = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [120, -120]);

  useEffect(() => {
    if (paused) return undefined;
    const t = setTimeout(() => setActive((a) => (a + 1) % STRENGTHS.length), AUTO_MS);
    return () => clearTimeout(t);
  }, [active, paused]);

  const titleWords = "An energy-solutions company, not only a solar installer".split(" ");
  const subTextWords = "We aim to demonstrate and educate. These are the strengths you can see and verify for yourself.".split(" ");

  return (
    <section
      ref={ref}
      className="relative w-full overflow-clip bg-gradient-to-b from-white via-[#F3FAF5] to-[#E1F3E8] py-20 sm:py-32 [perspective:1400px]"
    >
      <div className="relative w-full px-6 sm:px-12 lg:px-16 grid items-center gap-10 xl:grid-cols-[1.1fr_1.2fr]">
        {/* LEFT */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.7, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-[#159447]/20 bg-[#159447]/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#159447]"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#159447]" />
            Why Neo Solaris
          </motion.div>

          <h2 className="mt-4 flex flex-wrap text-3xl font-black leading-tight tracking-tight text-[#073B73] sm:text-4xl md:text-5xl lg:text-6xl">
            {titleWords.map((word, idx) => (
              <motion.span
                key={idx}
                custom={idx}
                variants={lensFocusWord}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.2 }}
                className="mr-2.5 inline-block transform-gpu"
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <p className="mt-6 flex flex-wrap text-base leading-relaxed text-[#4C5B73] sm:text-lg">
            {subTextWords.map((w, idx) => (
              <motion.span
                key={idx}
                custom={idx + 6}
                variants={lensFocusWord}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.2 }}
                className="mr-1 inline-block transform-gpu"
              >
                {w}
              </motion.span>
            ))}
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Magnetic>
              <Btn to="/aboutPage" variant="navy">
                About Neo Solaris
              </Btn>
            </Magnetic>
          </motion.div>
        </div>

        {/* RIGHT - Orbit Dial */}
        <div className="hidden xl:flex xl:justify-end">
          <OrbitDial active={active} setActive={setActive} setPaused={setPaused} />
        </div>

        {/* RIGHT - Mobile Cards */}
        <ul className="grid gap-6 sm:grid-cols-2 xl:hidden [perspective:1000px]">
          {STRENGTHS.map((s, i) => (
            <MiniCard key={s.title} s={s} i={i} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhyNeoSolaris;