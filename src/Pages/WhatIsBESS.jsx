import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  animate,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
} from 'framer-motion';
import {
  Sun,
  BatteryFull,
  Home as HomeIcon,
  ShieldCheck,
  Gauge,
  PlugZap,
  Zap,
  Sparkles,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { Btn, SectionHead, WRAP, ease } from './NeoUI';
import image1 from '../assets/Others/Pure Energy Smart City Showcase.webp';
import image2 from '../assets/Others/Experience Solar + BESS.webp';
import image3 from '../assets/Others/why-bess-is-a-better-alternative-without-using-.webp'
import videos from '../assets/Videos/PuREPower BESS video.mp4';

const flowSteps = [
  {
    icon: Sun,
    label: 'Grid or solar comes in',
    desc: 'Power arrives from the electricity grid, from solar panels, or from both.',
    points: [
      'Seamless multi-source input management (Grid + Solar PV)',
      'Built-in MPPT solar tracking for maximum generation',
      'Continuous input voltage and frequency monitoring',
    ],
  },
  {
    icon: BatteryFull,
    label: 'BESS stores it',
    desc: 'The battery system holds that energy until it is needed.',
    points: [
      'High-cycle Lithium-ion cells with 5th Gen intelligent BMS',
      'Stores surplus solar or off-peak economical grid power',
      'Advanced thermal regulation and multi-level cell protection',
    ],
  },
  {
    icon: HomeIcon,
    label: 'Runs your loads',
    desc: 'Stored energy supplies the loads you have chosen, including when grid supply is unavailable.',
    points: [
      'Instant sub-10ms automatic switching without load reset',
      'Pure sine wave output safe for sensitive electronics and motors',
      'Guarantees round-the-clock uninterrupted power independence',
    ],
  },
];

const benefits = [
  { icon: ShieldCheck, title: 'Backup power', text: 'Supplies your selected loads when grid supply is unavailable.' },
  { icon: PlugZap, title: 'Automatic switching', text: 'Changes between grid, solar and battery without manual effort.' },
  { icon: Sun, title: 'Solar integration', text: 'Stores solar energy so it can be used later. Solar is optional.' },
  { icon: Gauge, title: 'Energy management', text: 'Manages how energy is used across grid, battery and loads.' },
  { icon: Zap, title: 'Less generator dependence', text: 'Reduces reliance on diesel generators for everyday backup.' },
  { icon: Sparkles, title: 'Room to grow', text: 'Can be planned alongside solar and future load additions.' },
];

/* ---------- light paper surfaces (soft mesh + fine grain) ---------- */
const GRAIN_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='.06'/></svg>";
const GRAIN = `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`;
const mesh = (a, b, base) =>
  `${GRAIN}, radial-gradient(55rem 30rem at 95% -5%, ${a}, transparent 60%), radial-gradient(50rem 30rem at -5% 105%, ${b}, transparent 60%), ${base}`;
const TONES = {
  white: mesh('rgba(21,148,71,.08)', 'rgba(245,184,0,.10)', '#FFFFFF'),
  cool: mesh('rgba(127,182,232,.22)', 'rgba(21,148,71,.08)', '#F5F9FD'),
  mint: mesh('rgba(21,148,71,.14)', 'rgba(127,182,232,.14)', '#F2FAF5'),
  butter: mesh('rgba(245,184,0,.20)', 'rgba(21,148,71,.08)', '#FFFAEC'),
};

const Block = ({ id, tone = 'white', children }) => {
  const reduce = useReducedMotion();
  return (
    <section id={id} style={{ background: TONES[tone] }} className="relative scroll-mt-32 overflow-hidden py-16">
      <motion.div
        aria-hidden="true"
        animate={reduce ? {} : { x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -left-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-[#159447]/10 blur-3xl"
      />
      <div className={`relative ${WRAP}`}>{children}</div>
    </section>
  );
};

/* ======================================================================
   SCROLL REVEAL helpers
   ====================================================================== */
const fadeUp = (delay = 0, y = 20) => ({
  hidden: { opacity: 0, y, filter: 'blur(6px)', transition: { duration: 0.25 } },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, delay, ease } },
});

const HEAD_HIDDEN = {
  clipPath: 'inset(0% 0% 100% 0%)',
  y: 36,
  opacity: 0,
  filter: 'blur(10px)',
  transition: { duration: 0.3 },
};
const HEAD_SHOW = {
  clipPath: 'inset(-10% -5% -15% -5%)',
  y: 0,
  opacity: 1,
  filter: 'blur(0px)',
  transition: { duration: 1.05, ease },
};
const headVariants = { hidden: HEAD_HIDDEN, show: HEAD_SHOW };

const RevealHead = ({ children }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });
  return (
    <div ref={ref}>
      <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={headVariants}>
        {children}
      </motion.div>
    </div>
  );
};

const Rise = ({ children, className = '', amount = 0.15 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount });
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 70, scale: 0.96 }}
        animate={
          inView
            ? { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease } }
            : { opacity: 0, y: 70, scale: 0.96, transition: { duration: 0.3 } }
        }
      >
        {children}
      </motion.div>
    </div>
  );
};

const MaskWord = ({ children, delay }) => (
  <span className="mr-[0.25em] inline-block overflow-hidden pb-2 align-bottom">
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

const Sweep = () => {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden="true"
      initial={{ left: '-45%' }}
      animate={{ left: '145%' }}
      transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity, repeatDelay: 5 }}
      className="pointer-events-none absolute inset-y-0 z-10 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent"
    />
  );
};

const Word = ({ w, range, p }) => {
  const opacity = useTransform(p, range, [0.16, 1]);
  return <motion.span style={{ opacity }} className="mr-[0.26em] inline-block">{w}</motion.span>;
};

const Intro = ({ tag, title, text }) => {
  const ref = useRef(null);
  const headRef = useRef(null);
  const headIn = useInView(headRef, { once: false, amount: 0.5 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 78%', 'end 48%'] });
  const words = text.split(' ');
  const titleWords = title.split(' ');
  return (
    <div ref={ref} className="max-w-5xl">
      <motion.div
        ref={headRef}
        initial="hidden"
        animate={headIn ? 'show' : 'hidden'}
        variants={{ hidden: {}, show: {} }}
      >
        <motion.span
          variants={{
            hidden: { opacity: 0, scale: 0.6, filter: 'blur(6px)', transition: { duration: 0.2 } },
            show: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease } },
          }}
          className="inline-flex origin-left items-center gap-2 rounded-full border border-[#159447]/25 bg-white/80 px-4 py-1.5 text-sm font-semibold text-[#159447] backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#F5B800]" />
          {tag}
        </motion.span>
        <h2 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-[#073B73] sm:text-6xl">
          {titleWords.map((w, i) => (
            <MaskWord key={`${w}-${i}`} delay={0.15 + i * 0.07}>
              {w}
            </MaskWord>
          ))}
        </h2>
      </motion.div>
      <p className="mt-8 max-w-4xl text-2xl font-medium leading-snug text-[#073B73] sm:text-4xl sm:leading-snug">
        {words.map((w, i) => {
          const s = (i / words.length) * 0.8;
          return <Word key={`${w}-${i}`} w={w} range={[s, s + 0.2]} p={scrollYProgress} />;
        })}
      </p>
    </div>
  );
};

/* ---------- scrubber ---------- */
const HANDLE = 56;
const stepTone = [
  { chip: 'from-[#159447] to-[#0B6B3A]', soft: 'bg-[#DDF3E6]', color: '#159447' },
  { chip: 'from-[#073B73] to-[#0B5A8F]', soft: 'bg-[#DCEBF9]', color: '#073B73' },
  { chip: 'from-[#F5B800] to-[#D99A00]', soft: 'bg-[#FFF0C2]', color: '#D99A00' },
];

const Scrubber = () => {
  const reduce = useReducedMotion();
  const trackRef = useRef(null);
  const idxRef = useRef(0);
  const [w, setW] = useState(0);
  const [idx, setIdx] = useState(0);
  const [touched, setTouched] = useState(false);
  const x = useMotionValue(0);
  const fillW = useTransform(x, (v) => v + HANDLE / 2);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;
    const measure = () => {
      const nw = Math.max(0, el.clientWidth - HANDLE);
      setW(nw);
      x.set((idxRef.current / 2) * nw);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [x]);

  useEffect(() => {
    const cb = (v) => {
      const i = w ? Math.min(2, Math.max(0, Math.round((v / w) * 2))) : 0;
      idxRef.current = i;
      setIdx(i);
    };
    const un = x.on ? x.on('change', cb) : x.onChange(cb);
    return () => un && un();
  }, [x, w]);

  const snap = (i) => {
    setTouched(true);
    animate(x, (i / 2) * w, { type: 'spring', stiffness: 260, damping: 28 });
  };
  const nearest = () => Math.min(2, Math.max(0, Math.round((x.get() / (w || 1)) * 2)));
  const s = flowSteps[idx];
  const t = stepTone[idx];
  const Icon = s.icon;

  return (
    <div className="mt-14 rounded-[40px] border border-white bg-white/80 p-6 shadow-[0_60px_100px_-55px_rgba(7,59,115,0.55)] backdrop-blur-xl sm:p-10">
      <div className="relative h-[84px]">
        {flowSteps.map((st, i) => {
          const SI = st.icon;
          const on = idx >= i;
          const pos = ['left-0 items-start text-left', 'left-1/2 -translate-x-1/2 items-center text-center', 'right-0 items-end text-right'][i];
          return (
            <button
              key={st.label}
              type="button"
              onClick={() => snap(i)}
              className={`absolute top-0 flex max-w-[34%] flex-col gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[#159447] sm:max-w-[240px] ${pos}`}
            >
              <span className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-500 ${on ? 'bg-[#159447] text-white' : 'bg-[#073B73]/10 text-[#073B73]/50'}`}>
                <SI className="h-5 w-5" />
              </span>
              <span className={`text-xs font-bold leading-tight transition-colors duration-500 sm:text-sm ${idx === i ? 'text-[#073B73]' : 'text-[#073B73]/50'}`}>{st.label}</span>
            </button>
          );
        })}
      </div>

      <div ref={trackRef} className="relative mt-2 h-14 select-none">
        <div className="absolute inset-x-0 top-[18px] h-5 rounded-full bg-[#073B73]/10" />
        <motion.div style={{ width: fillW }} className="absolute left-0 top-[18px] h-5 rounded-full bg-gradient-to-r from-[#159447] to-[#F5B800] shadow-[0_0_24px_rgba(245,184,0,0.5)]" />
        {[0, 0.5, 1].map((f) => (
          <span key={f} aria-hidden="true" className="absolute top-[26px] h-1.5 w-1.5 rounded-full bg-white" style={{ left: `calc(${HANDLE / 2}px + ${f} * (100% - ${HANDLE}px) - 3px)` }} />
        ))}
        <motion.button
          type="button"
          role="slider"
          aria-label="Energy flow"
          aria-valuemin={0}
          aria-valuemax={2}
          aria-valuenow={idx}
          aria-valuetext={s.label}
          drag="x"
          dragConstraints={{ left: 0, right: w }}
          dragElastic={0.04}
          dragMomentum={false}
          style={{ x }}
          onDragStart={() => setTouched(true)}
          onDragEnd={() => snap(nearest())}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') snap(Math.min(2, idx + 1));
            if (e.key === 'ArrowLeft') snap(Math.max(0, idx - 1));
          }}
          whileTap={{ scale: 1.08 }}
          className="absolute left-0 top-0 flex h-14 w-14 cursor-grab items-center justify-center gap-0.5 rounded-full border-4 border-white bg-gradient-to-br from-[#159447] to-[#0B6B3A] text-white shadow-[0_18px_40px_-10px_rgba(21,148,71,0.8)] outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-[#F5B800]"
        >
          {!touched && !reduce && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border-2 border-[#F5B800]"
              animate={{ scale: [1, 1.7], opacity: [0.9, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <ChevronLeft className="h-3 w-3 opacity-70" />
          <Zap className="h-5 w-5" />
          <ChevronRight className="h-3 w-3 opacity-70" />
        </motion.button>
      </div>

      <div className="mt-10 min-h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease }}
            className="grid items-start gap-8 md:grid-cols-[auto_1fr]"
          >
            <span className={`relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full ${t.soft}`}>
              {!reduce &&
                [0, 1].map((k) => (
                  <motion.span
                    key={k}
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border-2"
                    style={{ borderColor: t.color }}
                    animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: k * 1.2, ease: 'easeOut' }}
                  />
                ))}
              <span className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-xl ${t.chip}`}>
                <Icon className="h-10 w-10" />
              </span>
            </span>
            <div>
              <h3 className="text-3xl font-bold tracking-tight text-[#073B73] sm:text-4xl">{s.label}</h3>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#4C5B73] sm:text-lg">{s.desc}</p>

              {s.points && (
                <ul className="mt-5 space-y-2.5 max-w-2xl">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2.5 text-sm font-semibold text-[#073B73]">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#159447]/15 text-[#159447]">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ---------- iris video ---------- */
const IrisVideo = () => {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const mainVidRef = useRef(null);
  const bgVidRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 90%', 'center 45%'] });
  const r = useTransform(scrollYProgress, [0, 1], [reduce ? 120 : 10, 120]);
  const clipPath = useTransform(r, (v) => `circle(${v}% at 50% 50%)`);

  // Main video matrum background video ore time-la sync aagi odurathuku
  const handleTimeUpdate = () => {
    if (mainVidRef.current && bgVidRef.current) {
      if (Math.abs(bgVidRef.current.currentTime - mainVidRef.current.currentTime) > 0.25) {
        bgVidRef.current.currentTime = mainVidRef.current.currentTime;
      }
    }
  };

  return (
    <div ref={ref} className="relative mt-8 w-screen left-1/2 -translate-x-1/2 overflow-hidden">
      <div 
        aria-hidden="true" 
        className="absolute inset-x-0 -bottom-8 h-20 bg-[#159447]/15 blur-3xl pointer-events-none" 
      />

      <motion.div
        style={{ clipPath }}
        className="relative w-full h-[480px] sm:h-[520px] overflow-hidden flex items-center justify-center bg-black"
      >
        {/* 1. Background Video: Suthama BLUR ILLAMA, 100% full clarity-oda screen muzhukka odum */}
        <video 
          ref={bgVidRef}
          src={videos} 
          autoPlay 
          loop 
          muted 
          playsInline 
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none select-none blur-sm scale-105 opacity-85" 
        />

        {/* 2. Main Center Video: 0% Crop, 0% Stretch - original clear proportion */}
        <video 
          ref={mainVidRef}
          src={videos} 
          autoPlay 
          loop 
          muted 
          playsInline 
          controls 
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => bgVidRef.current?.play()}
          onPause={() => bgVidRef.current?.pause()}
          className="relative z-10 h-full w-auto max-w-full object-contain block drop-shadow-[0_20px_45px_rgba(0,0,0,0.6)]" 
        />
      </motion.div>
    </div>
  );
};

/* ---------- photo stack ---------- */
const PhotoStack = ({ media, icons }) => {
  const [I1, I2] = icons;
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const layer = (rot, dx, dy) => ({
    rest: { rotate: 0, x: 0, y: 0, opacity: 0, transition: { duration: 0.3 } },
    spread: { rotate: rot, x: dx, y: dy, opacity: 1, transition: { duration: 0.9, delay: 0.35, ease } },
    wide: { rotate: rot * 1.6, x: dx * 2, y: dy * 1.3, opacity: 1, transition: { duration: 0.5 } },
  });
  return (
    <motion.div
      ref={ref}
      initial="rest"
      animate={inView ? 'spread' : 'rest'}
      whileHover="wide"
      className="relative mx-auto w-[86%] max-w-[500px]"
    >
      <motion.div variants={layer(-6, -24, 16)} aria-hidden="true" className="absolute inset-0 flex items-end justify-start overflow-hidden rounded-[32px] border-4 border-white bg-gradient-to-br from-[#DDF3E6] to-[#F5FBF7] p-5 shadow-[0_30px_60px_-35px_rgba(7,59,115,0.5)]">
        <I1 className="h-20 w-20 text-[#159447]/25" strokeWidth={1.2} />
      </motion.div>
      <motion.div variants={layer(5, 26, 28)} aria-hidden="true" className="absolute inset-0 flex items-start justify-end overflow-hidden rounded-[32px] border-4 border-white bg-gradient-to-br from-[#FFF0C2] to-[#FFFAEA] p-5 shadow-[0_30px_60px_-35px_rgba(7,59,115,0.5)]">
        <I2 className="h-20 w-20 text-[#D99A00]/30" strokeWidth={1.2} />
      </motion.div>
      <motion.div
        variants={{
          rest: { opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.3 } },
          spread: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease } },
          wide: { opacity: 1, y: 0, scale: 1 },
        }}
        className="relative aspect-[4/3] overflow-hidden rounded-[32px] border-4 border-white shadow-[0_50px_100px_-40px_rgba(7,59,115,0.6)]"
      >
        {media}
        <Sweep />
      </motion.div>
    </motion.div>
  );
};

const HairList = ({ items }) => (
  <motion.ul
    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
    className="mt-8"
  >
    {items.map((t, i) => (
      <motion.li
        key={t}
        variants={{
          hidden: { opacity: 0, x: 40, transition: { duration: 0.2 } },
          show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
        }}
        className="group relative flex items-center gap-4 py-4 text-[15px] font-medium text-[#073B73] sm:text-base"
      >
        {i === 0 && (
          <motion.span
            aria-hidden="true"
            variants={{
              hidden: { scaleX: 0, transition: { duration: 0.2 } },
              show: { scaleX: 1, transition: { duration: 1, ease } },
            }}
            style={{ originX: 0 }}
            className="absolute inset-x-0 top-0 h-px bg-[#073B73]/15"
          />
        )}
        <motion.span
          variants={{
            hidden: { scale: 0, rotate: -90, transition: { duration: 0.2 } },
            show: { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 300, damping: 14, delay: 0.15 } },
          }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#159447] text-white"
        >
          <Check className="h-4 w-4" strokeWidth={3} />
        </motion.span>
        <span className="transition-transform duration-500 group-hover:translate-x-1">{t}</span>
        <motion.span
          aria-hidden="true"
          variants={{
            hidden: { scaleX: 0, transition: { duration: 0.2 } },
            show: { scaleX: 1, transition: { duration: 1, delay: 0.1, ease } },
          }}
          style={{ originX: 0 }}
          className="absolute inset-x-0 bottom-0 h-px bg-[#073B73]/15"
        />
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[#159447] to-[#F5B800] transition-transform duration-500 group-hover:scale-x-100" />
      </motion.li>
    ))}
  </motion.ul>
);

const StackFeature = ({ reverse = false, icons, head, media, items, cta }) => {
  const textRef = useRef(null);
  const textIn = useInView(textRef, { once: false, amount: 0.25 });
  return (
    <div className="grid items-center gap-20 lg:grid-cols-2 lg:gap-28">
      <div className={reverse ? 'lg:order-2' : ''}>
        <PhotoStack media={media} icons={icons} />
      </div>
      <motion.div
        ref={textRef}
        initial="hidden"
        animate={textIn ? 'show' : 'hidden'}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.15 } } }}
      >
        <motion.div variants={headVariants}>{head}</motion.div>
        <HairList items={items} />
        <motion.div variants={fadeUp(0.2, 24)} className="mt-10">{cta}</motion.div>
      </motion.div>
    </div>
  );
};

/* ---------- benefit grid variants ---------- */
const colVariants = (delay) => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: delay } },
});
const cardFrom = (dir) => ({
  hidden: { opacity: 0, x: dir * 70, transition: { duration: 0.25 } },
  show: { opacity: 1, x: 0, transition: { duration: 0.85, ease } },
});

/* ---------- main ---------- */
const WhatIsBESS = () => {
  const leftBenefits = benefits.slice(0, 3);
  const rightBenefits = benefits.slice(3, 6);

  const gridRef = useRef(null);
  const gridIn = useInView(gridRef, { once: false, amount: 0.2 });

  return (
    <>
      {/* BESS Explainer Section */}
      <Block tone="white">
        <Intro
          tag="What is BESS?"
          title="A battery energy storage system, explained simply"
          text="A BESS stores electricity from the grid, from solar panels, or from both, and supplies it back when you need power."
        />

        <Rise>
          <Scrubber />
        </Rise>

        {/* ── 3-COLUMN BALANCED LAYOUT (Tighter Gap & Taller Center Image) ── */}
        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridIn ? 'show' : 'hidden'}
          variants={{ hidden: {}, show: {} }}
          /* gap-4 for desktop reduces empty horizontal space between cards and image */
          className="mt-28 grid items-center gap-6 lg:grid-cols-12 lg:gap-4 xl:gap-5"
        >

          {/* Left Column: 3 Benefit Cards */}
          <motion.div variants={colVariants(0.1)} className="lg:col-span-3 space-y-3.5">
            {leftBenefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div key={b.title} variants={cardFrom(-1)}>
                  <div
                    className="group relative flex flex-col justify-between overflow-hidden rounded-[22px] border border-slate-200/90 bg-white/95 p-4 sm:p-4.5 shadow-[0_8px_25px_-12px_rgba(7,59,115,0.08)] transition-all duration-300 hover:border-[#159447]/60 hover:shadow-[0_16px_36px_-12px_rgba(21,148,71,0.2)] hover:-translate-y-1"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#159447] via-[#F5B800] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF5EE] text-[#159447] border border-emerald-100 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#159447] group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-[14px] font-bold tracking-tight text-[#073B73] group-hover:text-[#159447] transition-colors">
                            {b.title}
                          </h4>
                          <span className="text-[10px] font-mono font-bold text-slate-300 group-hover:text-emerald-600 transition-colors">
                            0{i + 1}
                          </span>
                        </div>
                        <p className="mt-1 text-[12px] leading-relaxed text-[#4C5B73]">
                          {b.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Center Column: Taller Image with balanced aspect ratio */}
          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                scale: 0.9,
                clipPath: 'inset(32% 32% 32% 32% round 22px)',
                transition: { duration: 0.3 },
              },
              show: {
                opacity: 1,
                scale: 1,
                clipPath: 'inset(-12% -12% -12% -12% round 22px)',
                transition: { duration: 1.1, delay: 0.15, ease },
              },
            }}
            className="lg:col-span-6 px-1"
          >
            <div className="relative group">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[36px] bg-gradient-to-tr from-[#159447]/15 via-[#F5B800]/10 to-[#073B73]/10 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              />
              <div className="relative overflow-hidden rounded-[26px] border-4 border-white bg-white p-2 shadow-[0_25px_60px_-20px_rgba(7,59,115,0.25)]">
                {/* Changed to aspect-[16/10] and min-height to increase height proportionally */}
                <div className="overflow-hidden rounded-[18px] bg-slate-900/5 flex items-center justify-center">
                  <img
                    src={image1}
                    alt="Pure Energy Smart City"
                    className="w-full h-auto max-h-[460px] object-contain block drop-shadow-sm transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between px-3 py-1 text-xs font-bold text-[#073B73]">
                  <span className="flex items-center gap-2 text-[#159447]">
                    <span className="h-2 w-2 rounded-full bg-[#159447] animate-pulse" />
                    BESS Process Visualization
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3 Benefit Cards */}
          <motion.div variants={colVariants(0.35)} className="lg:col-span-3 space-y-3.5">
            {rightBenefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div key={b.title} variants={cardFrom(1)}>
                  <div
                    className="group relative flex flex-col justify-between overflow-hidden rounded-[22px] border border-slate-200/90 bg-white/95 p-4 sm:p-4.5 shadow-[0_8px_25px_-12px_rgba(7,59,115,0.08)] transition-all duration-300 hover:border-[#159447]/60 hover:shadow-[0_16px_36px_-12px_rgba(21,148,71,0.2)] hover:-translate-y-1"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#F5B800] to-[#159447] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF5EE] text-[#159447] border border-emerald-100 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#159447] group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-[14px] font-bold tracking-tight text-[#073B73] group-hover:text-[#159447] transition-colors">
                            {b.title}
                          </h4>
                          <span className="text-[10px] font-mono font-bold text-slate-300 group-hover:text-emerald-600 transition-colors">
                            0{i + 4}
                          </span>
                        </div>
                        <p className="mt-1 text-[12px] leading-relaxed text-[#4C5B73]">
                          {b.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </motion.div>
      </Block>

      {/* 1 · Experience the complete system */}
      <Block id="complete" tone="cool">
        <RevealHead>
          <SectionHead
            tag="Experience the complete system"
            title="One working system, from structure to load"
            text="Walk through the complete installation in the same order the energy travels."
          />
        </RevealHead>
        <IrisVideo />
      </Block>

      {/* 4 · Experience Solar + BESS */}
      <Block id="solar-bess" tone="mint">
        <StackFeature
          icons={[Sun, BatteryFull]}
          head={<SectionHead tag="Experience Solar + BESS" title="The complete solution in operation" />}
          media={<img src={image2} alt='Purepower Energy Solar + BESS' className="h-full w-full" />}
          items={[
            'Follow the system from solar structure to essential loads',
            'See solar power flowing into the PuREPower hybrid BESS',
            'See the protection, earthing and AC side of the installation',
            'Understand how the system is sized around a real requirement',
          ]}
          cta={<Btn to="/solutions" variant="navy">Explore complete solutions</Btn>}
        />
      </Block>

      {/* 5 · Experience PuREPower BESS independently */}
      <Block id="purepower" tone="butter">
        <StackFeature
          reverse
          icons={[Zap, BatteryFull]}
          head={<SectionHead tag="Experience PuREPower BESS independently" title="Energy storage without solar" />}
          media={<img src={image3} alt='why-bess-is-a-better-alternative-without-using' className="h-full w-full" />}
          items={[
            'See PuREPower BESS working as a standalone unit',
            'Understand how it connects between the grid and your loads',
            'See how solar can be added wherever required',
          ]}
          cta={<Btn to="/purepower" variant="green">Explore PuREPower BESS</Btn>}
        />
      </Block>
    </>
  );
};

export default WhatIsBESS;